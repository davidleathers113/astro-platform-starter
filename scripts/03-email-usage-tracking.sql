-- Email Usage Tracking Table for Resend Integration
-- This script adds email usage tracking functionality for monitoring free tier limits
-- Run this AFTER the main schema and RLS scripts

-- Create email_usage table for tracking Resend email sends
CREATE TABLE IF NOT EXISTS email_usage (
    -- Primary key and audit fields
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    
    -- Email tracking data
    email_type TEXT NOT NULL CHECK (email_type IN ('user_confirmation', 'internal_notification', 'usage_alert')),
    lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
    sent_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    month_year TEXT NOT NULL, -- Format: YYYY-MM (e.g., "2025-01")
    
    -- Optional metadata
    recipient_email TEXT,
    subject TEXT,
    resend_message_id TEXT,
    
    -- Free tier optimization: limit text field sizes  
    CONSTRAINT email_type_length CHECK (LENGTH(email_type) <= 50),
    CONSTRAINT month_year_format CHECK (month_year ~ '^\d{4}-\d{2}$'),
    CONSTRAINT subject_length CHECK (subject IS NULL OR LENGTH(subject) <= 200),
    CONSTRAINT recipient_length CHECK (recipient_email IS NULL OR LENGTH(recipient_email) <= 100)
);

-- Create index for monthly usage queries (primary use case)
CREATE INDEX IF NOT EXISTS idx_email_usage_month_year ON email_usage(month_year);

-- Create index for lead-based email tracking
CREATE INDEX IF NOT EXISTS idx_email_usage_lead_id ON email_usage(lead_id) WHERE lead_id IS NOT NULL;

-- Create index for email type filtering
CREATE INDEX IF NOT EXISTS idx_email_usage_type ON email_usage(email_type);

-- Create composite index for efficient monthly usage by type queries
CREATE INDEX IF NOT EXISTS idx_email_usage_month_type ON email_usage(month_year, email_type);

-- Enable Row Level Security on email_usage table
ALTER TABLE email_usage ENABLE ROW LEVEL SECURITY;

-- Allow service role to manage email usage tracking
CREATE POLICY "email_usage_service_policy" ON email_usage
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- Allow authenticated admin users to read email usage stats
CREATE POLICY "email_usage_admin_read_policy" ON email_usage
    FOR SELECT
    TO authenticated
    USING (is_admin());

-- Create a view for monthly email usage statistics
CREATE OR REPLACE VIEW email_usage_stats AS
SELECT 
    month_year,
    COUNT(*) as total_emails,
    COUNT(CASE WHEN email_type = 'user_confirmation' THEN 1 END) as user_confirmations,
    COUNT(CASE WHEN email_type = 'internal_notification' THEN 1 END) as internal_notifications,
    COUNT(CASE WHEN email_type = 'usage_alert' THEN 1 END) as usage_alerts,
    ROUND((COUNT(*)::numeric / 3000) * 100, 2) as percent_of_free_tier,
    CASE 
        WHEN COUNT(*) >= 3000 THEN 'LIMIT_REACHED'
        WHEN COUNT(*) >= 2700 THEN 'CRITICAL' -- 90%
        WHEN COUNT(*) >= 2250 THEN 'WARNING'  -- 75%
        ELSE 'OK'
    END as tier_status,
    3000 - COUNT(*) as remaining_emails,
    MIN(sent_at) as first_email_sent,
    MAX(sent_at) as last_email_sent
FROM email_usage
GROUP BY month_year
ORDER BY month_year DESC;

-- Grant permissions on the view
ALTER VIEW email_usage_stats OWNER TO postgres;
GRANT SELECT ON email_usage_stats TO service_role;
GRANT SELECT ON email_usage_stats TO authenticated;

-- Create a function to get current month usage
CREATE OR REPLACE FUNCTION get_current_month_email_usage()
RETURNS JSON AS $$
DECLARE
    current_month TEXT;
    result JSON;
BEGIN
    current_month := TO_CHAR(NOW(), 'YYYY-MM');
    
    SELECT json_build_object(
        'month', current_month,
        'total_emails', COALESCE(total_emails, 0),
        'user_confirmations', COALESCE(user_confirmations, 0),
        'internal_notifications', COALESCE(internal_notifications, 0),
        'usage_alerts', COALESCE(usage_alerts, 0),
        'percent_of_free_tier', COALESCE(percent_of_free_tier, 0),
        'tier_status', COALESCE(tier_status, 'OK'),
        'remaining_emails', COALESCE(remaining_emails, 3000),
        'last_email_sent', last_email_sent
    ) INTO result
    FROM email_usage_stats
    WHERE month_year = current_month;
    
    -- If no data for current month, return default values
    IF result IS NULL THEN
        result := json_build_object(
            'month', current_month,
            'total_emails', 0,
            'user_confirmations', 0,
            'internal_notifications', 0,
            'usage_alerts', 0,
            'percent_of_free_tier', 0,
            'tier_status', 'OK',
            'remaining_emails', 3000,
            'last_email_sent', null
        );
    END IF;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to service role for API access
GRANT EXECUTE ON FUNCTION get_current_month_email_usage() TO service_role;

-- Create a cleanup function for old email usage records (keep 12 months)
CREATE OR REPLACE FUNCTION cleanup_old_email_usage()
RETURNS void AS $$
BEGIN
    -- Delete email usage records older than 12 months
    DELETE FROM email_usage 
    WHERE sent_at < NOW() - INTERVAL '12 months';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to service role
GRANT EXECUTE ON FUNCTION cleanup_old_email_usage() TO service_role;

-- Add comments for documentation
COMMENT ON TABLE email_usage IS 'Tracks email sends through Resend for free tier monitoring and compliance';
COMMENT ON COLUMN email_usage.email_type IS 'Type of email sent (user_confirmation, internal_notification, usage_alert)';
COMMENT ON COLUMN email_usage.lead_id IS 'Reference to lead that triggered the email (nullable for system emails)';
COMMENT ON COLUMN email_usage.month_year IS 'Month/year for aggregated usage tracking (format: YYYY-MM)';
COMMENT ON COLUMN email_usage.resend_message_id IS 'Resend API message ID for delivery tracking';
COMMENT ON VIEW email_usage_stats IS 'Monthly email usage statistics for free tier monitoring';
COMMENT ON FUNCTION get_current_month_email_usage() IS 'Returns current month email usage as JSON';

-- Test the setup by checking if current month usage function works
SELECT 'Email usage tracking setup completed successfully!' as status,
       'Current month usage:' as test_label,
       get_current_month_email_usage() as current_usage;
