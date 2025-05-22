# Email Service Integration Deployment Guide

This guide provides step-by-step instructions for deploying the completed email service integration for the debt relief lead capture system.

## Overview

The email service integration includes:
- ✅ **Lead submission emails** (user confirmation + internal notifications)
- ✅ **Advanced queue system** with retry logic and priority processing
- ✅ **Webhook handling** for delivery status tracking
- ✅ **Comprehensive analytics** and monitoring
- ✅ **GDPR compliance** and rate limiting
- ✅ **Free tier optimization** for Resend (3K emails/month)

## Pre-Deployment Requirements

### 1. Resend Account Setup
```bash
# 1. Create account at https://resend.com
# 2. Verify your sending domain
# 3. Generate API keys for development and production
```

### 2. Environment Variables
Add the following to your `.env` file:

```env
# Required
RESEND_API_KEY=re_xxxxxxxxxx
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Recommended
RESEND_DOMAIN=your-domain.com
RESEND_FROM_EMAIL=noreply@your-domain.com
RESEND_INTERNAL_EMAIL=leads@your-domain.com
RESEND_ADMIN_EMAIL=admin@your-domain.com
RESEND_WEBHOOK_SECRET=your-webhook-secret

# Optional
EMAIL_ANALYTICS_API_KEY=your-analytics-key
DASHBOARD_URL=https://dashboard.your-domain.com
LOGS_URL=https://logs.your-domain.com
```

## Deployment Steps

### Step 1: Database Setup

Run the following SQL scripts in your Supabase SQL editor:

```bash
# 1. Main schema (if not already done)
./scripts/01-create-schema.sql

# 2. RLS policies (if not already done)  
./scripts/02-setup-rls.sql

# 3. Email usage tracking
./scripts/03-email-usage-tracking.sql

# 4. Email tracking table (NEW - required for integration)
./scripts/04-email-tracking-table.sql
```

### Step 2: Domain Verification

1. **Add DNS Records** to your domain:
   ```
   TXT record: v=spf1 include:_spf.resend.com ~all
   CNAME record: resend._domainkey -> resend._domainkey.resend.com
   TXT record: _dmarc -> v=DMARC1; p=quarantine; rua=mailto:dmarc@your-domain.com
   ```

2. **Verify in Resend Dashboard**:
   - Go to Domains section
   - Add your domain
   - Complete verification process

### Step 3: Webhook Configuration

1. **Set up webhook in Resend Dashboard**:
   ```
   Webhook URL: https://your-domain.com/api/webhooks/resend
   Events: email.sent, email.delivered, email.bounced, email.complained, email.opened, email.clicked
   ```

2. **Test webhook** (optional):
   ```bash
   curl -X POST https://your-domain.com/api/webhooks/resend \
     -H "Content-Type: application/json" \
     -d '{"type":"email.delivered","data":{"email_id":"test"}}'
   ```

### Step 4: Deploy Application

```bash
# Build and deploy to your hosting platform
npm run build

# For Netlify:
npm run deploy

# For Vercel:
vercel --prod

# For other platforms, follow their deployment guides
```

### Step 5: Validation

Run the integration validation script:

```bash
# Make sure the script is executable
chmod +x ./scripts/validate-integration.mjs

# Run validation
node ./scripts/validate-integration.mjs
```

Expected output:
```
🚀 Starting Email Service Integration Validation...

1️⃣ Testing Database Schema...
   ✅ email_tracking table exists and accessible
   ✅ email_usage table exists and accessible
   ✅ Database functions working correctly

2️⃣ Testing Email Service Configuration...
   ✅ Email service configuration valid
   ✅ Resend API connection healthy
   ✅ Email domain verified

3️⃣ Testing API Endpoints...
   ✅ Leads API endpoint accessible
   ✅ Webhook endpoint accessible
   ✅ Email analytics endpoint accessible
   ✅ Email usage endpoint accessible

4️⃣ Testing Environment Variables...
   ✅ All required environment variables are set

5️⃣ Testing Email Templates...
   ✅ Email templates are accessible

6️⃣ Testing Form Integration...
   ✅ Debt relief page accessible

🎉 ALL TESTS PASSED! Email service integration is working correctly.
```

## Testing the Integration

### Manual Test Flow

1. **Submit a test lead**:
   ```bash
   curl -X POST https://your-domain.com/api/leads \
     -H "Content-Type: application/json" \
     -d '{
       "debtAmount": "25000-50000",
       "debtType": "credit-cards", 
       "phone": "5551234567",
       "firstName": "Test",
       "email": "test@example.com",
       "consentProcessing": true,
       "consentMarketing": false
     }'
   ```

2. **Verify emails sent**:
   - Check that user confirmation email arrives
   - Check that internal notification email arrives
   - Verify email tracking records in database

3. **Test webhook delivery**:
   - Monitor webhook calls in Resend dashboard
   - Check email_tracking table updates
   - Verify analytics endpoints return data

### Automated Testing

Run the comprehensive test suite:

```bash
# Unit and integration tests
npm test

# Specific email integration tests
npm test tests/email-integration.test.ts
```

## Monitoring and Analytics

### Email Usage Monitoring

```bash
# Check current usage
curl https://your-domain.com/api/email-usage

# Get analytics
curl https://your-domain.com/api/email-analytics?timeframe=day
```

### Database Monitoring

```sql
-- Check recent email tracking
SELECT * FROM email_tracking 
ORDER BY created_at DESC 
LIMIT 10;

-- Get email statistics
SELECT * FROM email_tracking_stats 
WHERE date >= CURRENT_DATE - INTERVAL '7 days';

-- Check usage against free tier
SELECT get_current_month_email_usage();
```

## Troubleshooting

### Common Issues

1. **Emails not sending**:
   ```bash
   # Check Resend API key
   curl -H "Authorization: Bearer $RESEND_API_KEY" \
        https://api.resend.com/domains

   # Check email service logs
   node -e "
     import('./src/emails/service.js').then(({emailService}) => {
       console.log(emailService.getRecentLogs(10, 'error'));
     })
   "
   ```

2. **Database errors**:
   ```sql
   -- Check table exists
   SELECT table_name FROM information_schema.tables 
   WHERE table_name IN ('leads', 'email_tracking', 'email_usage');

   -- Check RLS policies
   SELECT * FROM pg_policies 
   WHERE tablename IN ('email_tracking', 'email_usage');
   ```

3. **Webhook not working**:
   - Verify webhook URL is publicly accessible
   - Check webhook secret matches environment variable
   - Monitor webhook logs in Resend dashboard

### Error Recovery

```bash
# Clear failed queue items
node -e "
  import('./src/emails/service.js').then(({emailService}) => {
    console.log('Cleared:', emailService.clearCompletedQueueItems());
  })
"

# Retry failed emails (implement as needed)
# Check email_tracking table for failed status and retry
```

## Performance Optimization

### Free Tier Management (Resend 3K emails/month)

1. **Monitor usage**:
   ```sql
   SELECT 
     month_year,
     total_emails,
     percent_of_free_tier,
     tier_status
   FROM email_usage_stats
   ORDER BY month_year DESC;
   ```

2. **Optimize email sending**:
   - Use email queue for non-urgent emails
   - Batch internal notifications
   - Implement email preferences for users

### Database Optimization

```sql
-- Clean up old tracking data (runs automatically)
SELECT cleanup_old_email_tracking();

-- Monitor database size
SELECT * FROM database_size_info;
```

## Security Considerations

1. **API Keys**: Store securely in environment variables
2. **Webhook Security**: Use webhook secret for signature verification
3. **Rate Limiting**: Configured per IP (5 requests/hour for leads API)
4. **Data Privacy**: Email addresses anonymized in logs
5. **GDPR Compliance**: Consent tracking and data retention policies

## Support and Maintenance

### Regular Tasks

1. **Weekly**: Monitor email delivery rates and bounce rates
2. **Monthly**: Review usage against free tier limits
3. **Quarterly**: Clean up old email tracking data
4. **As needed**: Update email templates and improve deliverability

### Monitoring Alerts

Set up alerts for:
- Email delivery failure rate > 5%
- Bounce rate > 3%
- Usage > 90% of free tier
- API errors > 10/hour

### Scaling Considerations

When approaching limits:
1. **Email volume**: Upgrade to Resend paid plan
2. **Database size**: Archive old data or upgrade Supabase plan
3. **Performance**: Implement Redis for queue management
4. **Monitoring**: Add dedicated monitoring service (e.g., DataDog, New Relic)

---

## Quick Reference

### Important URLs
- **Lead submission**: `POST /api/leads`
- **Email analytics**: `GET /api/email-analytics`
- **Email usage**: `GET /api/email-usage`
- **Webhook endpoint**: `POST /api/webhooks/resend`
- **Health check**: `HEAD /api/email-analytics`

### Key Files
- **Email service**: `src/emails/service.ts`
- **Lead API**: `src/pages/api/leads.ts`
- **Webhook handler**: `src/pages/api/webhooks/resend.ts`
- **Form integration**: `src/components/debt-relief/QualificationForm.astro`
- **Database schemas**: `scripts/*.sql`

### Support Contacts
- **Technical issues**: Check logs in `src/emails/service.ts`
- **Deliverability**: Review Resend dashboard and domain verification
- **Database**: Monitor Supabase dashboard and RLS policies
