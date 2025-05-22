// Supabase client configuration for debt relief lead storage
// This utility provides both client-side and server-side Supabase instances

import { createClient } from '@supabase/supabase-js';

// Environment variables validation
const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseAnonKey = import.meta.env.SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
    throw new Error('Missing SUPABASE_URL environment variable');
}

if (!supabaseAnonKey) {
    throw new Error('Missing SUPABASE_ANON_KEY environment variable');
}

// Client-side Supabase instance (with RLS enforced)
// Use this for any client-side operations that respect Row Level Security
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        persistSession: false, // Disable session persistence for stateless operations
        autoRefreshToken: false
    }
});

// Server-side Supabase instance (bypasses RLS)
// Use this ONLY for server-side API routes that need service-level access
export const supabaseAdmin = (() => {
    if (!supabaseServiceRoleKey) {
        throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY environment variable for admin operations');
    }
    
    return createClient(supabaseUrl, supabaseServiceRoleKey, {
        auth: {
            persistSession: false,
            autoRefreshToken: false
        }
    });
})();

// Database types for TypeScript
export interface Lead {
    id?: string;
    created_at?: string;
    updated_at?: string;
    debt_amount: '10000-15000' | '15000-25000' | '25000-50000' | '50000+';
    debt_type: 'credit-cards' | 'personal-loans' | 'medical' | 'mixed';
    phone: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    consent_marketing: boolean;
    consent_processing: boolean;
    consent_timestamp?: string;
    ip_address?: string;
    user_agent?: string;
    status?: 'new' | 'contacted' | 'qualified' | 'converted' | 'archived';
    source?: string;
    notes?: string;
}

export interface RateLimitRecord {
    id?: string;
    ip_address: string;
    endpoint: string;
    request_count: number;
    window_start: string;
    created_at?: string;
}

export interface DatabaseStats {
    database_size: string;
    database_size_bytes: number;
    free_tier_status: string;
    percent_of_free_tier: number;
}

// Utility function to check database size and free tier usage
export async function getDatabaseStats(): Promise<DatabaseStats | null> {
    try {
        const { data, error } = await supabaseAdmin
            .from('database_size_info')
            .select('*')
            .single();
            
        if (error) {
            console.error('Error fetching database stats:', error);
            return null;
        }
        
        return data;
    } catch (error) {
        console.error('Failed to fetch database stats:', error);
        return null;
    }
}

// Utility function for rate limiting
export async function checkRateLimit(
    ipAddress: string, 
    endpoint: string, 
    maxRequests: number = 5,
    windowMinutes: number = 60
): Promise<{ allowed: boolean; remainingRequests: number }> {
    try {
        const windowStart = new Date();
        windowStart.setMinutes(windowStart.getMinutes() - windowMinutes);
        
        // First, clean up old rate limit records
        await supabaseAdmin
            .rpc('cleanup_old_rate_limits');
        
        // Check current request count in the time window
        const { data: existing, error: fetchError } = await supabaseAdmin
            .from('api_rate_limits')
            .select('request_count')
            .eq('ip_address', ipAddress)
            .eq('endpoint', endpoint)
            .gte('window_start', windowStart.toISOString())
            .order('window_start', { ascending: false })
            .limit(1)
            .single();
            
        if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 = no rows returned
            console.error('Rate limit check error:', fetchError);
            return { allowed: true, remainingRequests: maxRequests }; // Fail open
        }
        
        const currentCount = existing?.request_count || 0;
        
        if (currentCount >= maxRequests) {
            return { allowed: false, remainingRequests: 0 };
        }
        
        // Update or insert rate limit record
        const { error: upsertError } = await supabaseAdmin
            .from('api_rate_limits')
            .upsert({
                ip_address: ipAddress,
                endpoint: endpoint,
                request_count: currentCount + 1,
                window_start: new Date().toISOString()
            }, {
                onConflict: 'ip_address,endpoint,window_start'
            });
            
        if (upsertError) {
            console.error('Rate limit update error:', upsertError);
            return { allowed: true, remainingRequests: maxRequests }; // Fail open
        }
        
        return { 
            allowed: true, 
            remainingRequests: maxRequests - currentCount - 1 
        };
        
    } catch (error) {
        console.error('Rate limiting error:', error);
        return { allowed: true, remainingRequests: maxRequests }; // Fail open on errors
    }
}

// Helper function to get client IP address from Astro request
export function getClientIP(request: Request): string {
    // Check common headers for client IP
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
    
    // Fallback for development
    return '127.0.0.1';
}
