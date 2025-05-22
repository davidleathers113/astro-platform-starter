-- Email Tracking Table for Detailed Email Delivery Monitoring
-- This script creates the email_tracking table used by the leads API and resend webhook
-- Run this AFTER the main schema, RLS, and email usage scripts

-- Create email_tracking table for comprehensive email delivery tracking
CREATE TABLE IF NOT EXISTS email_tracking (
    -- Primary key and audit fields
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    
    -- Lead and request tracking
    lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
    request_id TEXT, -- Request ID from the API call that triggered this email
    
    -- Email identification
    email_type TEXT NOT NULL CHECK (email_type IN ('lead_confirmation', 'internal_notification', 'error_notification', 'welcome')),
    email_id TEXT, -- Resend email ID returned from send operation
    recipient_email TEXT NOT NULL,
    
    -- Initial sending status
    success BOOLEAN NOT NULL DEFAULT false,
    error_message TEXT,
    
    -- Delivery tracking (updated by webhooks)
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'delivered', 'bounced', 'complained', 'failed')),
    sent_at TIMESTAMPTZ,
    delivered_at TIMESTAMPTZ,
    bounced_at TIMESTAMPTZ,
    complained_at TIMESTAMPTZ,
    
    -- Engagement tracking (updated by webhooks)
    opened_at TIMESTAMPTZ,
    clicked_at TIMESTAMPTZ,
    open_count INTEGER DEFAULT 0,
    click_count INTEGER DEFAULT 0,
    
    -- Bounce and complaint details
    bounce_type TEXT CHECK (bounce_type IS NULL OR bounce_type IN ('hard', 'soft')),
    complaint_type TEXT CHECK (complaint_type IS NULL OR complaint_type IN ('abuse', 'auth-failure', 'fraud', 'not-spam', 'other', 'virus')),
    
    -- Webhook metadata
    webhook_event_type TEXT,
    webhook_received_at TIMESTAMPTZ,
    last_open_user_agent TEXT,
    last_open_ip INET,
    last_clicked_url TEXT,
    
    -- Free tier optimization: limit text field sizes
    CONSTRAINT email_type_length CHECK (LENGTH(email_type) <= 50),
    CONSTRAINT email_id_length CHECK (email_id IS NULL OR LENGTH(email_id) <= 100),
    CONSTRAINT recipient_email_length CHECK (LENGTH(recipient_email) <= 100),
    CONSTRAINT error_message_length CHECK (error_message IS NULL OR LENGTH(error_message) <= 500),
    CONSTRAINT request_id_length CHECK (request_id IS NULL OR LENGTH(request_id) <= 100),
    CONSTRAINT bounce_type_length CHECK (bounce_type IS NULL OR LENGTH(bounce_type) <= 20),
    CONSTRAINT complaint_type_length CHECK (complaint_type IS NULL OR LENGTH(complaint_type) <= 50),
    CONSTRAINT webhook_event_type_length CHECK (webhook_event_type IS NULL OR LENGTH(webhook_event_type) <= 50),
    CONSTRAINT last_open_user_agent_length CHECK (last_open_user_agent IS NULL OR LENGTH(last_open_user_agent) <= 200),
    CONSTRAINT last_clicked_url_length CHECK (last_clicked_url IS NULL OR LENGTH(last_clicked_url) <= 500)
);

-- Create trigger for automatic updated_at maintenance
DROP TRIGGER IF EXISTS update_email_tracking_updated_at ON email_tracking;
CREATE TRIGGER update_email_tracking_updated_at
    BEFORE UPDATE ON email_tracking
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for performance optimization

-- Primary lookup index by email_id (used by webhooks)
CREATE INDEX IF NOT EXISTS idx_email_tracking_email_id ON email_tracking(email_id) WHERE email_id IS NOT NULL;

-- Lead-based queries (for lead management)
CREATE INDEX IF NOT EXISTS idx_email_tracking_lead_id ON email_tracking(lead_id) WHERE lead_id IS NOT NULL;

-- Time-based analytics queries (most common)
CREATE INDEX IF NOT EXISTS idx_email_tracking_created_at ON email_tracking(created_at);

-- Status filtering for delivery monitoring
CREATE INDEX IF NOT EXISTS idx_email_tracking_status ON email_tracking(status);

-- Email type filtering for template analytics  
CREATE INDEX IF NOT EXISTS idx_email_tracking_email_type ON email_tracking(email_type);

-- Engagement tracking (for analytics)
CREATE INDEX IF NOT EXISTS idx_email_tracking_opened_at ON email_tracking(opened_at) WHERE opened_at IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_email_tracking_clicked_at ON email_tracking(clicked_at) WHERE clicked_at IS NOT NULL;

-- Composite index for common analytics queries (type + created_at)
CREATE INDEX IF NOT EXISTS idx_email_tracking_type_created ON email_tracking(email_type, created_at);

-- Composite index for delivery rate analysis (status + created_at)
CREATE INDEX IF NOT EXISTS idx_email_tracking_status_created ON email_tracking(status, created_at);

-- Request ID lookup for debugging and correlation
CREATE INDEX IF NOT EXISTS idx_email_tracking_request_id ON email_tracking(request_id) WHERE request_id IS NOT NULL;

-- Enable Row Level Security
ALTER TABLE email_tracking ENABLE ROW LEVEL SECURITY;

-- Allow service role to manage all email tracking records
CREATE POLICY "email_tracking_service_policy" ON email_tracking
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- Allow authenticated admin users to read email tracking data
CREATE POLICY "email_tracking_admin_read_policy" ON email_tracking
    FOR SELECT
    TO authenticated
    USING (is_admin());

-- Create comprehensive email tracking statistics view
CREATE OR REPLACE VIEW email_tracking_stats AS
SELECT 
    -- Time periods
    DATE_TRUNC('day', created_at) as date,
    DATE_TRUNC('hour', created_at) as hour,
    
    -- Basic counts
    COUNT(*) as total_emails,
    COUNT(CASE WHEN success = true THEN 1 END) as successful_sends,
    COUNT(CASE WHEN success = false THEN 1 END) as failed_sends,
    
    -- Delivery status counts
    COUNT(CASE WHEN status = 'sent' THEN 1 END) as sent_count,
    COUNT(CASE WHEN status = 'delivered' THEN 1 END) as delivered_count,
    COUNT(CASE WHEN status = 'bounced' THEN 1 END) as bounced_count,
    COUNT(CASE WHEN status = 'complained' THEN 1 END) as complained_count,
    COUNT(CASE WHEN status = 'failed' THEN 1 END) as failed_count,
    
    -- Engagement counts
    COUNT(CASE WHEN opened_at IS NOT NULL THEN 1 END) as opened_count,
    COUNT(CASE WHEN clicked_at IS NOT NULL THEN 1 END) as clicked_count,
    SUM(open_count) as total_opens,
    SUM(click_count) as total_clicks,
    
    -- Calculate rates
    ROUND(
        CASE 
            WHEN COUNT(CASE WHEN success = true THEN 1 END) > 0 
            THEN (COUNT(CASE WHEN status = 'delivered' THEN 1 END)::numeric / COUNT(CASE WHEN success = true THEN 1 END)) * 100 
            ELSE 0 
        END, 2
    ) as delivery_rate,
    
    ROUND(
        CASE 
            WHEN COUNT(CASE WHEN success = true THEN 1 END) > 0 
            THEN (COUNT(CASE WHEN status = 'bounced' THEN 1 END)::numeric / COUNT(CASE WHEN success = true THEN 1 END)) * 100 
            ELSE 0 
        END, 2
    ) as bounce_rate,
    
    ROUND(
        CASE 
            WHEN COUNT(CASE WHEN status = 'delivered' THEN 1 END) > 0 
            THEN (COUNT(CASE WHEN opened_at IS NOT NULL THEN 1 END)::numeric / COUNT(CASE WHEN status = 'delivered' THEN 1 END)) * 100 
            ELSE 0 
        END, 2
    ) as open_rate,
    
    ROUND(
        CASE 
            WHEN COUNT(CASE WHEN opened_at IS NOT NULL THEN 1 END) > 0 
            THEN (COUNT(CASE WHEN clicked_at IS NOT NULL THEN 1 END)::numeric / COUNT(CASE WHEN opened_at IS NOT NULL THEN 1 END)) * 100 
            ELSE 0 
        END, 2
    ) as click_rate,
    
    -- Email type breakdown
    COUNT(CASE WHEN email_type = 'lead_confirmation' THEN 1 END) as lead_confirmation_count,
    COUNT(CASE WHEN email_type = 'internal_notification' THEN 1 END) as internal_notification_count,
    COUNT(CASE WHEN email_type = 'error_notification' THEN 1 END) as error_notification_count,
    COUNT(CASE WHEN email_type = 'welcome' THEN 1 END) as welcome_count
    
FROM email_tracking
GROUP BY DATE_TRUNC('day', created_at), DATE_TRUNC('hour', created_at)
ORDER BY date DESC, hour DESC;

-- Grant permissions on the view
ALTER VIEW email_tracking_stats OWNER TO postgres;
GRANT SELECT ON email_tracking_stats TO service_role;
GRANT SELECT ON email_tracking_stats TO authenticated;

-- Create function to get real-time email tracking summary
CREATE OR REPLACE FUNCTION get_email_tracking_summary(timeframe_hours INTEGER DEFAULT 24)
RETURNS JSON AS $$
DECLARE
    result JSON;
    cutoff_time TIMESTAMPTZ;
BEGIN
    cutoff_time := NOW() - (timeframe_hours || ' hours')::INTERVAL;
    
    SELECT json_build_object(
        'timeframe_hours', timeframe_hours,
        'summary', json_build_object(
            'total_emails', COUNT(*),
            'successful_sends', COUNT(CASE WHEN success = true THEN 1 END),
            'failed_sends', COUNT(CASE WHEN success = false THEN 1 END),
            'delivered', COUNT(CASE WHEN status = 'delivered' THEN 1 END),
            'bounced', COUNT(CASE WHEN status = 'bounced' THEN 1 END),
            'complained', COUNT(CASE WHEN status = 'complained' THEN 1 END),
            'opened', COUNT(CASE WHEN opened_at IS NOT NULL THEN 1 END),
            'clicked', COUNT(CASE WHEN clicked_at IS NOT NULL THEN 1 END)
        ),
        'rates', json_build_object(
            'delivery_rate', ROUND(
                CASE 
                    WHEN COUNT(CASE WHEN success = true THEN 1 END) > 0 
                    THEN (COUNT(CASE WHEN status = 'delivered' THEN 1 END)::numeric / COUNT(CASE WHEN success = true THEN 1 END)) * 100 
                    ELSE 0 
                END, 2
            ),
            'bounce_rate', ROUND(
                CASE 
                    WHEN COUNT(CASE WHEN success = true THEN 1 END) > 0 
                    THEN (COUNT(CASE WHEN status = 'bounced' THEN 1 END)::numeric / COUNT(CASE WHEN success = true THEN 1 END)) * 100 
                    ELSE 0 
                END, 2
            ),
            'open_rate', ROUND(
                CASE 
                    WHEN COUNT(CASE WHEN status = 'delivered' THEN 1 END) > 0 
                    THEN (COUNT(CASE WHEN opened_at IS NOT NULL THEN 1 END)::numeric / COUNT(CASE WHEN status = 'delivered' THEN 1 END)) * 100 
                    ELSE 0 
                END, 2
            ),
            'click_rate', ROUND(
                CASE 
                    WHEN COUNT(CASE WHEN opened_at IS NOT NULL THEN 1 END) > 0 
                    THEN (COUNT(CASE WHEN clicked_at IS NOT NULL THEN 1 END)::numeric / COUNT(CASE WHEN opened_at IS NOT NULL THEN 1 END)) * 100 
                    ELSE 0 
                END, 2
            )
        ),
        'by_template', json_build_object(
            'lead_confirmation', COUNT(CASE WHEN email_type = 'lead_confirmation' THEN 1 END),
            'internal_notification', COUNT(CASE WHEN email_type = 'internal_notification' THEN 1 END),
            'error_notification', COUNT(CASE WHEN email_type = 'error_notification' THEN 1 END),
            'welcome', COUNT(CASE WHEN email_type = 'welcome' THEN 1 END)
        ),
        'recent_errors', (
            SELECT json_agg(
                json_build_object(
                    'created_at', created_at,
                    'email_type', email_type,
                    'error_message', error_message,
                    'recipient_email', 
                    CASE 
                        WHEN recipient_email = 'internal' THEN 'Internal Team'
                        WHEN recipient_email LIKE '%@%' THEN SUBSTRING(recipient_email FROM 1 FOR 3) || '***@' || SUBSTRING(recipient_email FROM POSITION('@' IN recipient_email) + 1)
                        ELSE 'Unknown'
                    END
                )
            )
            FROM (
                SELECT created_at, email_type, error_message, recipient_email
                FROM email_tracking 
                WHERE created_at >= cutoff_time 
                  AND error_message IS NOT NULL
                ORDER BY created_at DESC
                LIMIT 5
            ) recent_errors_subquery
        ),
        'generated_at', NOW()
    ) INTO result
    FROM email_tracking
    WHERE created_at >= cutoff_time;
    
    -- Return default structure if no data
    IF result IS NULL THEN
        result := json_build_object(
            'timeframe_hours', timeframe_hours,
            'summary', json_build_object(
                'total_emails', 0,
                'successful_sends', 0,
                'failed_sends', 0,
                'delivered', 0,
                'bounced', 0,
                'complained', 0,
                'opened', 0,
                'clicked', 0
            ),
            'rates', json_build_object(
                'delivery_rate', 0,
                'bounce_rate', 0,
                'open_rate', 0,
                'click_rate', 0
            ),
            'by_template', json_build_object(
                'lead_confirmation', 0,
                'internal_notification', 0,
                'error_notification', 0,
                'welcome', 0
            ),
            'recent_errors', '[]'::json,
            'generated_at', NOW()
        );
    END IF;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to service role for API access
GRANT EXECUTE ON FUNCTION get_email_tracking_summary(INTEGER) TO service_role;

-- Create a function to clean up old email tracking records (keep 90 days)
CREATE OR REPLACE FUNCTION cleanup_old_email_tracking()
RETURNS INTEGER AS $$
DECLARE
    deleted_count INTEGER;
BEGIN
    -- Delete email tracking records older than 90 days
    DELETE FROM email_tracking 
    WHERE created_at < NOW() - INTERVAL '90 days';
    
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    
    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to service role
GRANT EXECUTE ON FUNCTION cleanup_old_email_tracking() TO service_role;

-- Add comments for documentation
COMMENT ON TABLE email_tracking IS 'Comprehensive email delivery tracking for all transactional emails sent through Resend';
COMMENT ON COLUMN email_tracking.lead_id IS 'Reference to the lead that triggered this email (nullable for system emails)';
COMMENT ON COLUMN email_tracking.email_type IS 'Type of email template used (lead_confirmation, internal_notification, error_notification, welcome)';
COMMENT ON COLUMN email_tracking.email_id IS 'Resend API message ID returned from send operation';
COMMENT ON COLUMN email_tracking.success IS 'Whether the initial email send attempt was successful';
COMMENT ON COLUMN email_tracking.status IS 'Current delivery status updated by webhooks (pending, sent, delivered, bounced, complained, failed)';
COMMENT ON COLUMN email_tracking.request_id IS 'Original API request ID that triggered this email for correlation';
COMMENT ON VIEW email_tracking_stats IS 'Aggregated email tracking statistics by day and hour for analytics';
COMMENT ON FUNCTION get_email_tracking_summary(INTEGER) IS 'Returns real-time email tracking summary for specified hours (default 24h)';

-- Test the setup by checking if the summary function works
SELECT 'Email tracking table setup completed successfully!' as status,
       'Current tracking summary:' as test_label,
       get_email_tracking_summary(24) as current_summary;
