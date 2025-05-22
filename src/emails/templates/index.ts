/**
 * Email Templates Index
 * 
 * Centralized exports for all email templates used in the debt relief system.
 * This makes it easy to import templates throughout the application.
 */

// Template Components
export { default as LeadConfirmationEmail } from './LeadConfirmationEmail';
export { default as InternalLeadNotificationEmail } from './InternalLeadNotificationEmail';
export { default as ErrorNotificationEmail } from './ErrorNotificationEmail';
export { default as WelcomeEmail } from './WelcomeEmail';

// Base Layout Component
export { default as BaseEmailLayout } from '../components/BaseEmailLayout';

// Type Definitions
export * from '../types';

// Template Registry for Dynamic Rendering
export const EMAIL_TEMPLATES = {
    lead_confirmation: LeadConfirmationEmail,
    internal_notification: InternalLeadNotificationEmail,
    error_notification: ErrorNotificationEmail,
    welcome: WelcomeEmail
} as const;

// Template Type Union
export type EmailTemplateType = keyof typeof EMAIL_TEMPLATES;

// Template Metadata for Configuration
export interface EmailTemplateMetadata {
    name: string;
    description: string;
    category: 'user' | 'internal' | 'system';
    priority: 'low' | 'medium' | 'high' | 'critical';
    trackingEnabled: boolean;
    previewText?: string;
}

export const EMAIL_TEMPLATE_METADATA: Record<EmailTemplateType, EmailTemplateMetadata> = {
    lead_confirmation: {
        name: 'Lead Confirmation',
        description: 'Sent to users who submit debt relief forms',
        category: 'user',
        priority: 'high',
        trackingEnabled: true,
        previewText: 'Thank you for your debt relief inquiry. Your submission has been received.'
    },
    internal_notification: {
        name: 'Internal Lead Notification',
        description: 'Sent to the debt relief team for new leads',
        category: 'internal',
        priority: 'high',
        trackingEnabled: false
    },
    error_notification: {
        name: 'Error Notification',
        description: 'Sent to administrators when system errors occur',
        category: 'system',
        priority: 'critical',
        trackingEnabled: false
    },
    welcome: {
        name: 'Welcome Email',
        description: 'Sent to new users after account registration',
        category: 'user',
        priority: 'medium',
        trackingEnabled: true,
        previewText: 'Welcome to Debt Relief! Your journey to financial freedom starts here.'
    }
};

// Helper function to get template component by type
export function getEmailTemplate(templateType: EmailTemplateType) {
    const template = EMAIL_TEMPLATES[templateType];
    if (!template) {
        throw new Error(`Email template "${templateType}" not found`);
    }
    return template;
}

// Helper function to get template metadata
export function getEmailTemplateMetadata(templateType: EmailTemplateType): EmailTemplateMetadata {
    const metadata = EMAIL_TEMPLATE_METADATA[templateType];
    if (!metadata) {
        throw new Error(`Email template metadata for "${templateType}" not found`);
    }
    return metadata;
}

// Template validation function
export function validateTemplateData(templateType: EmailTemplateType, data: any): boolean {
    // Basic validation - this could be expanded with more sophisticated validation
    if (!data || typeof data !== 'object') {
        return false;
    }

    // Check for required base fields
    if (!data.timestamp || !data.environment) {
        return false;
    }

    // Type-specific validation
    switch (templateType) {
        case 'lead_confirmation':
            return !!(data.user && data.lead && data.nextSteps);
        
        case 'internal_notification':
            return !!(data.lead && data.priority && data.source && data.metadata && data.actions);
        
        case 'error_notification':
            return !!(data.error && data.context && data.system && data.actions);
        
        case 'welcome':
            return !!(data.user && data.account && data.onboarding && data.resources);
        
        default:
            return false;
    }
}

// Template usage tracking interface (for analytics)
export interface EmailTemplateUsage {
    templateType: EmailTemplateType;
    sentAt: string;
    recipientEmail: string;
    success: boolean;
    errorMessage?: string;
    metadata?: Record<string, any>;
}

// Default sender information (can be overridden per template)
export const DEFAULT_SENDER = {
    name: 'Debt Relief Team',
    email: 'noreply@yourdomain.com'
};

// Subject line templates
export const EMAIL_SUBJECTS: Record<EmailTemplateType, string> = {
    lead_confirmation: 'Your Debt Relief Inquiry - Confirmation & Next Steps',
    internal_notification: 'New Lead Alert: {{priority}} Priority - {{debtAmount}}',
    error_notification: '🚨 System Error Alert: {{severity}} - {{service}}',
    welcome: 'Welcome to Debt Relief - Let\'s Get Started! 🎉'
};

// Helper function to generate subject line with variable substitution
export function generateEmailSubject(
    templateType: EmailTemplateType, 
    variables: Record<string, string> = {}
): string {
    let subject = EMAIL_SUBJECTS[templateType];
    
    // Simple variable substitution
    Object.entries(variables).forEach(([key, value]) => {
        subject = subject.replace(new RegExp(`{{${key}}}`, 'g'), value);
    });
    
    return subject;
}

// Export all template-related utilities
export {
    // Re-export types for convenience
    type LeadConfirmationEmailData,
    type InternalLeadNotificationEmailData,
    type ErrorNotificationEmailData,
    type WelcomeEmailData,
    type BaseEmailData,
    type LeadData,
    type UserData,
    type EmailTrackingData
} from '../types';
