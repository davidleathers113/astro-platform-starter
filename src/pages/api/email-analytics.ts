// Email Analytics and Monitoring API Endpoint
// GET /api/email-analytics - Retrieve email delivery statistics and monitoring data

import type { APIRoute } from 'astro';
import { supabaseAdmin } from '../../utils/supabase';
import { emailService } from '../../emails/service';

export const prerender = false;

// Email analytics interfaces
interface EmailAnalytics {
    timeframe: string;
    totalEmails: number;
    deliveryStats: {
        sent: number;
        delivered: number;
        bounced: number;
        complained: number;
        opened: number;
        clicked: number;
        deliveryRate: number;
        bounceRate: number;
        openRate: number;
        clickRate: number;
    };
    templateStats: Record<string, {
        sent: number;
        delivered: number;
        bounced: number;
        openRate: number;
        clickRate: number;
    }>;
    recentErrors: Array<{
        timestamp: string;
        emailType: string;
        error: string;
        recipientEmail: string;
    }>;
    queueStatus: {
        pending: number;
        processing: number;
        completed: number;
        failed: number;
    };
    usageStats: {
        currentMonth: string;
        emailsThisMonth: number;
        remainingQuota: number;
        percentageUsed: number;
    };
}

// Helper function to calculate rates
function calculateRate(numerator: number, denominator: number): number {
    if (denominator === 0) return 0;
    return Math.round((numerator / denominator) * 100);
}

// Get email analytics from database
async function getEmailAnalyticsFromDB(timeframe: 'hour' | 'day' | 'week' | 'month'): Promise<Partial<EmailAnalytics>> {
    try {
        const now = new Date();
        let cutoffTime: Date;

        switch (timeframe) {
            case 'hour':
                cutoffTime = new Date(now.getTime() - (60 * 60 * 1000));
                break;
            case 'day':
                cutoffTime = new Date(now.getTime() - (24 * 60 * 60 * 1000));
                break;
            case 'week':
                cutoffTime = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000));
                break;
            case 'month':
                cutoffTime = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));
                break;
        }

        // Get email tracking data within timeframe
        const { data: trackingData, error: trackingError } = await supabaseAdmin
            .from('email_tracking')
            .select('*')
            .gte('created_at', cutoffTime.toISOString())
            .order('created_at', { ascending: false });

        if (trackingError) {
            console.error('Error fetching email tracking data:', trackingError);
            return {};
        }

        const emails = trackingData || [];
        const totalEmails = emails.length;

        // Calculate delivery statistics
        const sent = emails.filter(e => e.status && !['failed', 'pending'].includes(e.status)).length;
        const delivered = emails.filter(e => e.status === 'delivered').length;
        const bounced = emails.filter(e => e.status === 'bounced').length;
        const complained = emails.filter(e => e.status === 'complained').length;
        const opened = emails.filter(e => e.opened_at).length;
        const clicked = emails.filter(e => e.clicked_at).length;

        const deliveryStats = {
            sent,
            delivered,
            bounced,
            complained,
            opened,
            clicked,
            deliveryRate: calculateRate(delivered, sent),
            bounceRate: calculateRate(bounced, sent),
            openRate: calculateRate(opened, delivered || sent),
            clickRate: calculateRate(clicked, opened || delivered || sent)
        };

        // Calculate template-specific statistics
        const templateStats: Record<string, any> = {};
        const templateTypes = ['lead_confirmation', 'internal_notification', 'error_notification', 'welcome'];
        
        templateTypes.forEach(templateType => {
            const templateEmails = emails.filter(e => e.email_type === templateType);
            const templateSent = templateEmails.filter(e => e.status && !['failed', 'pending'].includes(e.status)).length;
            const templateDelivered = templateEmails.filter(e => e.status === 'delivered').length;
            const templateBounced = templateEmails.filter(e => e.status === 'bounced').length;
            const templateOpened = templateEmails.filter(e => e.opened_at).length;
            const templateClicked = templateEmails.filter(e => e.clicked_at).length;

            templateStats[templateType] = {
                sent: templateSent,
                delivered: templateDelivered,
                bounced: templateBounced,
                openRate: calculateRate(templateOpened, templateDelivered || templateSent),
                clickRate: calculateRate(templateClicked, templateOpened || templateDelivered || templateSent)
            };
        });

        // Get recent errors
        const recentErrors = emails
            .filter(e => e.error_message)
            .slice(0, 10)
            .map(e => ({
                timestamp: e.created_at,
                emailType: e.email_type,
                error: e.error_message,
                recipientEmail: e.recipient_email === 'internal' ? 'Internal Team' : 
                              e.recipient_email ? e.recipient_email.replace(/(.{2}).*@/, '$1***@') : 'Unknown'
            }));

        // Calculate usage statistics for current month
        const currentMonth = now.toISOString().substring(0, 7); // YYYY-MM format
        const { data: monthlyEmails, error: monthlyError } = await supabaseAdmin
            .from('email_tracking')
            .select('id')
            .gte('created_at', `${currentMonth}-01`)
            .lt('created_at', `${currentMonth}-31`);

        const emailsThisMonth = monthlyEmails?.length || 0;
        const freeQuota = 3000; // Resend free tier
        const remainingQuota = Math.max(0, freeQuota - emailsThisMonth);
        const percentageUsed = Math.round((emailsThisMonth / freeQuota) * 100);

        return {
            timeframe,
            totalEmails,
            deliveryStats,
            templateStats,
            recentErrors,
            usageStats: {
                currentMonth,
                emailsThisMonth,
                remainingQuota,
                percentageUsed
            }
        };

    } catch (error) {
        console.error('Error calculating email analytics:', error);
        return {};
    }
}

export const GET: APIRoute = async ({ request, url }) => {
    const requestId = `analytics_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const startTime = Date.now();

    try {
        // Check authorization (basic API key check)
        const authHeader = request.headers.get('authorization');
        const apiKey = url.searchParams.get('api_key') || authHeader?.replace('Bearer ', '');
        
        // Simple API key validation (in production, use proper auth)
        const validApiKey = import.meta.env.EMAIL_ANALYTICS_API_KEY;
        if (validApiKey && apiKey !== validApiKey) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: 'Invalid API key'
                }),
                {
                    status: 401,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }

        // Parse query parameters
        const timeframe = (url.searchParams.get('timeframe') || 'day') as 'hour' | 'day' | 'week' | 'month';
        const includeQueue = url.searchParams.get('include_queue') === 'true';
        const includeService = url.searchParams.get('include_service') === 'true';

        console.log(`[${requestId}] Fetching email analytics:`, {
            timeframe,
            includeQueue,
            includeService
        });

        // Validate timeframe parameter
        if (!['hour', 'day', 'week', 'month'].includes(timeframe)) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: 'Invalid timeframe. Use: hour, day, week, or month'
                }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }

        // Get analytics from database
        const dbAnalytics = await getEmailAnalyticsFromDB(timeframe);

        // Get queue status from email service if requested
        let queueStatus = { pending: 0, processing: 0, completed: 0, failed: 0 };
        if (includeQueue) {
            try {
                queueStatus = emailService.getQueueStatus();
            } catch (queueError) {
                console.error(`[${requestId}] Failed to get queue status:`, queueError);
            }
        }

        // Get service statistics if requested
        let serviceStats = null;
        if (includeService) {
            try {
                serviceStats = await emailService.getStats(timeframe);
            } catch (serviceError) {
                console.error(`[${requestId}] Failed to get service stats:`, serviceError);
            }
        }

        // Combine analytics
        const analytics: EmailAnalytics = {
            timeframe,
            totalEmails: dbAnalytics.totalEmails || 0,
            deliveryStats: dbAnalytics.deliveryStats || {
                sent: 0,
                delivered: 0,
                bounced: 0,
                complained: 0,
                opened: 0,
                clicked: 0,
                deliveryRate: 0,
                bounceRate: 0,
                openRate: 0,
                clickRate: 0
            },
            templateStats: dbAnalytics.templateStats || {},
            recentErrors: dbAnalytics.recentErrors || [],
            queueStatus,
            usageStats: dbAnalytics.usageStats || {
                currentMonth: new Date().toISOString().substring(0, 7),
                emailsThisMonth: 0,
                remainingQuota: 3000,
                percentageUsed: 0
            }
        };

        // Add service statistics if available
        if (serviceStats) {
            analytics.serviceStats = serviceStats;
        }

        const processingTime = Date.now() - startTime;
        console.log(`[${requestId}] Analytics generated in ${processingTime}ms`);

        return new Response(
            JSON.stringify({
                success: true,
                data: analytics,
                metadata: {
                    requestId,
                    generatedAt: new Date().toISOString(),
                    processingTime
                }
            }),
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'X-Processing-Time': processingTime.toString(),
                    'Cache-Control': 'public, max-age=300' // Cache for 5 minutes
                }
            }
        );

    } catch (error) {
        const processingTime = Date.now() - startTime;
        console.error(`[${requestId}] Analytics error (${processingTime}ms):`, error);

        return new Response(
            JSON.stringify({
                success: false,
                message: 'Failed to generate email analytics',
                error: error instanceof Error ? error.message : 'Unknown error',
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

// Health check endpoint for analytics service
export const HEAD: APIRoute = async () => {
    try {
        // Quick health check - verify database connection
        await supabaseAdmin.from('email_tracking').select('count').limit(1);
        
        return new Response(null, {
            status: 200,
            headers: {
                'X-Service-Status': 'healthy',
                'X-Service-Name': 'email-analytics'
            }
        });
    } catch (error) {
        return new Response(null, {
            status: 503,
            headers: {
                'X-Service-Status': 'unhealthy',
                'X-Service-Name': 'email-analytics'
            }
        });
    }
};

// Handle unsupported methods
const methodNotAllowed: APIRoute = async () => {
    return new Response(
        JSON.stringify({
            success: false,
            message: 'Method not allowed. Use GET for analytics data.',
            allowedMethods: ['GET', 'HEAD']
        }),
        {
            status: 405,
            headers: {
                'Content-Type': 'application/json',
                'Allow': 'GET, HEAD'
            }
        }
    );
};

export const POST: APIRoute = methodNotAllowed;
export const PUT: APIRoute = methodNotAllowed;
export const DELETE: APIRoute = methodNotAllowed;
export const PATCH: APIRoute = methodNotAllowed;
