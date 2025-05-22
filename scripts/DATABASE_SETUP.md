# Supabase Database Setup Guide for Debt Relief Form Backend

This guide provides step-by-step instructions for setting up the Supabase database for the debt relief lead capture system.

## Prerequisites

- A Supabase account (free tier is sufficient)
- Access to the Supabase dashboard
- Basic understanding of SQL and PostgreSQL

## Step 1: Create Supabase Project

1. **Sign up or log in** to [Supabase](https://app.supabase.com)

2. **Create a new project**:
   - Click "New Project"
   - Choose your organization
   - Project name: `debt-relief-leads` (or similar)
   - Database password: Generate a strong password and save it securely
   - Region: Choose based on your data residency requirements
     - For GDPR compliance, consider EU regions
     - For US-based operations, use US regions for better performance

3. **Wait for project creation** (usually takes 1-2 minutes)

## Step 2: Configure Environment Variables

1. **Get your project credentials**:
   - Go to Settings → API in your Supabase dashboard
   - Copy the following values:
     - Project URL
     - `anon public` key
     - `service_role` key (keep this secret!)

2. **Update your .env file**:
   ```env
   SUPABASE_URL="https://your-project-id.supabase.co"
   SUPABASE_ANON_KEY="your-anon-key-here"
   SUPABASE_SERVICE_ROLE_KEY="your-service-role-key-here"
   ```

   **⚠️ Important**: Never commit the service role key to version control!

## Step 3: Create Database Schema

1. **Open the SQL Editor** in your Supabase dashboard

2. **Run the schema creation script**:
   - Copy the contents of `scripts/01-create-schema.sql`
   - Paste it into the SQL Editor
   - Click "Run" to execute

   This script creates:
   - The `leads` table with all required fields
   - Validation constraints and indexes
   - Utility views for monitoring
   - Triggers for automatic timestamp updates

3. **Verify the table was created**:
   - Go to Table Editor
   - You should see the `leads` table with all columns

## Step 4: Set Up Row Level Security

1. **Run the RLS policies script**:
   - Copy the contents of `scripts/02-setup-rls.sql`
   - Paste it into the SQL Editor
   - Click "Run" to execute

   This script:
   - Enables Row Level Security on the leads table
   - Creates policies for API access
   - Sets up rate limiting infrastructure
   - Creates admin access patterns

2. **Verify RLS is enabled**:
   - In Table Editor, click on the `leads` table
   - You should see "RLS enabled" indicator

## Step 5: Test Database Connection

1. **Install dependencies** in your project:
   ```bash
   npm install
   ```

2. **Test the health endpoint**:
   ```bash
   npm run dev
   ```
   
   Then visit: `http://localhost:3000/api/health`
   
   You should see a response indicating database connectivity.

## Step 6: Free Tier Configuration

### Storage Optimization

The free tier includes 500MB of database storage. To optimize usage:

1. **Monitor database size** regularly using the health endpoint
2. **Set up alerts** when approaching 80% usage (400MB)
3. **Implement data archiving** for leads older than 1 year

### Backup Configuration

1. **Enable Point-in-Time Recovery** (PITR):
   - Go to Settings → Database
   - Enable PITR for 7-day retention
   - This is included in the free tier

2. **Download periodic backups**:
   - For critical data, download manual backups monthly
   - Go to Settings → Database → Backups

## Step 7: Security Configuration

### Authentication Settings

1. **Configure Auth providers** (if needed for admin access):
   - Go to Authentication → Providers
   - Enable email provider at minimum
   - Configure redirect URLs for your domain

2. **Set up user roles** (for admin access):
   - Currently using JWT claims for role-based access
   - Can be extended with custom user_roles table

### API Security

1. **Configure CORS** (if needed):
   - Go to Settings → API
   - Add your domain to allowed origins
   - Default settings work for most use cases

2. **Rate limiting** is handled at the application level using the `api_rate_limits` table

## Step 8: Monitoring and Maintenance

### Database Size Monitoring

Monitor your database size using the health endpoint:
```bash
curl http://localhost:3000/api/health
```

Key metrics to watch:
- `database.percentUsed` - should stay below 80%
- `database.freeTierStatus` - watch for warnings
- `monitoring.projectedDaysUntilFull` - plan ahead

### Regular Maintenance Tasks

1. **Weekly**: Check database size and lead statistics
2. **Monthly**: Review and archive old leads if needed
3. **Quarterly**: Backup critical data externally

### Data Archiving Strategy

When approaching storage limits:

1. **Identify old leads** (>1 year old):
   ```sql
   SELECT COUNT(*) FROM leads 
   WHERE created_at < NOW() - INTERVAL '1 year';
   ```

2. **Export data** before deletion:
   ```sql
   COPY (SELECT * FROM leads WHERE created_at < NOW() - INTERVAL '1 year') 
   TO '/tmp/archived_leads.csv' CSV HEADER;
   ```

3. **Delete archived records**:
   ```sql
   DELETE FROM leads 
   WHERE created_at < NOW() - INTERVAL '1 year' 
   AND status IN ('archived', 'converted');
   ```

## GDPR Compliance Setup

### Data Subject Rights

The system supports:
- **Right to Access**: Use `/api/gdpr/export` endpoint
- **Right to Deletion**: Use `/api/gdpr/delete` endpoint
- **Consent Management**: Built into the lead submission form

### Audit Trail

All lead submissions include:
- Consent timestamps
- IP address logging
- User agent tracking
- Data processing consent

### Data Processing Documentation

Maintain records of:
- What data is collected and why
- Legal basis for processing (consent)
- Data retention periods
- Security measures in place

## Troubleshooting

### Common Issues

1. **Connection refused errors**:
   - Check environment variables are set correctly
   - Verify project URL and API keys
   - Ensure project is not paused (free tier auto-pauses after 7 days of inactivity)

2. **RLS policy errors**:
   - Verify service role key is being used for API operations
   - Check policy definitions match your use case
   - Test policies with different user contexts

3. **Validation errors**:
   - Check constraint definitions match your form fields
   - Verify data types and formats
   - Review CHECK constraint violations in logs

### Getting Help

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord Community](https://discord.supabase.com)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

## Production Deployment

When deploying to production:

1. **Environment Variables**:
   - Set all Supabase credentials in your hosting platform
   - Use different projects for staging/production
   - Never expose service role keys to client-side code

2. **Database Configuration**:
   - Consider upgrading to Pro tier for production workloads
   - Set up monitoring and alerting
   - Configure automated backups

3. **Security Review**:
   - Audit RLS policies
   - Review API access patterns
   - Implement additional rate limiting if needed

## Success Criteria

Your database setup is complete when:

- ✅ Supabase project is created and accessible
- ✅ Environment variables are configured
- ✅ Database schema is created successfully
- ✅ Row Level Security is enabled and tested
- ✅ Health check endpoint returns successful response
- ✅ Lead submission works through the API
- ✅ GDPR endpoints are functional
- ✅ Database size monitoring is working

## Next Steps

After completing the database setup:

1. **Update the qualification form** to use the real API endpoint
2. **Test the complete form submission flow**
3. **Set up lead notification emails** using Resend
4. **Configure admin dashboard access** (future task)
5. **Implement additional security measures** as needed

---

For questions or issues with this setup, refer to the project documentation or create an issue in the project repository.
