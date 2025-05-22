# Email Templates System Documentation

## Overview

The debt relief system includes a comprehensive email template system built with React Email and integrated with Resend for reliable transactional email delivery. This system provides professional, responsive email templates for all user communications.

## Architecture

### Components

- **Templates** (`src/emails/templates/`): React Email components for each email type
- **Types** (`src/emails/types.ts`): TypeScript interfaces and utility functions
- **Service** (`src/emails/service.ts`): Email sending service with Resend integration
- **Preview** (`src/emails/preview.ts`): Development and testing utilities
- **Configuration** (`src/config/resend.ts`): Resend API configuration and validation

### Email Template Types

1. **Lead Confirmation Email** (`LeadConfirmationEmail.tsx`)
   - Sent to users who submit debt relief forms
   - Includes submission details, next steps, and preparation tips
   - Professional branding with trust indicators

2. **Internal Lead Notification Email** (`InternalLeadNotificationEmail.tsx`)
   - Sent to the debt relief team for new leads
   - Priority-based styling and quick action buttons
   - Comprehensive lead information and compliance reminders

3. **Error Notification Email** (`ErrorNotificationEmail.tsx`)
   - Sent to administrators when system errors occur
   - Severity-based alerts with troubleshooting guidelines
   - Technical details and immediate action steps

4. **Welcome Email** (`WelcomeEmail.tsx`)
   - Sent to new users after account registration
   - Onboarding progress tracking and resource links
   - Account activation and premium feature highlights

## Usage

### Quick Start

```typescript
import { emailService } from '../emails/service';
import type { LeadConfirmationEmailData } from '../emails/types';

// Send a lead confirmation email
const confirmationData: LeadConfirmationEmailData = {
  timestamp: new Date().toISOString(),
  environment: 'production',
  user: {
    firstName: 'John',
    email: 'john@example.com',
    phone: '(555) 123-4567'
  },
  lead: {
    debtAmount: '25000-50000',
    debtType: 'credit-cards',
    submittedAt: new Date().toISOString(),
    referenceNumber: 'DR-ABC123'
  },
  nextSteps: {
    expectedContactTime: 'within 4 business hours',
    contactMethod: 'Phone call from our certified debt specialist',
    preparationTips: [
      'Have your credit card statements ready',
      'List your monthly income and expenses'
    ]
  }
};

const result = await emailService.sendLeadConfirmation(
  'john@example.com',
  confirmationData
);

if (result.success) {
  console.log('Email sent successfully:', result.emailId);
} else {
  console.error('Email failed:', result.error);
}
```

### Advanced Usage

```typescript
import { EmailService } from '../emails/service';

const emailService = new EmailService();

// Send multiple emails with rate limiting
const emailBatch = [
  {
    templateType: 'lead_confirmation' as const,
    to: 'user1@example.com',
    data: confirmationData1
  },
  {
    templateType: 'welcome' as const,
    to: 'user2@example.com',
    data: welcomeData2
  }
];

const results = await emailService.sendBatchEmails(emailBatch, {
  delayBetweenEmails: 1000, // 1 second delay
  maxConcurrent: 2,
  continueOnError: true
});
```

## Development

### Preview Templates

Start the development server and visit `/email-preview`:

```bash
npm run email:preview
```

This provides a visual interface to:
- Preview all templates with sample data
- Test responsive design across different viewports
- Validate template rendering
- View sample data structures

### Test Templates

Run the automated test suite:

```bash
npm run email:test
```

This validates:
- Template rendering with various data scenarios
- Email service configuration
- Resend API connectivity (if configured)

### Validate Configuration

Check your Resend configuration:

```bash
npm run email:validate
```

## Configuration

### Environment Variables

Required environment variables (see `.env.example`):

```env
# Resend API Configuration
RESEND_API_KEY=re_your_api_key_here
RESEND_DOMAIN=yourdomain.com
RESEND_FROM_EMAIL=noreply@yourdomain.com
RESEND_FROM_NAME=Debt Relief Team

# Notification Email Addresses
INTERNAL_NOTIFICATION_EMAIL=team@yourdomain.com
ADMIN_NOTIFICATION_EMAIL=admin@yourdomain.com

# Email Usage Monitoring
EMAIL_USAGE_ALERT_THRESHOLD=75
EMAIL_USAGE_CRITICAL_THRESHOLD=90
```

### Domain Setup

1. Add your domain in Resend dashboard
2. Configure DNS records (SPF, DKIM, DMARC)
3. Verify domain ownership
4. Test email deliverability

See `docs/resend-setup-guide.md` for detailed setup instructions.

## Template Customization

### Adding New Templates

1. **Create Template Component**:
   ```typescript
   // src/emails/templates/MyNewEmail.tsx
   import React from 'react';
   import { BaseEmailLayout } from '../components/BaseEmailLayout';
   
   interface MyNewEmailProps {
     data: MyNewEmailData;
   }
   
   export const MyNewEmail: React.FC<MyNewEmailProps> = ({ data }) => {
     return (
       <BaseEmailLayout
         preview="Your preview text here"
         title="Email Title"
         headerTitle="Header Title"
       >
         {/* Email content */}
       </BaseEmailLayout>
     );
   };
   ```

2. **Add Type Definition**:
   ```typescript
   // src/emails/types.ts
   export interface MyNewEmailData extends BaseEmailData {
     // Your data structure
   }
   ```

3. **Register Template**:
   ```typescript
   // src/emails/templates/index.ts
   export const EMAIL_TEMPLATES = {
     // ... existing templates
     my_new_email: MyNewEmail
   } as const;
   ```

4. **Add Service Method**:
   ```typescript
   // src/emails/service.ts
   async sendMyNewEmail(email: string, data: MyNewEmailData) {
     return this.sendTemplateEmail({
       templateType: 'my_new_email',
       to: email,
       data
     });
   }
   ```

### Styling Guidelines

- Use the existing `BaseEmailLayout` for consistency
- Follow the brand color scheme (#2d7984 primary)
- Ensure responsive design for mobile devices
- Test across major email clients (Gmail, Outlook, Apple Mail)
- Include accessibility features (alt text, proper contrast)

### Best Practices

1. **Content**:
   - Keep subject lines under 50 characters
   - Use clear, action-oriented language
   - Include unsubscribe links for marketing emails
   - Provide contact information

2. **Design**:
   - Use web-safe fonts with fallbacks
   - Optimize images for email clients
   - Test with images disabled
   - Ensure 600px max width for compatibility

3. **Technical**:
   - Use inline CSS for better compatibility
   - Avoid JavaScript and complex CSS
   - Test with popular email clients
   - Include plain text versions for accessibility

## Monitoring and Analytics

### Email Metrics

Track email performance with built-in analytics:

```typescript
const stats = await emailService.getEmailStats('week');
console.log('Success rate:', stats.successRate);
console.log('Total sent:', stats.totalSent);
```

### Error Handling

All email sending operations return detailed results:

```typescript
const result = await emailService.sendLeadConfirmation(email, data);

if (!result.success) {
  // Log error for monitoring
  console.error('Email sending failed:', {
    error: result.error,
    template: result.metadata?.templateType,
    recipient: result.metadata?.recipientEmail,
    timestamp: result.metadata?.sentAt
  });
  
  // Handle gracefully (don't block user flow)
  // Consider retry logic for transient failures
}
```

### Rate Limiting

The system respects Resend's rate limits:
- 2 emails per second maximum
- Automatic batching for multiple emails
- Built-in delays to prevent rate limit errors

## Troubleshooting

### Common Issues

1. **Templates not rendering**:
   - Check TypeScript compilation errors
   - Verify data structure matches interface
   - Test with minimal data in preview

2. **Emails not sending**:
   - Verify Resend API key configuration
   - Check domain verification status
   - Validate recipient email addresses

3. **Poor deliverability**:
   - Complete domain verification
   - Set up SPF, DKIM, and DMARC records
   - Monitor sender reputation

### Debug Tools

- Use `/email-preview` for visual testing
- Run `npm run email:test` for automated validation
- Check browser console for React Email errors
- Use Resend dashboard for delivery analytics

## Security

### Data Protection

- Email data is validated before sending
- Sensitive information is not logged
- GDPR compliance features included
- Consent tracking in templates

### Best Practices

- Never include passwords in emails
- Use secure links for account activation
- Implement email verification for new addresses
- Monitor for suspicious sending patterns

## Performance

### Optimization

- Templates are rendered server-side
- Images optimized for email clients
- Minimal CSS for fast rendering
- Batch sending with rate limiting

### Caching

- Template rendering is stateless
- Configuration loaded once per process
- Resend client connection pooling
- Sample data cached for development

## Support

### Resources

- React Email documentation: https://react.email
- Resend API documentation: https://resend.com/docs
- Email client testing: Email on Acid, Litmus
- Deliverability testing: Mail Tester

### Getting Help

1. Check this documentation
2. Review error logs and validation results
3. Test with sample data in preview mode
4. Contact the development team for complex issues

## Migration Guide

### From Existing Email System

1. **Assessment**: Review current email templates and data
2. **Mapping**: Map existing data to new TypeScript interfaces
3. **Testing**: Use preview system to validate migration
4. **Deployment**: Gradual rollout with monitoring
5. **Cleanup**: Remove old email system after validation

### Version Updates

- Monitor React Email changelogs
- Test templates after React Email updates
- Update TypeScript interfaces as needed
- Validate email client compatibility
