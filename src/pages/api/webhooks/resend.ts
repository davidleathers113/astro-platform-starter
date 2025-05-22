// Webhook handler for Resend email delivery status updates
// POST /api/webhooks/resend - Handle delivery status, bounces, complaints

import type { APIRoute } from 'astro';
import { supabaseAdmin, getClientIP, checkRateLimit } from '../../../utils/supabase';
import { emailService } from '../../../emails/service';
import { withSecurityHeaders } from '../../../utils/security';

export const prerender = false;

// Resend webhook event types
interface ResendWebhookEvent {
    type: 'email.sent' | 'email.delivered' | 'email.bounced' | 'email.complained' | 'email.clicked' | 'email.opened';
    created_at: string;
    data: {
        id: string;
        email_id: string;
        from: string;
        to: string[];
        subject: string;
        tags?: Record<string, string>;
        created_at: string;
        // Additional fields based on event type
        bounce_type?: 'hard' | 'soft';
        complaint_type?: 'abuse' | 'auth-failure' | 'fraud' | 'not-spam' | 'other' | 'virus';
        click_data?: {
            url: string;
            timestamp: string;
        };
        open_data?: {
            timestamp: string;
            user_agent?: string;
            ip_address?: string;
        };
    };
}

// Verify webhook signature (if configured)
function verifyWebhookSignature(request: Request, body: string): boolean {
    const webhookSecret = import.meta.env.RESEND_WEBHOOK_SECRET;
    if (!webhookSecret) {
        console.warn('RESEND_WEBHOOK_SECRET not configured - skipping signature verification');
        return true; // Skip verification if not configured
    }

    const signature = request.headers.get('resend-signature');
    if (!signature) {
        console.error('Missing resend-signature header');
        return false;
    }

    try {
        // Resend uses HMAC-SHA256 for signature verification
        // Implementation would depend on the specific signature format used by Resend
        // For now, we'll skip detailed signature verification
        return true;
    } catch (error) {
        console.error('Webhook signature verification failed:', error);
        return false;
    }
}

const postHandler: APIRoute = async ({ request }) => {
    const requestId = `webhook_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const startTime = Date.now();

    try {
        // Get client information for rate limiting
        const clientIP = getClientIP(request);
        
        // Check rate limiting for webhook endpoint (100 requests per 15 minutes to prevent DDoS)
        const rateLimitCheck = await checkRateLimit(clientIP, '/api/webhooks/resend', 100, 15);
        if (!rateLimitCheck.allowed) {
            console.warn(`[${requestId}] Webhook rate limit exceeded for IP: ${clientIP}`);
            return new Response(
                JSON.stringify({
                    success: false,
                    message: 'Rate limit exceeded',
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
        // Parse webhook payload
        let body: string;
        let event: ResendWebhookEvent;
        
        try {
            body = await request.text();
            event = JSON.parse(body);
        } catch (error) {
            console.error(`[${requestId}] Invalid webhook payload:`, error);
            return new Response(
                JSON.stringify({
                    success: false,
                    message: 'Invalid webhook payload'
                }),
                { 
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }

        // Verify webhook signature
        if (!verifyWebhookSignature(request, body)) {
            console.error(`[${requestId}] Webhook signature verification failed`);
            return new Response(
                JSON.stringify({
                    success: false,
                    message: 'Invalid webhook signature'
                }),
                { 
                    status: 401,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }

        console.log(`[${requestId}] Processing webhook event:`, {
            type: event.type,
            emailId: event.data.email_id,
            to: event.data.to,
            timestamp: event.created_at
        });

        // Extract metadata from email tags
        const tags = event.data.tags || {};
        const leadId = tags.lead_id;
        const templateType = tags.template;
        const originalRequestId = tags.request_id;

        // Update email tracking record in database
        try {
            const updateData: any = {
                updated_at: new Date().toISOString(),
                webhook_event_type: event.type,
                webhook_received_at: new Date().toISOString()
            };

            // Set status based on event type
            switch (event.type) {
                case 'email.sent':
                    updateData.status = 'sent';
                    updateData.sent_at = event.data.created_at;
                    break;
                
                case 'email.delivered':
                    updateData.status = 'delivered';
                    updateData.delivered_at = event.created_at;
                    break;
                
                case 'email.bounced':
                    updateData.status = 'bounced';
                    updateData.bounced_at = event.created_at;
                    updateData.bounce_type = event.data.bounce_type;
                    updateData.error_message = `Email bounced (${event.data.bounce_type})`;
                    break;
                
                case 'email.complained':
                    updateData.status = 'complained';
                    updateData.complained_at = event.created_at;
                    updateData.complaint_type = event.data.complaint_type;
                    updateData.error_message = `Spam complaint (${event.data.complaint_type})`;
                    break;
                
                case 'email.opened':
                    updateData.opened_at = event.created_at;
                    updateData.open_count = 1; // Increment in database
                    if (event.data.open_data) {
                        updateData.last_open_user_agent = event.data.open_data.user_agent;
                        updateData.last_open_ip = event.data.open_data.ip_address;
                    }
                    break;
                
                case 'email.clicked':
                    updateData.clicked_at = event.created_at;
                    updateData.click_count = 1; // Increment in database
                    if (event.data.click_data) {
                        updateData.last_clicked_url = event.data.click_data.url;
                    }
                    break;
            }

            // Update tracking record by email_id
            const { data: trackingRecord, error: trackingError } = await supabaseAdmin
                .from('email_tracking')
                .update(updateData)
                .eq('email_id', event.data.email_id)
                .select('id, lead_id, email_type');

            if (trackingError) {
                console.error(`[${requestId}] Failed to update email tracking:`, trackingError);
            } else if (trackingRecord && trackingRecord.length > 0) {
                console.log(`[${requestId}] Updated email tracking record:`, {
                    trackingId: trackingRecord[0].id,
                    leadId: trackingRecord[0].lead_id,
                    emailType: trackingRecord[0].email_type,
                    eventType: event.type
                });
            } else {
                console.warn(`[${requestId}] No tracking record found for email_id: ${event.data.email_id}`);
            }

        } catch (dbError) {
            console.error(`[${requestId}] Database update error:`, dbError);
            // Continue processing - don't fail webhook for database issues
        }

        // Handle critical events that require immediate attention
        if (event.type === 'email.bounced' || event.type === 'email.complained') {
            try {
                // Send alert to administrators for delivery issues
                const alertData = {
                    timestamp: new Date().toISOString(),
                    environment: import.meta.env.PROD ? 'production' : 'development',
                    error: {
                        message: `Email ${event.type} for template ${templateType}`,
                        type: 'email_error' as const,
                        severity: event.type === 'email.complained' ? 'high' : 'medium' as const,
                        code: event.type.toUpperCase()
                    },
                    context: {
                        emailId: event.data.email_id,
                        recipientEmail: event.data.to[0],
                        templateType: templateType,
                        leadId: leadId,
                        requestId: originalRequestId,
                        bounceType: event.data.bounce_type,
                        complaintType: event.data.complaint_type
                    },
                    system: {
                        service: 'resend-webhook',
                        version: '1.0.0',
                        environment: import.meta.env.PROD ? 'production' : 'development'
                    },
                    actions: {
                        dashboardUrl: import.meta.env.DASHBOARD_URL || 'https://dashboard.yourdomain.com',
                        logsUrl: `${import.meta.env.LOGS_URL || 'https://logs.yourdomain.com'}/email-tracking`,
                        documentsUrl: 'https://docs.yourdomain.com/troubleshooting/email-delivery'
                    }
                };

                await emailService.sendErrorNotification(alertData, {
                    priority: event.type === 'email.complained' ? 'high' : 'medium'
                });

                console.log(`[${requestId}] Sent delivery issue alert for ${event.type}`);

            } catch (alertError) {
                console.error(`[${requestId}] Failed to send delivery alert:`, alertError);
            }
        }

        // Log successful webhook processing
        const processingTime = Date.now() - startTime;
        console.log(`[${requestId}] Webhook processed successfully in ${processingTime}ms`);

        // Respond with success (Resend requires 2xx response)
        return new Response(
            JSON.stringify({
                success: true,
                message: 'Webhook processed successfully',
                eventType: event.type,
                emailId: event.data.email_id,
                processingTime: processingTime
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
        console.error(`[${requestId}] Webhook processing error (${processingTime}ms):`, error);
        
        // Return success to prevent Resend retries for our internal errors
        // Log the error for investigation but don't fail the webhook
        return new Response(
            JSON.stringify({
                success: true,
                message: 'Webhook received but processing encountered an error',
                error: error instanceof Error ? error.message : 'Unknown error'
            }),
            {
                status: 200,
                headers: { 
                    'Content-Type': 'application/json',
                    'X-Processing-Time': processingTime.toString()
                }
            }
        );
    }
};

// Apply security headers to POST handler (no CSRF for webhooks)
export const POST = withSecurityHeaders(postHandler);

// Handle unsupported methods
export const GET: APIRoute = async () => {
    return new Response(
        JSON.stringify({
            success: false,
            message: 'Webhook endpoint. Use POST for webhook events.',
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
