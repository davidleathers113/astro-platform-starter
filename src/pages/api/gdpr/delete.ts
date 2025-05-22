// GDPR Data Deletion API endpoint  
// DELETE /api/gdpr/delete - Delete user data for Right to be Forgotten requests
// Requires proper verification and confirmation

import type { APIRoute } from 'astro';
import { supabaseAdmin, getClientIP, checkRateLimit } from '../../../utils/supabase';
import { dataDeletionRequestSchema, validateSecurityContext } from '../../../utils/validation';
import { withCSRFProtection } from '../../../utils/csrf';
import { withSecurityHeaders } from '../../../utils/security';
import { withValidation, ValidationMiddleware } from '../../../utils/validation-middleware';
import { sendGDPRDeletionConfirmationEmail } from '../../../utils/email';

export const prerender = false;

const deleteHandler: APIRoute = async ({ request }) => {
    const requestId = `gdpr_delete_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const startTime = Date.now();
    try {
        // Get client information for rate limiting
        const clientIP = getClientIP(request);
        
        // Enhanced security validation for GDPR endpoint
        const securityValidation = validateSecurityContext(request);
        if (securityValidation.riskLevel === 'high') {
            console.warn(`[${requestId}] High-risk GDPR deletion request from IP: ${clientIP}`, {
                issues: securityValidation.issues
            });
            return new Response(
                JSON.stringify({
                    success: false,
                    message: 'Request blocked by security policy',
                    requestId
                }),
                {
                    status: 403,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }
        
        console.log(`[${requestId}] GDPR deletion request started`, {
            ip: clientIP,
            timestamp: new Date().toISOString(),
            securityRisk: securityValidation.riskLevel
        });

        // Check rate limiting (2 requests per 15 minutes per IP for GDPR endpoints)
        const rateLimitCheck = await checkRateLimit(clientIP, '/api/gdpr/delete', 2, 15);
        if (!rateLimitCheck.allowed) {
            console.warn(`[${requestId}] Rate limit exceeded for IP: ${clientIP}`);
            return new Response(
                JSON.stringify({
                    success: false,
                    message: 'Rate limit exceeded. Please try again later.',
                    retryAfter: 900, // 15 minutes in seconds
                    requestId
                }),
                {
                    status: 429,
                    headers: {
                        'Content-Type': 'application/json',
                        'Retry-After': '900'
                    }
                }
            );
        }

        // Parse request body
        let body: unknown;
        try {
            body = await request.json();
        } catch (error) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: 'Invalid JSON in request body',
                    requestId
                }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }

        // Validate input
        const validation = dataDeletionRequestSchema.safeParse(body);
        if (!validation.success) {
            const errors: Record<string, string> = {};
            validation.error.errors.forEach(err => {
                const path = err.path.join('.');
                errors[path] = err.message;
            });
            
            return new Response(
                JSON.stringify({
                    success: false,
                    message: 'Validation failed',
                    errors
                }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }

        const { email, phone, confirmDeletion } = validation.data;

        // Double-check confirmation
        if (!confirmDeletion) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: 'Deletion must be explicitly confirmed',
                    errors: { confirmDeletion: 'You must confirm the deletion request' }
                }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }

        // First, find the records to be deleted
        let findQuery = supabaseAdmin.from('leads').select('id, created_at');
        
        if (email && phone) {
            // If both provided, find records matching either
            findQuery = findQuery.or(`email.eq.${email},phone.eq.${phone}`);
        } else if (email) {
            findQuery = findQuery.eq('email', email);
        } else if (phone) {
            findQuery = findQuery.eq('phone', phone);
        }

        const { data: recordsToDelete, error: findError } = await findQuery;

        if (findError) {
            console.error('GDPR deletion find error:', findError);
            return new Response(
                JSON.stringify({
                    success: false,
                    message: 'Unable to locate records. Please try again.'
                }),
                {
                    status: 500,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }

        if (!recordsToDelete || recordsToDelete.length === 0) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: 'No records found matching the provided information',
                    deletedCount: 0
                }),
                {
                    status: 404,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }

        // Log the deletion request for audit purposes
        const recordIds = recordsToDelete.map(record => record.id);
        console.log(`GDPR Deletion Request: Deleting ${recordIds.length} records`, {
            timestamp: new Date().toISOString(),
            recordIds,
            searchCriteria: { email: email || null, phone: phone || null }
        });

        // Perform the deletion
        let deleteQuery = supabaseAdmin.from('leads').delete();
        
        if (email && phone) {
            deleteQuery = deleteQuery.or(`email.eq.${email},phone.eq.${phone}`);
        } else if (email) {
            deleteQuery = deleteQuery.eq('email', email);
        } else if (phone) {
            deleteQuery = deleteQuery.eq('phone', phone);
        }

        const { error: deleteError } = await deleteQuery;

        if (deleteError) {
            console.error('GDPR deletion error:', deleteError);
            return new Response(
                JSON.stringify({
                    success: false,
                    message: 'Unable to delete records. Please try again.'
                }),
                {
                    status: 500,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }

        // Send confirmation email if email was provided
        let emailResult = null;
        if (email) {
            try {
                emailResult = await sendGDPRDeletionConfirmationEmail(email, phone, recordsToDelete.length);
                if (!emailResult.success) {
                    console.warn(`[${requestId}] Failed to send deletion confirmation email:`, emailResult.error);
                }
            } catch (emailError) {
                console.warn(`[${requestId}] Email sending failed:`, emailError);
            }
        }

        // Log successful deletion
        const processingTime = Date.now() - startTime;
        console.log(`[${requestId}] GDPR deletion completed successfully in ${processingTime}ms`);

        // Success response
        return new Response(
            JSON.stringify({
                success: true,
                message: `Successfully deleted ${recordsToDelete.length} record(s)`,
                deletedCount: recordsToDelete.length,
                deletionDate: new Date().toISOString(),
                searchCriteria: {
                    email: email || null,
                    phone: phone || null
                },
                note: 'This action cannot be undone. All associated data has been permanently removed.',
                emailConfirmation: email ? {
                    sent: emailResult?.success || false,
                    messageId: emailResult?.messageId || null,
                    error: emailResult?.error || null
                } : null,
                requestId,
                processingTime
            }),
            {
                status: 200,
                headers: { 
                    'Content-Type': 'application/json',
                    'X-Processing-Time': processingTime.toString()
                }
            }
        );

    } catch (error) {
        const processingTime = Date.now() - startTime;
        console.error(`[${requestId}] Unexpected error in GDPR deletion (${processingTime}ms):`, error);
        
        return new Response(
            JSON.stringify({
                success: false,
                message: 'An unexpected error occurred. Please try again.',
                requestId
            }),
            {
                status: 500,
                headers: { 
                    'Content-Type': 'application/json',
                    'X-Processing-Time': processingTime.toString()
                }
            }
        );
    }
};

// Handle unsupported methods
export const GET: APIRoute = async () => {
    return new Response(
        JSON.stringify({
            success: false,
            message: 'Method not allowed. Use DELETE with email or phone to delete data.',
            usage: {
                method: 'DELETE',
                body: {
                    email: 'user@example.com (optional)',
                    phone: '1234567890 (optional, 10 digits)',
                    confirmDeletion: true
                },
                warning: 'This action permanently deletes all records and cannot be undone',
                note: 'At least one of email or phone must be provided'
            }
        }),
        {
            status: 405,
            headers: { 
                'Content-Type': 'application/json',
                'Allow': 'DELETE'
            }
        }
    );
};

// Apply validation, security middleware and CSRF protection to DELETE handler
export const DELETE = withSecurityHeaders(
    withCSRFProtection(
        withValidation(dataDeletionRequestSchema, {
            sanitizationOptions: {
                maxLength: 500,
                preventXss: true,
                preventSqlInjection: true,
                preventCommandInjection: true
            }
        })(deleteHandler)
    )
);

export const POST: APIRoute = GET;
export const PUT: APIRoute = GET;
export const PATCH: APIRoute = GET;
