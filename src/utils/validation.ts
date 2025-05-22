// Validation schemas for debt relief lead submission
// Using Zod for runtime validation with TypeScript integration and XSS prevention

import { z } from 'zod';

// XSS prevention patterns
const XSS_PATTERNS = [
    /<script[\s\S]*?>[\s\S]*?<\/script>/gi,
    /<iframe[\s\S]*?>[\s\S]*?<\/iframe>/gi,
    /<object[\s\S]*?>[\s\S]*?<\/object>/gi,
    /<embed[\s\S]*?>/gi,
    /<link[\s\S]*?>/gi,
    /<meta[\s\S]*?>/gi,
    /javascript:/gi,
    /vbscript:/gi,
    /data:text\/html/gi,
    /on\w+\s*=/gi,
    /<style[\s\S]*?>[\s\S]*?<\/style>/gi
];

// SQL injection patterns
const SQL_INJECTION_PATTERNS = [
    /(\s*(union|select|insert|update|delete|drop|create|alter|exec|execute)\s+)/gi,
    /(\s*(and|or)\s+\w+\s*=\s*\w+)/gi,
    /('\s*(or|and)\s*')/gi,
    /(--\s*)/g,
    /\/\*[\s\S]*?\*\//g
];

// Custom string validation with XSS and injection prevention
const secureString = (maxLength: number = 255) => 
    z.string()
        .max(maxLength, `Text must be less than ${maxLength} characters`)
        .refine(
            (val) => !XSS_PATTERNS.some(pattern => pattern.test(val)),
            { message: 'Input contains potentially harmful content' }
        )
        .refine(
            (val) => !SQL_INJECTION_PATTERNS.some(pattern => pattern.test(val)),
            { message: 'Input contains potentially harmful content' }
        )
        .transform(val => val.trim());

// Enhanced email validation with additional security checks
const secureEmail = z.string()
    .email('Please enter a valid email address')
    .max(100, 'Email must be less than 100 characters')
    .refine(
        (email) => {
            // Additional email security checks
            const domain = email.split('@')[1];
            if (!domain) return false;
            
            // Check for suspicious domains or patterns
            const suspiciousDomains = ['tempmail', 'throwaway', 'guerrillamail', '10minutemail'];
            const isSuspicious = suspiciousDomains.some(suspicious => 
                domain.toLowerCase().includes(suspicious)
            );
            
            // Allow but log suspicious domains (don't block legitimate users)
            if (isSuspicious) {
                console.warn(`Potentially suspicious email domain: ${domain}`);
            }
            
            return true;
        },
        { message: 'Email address format is not supported' }
    )
    .toLowerCase()
    .transform(email => email.trim());

// Enhanced phone validation with additional security
const securePhone = z.string()
    .transform(val => val.replace(/\D/g, '')) // Strip formatting first
    .refine(
        (phone) => /^[0-9]{10}$/.test(phone),
        { message: 'Phone number must be exactly 10 digits' }
    )
    .refine(
        (phone) => {
            // Check for obviously fake numbers
            const fakePatterns = [
                /^0{10}$/, // All zeros
                /^1{10}$/, // All ones
                /^(\d)\1{9}$/, // All same digit
                /^1234567890$/, // Sequential
                /^5555555555$/ // Common test number
            ];
            
            const isFake = fakePatterns.some(pattern => pattern.test(phone));
            if (isFake) {
                console.warn(`Potentially fake phone number pattern detected`);
            }
            
            return true; // Allow but log for review
        },
        { message: 'Phone number format appears invalid' }
    );

// Enhanced lead submission validation schema with security measures
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
    
    phone: securePhone,
    
    // Optional contact fields (for enhanced forms) with security validation
    firstName: secureString(50)
        .min(1, 'First name is required')
        .optional(),
        
    lastName: secureString(50)
        .min(1, 'Last name is required')
        .optional(),
        
    email: secureEmail
        .optional()
        .or(z.literal('')), // Allow empty string
    
    // GDPR compliance fields
    consentProcessing: z.boolean()
        .refine(val => val === true, {
            message: 'You must consent to data processing to submit this form'
        }),
        
    consentMarketing: z.boolean()
        .default(false),
    
    // Optional metadata with security validation
    source: secureString(50)
        .default('qualification-form')
        .optional(),
        
    notes: secureString(1000)
        .optional(),
    
    // Honeypot fields for bot detection (should be empty)
    website: z.string()
        .max(0, 'This field should be empty')
        .optional()
        .or(z.literal('')),
    
    address2: z.string()
        .max(0, 'This field should be empty')
        .optional()
        .or(z.literal('')),
    
    fax: z.string()
        .max(0, 'This field should be empty')
        .optional()
        .or(z.literal(''))
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

// Additional security validation schemas for API endpoints

// Enhanced CSRF request validation
export const csrfValidationSchema = z.object({
    csrfToken: z.string()
        .min(16, 'CSRF token is required')
        .max(64, 'CSRF token format is invalid')
        .regex(/^[a-zA-Z0-9]+$/, 'CSRF token contains invalid characters'),
    sessionId: z.string()
        .min(16, 'Session ID is required')
        .max(64, 'Session ID format is invalid')
        .regex(/^[a-zA-Z0-9/+=]+$/, 'Session ID contains invalid characters')
});

// Request metadata validation
export const requestMetadataSchema = z.object({
    timestamp: z.string()
        .datetime('Invalid timestamp format')
        .optional()
        .refine(
            (timestamp) => {
                if (!timestamp) return true;
                const requestTime = new Date(timestamp).getTime();
                const now = Date.now();
                const tenMinutes = 10 * 60 * 1000;
                return (now - requestTime) < tenMinutes;
            },
            { message: 'Request is too old and may be replayed' }
        ),
    userAgent: z.string()
        .max(500, 'User agent string is too long')
        .optional(),
    referrer: z.string()
        .url('Invalid referrer URL')
        .optional()
});

// Enhanced file upload validation (for future use)
export const fileUploadSchema = z.object({
    filename: z.string()
        .min(1, 'Filename is required')
        .max(255, 'Filename is too long')
        .refine(
            (filename) => {
                // Check for dangerous file extensions
                const dangerousExtensions = [
                    '.exe', '.bat', '.cmd', '.com', '.pif', '.scr', '.vbs', '.js', 
                    '.jar', '.php', '.asp', '.jsp', '.sh', '.py', '.pl', '.rb'
                ];
                const extension = filename.toLowerCase().substring(filename.lastIndexOf('.'));
                return !dangerousExtensions.includes(extension);
            },
            { message: 'File type is not allowed' }
        )
        .refine(
            (filename) => !filename.includes('..'),
            { message: 'Filename contains invalid path characters' }
        ),
    mimeType: z.string()
        .refine(
            (mimeType) => {
                const allowedTypes = [
                    'image/jpeg', 'image/png', 'image/gif', 'image/webp',
                    'application/pdf', 'text/plain', 'text/csv'
                ];
                return allowedTypes.includes(mimeType);
            },
            { message: 'File type is not supported' }
        ),
    size: z.number()
        .int()
        .min(1, 'File is empty')
        .max(5 * 1024 * 1024, 'File size exceeds 5MB limit') // 5MB limit
});

// API key validation (for future authentication)
export const apiKeySchema = z.string()
    .min(32, 'API key is too short')
    .max(128, 'API key is too long')
    .regex(/^[a-zA-Z0-9_-]+$/, 'API key contains invalid characters');

// Webhook signature validation
export const webhookValidationSchema = z.object({
    signature: z.string()
        .min(10, 'Webhook signature is required')
        .max(256, 'Webhook signature is too long'),
    timestamp: z.string()
        .datetime('Invalid webhook timestamp')
        .refine(
            (timestamp) => {
                const webhookTime = new Date(timestamp).getTime();
                const now = Date.now();
                const fiveMinutes = 5 * 60 * 1000;
                // Webhook should not be older than 5 minutes
                return (now - webhookTime) < fiveMinutes;
            },
            { message: 'Webhook timestamp is too old' }
        ),
    event: z.string()
        .min(1, 'Webhook event type is required')
        .max(100, 'Webhook event type is too long')
        .regex(/^[a-zA-Z0-9._-]+$/, 'Invalid webhook event type format')
});

// IP address validation
export const ipAddressSchema = z.string()
    .refine(
        (ip) => {
            // IPv4 validation
            const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
            // IPv6 validation (basic)
            const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
            return ipv4Regex.test(ip) || ipv6Regex.test(ip) || ip === '127.0.0.1';
        },
        { message: 'Invalid IP address format' }
    );

// Enhanced security validation function for API requests
export function validateSecurityContext(request: Request): {
    success: boolean;
    issues: string[];
    riskLevel: 'low' | 'medium' | 'high';
} {
    const issues: string[] = [];
    let riskLevel: 'low' | 'medium' | 'high' = 'low';

    // Check user agent
    const userAgent = request.headers.get('user-agent') || '';
    if (!userAgent) {
        issues.push('Missing user agent');
        riskLevel = 'medium';
    } else if (userAgent.length < 20) {
        issues.push('Suspicious user agent');
        riskLevel = 'medium';
    }

    // Check for bot patterns
    const botPatterns = [
        /bot/i, /crawler/i, /spider/i, /scraper/i, /curl/i, 
        /wget/i, /python/i, /postman/i, /insomnia/i
    ];
    
    if (botPatterns.some(pattern => pattern.test(userAgent))) {
        issues.push('Bot-like user agent detected');
        riskLevel = 'high';
    }

    // Check referer for reasonable origin
    const referer = request.headers.get('referer');
    const origin = request.headers.get('origin');
    
    if (request.method === 'POST' && !referer && !origin) {
        issues.push('Missing referer and origin headers');
        riskLevel = 'medium';
    }

    // Check for common attack headers
    const suspiciousHeaders = ['x-forwarded-host', 'x-original-url', 'x-rewrite-url'];
    for (const header of suspiciousHeaders) {
        if (request.headers.get(header)) {
            issues.push(`Suspicious header detected: ${header}`);
            riskLevel = 'high';
        }
    }

    // Check content length for reasonable size
    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > 10 * 1024 * 1024) { // 10MB
        issues.push('Unusually large request body');
        riskLevel = 'high';
    }

    return {
        success: issues.length === 0,
        issues,
        riskLevel
    };
}

// Validation error formatter
export function formatValidationErrors(errors: z.ZodError): Record<string, string> {
    const formatted: Record<string, string> = {};
    
    errors.errors.forEach(error => {
        const path = error.path.join('.');
        formatted[path] = error.message;
    });
    
    return formatted;
}

// Advanced input sanitization beyond basic XSS protection
export function advancedSanitization(input: string, options: {
    allowLineBreaks?: boolean;
    allowBasicMarkdown?: boolean;
    maxConsecutiveSpaces?: number;
} = {}): string {
    const { 
        allowLineBreaks = false, 
        allowBasicMarkdown = false,
        maxConsecutiveSpaces = 2
    } = options;

    let sanitized = input.trim();

    // Remove null bytes and control characters
    sanitized = sanitized.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');

    // Normalize unicode characters to prevent bypasses
    sanitized = sanitized.normalize('NFKC');

    // Remove excessive whitespace
    if (!allowLineBreaks) {
        sanitized = sanitized.replace(/\n/g, ' ');
    }
    
    // Limit consecutive spaces
    const spaceRegex = new RegExp(`\\s{${maxConsecutiveSpaces + 1},}`, 'g');
    sanitized = sanitized.replace(spaceRegex, ' '.repeat(maxConsecutiveSpaces));

    // If markdown is allowed, preserve basic formatting
    if (!allowBasicMarkdown) {
        sanitized = sanitized.replace(/[*_`#]/g, '');
    }

    // Remove any remaining HTML entities that might be used for bypasses
    sanitized = sanitized
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#x?[0-9a-f]+;/gi, '');

    return sanitized;
}
