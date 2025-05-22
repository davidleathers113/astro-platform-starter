// CSRF Token API endpoint
// GET /api/csrf-token - Provides CSRF tokens for form submissions

import type { APIRoute } from 'astro';
import { getCSRFTokenForForm } from '../../utils/csrf';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
    try {
        const { token, sessionId } = await getCSRFTokenForForm(request);
        
        return new Response(
            JSON.stringify({
                success: true,
                token,
                sessionId,
                expiresIn: 3600000 // 1 hour in milliseconds
            }),
            {
                status: 200,
                headers: { 
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-store, no-cache, must-revalidate',
                    'Pragma': 'no-cache',
                    'Expires': '0'
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

// Prevent other HTTP methods
export const POST: APIRoute = async () => {
    return new Response(
        JSON.stringify({
            success: false,
            message: 'Method not allowed. Use GET to retrieve CSRF token.'
        }),
        {
            status: 405,
            headers: { 
                'Content-Type': 'application/json',
                'Allow': 'GET'
            }
        }
    );
};

export const PUT: APIRoute = POST;
export const DELETE: APIRoute = POST;
export const PATCH: APIRoute = POST;
