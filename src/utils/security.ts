// Security utilities and middleware for enhanced protection
// Provides security headers, input sanitization, and security checks

import type { APIRoute } from 'astro';

// Security headers configuration
export const SECURITY_HEADERS = {
    // Prevent clickjacking attacks
    'X-Frame-Options': 'DENY',
    
    // Prevent MIME type sniffing
    'X-Content-Type-Options': 'nosniff',
    
    // Enable XSS protection (legacy but still useful)
    'X-XSS-Protection': '1; mode=block',
    
    // Referrer policy for privacy
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    
    // Prevent Adobe Flash and PDF from loading
    'X-Permitted-Cross-Domain-Policies': 'none',
    
    // HSTS for HTTPS enforcement (only in production)
    ...(import.meta.env.PROD ? {
        'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload'
    } : {}),
    
    // Content Security Policy
    'Content-Security-Policy': [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' cdnjs.cloudflare.com",
        "style-src 'self' 'unsafe-inline' fonts.googleapis.com",
        "font-src 'self' fonts.gstatic.com",
        "img-src 'self' data: https:",
        "connect-src 'self'",
        "frame-src 'none'",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'"
    ].join('; ')
};

// Security middleware wrapper for API routes
export function withSecurityHeaders(handler: APIRoute): APIRoute {
    return async (context) => {
        const response = await handler(context);
        
        // Add security headers to response
        Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
            response.headers.set(key, value);
        });
        
        return response;
    };
}

// Input sanitization utilities
export class InputSanitizer {
    // Remove potential XSS vectors from strings
    static sanitizeString(input: string): string {
        if (typeof input !== 'string') {
            return '';
        }
        
        return input
            .trim()
            // Remove HTML tags
            .replace(/<[^>]*>/g, '')
            // Remove javascript: URLs
            .replace(/javascript:/gi, '')
            // Remove vbscript: URLs
            .replace(/vbscript:/gi, '')
            // Remove data: URLs (except safe ones)
            .replace(/data:(?!image\/(png|jpg|jpeg|gif|webp|svg\+xml))[^,]*,/gi, '')
            // Remove event handlers
            .replace(/on\w+\s*=/gi, '')
            // Normalize whitespace
            .replace(/\s+/g, ' ')
            .trim();
    }
    
    // Sanitize phone numbers (keep only digits)
    static sanitizePhone(input: string): string {
        if (typeof input !== 'string') {
            return '';
        }
        
        return input.replace(/\D/g, '');
    }
    
    // Sanitize email addresses
    static sanitizeEmail(input: string): string {
        if (typeof input !== 'string') {
            return '';
        }
        
        return input
            .toLowerCase()
            .trim()
            .replace(/[<>]/g, ''); // Remove angle brackets
    }
    
    // Sanitize text content (more permissive for notes/comments)
    static sanitizeText(input: string): string {
        if (typeof input !== 'string') {
            return '';
        }
        
        return input
            .trim()
            // Remove script tags completely
            .replace(/<script[^>]*>.*?<\/script>/gis, '')
            // Remove dangerous HTML tags but allow basic formatting
            .replace(/<(?!\/?(p|br|strong|b|em|i|u)\b)[^>]*>/gi, '')
            // Remove javascript: and vbscript: URLs
            .replace(/(javascript|vbscript):/gi, '')
            // Remove event handlers
            .replace(/on\w+\s*=/gi, '')
            // Normalize whitespace but preserve line breaks
            .replace(/[ \t]+/g, ' ')
            .replace(/\n\s*\n/g, '\n\n');
    }
    
    // Sanitize object recursively
    static sanitizeObject<T extends Record<string, any>>(obj: T): T {
        const sanitized = {} as T;
        
        for (const [key, value] of Object.entries(obj)) {
            if (typeof value === 'string') {
                sanitized[key as keyof T] = this.sanitizeString(value) as T[keyof T];
            } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                sanitized[key as keyof T] = this.sanitizeObject(value);
            } else {
                sanitized[key as keyof T] = value;
            }
        }
        
        return sanitized;
    }
}

// Rate limiting utilities (enhanced from existing implementation)
export interface RateLimitOptions {
    maxRequests: number;
    windowMinutes: number;
    skipSuccessfulRequests?: boolean;
    keyGenerator?: (request: Request) => string;
}

export function createRateLimitKey(request: Request, endpoint: string): string {
    const ip = getClientIP(request);
    return `${ip}:${endpoint}`;
}

// Enhanced rate limiting with different strategies
export class RateLimiter {
    private static limits = new Map<string, { count: number; resetTime: number }>();
    
    static check(
        key: string, 
        options: RateLimitOptions
    ): { allowed: boolean; remaining: number; resetTime: number } {
        const now = Date.now();
        const windowMs = options.windowMinutes * 60 * 1000;
        
        // Clean up expired entries
        this.cleanup();
        
        const record = this.limits.get(key);
        
        if (!record || record.resetTime <= now) {
            // No record or expired, create new window
            const resetTime = now + windowMs;
            this.limits.set(key, { count: 1, resetTime });
            return {
                allowed: true,
                remaining: options.maxRequests - 1,
                resetTime
            };
        }
        
        if (record.count >= options.maxRequests) {
            return {
                allowed: false,
                remaining: 0,
                resetTime: record.resetTime
            };
        }
        
        // Increment count
        record.count++;
        return {
            allowed: true,
            remaining: options.maxRequests - record.count,
            resetTime: record.resetTime
        };
    }
    
    private static cleanup(): void {
        const now = Date.now();
        for (const [key, record] of this.limits.entries()) {
            if (record.resetTime <= now) {
                this.limits.delete(key);
            }
        }
    }
}

// Get client IP address (duplicate from supabase.ts for independence)
export function getClientIP(request: Request): string {
    const forwardedFor = request.headers.get('x-forwarded-for');
    if (forwardedFor) {
        return forwardedFor.split(',')[0].trim();
    }
    
    const realIP = request.headers.get('x-real-ip');
    if (realIP) {
        return realIP;
    }
    
    const cfConnectingIP = request.headers.get('cf-connecting-ip');
    if (cfConnectingIP) {
        return cfConnectingIP;
    }
    
    return '127.0.0.1';
}

// Security validation helpers
export class SecurityValidator {
    // Check if request appears to be automated/bot
    static isLikelyBot(request: Request): boolean {
        const userAgent = request.headers.get('user-agent') || '';
        
        // Check for common bot patterns
        const botPatterns = [
            /bot/i,
            /crawler/i,
            /spider/i,
            /scraper/i,
            /curl/i,
            /wget/i,
            /python/i,
            /postman/i
        ];
        
        return botPatterns.some(pattern => pattern.test(userAgent));
    }
    
    // Check for suspicious request patterns
    static hasSuspiciousContent(data: any): boolean {
        const content = JSON.stringify(data).toLowerCase();
        
        const suspiciousPatterns = [
            /<script/,
            /javascript:/,
            /vbscript:/,
            /onload=/,
            /onerror=/,
            /eval\(/,
            /function\(/,
            /document\./,
            /window\./
        ];
        
        return suspiciousPatterns.some(pattern => pattern.test(content));
    }
    
    // Validate request origin (basic CSRF protection)
    static isValidOrigin(request: Request, allowedOrigins: string[]): boolean {
        const origin = request.headers.get('origin');
        const referer = request.headers.get('referer');
        
        if (!origin && !referer) {
            return false; // No origin information
        }
        
        const requestOrigin = origin || new URL(referer!).origin;
        return allowedOrigins.includes(requestOrigin);
    }
}

// Honeypot field validation (simple bot detection)
export function validateHoneypot(formData: FormData | any): boolean {
    // Check for common honeypot field names
    const honeypotFields = ['website', 'url', 'honeypot', 'address2', 'fax'];
    
    for (const field of honeypotFields) {
        const value = formData instanceof FormData 
            ? formData.get(field) 
            : formData[field];
            
        if (value && typeof value === 'string' && value.trim() !== '') {
            return false; // Honeypot field filled, likely a bot
        }
    }
    
    return true;
}
