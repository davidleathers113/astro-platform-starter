# Production Deployment Guide - Debt Relief Form Backend

This guide provides step-by-step instructions for deploying the Astro Platform Starter debt relief form backend to production on Netlify.

## Prerequisites

Before starting the deployment process, ensure you have:
- [ ] Supabase account and project created
- [ ] Resend account with verified domain
- [ ] Netlify account
- [ ] Repository connected to version control (GitHub, GitLab, etc.)

## Pre-Deployment Checklist

Run the deployment preparation script to validate your setup:

```bash
node scripts/prepare-deployment.mjs
```

This script will check all critical components and provide a deployment readiness assessment.

## Step 1: Environment Configuration

### 1.1 Supabase Setup

1. **Create Supabase Project:**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Wait for project initialization (usually 2-3 minutes)

2. **Get Supabase Credentials:**
   - Navigate to Project Settings → API
   - Copy the following values:
     - Project URL
     - `anon` public key  
     - `service_role` secret key

3. **Configure Database:**
   - Go to SQL Editor in Supabase dashboard
   - Run the following scripts in order:
     ```sql
     -- 1. Create the main schema
     -- Copy and paste contents of scripts/01-create-schema.sql
     
     -- 2. Setup Row Level Security
     -- Copy and paste contents of scripts/02-setup-rls.sql
     
     -- 3. Setup email usage tracking
     -- Copy and paste contents of scripts/03-email-usage-tracking.sql
     
     -- 4. Setup email tracking table
     -- Copy and paste contents of scripts/04-email-tracking-table.sql
     ```

4. **Enable Row Level Security:**
   - Go to Authentication → Settings
   - Ensure RLS is enabled for all tables

### 1.2 Resend Email Setup

1. **Create Resend Account:**
   - Go to [resend.com](https://resend.com)
   - Sign up and verify your account

2. **Add and Verify Domain:**
   - Go to Domains in Resend dashboard
   - Add your domain (e.g., `yourdomain.com`)
   - Configure DNS records as shown:
     ```
     SPF Record: v=spf1 include:_spf.resend.com ~all
     DKIM Record: [Provided by Resend]
     DMARC Record: v=DMARC1; p=none; rua=mailto:dmarc@yourdomain.com
     ```
   - Wait for verification (can take up to 24 hours)

3. **Get API Key:**
   - Go to API Keys in Resend dashboard
   - Create a new API key with "Sending access"
   - Copy the key (starts with `re_`)

### 1.3 Environment Variables

Create/update your `.env` file with real credentials:

```bash
# Supabase Configuration
SUPABASE_URL="https://your-project-id.supabase.co"
SUPABASE_ANON_KEY="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
SUPABASE_SERVICE_ROLE_KEY="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."

# Email Configuration
RESEND_API_KEY="re_your-actual-api-key"
RESEND_DOMAIN="yourdomain.com"
RESEND_FROM_EMAIL="noreply@yourdomain.com"
RESEND_FROM_NAME="Your Company Name"

# Internal Email Configuration
INTERNAL_NOTIFICATION_EMAIL="leads@yourdomain.com"
ADMIN_NOTIFICATION_EMAIL="admin@yourdomain.com"

# Email Monitoring
EMAIL_USAGE_ALERT_THRESHOLD=75
EMAIL_USAGE_CRITICAL_THRESHOLD=90
```

## Step 2: Local Testing

### 2.1 Test Database Connection

```bash
# Test Supabase connection
node scripts/validate-integration.mjs --check-database
```

### 2.2 Test Email Configuration

```bash
# Test Resend integration
node scripts/validate-email-config.ts
```

### 2.3 Test Full Integration

```bash
# Run comprehensive validation
node scripts/validate-integration.mjs
```

### 2.4 Manual Testing

1. **Start Development Server:**
   ```bash
   npm run dev
   ```

2. **Test Form Submission:**
   - Navigate to `/debt-relief`
   - Fill out and submit the qualification form
   - Verify success message appears
   - Check Supabase dashboard for new lead record
   - Check for email delivery notifications

3. **Test API Endpoints:**
   ```bash
   # Health check
   curl http://localhost:4321/api/health
   
   # Email analytics
   curl http://localhost:4321/api/email-analytics
   ```

## Step 3: Netlify Deployment

### 3.1 Connect Repository

1. **Log into Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Connect your GitHub/GitLab account

2. **Import Project:**
   - Click "New site from Git"
   - Select your repository
   - Choose the branch to deploy (usually `main` or `master`)

### 3.2 Configure Build Settings

1. **Build Configuration:**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Functions directory: `dist/functions` (auto-detected)

2. **Environment Variables:**
   - Go to Site Settings → Environment Variables
   - Add all environment variables from your `.env` file
   - **Important:** Do not include quotes around the values in Netlify

### 3.3 Deploy

1. **Trigger Deployment:**
   - Click "Deploy Site"
   - Wait for build to complete (usually 2-5 minutes)

2. **Check Deployment:**
   - Visit the generated Netlify URL
   - Test the debt relief form
   - Check function logs in Netlify dashboard

## Step 4: Post-Deployment Configuration

### 4.1 Configure Webhooks

Update Resend webhook configuration to point to your production domain:

1. **In Resend Dashboard:**
   - Go to Webhooks
   - Add webhook URL: `https://your-netlify-domain.netlify.app/api/webhooks/resend`
   - Select events: `email.sent`, `email.delivered`, `email.bounced`, `email.complained`

### 4.2 Update CORS Settings

If needed, update Supabase CORS settings:

1. **In Supabase Dashboard:**
   - Go to Settings → API
   - Add your Netlify domain to allowed origins

### 4.3 Test Production Environment

```bash
# Test production deployment
curl https://your-netlify-domain.netlify.app/api/health

# Test form submission (replace with your domain)
curl -X POST https://your-netlify-domain.netlify.app/api/leads \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"User","phone":"5551234567","debtAmount":"50000","debtType":"credit_card"}'
```

## Step 5: Monitoring and Maintenance

### 5.1 Set Up Monitoring

1. **Netlify Analytics:**
   - Enable analytics in Netlify dashboard
   - Monitor function performance and errors

2. **Supabase Monitoring:**
   - Check database usage in Supabase dashboard
   - Monitor API requests and response times

3. **Resend Monitoring:**
   - Track email delivery rates
   - Monitor quota usage (3,000 emails/month on free tier)

### 5.2 Regular Maintenance Tasks

1. **Weekly Checks:**
   - [ ] Review email delivery rates
   - [ ] Check database storage usage
   - [ ] Monitor function error rates

2. **Monthly Tasks:**
   - [ ] Review and clean old logs
   - [ ] Check email quota usage
   - [ ] Verify GDPR compliance reports

3. **Security Audits:**
   - [ ] Review access logs for suspicious activity
   - [ ] Verify rate limiting is working
   - [ ] Check CSRF protection

## Troubleshooting

### Common Issues

1. **Build Failures:**
   ```bash
   # Check build logs in Netlify dashboard
   # Common causes: missing dependencies, TypeScript errors
   npm run build  # Test locally first
   ```

2. **Function Timeouts:**
   - Netlify functions have a 10-second timeout
   - Check function logs for performance issues
   - Consider optimizing database queries

3. **Email Delivery Issues:**
   ```bash
   # Check domain verification status
   # Verify DNS records are properly configured
   # Check Resend dashboard for bounce/complaint rates
   ```

4. **Database Connection Errors:**
   - Verify Supabase credentials
   - Check RLS policies
   - Monitor connection pool usage

### Getting Help

- **Netlify:** [netlify.com/support](https://netlify.com/support)
- **Supabase:** [supabase.com/docs](https://supabase.com/docs)
- **Resend:** [resend.com/docs](https://resend.com/docs)

## Performance Optimization

### 5.1 Free Tier Optimization

- **Supabase (500MB limit):**
  - Monitor database size regularly
  - Implement automated cleanup for old logs
  - Use efficient indexing strategies

- **Resend (3,000 emails/month):**
  - Implement email throttling
  - Use email templates efficiently
  - Monitor usage with built-in tracking

### 5.2 Performance Monitoring

```bash
# Check function performance
curl -w "%{time_total}" https://your-domain.netlify.app/api/health

# Monitor database query performance
# Use Supabase dashboard SQL query analyzer
```

## Security Checklist

- [ ] HTTPS enabled (automatic with Netlify)
- [ ] Environment variables secured
- [ ] Rate limiting active
- [ ] CSRF protection enabled
- [ ] Input validation working
- [ ] RLS policies configured
- [ ] GDPR compliance verified
- [ ] Error logging configured
- [ ] Monitoring alerts set up

## Rollback Plan

If issues arise after deployment:

1. **Immediate Rollback:**
   - In Netlify dashboard, go to Deploys
   - Click "Publish deploy" on a previous working version

2. **Database Rollback:**
   - Use Supabase time travel feature (if available)
   - Or restore from backup

3. **Email Configuration:**
   - Revert webhook URLs in Resend dashboard
   - Disable problematic email templates

## Conclusion

Following this guide ensures a secure, reliable deployment of the debt relief form backend with proper monitoring and maintenance procedures. The system is designed to scale within free tier limits while providing enterprise-grade features for lead capture and management.

For ongoing support and updates, maintain regular monitoring of all services and keep dependencies updated according to security advisories.
