-- Supabase Database Schema for Debt Relief Lead Storage
-- This script sets up the leads table with GDPR compliance and free tier optimization
-- Run this in the Supabase SQL Editor

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create leads table for debt relief form submissions
CREATE TABLE IF NOT EXISTS leads (
    -- Primary key and audit fields
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    
    -- Core form data (from qualification form)
    debt_amount TEXT NOT NULL CHECK (debt_amount IN ('10000-15000', '15000-25000', '25000-50000', '50000+')),
    debt_type TEXT NOT NULL CHECK (debt_type IN ('credit-cards', 'personal-loans', 'medical', 'mixed')),
    phone TEXT NOT NULL CHECK (phone ~ '^[0-9]{10}$'),
    
    -- Additional contact information (optional, for enhanced forms)
    first_name TEXT,
    last_name TEXT,
    email TEXT CHECK (email IS NULL OR email ~ '^[^@]+@[^@]+\.[^@]+$'),
    
    -- GDPR compliance fields (required for legal compliance)
    consent_marketing BOOLEAN NOT NULL DEFAULT false,
    consent_processing BOOLEAN NOT NULL DEFAULT true,
    consent_timestamp TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    ip_address INET,
    user_agent TEXT,
    
    -- Lead management and tracking
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'archived')),
    source TEXT DEFAULT 'qualification-form',
    notes TEXT,
    
    -- Free tier optimization: limit text field sizes
    CONSTRAINT phone_length CHECK (LENGTH(phone) = 10),
    CONSTRAINT first_name_length CHECK (first_name IS NULL OR LENGTH(first_name) <= 50),
    CONSTRAINT last_name_length CHECK (last_name IS NULL OR LENGTH(last_name) <= 50),
    CONSTRAINT email_length CHECK (email IS NULL OR LENGTH(email) <= 100),
    CONSTRAINT notes_length CHECK (notes IS NULL OR LENGTH(notes) <= 1000)
);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for automatic updated_at maintenance
DROP TRIGGER IF EXISTS update_leads_updated_at ON leads;
CREATE TRIGGER update_leads_updated_at
    BEFORE UPDATE ON leads
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for performance (minimal set for free tier)
-- Index on email for GDPR data export queries
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email) WHERE email IS NOT NULL;

-- Index on phone for duplicate checking and lookups
CREATE INDEX IF NOT EXISTS idx_leads_phone ON leads(phone);

-- Index on status for lead management queries
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);

-- Index on created_at for time-based queries and archiving
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);

-- Composite index for common queries (status + created_at)
CREATE INDEX IF NOT EXISTS idx_leads_status_created ON leads(status, created_at);

-- Add comments for documentation
COMMENT ON TABLE leads IS 'Stores debt relief lead submissions with GDPR compliance and free tier optimization';
COMMENT ON COLUMN leads.debt_amount IS 'Debt amount range selected by user';
COMMENT ON COLUMN leads.debt_type IS 'Type of debt user has';
COMMENT ON COLUMN leads.phone IS 'User phone number (10 digits, no formatting)';
COMMENT ON COLUMN leads.consent_processing IS 'Required GDPR consent for data processing';
COMMENT ON COLUMN leads.consent_marketing IS 'Optional consent for marketing communications';
COMMENT ON COLUMN leads.ip_address IS 'User IP address for audit trail';
COMMENT ON COLUMN leads.status IS 'Lead status for CRM workflow';

-- Create a simple view for lead statistics (useful for monitoring)
CREATE OR REPLACE VIEW lead_stats AS
SELECT 
    COUNT(*) as total_leads,
    COUNT(CASE WHEN status = 'new' THEN 1 END) as new_leads,
    COUNT(CASE WHEN status = 'contacted' THEN 1 END) as contacted_leads,
    COUNT(CASE WHEN status = 'qualified' THEN 1 END) as qualified_leads,
    COUNT(CASE WHEN status = 'converted' THEN 1 END) as converted_leads,
    COUNT(CASE WHEN created_at >= CURRENT_DATE THEN 1 END) as today_leads,
    COUNT(CASE WHEN created_at >= CURRENT_DATE - INTERVAL '7 days' THEN 1 END) as week_leads,
    COUNT(CASE WHEN consent_marketing = true THEN 1 END) as marketing_consent_count
FROM leads;

-- Grant permissions to authenticated users (will be refined in RLS policies)
GRANT SELECT, INSERT, UPDATE, DELETE ON leads TO authenticated;
GRANT SELECT ON lead_stats TO authenticated;

-- Database size monitoring query (for free tier management)
-- Usage: SELECT * FROM database_size_info;
CREATE OR REPLACE VIEW database_size_info AS
SELECT 
    pg_size_pretty(pg_database_size(current_database())) as database_size,
    pg_database_size(current_database()) as database_size_bytes,
    CASE 
        WHEN pg_database_size(current_database()) > 450 * 1024 * 1024 THEN 'WARNING: Approaching 500MB limit'
        WHEN pg_database_size(current_database()) > 400 * 1024 * 1024 THEN 'CAUTION: 80% of free tier used'
        ELSE 'OK'
    END as free_tier_status,
    ROUND((pg_database_size(current_database())::numeric / (500 * 1024 * 1024)) * 100, 2) as percent_of_free_tier;

GRANT SELECT ON database_size_info TO authenticated;

-- Success message
SELECT 'Database schema created successfully! Run the RLS policies script next.' as status;
