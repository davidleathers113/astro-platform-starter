// Enhanced API endpoint for debt relief lead submission with integrated EmailService
// POST /api/leads - Submit a new lead from the qualification form

import type { APIRoute } from 'astro';
import { supabaseAdmin, getClientIP } from '../../utils/supabase';
import { validateLeadSubmission, type LeadSubmission } from '../../utils/validation';
import { checkRateLimit } from '../../utils/supabase';
import { emailService } from '../../emails/service';
import { 
    generateReferenceNumber, 
    calculateLeadPriority, 
    calculateExpectedContactTime, 
    formatPhoneForDisplay 
} from '../../emails/types';
import type { 
    LeadConfirmationEmailData, 
    InternalLeadNotificationEmailData 
} from '../../emails/types';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const startTime = Date.now();

    try {
        // Parse request body
        let body: unknown;
        try {
            body = await request.json();
        } catch (error) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: 'Invalid JSON in request body',
                    errors: { general: 'Request body must be valid JSON' },
                    requestId
                }),
                { 
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }

        // Get client information for audit trail and rate limiting
        const clientIP = getClientIP(request);
        const userAgent = request.headers.get('user-agent') || '';

        console.log(`[${requestId}] Lead submission started`, {
            ip: clientIP,
            userAgent: userAgent.substring(0, 100),
            timestamp: new Date().toISOString()
        });

        // Check rate limiting (5 requests per hour per IP)
        const rateLimitCheck = await checkRateLimit(clientIP, '/api/leads', 5, 60);
        if (!rateLimitCheck.allowed) {
            console.warn(`[${requestId}] Rate limit exceeded for IP: ${clientIP}`);
            return new Response(
                JSON.stringify({
                    success: false,
                    message: 'Rate limit exceeded. Please try again later.',
                    retryAfter: 3600, // 1 hour in seconds
                    requestId
                }),
                {
                    status: 429,
                    headers: {
                        'Content-Type': 'application/json',
                        'Retry-After': '3600'
                    }
                }
            );
        }

        // Validate input data
        const validation = validateLeadSubmission(body);
        if (!validation.success) {
            console.warn(`[${requestId}] Validation failed:`, validation.errors);
            return new Response(
                JSON.stringify({
                    success: false,
                    message: 'Validation failed',
                    errors: validation.errors,
                    requestId
                }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }

        const leadData = validation.data!;

        // Check for duplicate phone number (prevent spam)
        const { data: existingLead, error: duplicateCheckError } = await supabaseAdmin
            .from('leads')
            .select('id, created_at')
            .eq('phone', leadData.phone)
            .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()) // Last 24 hours
            .single();

        if (duplicateCheckError && duplicateCheckError.code !== 'PGRST116') { // PGRST116 = no rows found
            console.error(`[${requestId}] Duplicate check error:`, duplicateCheckError);
            return new Response(
                JSON.stringify({
                    success: false,
                    message: 'Unable to process request. Please try again.',
                    errors: { general: 'Database error during duplicate check' },
                    requestId
                }),
                {
                    status: 500,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }

        if (existingLead) {
            console.warn(`[${requestId}] Duplicate submission detected for phone: ${leadData.phone.slice(-4)}`);
            return new Response(
                JSON.stringify({
                    success: false,
                    message: 'A submission with this phone number was already received in the last 24 hours.',
                    errors: { phone: 'Duplicate submission detected' },
                    requestId
                }),
                {
                    status: 409,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }

        // Prepare lead record for database insertion
        const leadRecord = {
            debt_amount: leadData.debtAmount,
            debt_type: leadData.debtType,
            phone: leadData.phone,
            first_name: leadData.firstName || null,
            last_name: leadData.lastName || null,
            email: leadData.email || null,
            consent_marketing: leadData.consentMarketing,
            consent_processing: leadData.consentProcessing,
            consent_timestamp: new Date().toISOString(),
            ip_address: clientIP,
            user_agent: userAgent,
            status: 'new' as const,
            source: leadData.source || 'qualification-form',
            notes: leadData.notes || null,
            request_id: requestId
        };

        // Insert lead into database
        const { data: insertedLead, error: insertError } = await supabaseAdmin
            .from('leads')
            .insert(leadRecord)
            .select('id')
            .single();

        if (insertError) {
            console.error(`[${requestId}] Lead insertion error:`, insertError);
            
            // Check if it's a constraint violation (duplicate)
            if (insertError.code === '23505') { // PostgreSQL unique violation
                return new Response(
                    JSON.stringify({
                        success: false,
                        message: 'A submission with this information already exists.',
                        errors: { general: 'Duplicate submission detected' },
                        requestId
                    }),
                    {
                        status: 409,
                        headers: { 'Content-Type': 'application/json' }
                    }
                );
            }
            
            return new Response(
                JSON.stringify({
                    success: false,
                    message: 'Unable to save your information. Please try again.',
                    errors: { general: 'Database insertion failed' },
                    requestId
                }),
                {
                    status: 500,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }

        const leadId = insertedLead.id;
        console.log(`[${requestId}] Lead ${leadId} inserted successfully, preparing email notifications...`);

        // Create complete lead object with ID for email processing
        const completeLead = {
            ...leadRecord,
            id: leadId,
            created_at: new Date().toISOString()
        };

        // Calculate lead priority for email processing
        const leadPriority = calculateLeadPriority({
            id: leadId,
            debtAmount: leadData.debtAmount,
            debtType: leadData.debtType,
            phone: leadData.phone,
            consentProcessing: leadData.consentProcessing,
            consentMarketing: leadData.consentMarketing,
            source: leadData.source || 'qualification-form',
            submittedAt: completeLead.created_at
        });

        // Send email notifications using enhanced EmailService
        let emailResults = { 
            userConfirmation: { success: false, error: 'Not attempted' }, 
            internalNotification: { success: false, error: 'Not attempted' } 
        };

        try {
            // Send user confirmation email (if email provided)
            if (leadData.email) {
                const confirmationData: LeadConfirmationEmailData = {
                    timestamp: new Date().toISOString(),
                    environment: import.meta.env.PROD ? 'production' : 'development',
                    user: {
                        firstName: leadData.firstName,
                        email: leadData.email,
                        phone: formatPhoneForDisplay(leadData.phone)
                    },
                    lead: {
                        debtAmount: leadData.debtAmount,
                        debtType: leadData.debtType,
                        submittedAt: completeLead.created_at,
                        referenceNumber: generateReferenceNumber(leadId)
                    },
                    nextSteps: {
                        expectedContactTime: calculateExpectedContactTime(leadPriority),
                        contactMethod: 'Phone call from our certified debt specialist',
                        preparationTips: [
                            'Have your recent credit card or loan statements ready',
                            'List your monthly income and essential expenses',
                            'Note any financial hardships affecting your payments',
                            'Prepare questions about debt relief options available to you',
                            'Ensure you have a quiet space for the 15-20 minute consultation call'
                        ]
                    }
                };

                emailResults.userConfirmation = await emailService.sendLeadConfirmation(
                    leadData.email,
                    confirmationData,
                    {
                        priority: leadPriority === 'urgent' ? 'urgent' : 'high',
                        tags: {
                            lead_id: leadId,
                            request_id: requestId,
                            source: leadData.source || 'qualification-form'
                        }
                    }
                );
            } else {
                emailResults.userConfirmation = { success: true, messageId: 'skipped-no-email' };
            }

            // Send internal notification email
            const notificationData: InternalLeadNotificationEmailData = {
                timestamp: new Date().toISOString(),
                environment: import.meta.env.PROD ? 'production' : 'development',
                lead: {
                    id: leadId,
                    debtAmount: leadData.debtAmount,
                    debtType: leadData.debtType,
                    phone: leadData.phone,
                    consentProcessing: leadData.consentProcessing,
                    consentMarketing: leadData.consentMarketing,
                    source: leadData.source || 'qualification-form',
                    ipAddress: clientIP,
                    userAgent: userAgent,
                    submittedAt: completeLead.created_at
                },
                priority: leadPriority,
                source: {
                    page: request.headers.get('referer') || '/debt-relief',
                    campaign: request.headers.get('utm-campaign') || undefined,
                    referrer: request.headers.get('referer') || undefined
                },
                metadata: {
                    ipAddress: clientIP,
                    userAgent: userAgent,
                    location: {
                        // Could be enhanced with IP geolocation
                        country: 'United States'
                    }
                },
                actions: {
                    viewLeadUrl: `${import.meta.env.DASHBOARD_URL || 'https://dashboard.yourdomain.com'}/leads/${leadId}`,
                    callLeadUrl: `tel:+1${leadData.phone}`,
                    emailLeadUrl: leadData.email ? `mailto:${leadData.email}?subject=Regarding Your Debt Relief Inquiry` : '#'
                }
            };

            emailResults.internalNotification = await emailService.sendInternalNotification(
                notificationData,
                {
                    priority: leadPriority === 'urgent' ? 'urgent' : 'high',
                    tags: {
                        lead_id: leadId,
                        request_id: requestId,
                        lead_priority: leadPriority,
                        source: leadData.source || 'qualification-form'
                    }
                }
            );

            // Log email results for monitoring
            console.log(`[${requestId}] Email notifications completed:`, {
                leadId: leadId,
                userConfirmation: {
                    success: emailResults.userConfirmation.success,
                    emailId: emailResults.userConfirmation.emailId,
                    error: emailResults.userConfirmation.error
                },
                internalNotification: {
                    success: emailResults.internalNotification.success,
                    emailId: emailResults.internalNotification.emailId,
                    error: emailResults.internalNotification.error
                }
            });

        } catch (emailError) {
            console.error(`[${requestId}] Email sending failed:`, emailError);
            // Continue with success response even if emails fail - user experience priority
        }

        // Track email delivery in database for analytics
        try {
            await supabaseAdmin
                .from('email_tracking')
                .insert([
                    ...(leadData.email ? [{
                        lead_id: leadId,
                        email_type: 'lead_confirmation' as const,
                        recipient_email: leadData.email,
                        success: emailResults.userConfirmation.success,
                        error_message: emailResults.userConfirmation.error || null,
                        email_id: emailResults.userConfirmation.emailId || null,
                        request_id: requestId
                    }] : []),
                    {
                        lead_id: leadId,
                        email_type: 'internal_notification' as const,
                        recipient_email: 'internal',
                        success: emailResults.internalNotification.success,
                        error_message: emailResults.internalNotification.error || null,
                        email_id: emailResults.internalNotification.emailId || null,
                        request_id: requestId
                    }
                ]);
        } catch (trackingError) {
            console.error(`[${requestId}] Email tracking failed:`, trackingError);
            // Don't fail the request for tracking errors
        }

        const processingTime = Date.now() - startTime;
        console.log(`[${requestId}] Lead submission completed successfully in ${processingTime}ms`);

        // Prepare success response with email status
        const responseData: any = {
            success: true,
            message: 'Thank you for your submission! A debt relief specialist will contact you shortly.',
            leadId: leadId,
            requestId: requestId
        };

        // Add email status to response for debugging (only in development)
        if (import.meta.env.DEV) {
            responseData.emailStatus = {
                userConfirmationSent: emailResults.userConfirmation.success,
                internalNotificationSent: emailResults.internalNotification.success,
                processingTimeMs: processingTime
            };
        }

        // Success response
        return new Response(
            JSON.stringify(responseData),
            {
                status: 201,
                headers: { 
                    'Content-Type': 'application/json',
                    'X-Remaining-Requests': rateLimitCheck.remainingRequests.toString(),
                    'X-Processing-Time': processingTime.toString()
                }
            }
        );

    } catch (error) {
        const processingTime = Date.now() - startTime;
        console.error(`[${requestId}] Unexpected error in lead submission (${processingTime}ms):`, error);
        
        // Send error notification email for critical system errors
        try {
            const errorNotificationData = {
                timestamp: new Date().toISOString(),
                environment: import.meta.env.PROD ? 'production' : 'development',
                error: {
                    message: error instanceof Error ? error.message : 'Unknown error',
                    stack: error instanceof Error ? error.stack : undefined,
                    type: 'api_error' as const,
                    severity: 'high' as const,
                    code: 'LEAD_SUBMISSION_ERROR'
                },
                context: {
                    endpoint: '/api/leads',
                    method: 'POST',
                    requestId: requestId,
                    ipAddress: getClientIP(request),
                    userAgent: request.headers.get('user-agent') || 'Unknown'
                },
                system: {
                    service: 'debt-relief-api',
                    version: '1.0.0',
                    environment: import.meta.env.PROD ? 'production' : 'development'
                },
                actions: {
                    dashboardUrl: import.meta.env.DASHBOARD_URL || 'https://dashboard.yourdomain.com',
                    logsUrl: `${import.meta.env.LOGS_URL || 'https://logs.yourdomain.com'}/search?requestId=${requestId}`,
                    documentsUrl: 'https://docs.yourdomain.com/troubleshooting/api-errors'
                }
            };

            await emailService.sendErrorNotification(errorNotificationData);
        } catch (notificationError) {
            console.error(`[${requestId}] Failed to send error notification:`, notificationError);
        }
        
        return new Response(
            JSON.stringify({
                success: false,
                message: 'An unexpected error occurred. Please try again.',
                errors: { general: 'Internal server error' },
                requestId: requestId
            }),
            {
                status: 500,
                headers: { 
                    'Content-Type': 'application/json',
                    'X-Processing-Time': (Date.now() - startTime).toString()
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
            message: 'Method not allowed. Use POST to submit leads.',
            allowedMethods: ['POST']
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

// Export other methods as not allowed
export const PUT: APIRoute = GET;
export const DELETE: APIRoute = GET;
export const PATCH: APIRoute = GET;
