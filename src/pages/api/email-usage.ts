// API endpoint for email usage monitoring and statistics
// GET /api/email-usage - Get current email usage statistics for Resend free tier monitoring

import type { APIRoute } from 'astro';
import { getEmailUsageStats, checkEmailLimits } from '../../utils/email';
import { supabaseAdmin } from '../../utils/supabase';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
    try {
        // Get current email usage statistics
        const usageStats = await getEmailUsageStats();
        const limitCheck = await checkEmailLimits();
        
        if (!usageStats) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: 'Unable to fetch email usage statistics',
                    error: 'Database query failed'
                }),
                {
                    status: 500,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }

        // Get additional statistics from the database
        let monthlyBreakdown = null;
        try {
            const { data: monthlyData, error: monthlyError } = await supabaseAdmin
                .from('email_usage_stats')
                .select('*')
                .order('month_year', { ascending: false })
                .limit(6); // Last 6 months

            if (monthlyError) {
                console.error('Failed to fetch monthly breakdown:', monthlyError);
            } else {
                monthlyBreakdown = monthlyData;
            }
        } catch (error) {
            console.error('Error fetching monthly breakdown:', error);
        }

        // Prepare response data
        const responseData = {
            success: true,
            currentMonth: {
                month: usageStats.currentMonth,
                emailsSent: usageStats.emailsSent,
                remainingEmails: usageStats.remainingEmails,
                percentageUsed: Math.round(usageStats.percentageUsed * 100) / 100,
                freeTierLimit: 3000,
                status: limitCheck.canSend ? (
                    usageStats.isCritical ? 'CRITICAL' :
                    usageStats.isNearLimit ? 'WARNING' : 'OK'
                ) : 'LIMIT_EXCEEDED'
            },
            limits: {
                canSendEmails: limitCheck.canSend,
                limitReason: limitCheck.reason || null,
                isNearLimit: usageStats.isNearLimit,
                isCritical: usageStats.isCritical
            },
            monthlyBreakdown,
            timestamp: new Date().toISOString()
        };

        return new Response(
            JSON.stringify(responseData),
            {
                status: 200,
                headers: { 
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache, no-store, must-revalidate'
                }
            }
        );

    } catch (error) {
        console.error('Email usage API error:', error);
        
        return new Response(
            JSON.stringify({
                success: false,
                message: 'Failed to fetch email usage statistics',
                error: error instanceof Error ? error.message : 'Unknown error'
            }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }
};

// Handle unsupported methods
export const POST: APIRoute = async () => {
    return new Response(
        JSON.stringify({
            success: false,
            message: 'Method not allowed. Use GET to fetch email usage statistics.'
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

// Export other methods as not allowed
export const PUT: APIRoute = POST;
export const DELETE: APIRoute = POST;
export const PATCH: APIRoute = POST;
