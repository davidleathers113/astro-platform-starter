// CSRF (Cross-Site Request Forgery) protection utilities
// Provides token generation, validation, and middleware for form security

import type { APIRoute } from 'astro';

// CSRF token configuration
const CSRF_TOKEN_HEADER = 'x-csrf-token';
const CSRF_TOKEN_COOKIE = 'csrf-token';
const CSRF_TOKEN_LENGTH = 32;
const CSRF_TOKEN_EXPIRY = 3600000; // 1 hour in milliseconds

// In-memory token store for development/demo
// In production, you'd want to use Redis, database, or encrypted cookies
const tokenStore = new Map<string, { token: string; expires: number; used: boolean }>();

// Generate a cryptographically secure CSRF token
export function generateCSRFToken(): string {
    if (typeof crypto === 'undefined') {
        // Fallback for environments without crypto API
        return Array.from({ length: CSRF_TOKEN_LENGTH }, () => 
            Math.random().toString(36).charAt(2)
        ).join('');
    }
    
    const array = new Uint8Array(CSRF_TOKEN_LENGTH);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

// Store a CSRF token with expiration
export function storeCSRFToken(sessionId: string, token: string): void {
    const expires = Date.now() + CSRF_TOKEN_EXPIRY;
    tokenStore.set(sessionId, { token, expires, used: false });
    
    // Clean up expired tokens every 100 operations
    if (tokenStore.size % 100 === 0) {
        cleanupExpiredTokens();
    }
}

// Validate a CSRF token
export function validateCSRFToken(sessionId: string, providedToken: string): boolean {
    const stored = tokenStore.get(sessionId);
    
    if (!stored) {
        return false; // No token found
    }
    
    if (stored.expires < Date.now()) {
        tokenStore.delete(sessionId);
        return false; // Token expired
    }
    
    if (stored.used) {
        return false; // Token already used (prevents replay attacks)
    }
    
    if (stored.token !== providedToken) {
        return false; // Token mismatch
    }
    
    // Mark token as used (one-time use)
    stored.used = true;
    
    return true;
}

// Clean up expired tokens from memory
function cleanupExpiredTokens(): void {
    const now = Date.now();
    for (const [sessionId, data] of tokenStore.entries()) {
        if (data.expires < now) {
            tokenStore.delete(sessionId);
        }
    }
}

// Generate a session ID for CSRF token tracking
export function generateSessionId(request: Request): string {
    // Use a combination of IP, User-Agent, and timestamp for session ID
    const ip = getClientIP(request);
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const timestamp = Date.now();
    
    // Create a hash-like session ID
    const sessionData = `${ip}-${userAgent}-${timestamp}`;
    return btoa(sessionData).replace(/[^a-zA-Z0-9]/g, '').substring(0, 24);
}

// Extract client IP from request (same as in supabase.ts)
function getClientIP(request: Request): string {
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

// CSRF middleware for API routes
export function withCSRFProtection(handler: APIRoute): APIRoute {
    return async (context) => {
        const { request } = context;
        
        // Skip CSRF validation for GET requests
        if (request.method === 'GET') {
            return handler(context);
        }
        
        // Extract CSRF token from header or form data
        let csrfToken = request.headers.get(CSRF_TOKEN_HEADER);
        
        if (!csrfToken && request.headers.get('content-type')?.includes('application/x-www-form-urlencoded')) {
            // Try to extract from form data for traditional form submissions
            try {
                const formData = await request.clone().formData();
                csrfToken = formData.get('csrf_token') as string;
            } catch (error) {
                // Ignore parsing errors for non-form requests
            }
        }
        
        if (!csrfToken) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: 'CSRF token required',
                    code: 'CSRF_TOKEN_MISSING'
                }),
                {
                    status: 403,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }
        
        // Generate session ID and validate token
        const sessionId = generateSessionId(request);
        const isValid = validateCSRFToken(sessionId, csrfToken);
        
        if (!isValid) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: 'Invalid or expired CSRF token',
                    code: 'CSRF_TOKEN_INVALID'
                }),
                {
                    status: 403,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }
        
        // CSRF validation passed, proceed with the request
        return handler(context);
    };
}

// Generate CSRF token for form inclusion
export async function getCSRFTokenForForm(request: Request): Promise<{ token: string; sessionId: string }> {
    const sessionId = generateSessionId(request);
    const token = generateCSRFToken();
    
    storeCSRFToken(sessionId, token);
    
    return { token, sessionId };
}

// API endpoint to get CSRF token
export const GET: APIRoute = async ({ request }) => {
    try {
        const { token, sessionId } = await getCSRFTokenForForm(request);
        
        return new Response(
            JSON.stringify({
                success: true,
                token,
                sessionId,
                expiresIn: CSRF_TOKEN_EXPIRY
            }),
            {
                status: 200,
                headers: { 
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-store, no-cache, must-revalidate'
                }
            }
        );
    } catch (error) {
        console.error('CSRF token generation error:', error);
        return new Response(
            JSON.stringify({
                success: false,
                message: 'Failed to generate CSRF token'
            }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }
};
