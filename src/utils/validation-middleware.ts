// Validation middleware for API endpoints
// Provides comprehensive input validation and sanitization across all API routes

import type { APIRoute } from 'astro';
import { z } from 'zod';
import { InputSanitizer, SecurityValidator } from './security';

// Enhanced XSS prevention patterns (more comprehensive than existing)
const ENHANCED_XSS_PATTERNS = [
    // Script tags with various encodings
    /<script[\s\S]*?>[\s\S]*?<\/script>/gi,
    /&lt;script[\s\S]*?&gt;[\s\S]*?&lt;\/script&gt;/gi,
    /%3Cscript[\s\S]*?%3E[\s\S]*?%3C\/script%3E/gi,
    
    // Event handlers (more comprehensive)
    /on\w+\s*=\s*["\'][^"\']*["\']*/gi,
    /on\w+\s*=\s*[^>\s]*/gi,
    
    // Javascript and VBScript URLs
    /javascript\s*:/gi,
    /vbscript\s*:/gi,
    /data\s*:\s*text\/html/gi,
    
    // Dangerous HTML tags
    /<(?:iframe|object|embed|applet|form|meta|link|base)[\s\S]*?>/gi,
    
    // Style injection
    /<style[\s\S]*?>[\s\S]*?<\/style>/gi,
    /style\s*=\s*["\'][^"\']*expression\s*\([^"\']*["\']*/gi,
    
    // SVG-based XSS
    /<svg[\s\S]*?>[\s\S]*?<\/svg>/gi,
    
    // Comments that might hide malicious code
    /<!--[\s\S]*?-->/gi,
    
    // Data URI with dangerous MIME types
    /data\s*:\s*(?:text\/html|application\/x-javascript|text\/javascript)/gi
];

// Enhanced SQL injection patterns
const ENHANCED_SQL_PATTERNS = [
    // Common SQL keywords
    /(\b(?:union|select|insert|update|delete|drop|create|alter|exec|execute|declare|cast|convert)\b)/gi,
    
    // Boolean-based injections
    /(\b(?:and|or)\s+(?:\d+\s*=\s*\d+|true|false|\d+\s*[<>=]\s*\d+))/gi,
    
    // Comment patterns
    /(--\s*|\/\*[\s\S]*?\*\/)/g,
    
    // String concatenation
    /('\s*\+\s*'|"\s*\+\s*")/gi,
    
    // Function calls
    /(\b(?:char|ascii|substring|length|count|sum|avg|min|max)\s*\()/gi,
    
    // Hex/binary injections
    /(0x[0-9a-f]+|binary\s*')/gi
];

// Command injection patterns
const COMMAND_INJECTION_PATTERNS = [
    // Command separators
    /[;&|`$(){}[\]]/g,
    
    // Common shell commands
    /\b(?:cat|ls|dir|ps|whoami|id|pwd|uname|ping|nslookup|wget|curl|nc|netcat|rm|del|format|fdisk)\b/gi,
    
    // Environment variables
    /\$\w+|\$\{[^}]*\}/g,
    
    // Command substitution
    /`[^`]*`|\$\([^)]*\)/g
];

// LDAP injection patterns
const LDAP_INJECTION_PATTERNS = [
    /[()&|!*]/g,
    /\\[0-9a-fA-F]{2}/g
];

// Enhanced input validation with multiple security layers
export class ValidationMiddleware {
    
    // Comprehensive sanitization function
    static sanitizeInput(input: any, options: {
        allowHtml?: boolean;
        maxLength?: number;
        trimWhitespace?: boolean;
        preventXss?: boolean;
        preventSqlInjection?: boolean;
        preventCommandInjection?: boolean;
        preventLdapInjection?: boolean;
    } = {}): any {
        const {
            allowHtml = false,
            maxLength = 10000,
            trimWhitespace = true,
            preventXss = true,
            preventSqlInjection = true,
            preventCommandInjection = true,
            preventLdapInjection = true
        } = options;

        if (typeof input !== 'string') {
            return input;
        }

        let sanitized = input;

        // Trim whitespace
        if (trimWhitespace) {
            sanitized = sanitized.trim();
        }

        // Length check
        if (sanitized.length > maxLength) {
            throw new Error(`Input exceeds maximum length of ${maxLength} characters`);
        }

        // XSS prevention
        if (preventXss) {
            for (const pattern of ENHANCED_XSS_PATTERNS) {
                if (pattern.test(sanitized)) {
                    throw new Error('Input contains potentially dangerous content (XSS)');
                }
            }
            
            if (!allowHtml) {
                // Remove all HTML tags if not allowed
                sanitized = sanitized.replace(/<[^>]*>/g, '');
            }
        }

        // SQL injection prevention
        if (preventSqlInjection) {
            for (const pattern of ENHANCED_SQL_PATTERNS) {
                if (pattern.test(sanitized)) {
                    throw new Error('Input contains potentially dangerous content (SQL)');
                }
            }
        }

        // Command injection prevention
        if (preventCommandInjection) {
            for (const pattern of COMMAND_INJECTION_PATTERNS) {
                if (pattern.test(sanitized)) {
                    throw new Error('Input contains potentially dangerous content (Command)');
                }
            }
        }

        // LDAP injection prevention
        if (preventLdapInjection) {
            for (const pattern of LDAP_INJECTION_PATTERNS) {
                if (pattern.test(sanitized)) {
                    throw new Error('Input contains potentially dangerous content (LDAP)');
                }
            }
        }

        return sanitized;
    }

    // Deep sanitization for objects and arrays
    static sanitizeObject<T extends Record<string, any>>(
        obj: T, 
        sanitizationOptions: Parameters<typeof ValidationMiddleware.sanitizeInput>[1] = {}
    ): T {
        const sanitized = {} as T;

        for (const [key, value] of Object.entries(obj)) {
            try {
                if (typeof value === 'string') {
                    sanitized[key as keyof T] = this.sanitizeInput(value, sanitizationOptions) as T[keyof T];
                } else if (Array.isArray(value)) {
                    sanitized[key as keyof T] = value.map(item => 
                        typeof item === 'string' ? this.sanitizeInput(item, sanitizationOptions) : item
                    ) as T[keyof T];
                } else if (typeof value === 'object' && value !== null) {
                    sanitized[key as keyof T] = this.sanitizeObject(value, sanitizationOptions);
                } else {
                    sanitized[key as keyof T] = value;
                }
            } catch (error) {
                throw new Error(`Validation error in field '${key}': ${error instanceof Error ? error.message : 'Unknown error'}`);
            }
        }

        return sanitized;
    }

    // Rate limiting validation
    static validateRateLimit(remainingRequests: number): void {
        if (remainingRequests <= 0) {
            throw new Error('Rate limit exceeded');
        }
    }
}

// Validation middleware factory
export function withValidation<T extends z.ZodSchema>(
    schema: T,
    options: {
        sanitizationOptions?: Parameters<typeof ValidationMiddleware.sanitizeInput>[1];
        skipSanitization?: boolean;
        customValidation?: (data: z.infer<T>) => Promise<void> | void;
    } = {}
) {
    return function(handler: APIRoute): APIRoute {
        return async (context) => {
            const { request } = context;
            const requestId = `val_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

            try {
                // Skip validation for GET requests unless explicitly required
                if (request.method === 'GET') {
                    return handler(context);
                }

                // Parse request body
                let body: unknown;
                try {
                    const contentType = request.headers.get('content-type') || '';
                    
                    if (contentType.includes('application/json')) {
                        body = await request.json();
                    } else if (contentType.includes('application/x-www-form-urlencoded')) {
                        const formData = await request.formData();
                        body = Object.fromEntries(formData.entries());
                    } else {
                        body = await request.text();
                    }
                } catch (error) {
                    console.error(`[${requestId}] Request parsing error:`, error);
                    return new Response(
                        JSON.stringify({
                            success: false,
                            message: 'Invalid request format',
                            errors: { general: 'Unable to parse request body' },
                            requestId
                        }),
                        {
                            status: 400,
                            headers: { 'Content-Type': 'application/json' }
                        }
                    );
                }

                // Sanitize input if not skipped
                if (!options.skipSanitization && typeof body === 'object' && body !== null) {
                    try {
                        body = ValidationMiddleware.sanitizeObject(
                            body as Record<string, any>, 
                            options.sanitizationOptions
                        );
                    } catch (sanitizationError) {
                        console.warn(`[${requestId}] Sanitization error:`, sanitizationError);
                        return new Response(
                            JSON.stringify({
                                success: false,
                                message: 'Input validation failed',
                                errors: { 
                                    general: sanitizationError instanceof Error ? 
                                        sanitizationError.message : 
                                        'Input contains invalid content' 
                                },
                                requestId
                            }),
                            {
                                status: 400,
                                headers: { 'Content-Type': 'application/json' }
                            }
                        );
                    }
                }

                // Validate against schema
                const validation = schema.safeParse(body);
                if (!validation.success) {
                    const errors: Record<string, string> = {};
                    validation.error.errors.forEach(err => {
                        const path = err.path.join('.');
                        errors[path] = err.message;
                    });

                    console.warn(`[${requestId}] Schema validation failed:`, errors);
                    return new Response(
                        JSON.stringify({
                            success: false,
                            message: 'Validation failed',
                            errors,
                            requestId
                        }),
                        {
                            status: 400,
                            headers: { 'Content-Type': 'application/json' }
                        }
                    );
                }

                // Run custom validation if provided
                if (options.customValidation) {
                    try {
                        await options.customValidation(validation.data);
                    } catch (customError) {
                        console.warn(`[${requestId}] Custom validation failed:`, customError);
                        return new Response(
                            JSON.stringify({
                                success: false,
                                message: 'Validation failed',
                                errors: { 
                                    general: customError instanceof Error ? 
                                        customError.message : 
                                        'Custom validation failed' 
                                },
                                requestId
                            }),
                            {
                                status: 400,
                                headers: { 'Content-Type': 'application/json' }
                            }
                        );
                    }
                }

                // Add validated data to context for the handler
                (context as any).validatedData = validation.data;
                (context as any).requestId = requestId;

                return handler(context);

            } catch (error) {
                console.error(`[${requestId}] Validation middleware error:`, error);
                return new Response(
                    JSON.stringify({
                        success: false,
                        message: 'Validation processing failed',
                        errors: { general: 'Internal validation error' },
                        requestId
                    }),
                    {
                        status: 500,
                        headers: { 'Content-Type': 'application/json' }
                    }
                );
            }
        };
    };
}

// Specific validation schemas for different endpoint types
export const commonApiSchemas = {
    // Generic request with common security checks
    secureRequest: z.object({
        // Honeypot fields
        website: z.string().max(0).optional(),
        url: z.string().max(0).optional(),
        honeypot: z.string().max(0).optional(),
        
        // Timestamp validation (requests shouldn't be too old)
        timestamp: z.string()
            .optional()
            .refine(
                (timestamp) => {
                    if (!timestamp) return true;
                    const requestTime = new Date(timestamp).getTime();
                    const now = Date.now();
                    const fiveMinutes = 5 * 60 * 1000;
                    return (now - requestTime) < fiveMinutes;
                },
                { message: 'Request timestamp is too old' }
            )
    }),

    // CSRF token validation
    csrfRequest: z.object({
        csrfToken: z.string()
            .min(16, 'CSRF token is required')
            .max(64, 'CSRF token is invalid'),
        sessionId: z.string()
            .min(16, 'Session ID is required')
            .max(64, 'Session ID is invalid')
    }),

    // Pagination validation
    paginationRequest: z.object({
        page: z.number().int().min(1).max(1000).default(1),
        limit: z.number().int().min(1).max(100).default(20),
        sortBy: z.string().max(50).optional(),
        sortOrder: z.enum(['asc', 'desc']).default('desc')
    }),

    // Search validation
    searchRequest: z.object({
        query: z.string()
            .min(1, 'Search query is required')
            .max(200, 'Search query is too long')
            .refine(
                (query) => !ENHANCED_XSS_PATTERNS.some(pattern => pattern.test(query)),
                { message: 'Search query contains invalid characters' }
            ),
        filters: z.record(z.string().max(100)).optional()
    })
};

// Export enhanced validation utilities
export { ENHANCED_XSS_PATTERNS, ENHANCED_SQL_PATTERNS, COMMAND_INJECTION_PATTERNS, LDAP_INJECTION_PATTERNS };
