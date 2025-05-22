// Database Health Check API endpoint
// GET /api/health - Monitor database size, connectivity, and free tier usage

import type { APIRoute } from 'astro';
import { supabaseAdmin, getDatabaseStats, getClientIP } from '../../utils/supabase';
import { withSecurityHeaders } from '../../utils/security';
import { validateSecurityContext } from '../../utils/validation';

export const prerender = false;

const getHandler: APIRoute = async ({ request }) => {
    const requestId = `health_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const clientIP = getClientIP(request);

    // Basic security validation for health endpoint
    const securityValidation = validateSecurityContext(request);
    if (securityValidation.riskLevel === 'high') {
        console.warn(`[${requestId}] High-risk health check request from IP: ${clientIP}`, {
            issues: securityValidation.issues
        });
        return new Response(
            JSON.stringify({
                success: false,
                message: 'Request blocked by security policy',
                timestamp: new Date().toISOString()
            }),
            {
                status: 403,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }
    try {
        const startTime = Date.now();
        
        // Test database connectivity
        const { data: connectionTest, error: connectionError } = await supabaseAdmin
            .from('leads')
            .select('id')
            .limit(1);

        const responseTime = Date.now() - startTime;

        if (connectionError) {
            console.error('Database connection error:', connectionError);
            return new Response(
                JSON.stringify({
                    success: false,
                    database: {
                        connected: false,
                        error: 'Database connection failed',
                        responseTime: `${responseTime}ms`
                    },
                    timestamp: new Date().toISOString()
                }),
                {
                    status: 503,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }

        // Get database size and usage statistics
        const databaseStats = await getDatabaseStats();
        
        if (!databaseStats) {
            return new Response(
                JSON.stringify({
                    success: false,
                    database: {
                        connected: true,
                        error: 'Unable to retrieve database statistics',
                        responseTime: `${responseTime}ms`
                    },
                    timestamp: new Date().toISOString()
                }),
                {
                    status: 500,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }

        // Get lead statistics
        const { data: leadStats, error: leadStatsError } = await supabaseAdmin
            .from('lead_stats')
            .select('*')
            .single();

        let leadStatistics = null;
        if (!leadStatsError && leadStats) {
            leadStatistics = {
                totalLeads: leadStats.total_leads,
                newLeads: leadStats.new_leads,
                contactedLeads: leadStats.contacted_leads,
                qualifiedLeads: leadStats.qualified_leads,
                convertedLeads: leadStats.converted_leads,
                todayLeads: leadStats.today_leads,
                weekLeads: leadStats.week_leads,
                marketingConsentCount: leadStats.marketing_consent_count
            };
        }

        // Determine overall health status
        const percentUsed = databaseStats.percent_of_free_tier;
        let healthStatus = 'healthy';
        let recommendations: string[] = [];

        if (percentUsed >= 90) {
            healthStatus = 'critical';
            recommendations.push('Database usage is at 90%+ of free tier limit');
            recommendations.push('Implement data archiving immediately');
            recommendations.push('Consider upgrading to paid tier');
        } else if (percentUsed >= 80) {
            healthStatus = 'warning';
            recommendations.push('Database usage is at 80%+ of free tier limit');
            recommendations.push('Plan data archiving strategy');
            recommendations.push('Monitor usage more frequently');
        } else if (percentUsed >= 60) {
            healthStatus = 'caution';
            recommendations.push('Database usage is at 60%+ of free tier limit');
            recommendations.push('Review data retention policies');
        }

        if (responseTime > 1000) {
            if (healthStatus === 'healthy') healthStatus = 'caution';
            recommendations.push(`Database response time is slow (${responseTime}ms)`);
        }

        // Success response with comprehensive health data
        return new Response(
            JSON.stringify({
                success: true,
                status: healthStatus,
                database: {
                    connected: true,
                    size: databaseStats.database_size,
                    sizeBytes: databaseStats.database_size_bytes,
                    freeTierStatus: databaseStats.free_tier_status,
                    percentUsed: databaseStats.percent_of_free_tier,
                    responseTime: `${responseTime}ms`
                },
                leads: leadStatistics,
                recommendations,
                monitoring: {
                    freeTierLimit: '500 MB',
                    currentUsage: databaseStats.database_size,
                    remainingSpace: `${Math.max(0, 500 - (databaseStats.database_size_bytes / (1024 * 1024))).toFixed(2)} MB`,
                    projectedDaysUntilFull: leadStatistics ? 
                        calculateProjectedDays(databaseStats.database_size_bytes, leadStatistics.weekLeads) : 
                        null
                },
                timestamp: new Date().toISOString(),
                version: '1.0.0'
            }),
            {
                status: 200,
                headers: { 
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache, no-store, must-revalidate'
                }
            }
        );

    } catch (error) {
        console.error('Health check error:', error);
        
        return new Response(
            JSON.stringify({
                success: false,
                status: 'error',
                message: 'Health check failed',
                error: error instanceof Error ? error.message : 'Unknown error',
                timestamp: new Date().toISOString()
            }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }
};

// Helper function to calculate projected days until database is full
function calculateProjectedDays(currentSizeBytes: number, leadsThisWeek: number): number | null {
    if (!leadsThisWeek || leadsThisWeek === 0) {
        return null; // Cannot project without usage data
    }
    
    const freeTierLimitBytes = 500 * 1024 * 1024; // 500 MB
    const remainingBytes = freeTierLimitBytes - currentSizeBytes;
    
    if (remainingBytes <= 0) {
        return 0; // Already at or over limit
    }
    
    // Estimate bytes per lead (rough calculation)
    // Assuming each lead takes approximately 2KB on average
    const estimatedBytesPerLead = 2048;
    const leadsPerDay = leadsThisWeek / 7;
    const bytesPerDay = leadsPerDay * estimatedBytesPerLead;
    
    if (bytesPerDay <= 0) {
        return null; // No growth
    }
    
    return Math.floor(remainingBytes / bytesPerDay);
}

// Handle unsupported methods
export const POST: APIRoute = async () => {
    return new Response(
        JSON.stringify({
            success: false,
            message: 'Method not allowed. Use GET to check system health.'
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

// Apply security headers to GET handler
export const GET = withSecurityHeaders(getHandler);

export const PUT: APIRoute = POST;
export const DELETE: APIRoute = POST;
export const PATCH: APIRoute = POST;
