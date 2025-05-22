/**
 * Email Template Preview Utility
 * 
 * Provides sample data and preview functionality for testing email templates
 * during development. This helps developers see how templates render with
 * realistic data before sending actual emails.
 */

import { render } from '@react-email/render';
import {
    LeadConfirmationEmailData,
    InternalLeadNotificationEmailData,
    ErrorNotificationEmailData,
    WelcomeEmailData,
    EmailTemplateType,
    calculateLeadPriority,
    calculateExpectedContactTime,
    generateReferenceNumber
} from '../types';
import { 
    LeadConfirmationEmail,
    InternalLeadNotificationEmail,
    ErrorNotificationEmail,
    WelcomeEmail,
    EMAIL_TEMPLATES
} from '../templates';

// Sample data generators for testing
export class EmailPreviewData {
    
    /**
     * Generate sample data for Lead Confirmation Email
     */
    static getLeadConfirmationData(): LeadConfirmationEmailData {
        const leadId = 'lead_' + Math.random().toString(36).substr(2, 9);
        const priority = 'high';
        
        return {
            timestamp: new Date().toISOString(),
            environment: 'development',
            user: {
                firstName: 'Sarah',
                email: 'sarah.johnson@example.com',
                phone: '(555) 123-4567'
            },
            lead: {
                debtAmount: '25000-50000',
                debtType: 'credit-cards',
                submittedAt: new Date().toISOString(),
                referenceNumber: generateReferenceNumber(leadId)
            },
            nextSteps: {
                expectedContactTime: calculateExpectedContactTime(priority),
                contactMethod: 'Phone call from our certified debt specialist',
                preparationTips: [
                    'Have your recent credit card statements ready',
                    'List your monthly income and essential expenses',
                    'Note any hardships affecting your ability to pay',
                    'Prepare questions about debt relief options',
                    'Have a quiet space available for the 15-20 minute call'
                ]
            }
        };
    }

    /**
     * Generate sample data for Internal Lead Notification Email
     */
    static getInternalNotificationData(): InternalLeadNotificationEmailData {
        const leadId = 'lead_' + Math.random().toString(36).substr(2, 9);
        const lead = {
            id: leadId,
            debtAmount: '25000-50000',
            debtType: 'credit-cards',
            phone: '5551234567',
            consentProcessing: true,
            consentMarketing: true,
            source: 'qualification-form',
            ipAddress: '192.168.1.100',
            userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
            submittedAt: new Date().toISOString()
        };
        
        const priority = calculateLeadPriority(lead);
        
        return {
            timestamp: new Date().toISOString(),
            environment: 'development',
            lead,
            priority,
            source: {
                page: '/debt-relief',
                campaign: 'google_ads_credit_card_debt',
                referrer: 'https://www.google.com'
            },
            metadata: {
                ipAddress: '192.168.1.100',
                userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                location: {
                    city: 'Austin',
                    state: 'Texas',
                    country: 'United States'
                }
            },
            actions: {
                viewLeadUrl: `https://dashboard.yourdomain.com/leads/${leadId}`,
                callLeadUrl: `tel:+15551234567`,
                emailLeadUrl: `mailto:sarah.johnson@example.com?subject=Regarding Your Debt Relief Inquiry`
            }
        };
    }

    /**
     * Generate sample data for Error Notification Email
     */
    static getErrorNotificationData(): ErrorNotificationEmailData {
        const requestId = 'req_' + Math.random().toString(36).substr(2, 9);
        
        return {
            timestamp: new Date().toISOString(),
            environment: 'production',
            error: {
                message: 'Failed to insert lead data: Connection timeout after 30 seconds',
                stack: `Error: Connection timeout after 30 seconds
    at Database.query (/app/src/lib/database.ts:45:23)
    at LeadService.createLead (/app/src/services/leadService.ts:78:31)
    at POST /api/leads (/app/src/pages/api/leads.ts:156:19)
    at async handler (/app/src/pages/api/leads.ts:89:12)`,
                code: 'DB_CONNECTION_TIMEOUT',
                type: 'database_error',
                severity: 'high'
            },
            context: {
                endpoint: '/api/leads',
                method: 'POST',
                userId: 'user_abc123',
                leadId: 'lead_def456',
                requestId,
                userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                ipAddress: '203.0.113.45'
            },
            system: {
                service: 'debt-relief-api',
                version: '1.2.4',
                environment: 'production',
                hostname: 'api-server-01.yourdomain.com'
            },
            actions: {
                dashboardUrl: 'https://monitoring.yourdomain.com/dashboard',
                logsUrl: `https://logs.yourdomain.com/search?requestId=${requestId}`,
                documentsUrl: 'https://docs.yourdomain.com/troubleshooting/database-errors'
            }
        };
    }

    /**
     * Generate sample data for Welcome Email
     */
    static getWelcomeData(): WelcomeEmailData {
        const userId = 'user_' + Math.random().toString(36).substr(2, 9);
        
        return {
            timestamp: new Date().toISOString(),
            environment: 'development',
            user: {
                id: userId,
                firstName: 'Michael',
                lastName: 'Rodriguez',
                email: 'michael.rodriguez@example.com',
                phone: '(555) 987-6543',
                createdAt: new Date().toISOString()
            },
            account: {
                type: 'basic',
                createdAt: new Date().toISOString(),
                activationRequired: true,
                activationUrl: `https://yourdomain.com/activate?token=abc123def456&userId=${userId}`
            },
            onboarding: {
                steps: [
                    {
                        title: 'Complete Your Profile',
                        description: 'Add your financial information to get personalized recommendations',
                        url: '/profile/complete',
                        completed: false
                    },
                    {
                        title: 'Debt Assessment',
                        description: 'Take our comprehensive debt assessment to understand your situation',
                        url: '/assessment/debt',
                        completed: false
                    },
                    {
                        title: 'Review Your Plan',
                        description: 'Review your personalized debt relief plan and options',
                        url: '/plan/review',
                        completed: false
                    },
                    {
                        title: 'Schedule Consultation',
                        description: 'Book a free consultation with our certified debt specialists',
                        url: '/consultation/schedule',
                        completed: false
                    }
                ],
                estimatedTime: '15-20 minutes'
            },
            resources: {
                supportUrl: 'https://yourdomain.com/support',
                documentationUrl: 'https://yourdomain.com/learn',
                communityUrl: 'https://community.yourdomain.com'
            }
        };
    }
}

/**
 * Preview function that renders email templates with sample data
 */
export async function previewEmailTemplate(
    templateType: EmailTemplateType,
    format: 'html' | 'text' = 'html'
): Promise<string> {
    let data: any;
    let Component: React.ComponentType<any>;

    // Get sample data and component based on template type
    switch (templateType) {
        case 'lead_confirmation':
            data = EmailPreviewData.getLeadConfirmationData();
            Component = LeadConfirmationEmail;
            break;
        
        case 'internal_notification':
            data = EmailPreviewData.getInternalNotificationData();
            Component = InternalLeadNotificationEmail;
            break;
        
        case 'error_notification':
            data = EmailPreviewData.getErrorNotificationData();
            Component = ErrorNotificationEmail;
            break;
        
        case 'welcome':
            data = EmailPreviewData.getWelcomeData();
            Component = WelcomeEmail;
            break;
        
        default:
            throw new Error(`Unknown template type: ${templateType}`);
    }

    // Render the component
    try {
        const rendered = await render(Component({ data }), {
            pretty: true
        });
        
        if (format === 'text') {
            // Convert HTML to plain text (basic implementation)
            return rendered
                .replace(/<[^>]*>/g, '')
                .replace(/\s+/g, ' ')
                .trim();
        }
        
        return rendered;
    } catch (error) {
        throw new Error(`Failed to render template: ${error}`);
    }
}

/**
 * Preview all templates at once (useful for testing)
 */
export async function previewAllTemplates(): Promise<Record<EmailTemplateType, string>> {
    const templates: EmailTemplateType[] = ['lead_confirmation', 'internal_notification', 'error_notification', 'welcome'];
    const results: Record<string, string> = {};
    
    for (const templateType of templates) {
        try {
            results[templateType] = await previewEmailTemplate(templateType, 'html');
        } catch (error) {
            results[templateType] = `Error rendering template: ${error}`;
        }
    }
    
    return results as Record<EmailTemplateType, string>;
}

/**
 * Validate template rendering with various data scenarios
 */
export async function validateTemplateRendering(templateType: EmailTemplateType): Promise<{
    success: boolean;
    errors: string[];
    warnings: string[];
}> {
    const errors: string[] = [];
    const warnings: string[] = [];
    
    try {
        // Test with normal data
        await previewEmailTemplate(templateType, 'html');
        
        // Test with minimal data (some fields missing)
        const baseData = {
            timestamp: new Date().toISOString(),
            environment: 'development' as const
        };
        
        let minimalData: any = { ...baseData };
        
        switch (templateType) {
            case 'lead_confirmation':
                minimalData = {
                    ...baseData,
                    user: { email: 'test@example.com', phone: '5551234567' },
                    lead: { debtAmount: '10000-15000', debtType: 'credit-cards', submittedAt: new Date().toISOString(), referenceNumber: 'DR-123' },
                    nextSteps: { expectedContactTime: '1 day', contactMethod: 'phone', preparationTips: [] }
                };
                break;
            case 'internal_notification':
                minimalData = {
                    ...baseData,
                    lead: { id: '123', debtAmount: '10000-15000', debtType: 'credit-cards', phone: '5551234567', consentProcessing: true, consentMarketing: false, source: 'form', submittedAt: new Date().toISOString() },
                    priority: 'medium' as const,
                    source: { page: '/test' },
                    metadata: {},
                    actions: { viewLeadUrl: '#', callLeadUrl: '#', emailLeadUrl: '#' }
                };
                break;
            case 'error_notification':
                minimalData = {
                    ...baseData,
                    error: { message: 'Test error', type: 'system_error' as const, severity: 'low' as const },
                    context: {},
                    system: { service: 'test', version: '1.0.0', environment: 'development' as const },
                    actions: { dashboardUrl: '#', logsUrl: '#', documentsUrl: '#' }
                };
                break;
            case 'welcome':
                minimalData = {
                    ...baseData,
                    user: { email: 'test@example.com' },
                    account: { type: 'basic' as const, createdAt: new Date().toISOString(), activationRequired: false },
                    onboarding: { steps: [], estimatedTime: '10 minutes' },
                    resources: { supportUrl: '#', documentationUrl: '#', communityUrl: '#' }
                };
                break;
        }
        
        // Try rendering with minimal data
        try {
            const Component = EMAIL_TEMPLATES[templateType];
            await render(Component({ data: minimalData }));
        } catch (error) {
            warnings.push(`Template may not handle minimal data gracefully: ${error}`);
        }
        
    } catch (error) {
        errors.push(`Failed to render template: ${error}`);
    }
    
    return {
        success: errors.length === 0,
        errors,
        warnings
    };
}

/**
 * Generate sample email data for manual testing
 */
export function generateSampleEmailData(): Record<EmailTemplateType, any> {
    return {
        lead_confirmation: EmailPreviewData.getLeadConfirmationData(),
        internal_notification: EmailPreviewData.getInternalNotificationData(),
        error_notification: EmailPreviewData.getErrorNotificationData(),
        welcome: EmailPreviewData.getWelcomeData()
    };
}

// Export sample data for external use
export const SAMPLE_EMAIL_DATA = generateSampleEmailData();
