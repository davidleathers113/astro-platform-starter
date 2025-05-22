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

// Track email usage in database
async function trackEmailUsage(type: 'user_confirmation' | 'internal_notification', leadId?: string): Promise<void> {
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
