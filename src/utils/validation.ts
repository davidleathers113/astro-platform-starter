// Validation schemas for debt relief lead submission
// Using Zod for runtime validation with TypeScript integration

import { z } from 'zod';

// Lead submission validation schema
export const leadSubmissionSchema = z.object({
    // Required form fields from qualification form
    debtAmount: z.enum(['10000-15000', '15000-25000', '25000-50000', '50000+'], {
        required_error: 'Please select your debt amount',
        invalid_type_error: 'Invalid debt amount selection'
    }),
    
    debtType: z.enum(['credit-cards', 'personal-loans', 'medical', 'mixed'], {
        required_error: 'Please select your debt type',
        invalid_type_error: 'Invalid debt type selection'
    }),
    
    phone: z.string()
        .regex(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
        .transform(val => val.replace(/\D/g, '')), // Strip any formatting
    
    // Optional contact fields (for enhanced forms)
    firstName: z.string()
        .min(1, 'First name is required')
        .max(50, 'First name must be less than 50 characters')
        .trim()
        .optional(),
        
    lastName: z.string()
        .min(1, 'Last name is required')
        .max(50, 'Last name must be less than 50 characters')
        .trim()
        .optional(),
        
    email: z.string()
        .email('Please enter a valid email address')
        .max(100, 'Email must be less than 100 characters')
        .toLowerCase()
        .optional()
        .or(z.literal('')), // Allow empty string
    
    // GDPR compliance fields
    consentProcessing: z.boolean()
        .refine(val => val === true, {
            message: 'You must consent to data processing to submit this form'
        }),
        
    consentMarketing: z.boolean()
        .default(false),
    
    // Optional metadata
    source: z.string()
        .max(50, 'Source must be less than 50 characters')
        .default('qualification-form')
        .optional(),
        
    notes: z.string()
        .max(1000, 'Notes must be less than 1000 characters')
        .optional()
});

// Type inference from the schema
export type LeadSubmission = z.infer<typeof leadSubmissionSchema>;

// Response schemas for API endpoints
export const leadResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    leadId: z.string().uuid().optional(),
    errors: z.record(z.string()).optional()
});

export type LeadResponse = z.infer<typeof leadResponseSchema>;

// Rate limit response schema
export const rateLimitResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    retryAfter: z.number().optional() // seconds until rate limit resets
});

export type RateLimitResponse = z.infer<typeof rateLimitResponseSchema>;

// Database health check schema
export const healthCheckSchema = z.object({
    success: z.boolean(),
    database: z.object({
        connected: z.boolean(),
        size: z.string(),
        sizeBytes: z.number(),
        freeTierStatus: z.string(),
        percentUsed: z.number()
    }).optional(),
    timestamp: z.string().datetime()
});

export type HealthCheck = z.infer<typeof healthCheckSchema>;

// GDPR data export schema
export const dataExportRequestSchema = z.object({
    email: z.string()
        .email('Please provide a valid email address')
        .optional(),
    phone: z.string()
        .regex(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
        .optional()
}).refine(
    data => data.email || data.phone,
    {
        message: 'Either email or phone number must be provided',
        path: ['email'] // Show error on email field
    }
);

export type DataExportRequest = z.infer<typeof dataExportRequestSchema>;

// Data deletion request schema (GDPR Right to be Forgotten)
export const dataDeletionRequestSchema = z.object({
    email: z.string()
        .email('Please provide a valid email address')
        .optional(),
    phone: z.string()
        .regex(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
        .optional(),
    confirmDeletion: z.boolean()
        .refine(val => val === true, {
            message: 'You must confirm the deletion request'
        })
}).refine(
    data => data.email || data.phone,
    {
        message: 'Either email or phone number must be provided',
        path: ['email']
    }
);

export type DataDeletionRequest = z.infer<typeof dataDeletionRequestSchema>;

// Validation helper functions
export function validateLeadSubmission(data: unknown): {
    success: boolean;
    data?: LeadSubmission;
    errors?: Record<string, string>;
} {
    try {
        const validated = leadSubmissionSchema.parse(data);
        return { success: true, data: validated };
    } catch (error) {
        if (error instanceof z.ZodError) {
            const errors: Record<string, string> = {};
            error.errors.forEach(err => {
                const path = err.path.join('.');
                errors[path] = err.message;
            });
            return { success: false, errors };
        }
        return { 
            success: false, 
            errors: { general: 'Validation failed' } 
        };
    }
}

// Phone number formatting utility
export function formatPhoneForDisplay(phone: string): string {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    return phone;
}

// Phone number cleaning utility (remove all formatting)
export function cleanPhoneNumber(phone: string): string {
    return phone.replace(/\D/g, '');
}

// Email validation utility
export function isValidEmail(email: string): boolean {
    try {
        z.string().email().parse(email);
        return true;
    } catch {
        return false;
    }
}
