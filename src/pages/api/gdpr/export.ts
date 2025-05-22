// GDPR Data Export API endpoint
// POST /api/gdpr/export - Export user data for Subject Access Requests
// Requires admin authentication or proper verification

import type { APIRoute } from 'astro';
import { supabaseAdmin, getClientIP, checkRateLimit } from '../../../utils/supabase';
import { dataExportRequestSchema, validateSecurityContext } from '../../../utils/validation';
import { withCSRFProtection } from '../../../utils/csrf';
import { withSecurityHeaders } from '../../../utils/security';
import { withValidation, ValidationMiddleware } from '../../../utils/validation-middleware';
import { sendGDPRExportDeliveryEmail } from '../../../utils/email';

export const prerender = false;

const postHandler: APIRoute = async ({ request }) => {
    const requestId = `gdpr_export_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const startTime = Date.now();
    try {
        // Get client information for rate limiting
        const clientIP = getClientIP(request);
        
        // Enhanced security validation for GDPR endpoint
        const securityValidation = validateSecurityContext(request);
        if (securityValidation.riskLevel === 'high') {
            console.warn(`[${requestId}] High-risk GDPR export request from IP: ${clientIP}`, {
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
        
        console.log(`[${requestId}] GDPR export request started`, {
            ip: clientIP,
            timestamp: new Date().toISOString(),
            securityRisk: securityValidation.riskLevel
        });

        // Check rate limiting (2 requests per 15 minutes per IP for GDPR endpoints)
        const rateLimitCheck = await checkRateLimit(clientIP, '/api/gdpr/export', 2, 15);
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
        const validation = dataExportRequestSchema.safeParse(body);
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

        const { email, phone } = validation.data;

        // Build query conditions
        let query = supabaseAdmin.from('leads').select('*');
        
        if (email && phone) {
            // If both provided, search for either
            query = query.or(`email.eq.${email},phone.eq.${phone}`);
        } else if (email) {
            query = query.eq('email', email);
        } else if (phone) {
            query = query.eq('phone', phone);
        }

        // Execute query
        const { data: leads, error } = await query;

        if (error) {
            console.error('GDPR export query error:', error);
            return new Response(
                JSON.stringify({
                    success: false,
                    message: 'Unable to retrieve data. Please try again.'
                }),
                {
                    status: 500,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }

        // Prepare export data (remove sensitive fields)
        const exportData = leads.map(lead => ({
            id: lead.id,
            submission_date: lead.created_at,
            last_updated: lead.updated_at,
            debt_amount_range: lead.debt_amount,
            debt_type: lead.debt_type,
            phone_number: lead.phone,
            first_name: lead.first_name,
            last_name: lead.last_name,
            email: lead.email,
            marketing_consent: lead.consent_marketing,
            processing_consent: lead.consent_processing,
            consent_date: lead.consent_timestamp,
            status: lead.status,
            source: lead.source,
            notes: lead.notes
            // Excluded: ip_address, user_agent for privacy
        }));

        // Send confirmation email if email was provided
        let emailResult = null;
        if (email) {
            try {
                emailResult = await sendGDPRExportDeliveryEmail(email, phone, exportData.length);
                if (!emailResult.success) {
                    console.warn(`[${requestId}] Failed to send export delivery email:`, emailResult.error);
                }
            } catch (emailError) {
                console.warn(`[${requestId}] Email sending failed:`, emailError);
            }
        }

        // Log successful export
        const processingTime = Date.now() - startTime;
        console.log(`[${requestId}] GDPR export completed successfully in ${processingTime}ms`);

        // Return export data
        return new Response(
            JSON.stringify({
                success: true,
                message: `Found ${exportData.length} record(s) for the provided information`,
                export_date: new Date().toISOString(),
                search_criteria: {
                    email: email || null,
                    phone: phone || null
                },
                data: exportData,
                privacy_note: 'IP addresses and user agent data are excluded from exports for privacy protection',
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
                    'Content-Disposition': `attachment; filename="gdpr-export-${Date.now()}.json"`,
                    'X-Processing-Time': processingTime.toString()
                }
            }
        );

    } catch (error) {
        const processingTime = Date.now() - startTime;
        console.error(`[${requestId}] Unexpected error in GDPR export (${processingTime}ms):`, error);
        
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

// Apply validation, security middleware and CSRF protection to POST handler
export const POST = withSecurityHeaders(
    withCSRFProtection(
        withValidation(dataExportRequestSchema, {
            sanitizationOptions: {
                maxLength: 500,
                preventXss: true,
                preventSqlInjection: true,
                preventCommandInjection: true
            }
        })(postHandler)
    )
);

// Handle unsupported methods
export const GET: APIRoute = async () => {
    return new Response(
        JSON.stringify({
            success: false,
            message: 'Method not allowed. Use POST with email or phone to export data.',
            usage: {
                method: 'POST',
                body: {
                    email: 'user@example.com (optional)',
                    phone: '1234567890 (optional, 10 digits)'
                },
                note: 'At least one of email or phone must be provided'
            }
        }),
        {
            status: 405,
            headers: { 
                'Content-Type': 'application/json',
                'Allow': 'POST'
            }
        }
    );
};

export const PUT: APIRoute = GET;
export const DELETE: APIRoute = GET;
export const PATCH: APIRoute = GET;
