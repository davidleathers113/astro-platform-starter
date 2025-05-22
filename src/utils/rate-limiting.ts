// Rate limiting utilities - Re-export from security.ts
// This module provides rate limiting functionality for the debt relief system

export {
    RateLimiter,
    createRateLimitKey,
    getClientIP,
    type RateLimitOptions
} from './security.js';

// Pre-configured rate limits for different endpoints
export const RATE_LIMITS = {
    LEADS_SUBMISSION: {
        maxRequests: 5,
        windowMinutes: 15
    },
    GDPR_REQUESTS: {
        maxRequests: 2,
        windowMinutes: 15
    },
    WEBHOOK_PROCESSING: {
        maxRequests: 100,
        windowMinutes: 15
    },
    EMAIL_ANALYTICS: {
        maxRequests: 10,
        windowMinutes: 5
    },
    HEALTH_CHECK: {
        maxRequests: 60,
        windowMinutes: 1
    }
} as const;

// Rate limiting middleware for different endpoint types
export function withRateLimit(
    options: RateLimitOptions,
    endpoint: string
) {
    return async (request: Request): Promise<{ allowed: boolean; headers: Record<string, string> }> => {
        const { RateLimiter, createRateLimitKey } = await import('./security.js');
        
        const key = createRateLimitKey(request, endpoint);
        const result = RateLimiter.check(key, options);
        
        const headers: Record<string, string> = {
            'X-RateLimit-Limit': options.maxRequests.toString(),
            'X-RateLimit-Remaining': result.remaining.toString(),
            'X-RateLimit-Reset': Math.ceil(result.resetTime / 1000).toString(),
        };
        
        if (!result.allowed) {
            headers['Retry-After'] = Math.ceil((result.resetTime - Date.now()) / 1000).toString();
        }
        
        return {
            allowed: result.allowed,
            headers
        };
    };
}

// Convenience functions for common rate limiting scenarios
export const rateLimiters = {
    // For lead submission forms
    leads: withRateLimit(RATE_LIMITS.LEADS_SUBMISSION, 'leads'),
    
    // For GDPR data requests
    gdpr: withRateLimit(RATE_LIMITS.GDPR_REQUESTS, 'gdpr'),
    
    // For webhook processing
    webhooks: withRateLimit(RATE_LIMITS.WEBHOOK_PROCESSING, 'webhooks'),
    
    // For email analytics
    analytics: withRateLimit(RATE_LIMITS.EMAIL_ANALYTICS, 'analytics'),
    
    // For health checks
    health: withRateLimit(RATE_LIMITS.HEALTH_CHECK, 'health')
};
