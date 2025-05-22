// Email utility functions for debt relief lead notifications
// Uses Resend for email delivery with usage tracking and monitoring

import { Resend } from 'resend';
import { supabaseAdmin } from './supabase';
import type { Lead } from './supabase';

// Initialize Resend client
const resendApiKey = import.meta.env.RESEND_API_KEY;

if (!resendApiKey) {
    throw new Error('Missing RESEND_API_KEY environment variable');
}

const resend = new Resend(resendApiKey);

// Configuration constants
const FROM_EMAIL = 'Debt Relief Assistance <noreply@your-domain.com>';
const INTERNAL_EMAIL = 'leads@your-domain.com';
const FREE_TIER_LIMIT = 3000; // Resend free tier limit (emails per month)
const USAGE_WARNING_THRESHOLD = 0.75; // 75% of limit
const USAGE_CRITICAL_THRESHOLD = 0.90; // 90% of limit

// Types for email operations
export interface EmailResult {
    success: boolean;
    messageId?: string;
    error?: string;
}

export interface EmailUsageStats {
    currentMonth: string;
    emailsSent: number;
    remainingEmails: number;
    percentageUsed: number;
    isNearLimit: boolean;
    isCritical: boolean;
}

// HTML email templates
function getUserConfirmationTemplate(lead: Lead): string {
    const debtAmountText = {
        '10000-15000': '$10,000 - $15,000',
        '15000-25000': '$15,000 - $25,000', 
        '25000-50000': '$25,000 - $50,000',
        '50000+': '$50,000+'
    }[lead.debt_amount];

    const debtTypeText = {
        'credit-cards': 'Credit Cards',
        'personal-loans': 'Personal Loans',
        'medical': 'Medical Debt',
        'mixed': 'Mixed Debt Types'
    }[lead.debt_type];

    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank You for Your Debt Relief Inquiry</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #2d7984; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background-color: #f9f9f9; }
        .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; }
        .highlight { background-color: #e8f4f8; padding: 15px; border-left: 4px solid #2d7984; margin: 15px 0; }
        .button { display: inline-block; background-color: #2d7984; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 15px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Thank You for Your Inquiry!</h1>
        </div>
        <div class="content">
            <p>Dear ${lead.first_name || 'Friend'},</p>
            
            <p>Thank you for reaching out to us regarding debt relief assistance. We have received your inquiry and wanted to confirm the details:</p>
            
            <div class="highlight">
                <strong>Your Submission Details:</strong><br>
                📞 <strong>Phone:</strong> ${formatPhone(lead.phone)}<br>
                💰 <strong>Debt Amount:</strong> ${debtAmountText}<br>
                📋 <strong>Debt Type:</strong> ${debtTypeText}<br>
                ${lead.email ? `📧 <strong>Email:</strong> ${lead.email}<br>` : ''}
            </div>
            
            <h3>What Happens Next?</h3>
            <p>Our certified debt relief specialists will review your information and contact you within 24 hours to discuss:</p>
            <ul>
                <li>Your eligibility for debt relief programs</li>
                <li>Potential savings and payment options</li>
                <li>The best strategy for your unique situation</li>
                <li>Free consultation with no obligations</li>
            </ul>
            
            <p><strong>Important:</strong> Please keep your phone available as our specialists will be calling from various numbers to reach you.</p>
            
            <div class="highlight">
                <p><strong>Have Questions?</strong> Call us directly at <strong>(555) 123-DEBT</strong> or reply to this email.</p>
            </div>
            
            <p>We're committed to helping you achieve financial freedom!</p>
            
            <p>Best regards,<br>
            The Debt Relief Team</p>
        </div>
        <div class="footer">
            <p>You received this email because you submitted a debt relief inquiry on our website.</p>
            <p>If you did not make this request, please ignore this email or contact us at support@your-domain.com</p>
        </div>
    </div>
</body>
</html>`;
}

function getInternalNotificationTemplate(lead: Lead): string {
    const debtAmountText = {
        '10000-15000': '$10,000 - $15,000',
        '15000-25000': '$15,000 - $25,000', 
        '25000-50000': '$25,000 - $50,000',
        '50000+': '$50,000+'
    }[lead.debt_amount];

    const debtTypeText = {
        'credit-cards': 'Credit Cards',
        'personal-loans': 'Personal Loans',
        'medical': 'Medical Debt',
        'mixed': 'Mixed Debt Types'
    }[lead.debt_type];

    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Debt Relief Lead</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #0062b3; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background-color: #f9f9f9; }
        .lead-details { background-color: white; padding: 20px; border: 1px solid #ddd; border-radius: 5px; }
        .priority { background-color: #ff6b6b; color: white; padding: 5px 10px; border-radius: 3px; display: inline-block; }
        .actions { margin-top: 20px; padding: 15px; background-color: #e8f5e8; border-radius: 5px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚨 New Debt Relief Lead</h1>
            <p>Lead ID: ${lead.id || 'Pending'}</p>
        </div>
        <div class="content">
            <div class="lead-details">
                <h3>Lead Information</h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr style="border-bottom: 1px solid #eee;">
                        <td style="padding: 8px; font-weight: bold;">Name:</td>
                        <td style="padding: 8px;">${lead.first_name || 'Not provided'} ${lead.last_name || ''}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #eee;">
                        <td style="padding: 8px; font-weight: bold;">Phone:</td>
                        <td style="padding: 8px;"><strong>${formatPhone(lead.phone)}</strong></td>
                    </tr>
                    <tr style="border-bottom: 1px solid #eee;">
                        <td style="padding: 8px; font-weight: bold;">Email:</td>
                        <td style="padding: 8px;">${lead.email || 'Not provided'}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #eee;">
                        <td style="padding: 8px; font-weight: bold;">Debt Amount:</td>
                        <td style="padding: 8px;"><span class="priority">${debtAmountText}</span></td>
                    </tr>
                    <tr style="border-bottom: 1px solid #eee;">
                        <td style="padding: 8px; font-weight: bold;">Debt Type:</td>
                        <td style="padding: 8px;">${debtTypeText}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #eee;">
                        <td style="padding: 8px; font-weight: bold;">Source:</td>
                        <td style="padding: 8px;">${lead.source || 'qualification-form'}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #eee;">
                        <td style="padding: 8px; font-weight: bold;">IP Address:</td>
                        <td style="padding: 8px;">${lead.ip_address || 'Unknown'}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #eee;">
                        <td style="padding: 8px; font-weight: bold;">Submission Time:</td>
                        <td style="padding: 8px;">${new Date().toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; font-weight: bold;">Marketing Consent:</td>
                        <td style="padding: 8px;">${lead.consent_marketing ? '✅ Yes' : '❌ No'}</td>
                    </tr>
                </table>
                
                ${lead.notes ? `
                <h4>Additional Notes:</h4>
                <p style="background-color: #f0f0f0; padding: 10px; border-radius: 3px;">${lead.notes}</p>
                ` : ''}
            </div>
            
            <div class="actions">
                <h3>📞 Next Actions Required:</h3>
                <ul>
                    <li><strong>Call within 24 hours</strong> for best conversion rates</li>
                    <li>Update lead status in CRM system</li>
                    <li>Follow qualification script for debt amount range</li>
                    <li>Document call outcome and next steps</li>
                </ul>
            </div>
        </div>
    </div>
</body>
</html>`;
}

// Helper function to format phone numbers
function formatPhone(phone: string): string {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    return phone;
}

// GDPR Email Templates
function getGDPRDeletionConfirmationTemplate(email: string, phone?: string, deletedCount: number = 0): string {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Data Deletion Confirmation</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #2d7984; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background-color: #f9f9f9; }
        .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; }
        .highlight { background-color: #e8f4f8; padding: 15px; border-left: 4px solid #2d7984; margin: 15px 0; }
        .warning { background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 15px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>✅ Data Deletion Confirmed</h1>
        </div>
        <div class="content">
            <p>This email confirms that we have processed your data deletion request under GDPR Article 17 (Right to be Forgotten).</p>
            
            <div class="highlight">
                <strong>Deletion Summary:</strong><br>
                📧 <strong>Email:</strong> ${email}<br>
                ${phone ? `📞 <strong>Phone:</strong> ${formatPhone(phone)}<br>` : ''}
                🗑️ <strong>Records Deleted:</strong> ${deletedCount}<br>
                📅 <strong>Deletion Date:</strong> ${new Date().toLocaleString()}<br>
            </div>
            
            <h3>What Was Deleted</h3>
            <p>The following personal data has been permanently removed from our systems:</p>
            <ul>
                <li>All lead generation records associated with your information</li>
                <li>Contact information (name, email, phone number)</li>
                <li>Debt information and preferences</li>
                <li>Marketing consent records</li>
                <li>Communication history</li>
            </ul>
            
            <div class="warning">
                <strong>⚠️ Important:</strong> This action is irreversible. All data associated with your request has been permanently deleted and cannot be recovered.
            </div>
            
            <h3>Your Privacy Rights</h3>
            <p>This deletion was processed in accordance with:</p>
            <ul>
                <li>GDPR Article 17 - Right to erasure ('right to be forgotten')</li>
                <li>Our Privacy Policy terms</li>
                <li>Applicable data protection regulations</li>
            </ul>
            
            <h3>Questions or Concerns?</h3>
            <p>If you have any questions about this deletion or your privacy rights, please contact us:</p>
            <p>📧 Email: privacy@your-domain.com<br>
            📞 Phone: (555) 123-DEBT</p>
            
            <p>Thank you for using our services.</p>
            
            <p>Best regards,<br>
            Data Protection Officer<br>
            Debt Freedom Toolkit</p>
        </div>
        <div class="footer">
            <p>This is an automated confirmation of your GDPR data deletion request.</p>
            <p>Request processed on ${new Date().toLocaleString()}</p>
        </div>
    </div>
</body>
</html>`;
}

function getGDPRExportDeliveryTemplate(email: string, phone?: string, recordCount: number = 0): string {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Data Export is Ready</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #2d7984; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background-color: #f9f9f9; }
        .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; }
        .highlight { background-color: #e8f4f8; padding: 15px; border-left: 4px solid #2d7984; margin: 15px 0; }
        .info { background-color: #d1ecf1; border-left: 4px solid #0c5460; padding: 15px; margin: 15px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📊 Your Data Export</h1>
        </div>
        <div class="content">
            <p>We have successfully processed your data export request under GDPR Article 15 (Right of access).</p>
            
            <div class="highlight">
                <strong>Export Summary:</strong><br>
                📧 <strong>Email:</strong> ${email}<br>
                ${phone ? `📞 <strong>Phone:</strong> ${formatPhone(phone)}<br>` : ''}
                📦 <strong>Records Found:</strong> ${recordCount}<br>
                📅 <strong>Export Date:</strong> ${new Date().toLocaleString()}<br>
            </div>
            
            <h3>What's Included</h3>
            <p>Your data export contains all personal information we have on file, including:</p>
            <ul>
                <li>Contact information (name, email, phone)</li>
                <li>Debt relief inquiry details</li>
                <li>Marketing consent preferences</li>
                <li>Submission dates and sources</li>
                <li>Communication history</li>
            </ul>
            
            <div class="info">
                <strong>🔒 Privacy Protection:</strong> For security reasons, sensitive information like IP addresses and detailed user agent data are excluded from exports.
            </div>
            
            <h3>Data Format</h3>
            <p>Your data has been exported in JSON format, which is machine-readable and can be:</p>
            <ul>
                <li>Opened in text editors</li>
                <li>Imported into other systems</li>
                <li>Processed programmatically</li>
                <li>Converted to other formats as needed</li>
            </ul>
            
            <h3>Your Privacy Rights</h3>
            <p>This export was provided in accordance with:</p>
            <ul>
                <li>GDPR Article 15 - Right of access</li>
                <li>GDPR Article 20 - Right to data portability</li>
                <li>Our Privacy Policy commitments</li>
            </ul>
            
            <h3>Questions or Need Help?</h3>
            <p>If you have questions about your data or need assistance with the export format:</p>
            <p>📧 Email: privacy@your-domain.com<br>
            📞 Phone: (555) 123-DEBT</p>
            
            <p>Best regards,<br>
            Data Protection Officer<br>
            Debt Freedom Toolkit</p>
        </div>
        <div class="footer">
            <p>This export was generated in response to your GDPR data access request.</p>
            <p>Export generated on ${new Date().toLocaleString()}</p>
        </div>
    </div>
</body>
</html>`;
}

// Track email usage in database
async function trackEmailUsage(type: 'user_confirmation' | 'internal_notification' | 'gdpr_deletion' | 'gdpr_export', leadId?: string): Promise<void> {
    try {
        await supabaseAdmin
            .from('email_usage')
            .insert({
                email_type: type,
                lead_id: leadId,
                sent_at: new Date().toISOString(),
                month_year: new Date().toISOString().substring(0, 7) // Format: 2025-01
            });
    } catch (error) {
        console.error('Failed to track email usage:', error);
        // Don't throw error - tracking failure shouldn't break email sending
    }
}

// Get current month's email usage statistics
export async function getEmailUsageStats(): Promise<EmailUsageStats | null> {
    try {
        const currentMonth = new Date().toISOString().substring(0, 7);
        
        const { data, error } = await supabaseAdmin
            .from('email_usage')
            .select('*')
            .eq('month_year', currentMonth);
            
        if (error) {
            console.error('Failed to fetch email usage stats:', error);
            return null;
        }
        
        const emailsSent = data?.length || 0;
        const remainingEmails = Math.max(0, FREE_TIER_LIMIT - emailsSent);
        const percentageUsed = (emailsSent / FREE_TIER_LIMIT) * 100;
        
        return {
            currentMonth,
            emailsSent,
            remainingEmails,
            percentageUsed,
            isNearLimit: percentageUsed >= (USAGE_WARNING_THRESHOLD * 100),
            isCritical: percentageUsed >= (USAGE_CRITICAL_THRESHOLD * 100)
        };
    } catch (error) {
        console.error('Failed to calculate email usage stats:', error);
        return null;
    }
}

// Check if we can send emails (within limits)
export async function checkEmailLimits(): Promise<{ canSend: boolean; reason?: string }> {
    const stats = await getEmailUsageStats();
    
    if (!stats) {
        // If we can't check stats, allow sending but log warning
        console.warn('Unable to check email usage limits - allowing send');
        return { canSend: true };
    }
    
    if (stats.emailsSent >= FREE_TIER_LIMIT) {
        return { 
            canSend: false, 
            reason: `Monthly email limit reached (${FREE_TIER_LIMIT} emails)` 
        };
    }
    
    if (stats.isCritical) {
        console.warn(`Email usage is at ${stats.percentageUsed.toFixed(1)}% of free tier limit`);
    }
    
    return { canSend: true };
}

// Send user confirmation email
export async function sendUserConfirmationEmail(lead: Lead): Promise<EmailResult> {
    try {
        // Check limits before sending
        const limitCheck = await checkEmailLimits();
        if (!limitCheck.canSend) {
            return {
                success: false,
                error: limitCheck.reason
            };
        }
        
        if (!lead.email) {
            return {
                success: false,
                error: 'No email address provided for user confirmation'
            };
        }
        
        const { data, error } = await resend.emails.send({
            from: FROM_EMAIL,
            to: [lead.email],
            subject: 'Thank You for Your Debt Relief Inquiry - We\'ll Contact You Soon!',
            html: getUserConfirmationTemplate(lead)
        });
        
        if (error) {
            console.error('Resend API error (user confirmation):', error);
            return {
                success: false,
                error: error.message
            };
        }
        
        // Track successful email send
        await trackEmailUsage('user_confirmation', lead.id);
        
        return {
            success: true,
            messageId: data?.id
        };
        
    } catch (error) {
        console.error('Failed to send user confirmation email:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown email error'
        };
    }
}

// Send internal notification email
export async function sendInternalNotificationEmail(lead: Lead): Promise<EmailResult> {
    try {
        // Check limits before sending
        const limitCheck = await checkEmailLimits();
        if (!limitCheck.canSend) {
            return {
                success: false,
                error: limitCheck.reason
            };
        }
        
        const { data, error } = await resend.emails.send({
            from: FROM_EMAIL,
            to: [INTERNAL_EMAIL],
            subject: `🚨 New Debt Relief Lead: ${formatPhone(lead.phone)} - ${lead.debt_amount}`,
            html: getInternalNotificationTemplate(lead)
        });
        
        if (error) {
            console.error('Resend API error (internal notification):', error);
            return {
                success: false,
                error: error.message
            };
        }
        
        // Track successful email send
        await trackEmailUsage('internal_notification', lead.id);
        
        return {
            success: true,
            messageId: data?.id
        };
        
    } catch (error) {
        console.error('Failed to send internal notification email:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown email error'
        };
    }
}

// Send both confirmation and notification emails
export async function sendLeadEmails(lead: Lead): Promise<{
    userConfirmation: EmailResult;
    internalNotification: EmailResult;
}> {
    const [userConfirmation, internalNotification] = await Promise.all([
        lead.email ? sendUserConfirmationEmail(lead) : { success: true, messageId: 'skipped-no-email' },
        sendInternalNotificationEmail(lead)
    ]);
    
    return {
        userConfirmation,
        internalNotification
    };
}

// Send usage alerts to development team
export async function sendUsageAlerts(): Promise<void> {
    const stats = await getEmailUsageStats();
    
    if (!stats || (!stats.isNearLimit && !stats.isCritical)) {
        return; // No alerts needed
    }
    
    const alertLevel = stats.isCritical ? 'CRITICAL' : 'WARNING';
    const subject = `🚨 ${alertLevel}: Resend Email Usage at ${stats.percentageUsed.toFixed(1)}%`;
    
    const alertTemplate = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Email Usage Alert</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: ${stats.isCritical ? '#ff4444' : '#ff9900'}; color: white; padding: 20px; text-align: center;">
            <h1>${alertLevel}: Email Usage Alert</h1>
        </div>
        <div style="padding: 20px; background-color: #f9f9f9;">
            <h3>Email Usage Statistics for ${stats.currentMonth}</h3>
            <ul>
                <li><strong>Emails Sent:</strong> ${stats.emailsSent} / ${FREE_TIER_LIMIT}</li>
                <li><strong>Remaining:</strong> ${stats.remainingEmails}</li>
                <li><strong>Usage:</strong> ${stats.percentageUsed.toFixed(1)}%</li>
            </ul>
            
            <h3>Recommended Actions:</h3>
            <ul>
                ${stats.isCritical ? 
                    '<li><strong>URGENT:</strong> Consider upgrading Resend plan or reducing email sends</li>' :
                    '<li>Monitor usage closely and plan for potential upgrade</li>'
                }
                <li>Review email sending patterns and optimize if possible</li>
                <li>Consider implementing email batching for non-critical notifications</li>
            </ul>
        </div>
    </div>
</body>
</html>`;
    
    try {
        // Send alert to development team (using same internal email for now)
        await resend.emails.send({
            from: FROM_EMAIL,
            to: [INTERNAL_EMAIL],
            subject,
            html: alertTemplate
        });
        
        console.log(`Email usage alert sent: ${alertLevel} at ${stats.percentageUsed.toFixed(1)}%`);
    } catch (error) {
        console.error('Failed to send usage alert:', error);
    }
}

// GDPR Email Functions

// Send GDPR data deletion confirmation email
export async function sendGDPRDeletionConfirmationEmail(
    email: string, 
    phone?: string, 
    deletedCount: number = 0
): Promise<EmailResult> {
    try {
        // Check limits before sending
        const limitCheck = await checkEmailLimits();
        if (!limitCheck.canSend) {
            return {
                success: false,
                error: limitCheck.reason
            };
        }
        
        const { data, error } = await resend.emails.send({
            from: FROM_EMAIL,
            to: [email],
            subject: 'Data Deletion Confirmation - Your Request Has Been Processed',
            html: getGDPRDeletionConfirmationTemplate(email, phone, deletedCount)
        });
        
        if (error) {
            console.error('Resend API error (GDPR deletion confirmation):', error);
            return {
                success: false,
                error: error.message
            };
        }
        
        // Track successful email send
        await trackEmailUsage('gdpr_deletion');
        
        return {
            success: true,
            messageId: data?.id
        };
        
    } catch (error) {
        console.error('Failed to send GDPR deletion confirmation email:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown email error'
        };
    }
}

// Send GDPR data export delivery email  
export async function sendGDPRExportDeliveryEmail(
    email: string, 
    phone?: string, 
    recordCount: number = 0
): Promise<EmailResult> {
    try {
        // Check limits before sending
        const limitCheck = await checkEmailLimits();
        if (!limitCheck.canSend) {
            return {
                success: false,
                error: limitCheck.reason
            };
        }
        
        const { data, error } = await resend.emails.send({
            from: FROM_EMAIL,
            to: [email],
            subject: 'Your Data Export is Ready - GDPR Request Completed',
            html: getGDPRExportDeliveryTemplate(email, phone, recordCount)
        });
        
        if (error) {
            console.error('Resend API error (GDPR export delivery):', error);
            return {
                success: false,
                error: error.message
            };
        }
        
        // Track successful email send
        await trackEmailUsage('gdpr_export');
        
        return {
            success: true,
            messageId: data?.id
        };
        
    } catch (error) {
        console.error('Failed to send GDPR export delivery email:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown email error'
        };
    }
}
