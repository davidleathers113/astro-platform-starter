/**
 * Email Template Data Types
 * 
 * TypeScript interfaces for all email template data structures
 * used in the debt relief system.
 */

// Base interface for all email data
export interface BaseEmailData {
    timestamp: string;
    environment: 'development' | 'production';
}

// Lead submission data from forms
export interface LeadData {
    id: string;
    debtAmount: string;
    debtType: string;
    phone: string;
    consentProcessing: boolean;
    consentMarketing: boolean;
    source: string;
    ipAddress?: string;
    userAgent?: string;
    submittedAt: string;
}

// User information for personalization
export interface UserData {
    id?: string;
    firstName?: string;
    lastName?: string;
    email: string;
    phone?: string;
    createdAt?: string;
}

// Lead confirmation email data
export interface LeadConfirmationEmailData extends BaseEmailData {
    user: {
        firstName?: string;
        email: string;
        phone: string;
    };
    lead: {
        debtAmount: string;
        debtType: string;
        submittedAt: string;
        referenceNumber: string;
    };
    nextSteps: {
        expectedContactTime: string;
        contactMethod: string;
        preparationTips: string[];
    };
}

// Internal notification email data
export interface InternalLeadNotificationEmailData extends BaseEmailData {
    lead: LeadData;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    source: {
        page: string;
        campaign?: string;
        referrer?: string;
    };
    metadata: {
        ipAddress?: string;
        userAgent?: string;
        location?: {
            city?: string;
            state?: string;
            country?: string;
        };
    };
    actions: {
        viewLeadUrl: string;
        callLeadUrl: string;
        emailLeadUrl: string;
    };
}

// Error notification email data
export interface ErrorNotificationEmailData extends BaseEmailData {
    error: {
        message: string;
        stack?: string;
        code?: string;
        type: 'api_error' | 'database_error' | 'email_error' | 'validation_error' | 'system_error';
        severity: 'low' | 'medium' | 'high' | 'critical';
    };
    context: {
        endpoint?: string;
        method?: string;
        userId?: string;
        leadId?: string;
        requestId?: string;
        userAgent?: string;
        ipAddress?: string;
    };
    system: {
        service: string;
        version: string;
        environment: 'development' | 'production';
        hostname?: string;
    };
    actions: {
        dashboardUrl: string;
        logsUrl: string;
        documentsUrl: string;
    };
}

// Welcome email data
export interface WelcomeEmailData extends BaseEmailData {
    user: UserData;
    account: {
        type: 'basic' | 'premium';
        createdAt: string;
        activationRequired: boolean;
        activationUrl?: string;
    };
    onboarding: {
        steps: Array<{
            title: string;
            description: string;
            url: string;
            completed: boolean;
        }>;
        estimatedTime: string;
    };
    resources: {
        supportUrl: string;
        documentationUrl: string;
        communityUrl: string;
    };
}

// Email tracking data
export interface EmailTrackingData {
    emailId: string;
    templateType: 'lead_confirmation' | 'internal_notification' | 'error_notification' | 'welcome';
    recipientEmail: string;
    userId?: string;
    leadId?: string;
    sentAt: string;
    clickTrackingEnabled: boolean;
    openTrackingEnabled: boolean;
}

// Helper types for form processing
export type DebtAmountRange = '10000-15000' | '15000-25000' | '25000-50000' | '50000+';
export type DebtType = 'credit-cards' | 'personal-loans' | 'medical' | 'mixed';
export type FormSource = 'qualification-form' | 'full-form' | 'landing-page' | 'api';

// Utility functions for type processing
export const debtAmountDisplayMap: Record<DebtAmountRange, string> = {
    '10000-15000': '$10,000 - $15,000',
    '15000-25000': '$15,000 - $25,000',
    '25000-50000': '$25,000 - $50,000',
    '50000+': '$50,000+'
};

export const debtTypeDisplayMap: Record<DebtType, string> = {
    'credit-cards': 'Credit Cards',
    'personal-loans': 'Personal Loans',
    'medical': 'Medical Debt',
    'mixed': 'Mixed Unsecured Debt'
};

// Priority calculation helpers
export function calculateLeadPriority(lead: LeadData): 'low' | 'medium' | 'high' | 'urgent' {
    const debtAmount = lead.debtAmount as DebtAmountRange;
    const hasMarketing = lead.consentMarketing;
    
    // Higher debt amounts get higher priority
    if (debtAmount === '50000+') {
        return hasMarketing ? 'urgent' : 'high';
    } else if (debtAmount === '25000-50000') {
        return hasMarketing ? 'high' : 'medium';
    } else if (debtAmount === '15000-25000') {
        return hasMarketing ? 'medium' : 'low';
    } else {
        return 'low';
    }
}

// Expected contact time calculation
export function calculateExpectedContactTime(priority: string): string {
    switch (priority) {
        case 'urgent':
            return 'within 1 business hour';
        case 'high':
            return 'within 4 business hours';
        case 'medium':
            return 'within 1 business day';
        case 'low':
        default:
            return 'within 2 business days';
    }
}

// Format phone number for display
export function formatPhoneForDisplay(phone: string): string {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    return phone;
}

// Generate reference number for leads
export function generateReferenceNumber(leadId: string): string {
    const timestamp = Date.now().toString(36).toUpperCase();
    const leadPrefix = leadId.slice(-4).toUpperCase();
    return `DR-${timestamp}-${leadPrefix}`;
}
