-- Row Level Security Policies for Debt Relief Lead Storage
-- This script sets up RLS policies with minimal but secure access patterns
-- Run this AFTER the schema creation script

-- Enable Row Level Security on the leads table
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Policy 1: Allow API service role to insert new leads
-- This is used by the form submission API endpoint
CREATE POLICY "leads_api_insert_policy" ON leads
    FOR INSERT
    TO service_role
    WITH CHECK (true);

-- Policy 2: Allow API service role to read leads for data export (GDPR)
-- This is used for Subject Access Request exports
CREATE POLICY "leads_api_read_policy" ON leads
    FOR SELECT
    TO service_role
    USING (true);

-- Policy 3: Allow authenticated admin users full access to leads
-- This is for admin dashboard access (future implementation)
CREATE POLICY "leads_admin_full_access" ON leads
    FOR ALL
    TO authenticated
    USING (
        -- Only allow if user has admin role
        -- Note: This will need to be updated when user roles are implemented
        auth.jwt() ->> 'role' = 'admin'
    );

-- Policy 4: Allow API service role to update lead status
-- This is for lead management operations
CREATE POLICY "leads_api_update_policy" ON leads
    FOR UPDATE
    TO service_role
    USING (true)
    WITH CHECK (true);

-- Policy 5: Allow API service role to delete leads (for GDPR deletion requests)
CREATE POLICY "leads_api_delete_policy" ON leads
    FOR DELETE
    TO service_role
    USING (true);

-- Ensure the lead_stats view respects RLS
-- The view inherits permissions from the underlying table
ALTER VIEW lead_stats OWNER TO postgres;

-- Ensure database_size_info view is accessible to service role
ALTER VIEW database_size_info OWNER TO postgres;
GRANT SELECT ON database_size_info TO service_role;

-- Create a simple rate limiting table for API protection
CREATE TABLE IF NOT EXISTS api_rate_limits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ip_address INET NOT NULL,
    endpoint TEXT NOT NULL,
    request_count INTEGER DEFAULT 1,
    window_start TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Composite unique constraint for IP + endpoint combination
    UNIQUE(ip_address, endpoint, window_start)
);

-- Enable RLS on rate limits table
ALTER TABLE api_rate_limits ENABLE ROW LEVEL SECURITY;

-- Allow service role to manage rate limiting data
CREATE POLICY "rate_limits_service_policy" ON api_rate_limits
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- Create index for efficient rate limit queries
CREATE INDEX IF NOT EXISTS idx_rate_limits_lookup ON api_rate_limits(ip_address, endpoint, window_start);

-- Create a cleanup function for old rate limit records
CREATE OR REPLACE FUNCTION cleanup_old_rate_limits()
RETURNS void AS $$
BEGIN
    -- Delete rate limit records older than 24 hours
    DELETE FROM api_rate_limits 
    WHERE window_start < NOW() - INTERVAL '24 hours';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to service role
GRANT EXECUTE ON FUNCTION cleanup_old_rate_limits() TO service_role;

-- Add comments for documentation
COMMENT ON TABLE api_rate_limits IS 'Rate limiting data for API endpoint protection';
COMMENT ON POLICY "leads_api_insert_policy" ON leads IS 'Allows API service role to insert new leads from form submissions';
COMMENT ON POLICY "leads_admin_full_access" ON leads IS 'Allows authenticated admin users full CRUD access to leads';
COMMENT ON POLICY "leads_api_read_policy" ON leads IS 'Allows API service role to read leads for GDPR data exports';

-- Create a function to check if a user has admin privileges
-- This will be used by the admin policy and can be extended later
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean AS $$
BEGIN
    -- For now, check if the JWT contains an admin role
    -- This can be extended to check a user_roles table in the future
    RETURN COALESCE(auth.jwt() ->> 'role' = 'admin', false);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION is_admin() TO authenticated;

-- Test RLS policies are working
-- This should return 0 rows when run as an anonymous user
SELECT 'RLS policies created successfully!' as status,
       'Anonymous users should see 0 leads:' as test_label,
       COUNT(*) as anonymous_lead_count
FROM leads;

-- Success message
SELECT 'Row Level Security policies configured successfully!' as status;
