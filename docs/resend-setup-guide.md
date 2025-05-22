# Resend Email Service Setup Guide

This guide provides step-by-step instructions for setting up Resend email service with domain verification for the Astro Platform Starter debt relief system.

## Table of Contents

1. [Account Setup](#account-setup)
2. [Domain Verification](#domain-verification)
3. [DNS Configuration](#dns-configuration)
4. [Environment Configuration](#environment-configuration)
5. [Testing and Verification](#testing-and-verification)
6. [Troubleshooting](#troubleshooting)

## Account Setup

### 1. Create Resend Account

1. Visit [https://resend.com](https://resend.com)
2. Sign up for a new account using your business email
3. Verify your email address through the confirmation email
4. Complete your profile setup

### 2. Generate API Keys

1. Navigate to the [API Keys section](https://resend.com/api-keys)
2. Create separate API keys for different environments:
   - **Development**: `dev-debt-relief-api-key`
   - **Production**: `prod-debt-relief-api-key`
3. Store these keys securely - they will only be shown once
4. Add keys to your environment files (see [Environment Configuration](#environment-configuration))

### 3. Free Tier Limits

Resend free tier includes:
- **3,000 emails per month**
- **100 emails per day**
- **Domain verification required for production**
- **Rate limiting: 2 emails per second**

## Domain Verification

### 1. Add Your Domain

1. Go to the [Domains section](https://resend.com/domains) in your Resend dashboard
2. Click "Add Domain"
3. Enter your domain (e.g., `yourdomain.com`)
4. Choose your region (closest to your users for better performance)

### 2. Domain Verification Process

Resend will provide you with DNS records that need to be added to your domain:

#### Required DNS Records

1. **MX Record** (for receiving emails)
   ```
   Type: MX
   Name: @
   Value: feedback-smtp.resend.com
   Priority: 10
   ```

2. **SPF Record** (Sender Policy Framework)
   ```
   Type: TXT
   Name: @
   Value: v=spf1 include:resend.com ~all
   ```

3. **DKIM Record** (DomainKeys Identified Mail)
   ```
   Type: TXT
   Name: resend._domainkey
   Value: [Provided by Resend - unique for each domain]
   ```

4. **DMARC Record** (Domain-based Message Authentication)
   ```
   Type: TXT
   Name: _dmarc
   Value: v=DMARC1; p=quarantine; rua=mailto:admin@yourdomain.com
   ```

## DNS Configuration

### For Common DNS Providers

#### Cloudflare
1. Login to Cloudflare dashboard
2. Select your domain
3. Go to DNS > Records
4. Add each record type with the values provided by Resend
5. Ensure Proxy status is set to "DNS only" (gray cloud) for email records

#### Namecheap
1. Login to Namecheap account
2. Go to Domain List > Manage
3. Select Advanced DNS tab
4. Add new records with Type, Host, and Value as specified

#### GoDaddy
1. Login to GoDaddy account
2. Go to My Products > DNS
3. Select your domain
4. Add records in the DNS Management section

#### AWS Route 53
1. Login to AWS Console
2. Navigate to Route 53 > Hosted Zones
3. Select your domain
4. Create new records with the specified values

### Verification Timeline

- **DNS propagation**: 15 minutes to 48 hours
- **Resend verification**: Usually within 15 minutes after DNS propagation
- **Email authentication**: Immediate after verification

## Environment Configuration

### 1. Update Environment Files

Add the following to your `.env` file:

```bash
# Resend Configuration
RESEND_API_KEY="re_your_actual_api_key_here"
RESEND_DOMAIN="yourdomain.com"
RESEND_FROM_EMAIL="noreply@yourdomain.com"
RESEND_FROM_NAME="Your Company Name"

# Internal Email Configuration
INTERNAL_NOTIFICATION_EMAIL="leads@yourdomain.com"
ADMIN_NOTIFICATION_EMAIL="admin@yourdomain.com"

# Email Monitoring
EMAIL_USAGE_ALERT_THRESHOLD=75  # Alert at 75% of free tier
EMAIL_USAGE_CRITICAL_THRESHOLD=90  # Critical alert at 90%
```

### 2. Environment Validation

Create a script to validate your environment setup:

```typescript
// scripts/validate-email-config.ts
import { Resend } from 'resend';

export async function validateEmailConfig() {
    const requiredVars = [
        'RESEND_API_KEY',
        'RESEND_DOMAIN',
        'RESEND_FROM_EMAIL',
        'INTERNAL_NOTIFICATION_EMAIL'
    ];
    
    // Check for required environment variables
    const missing = requiredVars.filter(varName => !process.env[varName]);
    if (missing.length > 0) {
        throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }
    
    // Test Resend API connection
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    try {
        // Test API connection with a domain list request
        const domains = await resend.domains.list();
        console.log('✅ Resend API connection successful');
        console.log(`📧 Available domains: ${domains.data?.map(d => d.name).join(', ') || 'None'}`);
        
        return {
            success: true,
            domains: domains.data || []
        };
    } catch (error) {
        console.error('❌ Resend API connection failed:', error);
        return {
            success: false,
            error: error.message
        };
    }
}
```

## Testing and Verification

### 1. DNS Verification Check

Use online tools to verify your DNS records:

- **SPF Check**: [dmarcian.com/spf-survey](https://dmarcian.com/spf-survey/)
- **DKIM Check**: [mail-tester.com](https://www.mail-tester.com/)
- **DMARC Check**: [dmarcian.com/dmarc-inspector](https://dmarcian.com/dmarc-inspector/)
- **Overall Email Auth**: [mxtoolbox.com](https://mxtoolbox.com/)

### 2. Test Email Delivery

Create a test script to verify email delivery:

```typescript
// scripts/test-email-delivery.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function testEmailDelivery() {
    try {
        const testEmail = await resend.emails.send({
            from: `Test <noreply@${process.env.RESEND_DOMAIN}>`,
            to: [process.env.ADMIN_NOTIFICATION_EMAIL!],
            subject: 'Resend Integration Test - ' + new Date().toLocaleString(),
            html: `
                <h2>Email Integration Test</h2>
                <p>This is a test email to verify Resend integration is working correctly.</p>
                <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
                <p><strong>Domain:</strong> ${process.env.RESEND_DOMAIN}</p>
                <p>If you received this email, your Resend integration is working! 🎉</p>
            `
        });
        
        console.log('✅ Test email sent successfully');
        console.log('📧 Message ID:', testEmail.data?.id);
        
        return { success: true, messageId: testEmail.data?.id };
    } catch (error) {
        console.error('❌ Test email failed:', error);
        return { success: false, error: error.message };
    }
}
```

### 3. Email Deliverability Testing

1. **Send test emails to multiple providers**:
   - Gmail (@gmail.com)
   - Outlook (@outlook.com, @hotmail.com)
   - Yahoo (@yahoo.com)
   - Apple Mail (@icloud.com)

2. **Check spam folders** and delivery rates

3. **Use email testing tools**:
   - [mail-tester.com](https://www.mail-tester.com/) - Spam score testing
   - [glockapps.com](https://glockapps.com/) - Deliverability testing
   - [email-checker.net](https://email-checker.net/) - Email validation

## Troubleshooting

### Common Issues and Solutions

#### 1. Domain Verification Failing
**Symptoms**: Resend shows domain as "Unverified"
**Solutions**:
- Wait 24-48 hours for DNS propagation
- Use `dig` or `nslookup` to verify DNS records are live
- Check for typos in DNS record values
- Ensure no conflicting SPF records exist

#### 2. Emails Going to Spam
**Symptoms**: Emails delivered but in recipient's spam folder
**Solutions**:
- Verify all DNS records (SPF, DKIM, DMARC) are correctly set
- Start with small email volumes to build sender reputation
- Use consistent "From" addresses and domain
- Include unsubscribe links in marketing emails

#### 3. API Key Issues
**Symptoms**: Authentication errors or API rejections
**Solutions**:
- Verify API key is correct and not expired
- Check environment variable is loaded correctly
- Ensure using the right API key for the environment
- Regenerate API key if suspected compromised

#### 4. Rate Limiting
**Symptoms**: "Rate limit exceeded" errors
**Solutions**:
- Implement retry logic with exponential backoff
- Batch emails instead of sending simultaneously
- Monitor free tier limits (3K emails/month, 100/day)
- Consider upgrading to paid plan for higher limits

#### 5. DNS Propagation Delays
**Symptoms**: DNS records not visible globally
**Solutions**:
- Wait 24-48 hours for full propagation
- Test from multiple locations using online DNS checkers
- Contact DNS provider support if delays exceed 48 hours
- Use lower TTL values for faster future updates

### Monitoring Commands

```bash
# Check SPF record
dig TXT yourdomain.com | grep spf1

# Check DKIM record  
dig TXT resend._domainkey.yourdomain.com

# Check DMARC record
dig TXT _dmarc.yourdomain.com

# Check MX record
dig MX yourdomain.com
```

### Support Resources

- **Resend Documentation**: [resend.com/docs](https://resend.com/docs)
- **Resend Support**: [resend.com/support](https://resend.com/support)
- **DNS Checker Tools**: [whatsmydns.net](https://whatsmydns.net)
- **Email Authentication Tester**: [mail-tester.com](https://mail-tester.com)

## Security Best Practices

1. **API Key Security**:
   - Never commit API keys to version control
   - Use environment variables for all sensitive data
   - Rotate API keys regularly (quarterly recommended)
   - Use different keys for development and production

2. **Domain Security**:
   - Enable 2FA on your domain registrar account
   - Monitor DNS changes for unauthorized modifications
   - Use DMARC policy "reject" for maximum security once stable

3. **Email Security**:
   - Always use HTTPS for email-related endpoints
   - Validate all email addresses before sending
   - Implement rate limiting on your email endpoints
   - Log all email activities for audit purposes

---

**Last Updated**: May 2025  
**Version**: 1.0  
**Author**: Astro Platform Starter Team
