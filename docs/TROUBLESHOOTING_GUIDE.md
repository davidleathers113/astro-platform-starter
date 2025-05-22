# Troubleshooting Guide

## Common Issues and Solutions

### Form Submission Failures

#### Issue: Form not submitting
**Symptoms**: Form shows loading but doesn't complete
**Causes**: 
- CSRF token expired
- Rate limiting triggered
- Network connectivity issues

**Solutions**:
1. Check browser console for errors
2. Refresh page to get new CSRF token
3. Wait 15 minutes if rate limited
4. Check network connectivity

#### Issue: Validation errors
**Symptoms**: Form shows field-specific errors
**Causes**:
- Invalid phone number format
- Missing required fields
- Invalid email format

**Solutions**:
1. Ensure all required fields are filled
2. Use valid email format
3. Enter phone number with digits only

### Email Delivery Issues

#### Issue: Emails not being sent
**Symptoms**: Form submits but no emails received
**Causes**:
- Resend API key invalid
- Domain not verified
- Email quota exceeded

**Solutions**:
1. Check Resend dashboard for API status
2. Verify domain verification status
3. Check email quota usage at /api/email-usage
4. Review Resend webhook logs

#### Issue: Emails going to spam
**Symptoms**: Emails sent but not in inbox
**Causes**:
- Missing SPF/DKIM records
- High bounce rate
- Content flagged as spam

**Solutions**:
1. Verify DNS records (SPF, DKIM, DMARC)
2. Check email content for spam triggers
3. Monitor bounce rates in Resend dashboard

### Database Issues

#### Issue: Data not saving
**Symptoms**: Form submits successfully but data not in Supabase
**Causes**:
- RLS policies blocking inserts
- Database connection issues
- Invalid data format

**Solutions**:
1. Check Supabase logs for RLS violations
2. Verify database connection in health check
3. Review data validation schemas

### Performance Issues

#### Issue: Slow form submission
**Symptoms**: Form takes > 10 seconds to submit
**Causes**:
- Database query optimization needed
- Email service delays
- Function timeout approaching

**Solutions**:
1. Check function logs for performance metrics
2. Optimize database queries
3. Consider email queue for high volume

### GDPR Request Issues

#### Issue: Data export/deletion fails
**Symptoms**: GDPR requests return errors
**Causes**:
- Rate limiting on GDPR endpoints
- Invalid email/phone combination
- Database access issues

**Solutions**:
1. Wait 15 minutes between GDPR requests
2. Verify email and phone match records
3. Check database connectivity

## Diagnostic Commands

### Check API Health
```bash
curl https://your-domain.netlify.app/api/health
```

### Test Email Analytics
```bash
curl https://your-domain.netlify.app/api/email-analytics
```

### Verify Security Headers
```bash
curl -I https://your-domain.netlify.app/api/health
```

## Emergency Contacts

- Netlify Support: https://netlify.com/support
- Supabase Support: https://supabase.com/docs
- Resend Support: https://resend.com/docs

## Rollback Procedures

### If deployment fails:
1. Go to Netlify dashboard
2. Find previous working deployment
3. Click "Publish deploy" on working version

### If database issues occur:
1. Check Supabase dashboard for errors
2. Use time travel feature if available
3. Restore from backup if necessary

### If email service fails:
1. Check Resend dashboard status
2. Disable email sending temporarily if needed
3. Queue emails for later delivery

Generated on: 2025-05-22T21:28:26.211Z
