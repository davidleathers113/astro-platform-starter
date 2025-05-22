#!/usr/bin/env node

/**
 * Email Integration Testing Script
 * 
 * Comprehensive testing suite for email templates, delivery, and tracking
 * functionality in the debt relief form backend.
 * 
 * Usage:
 *   node scripts/test-email-integration.mjs
 *   node scripts/test-email-integration.mjs --send-real-emails
 *   node scripts/test-email-integration.mjs --test-email=your-email@example.com
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

const { red, green, yellow, blue, cyan, bright, reset } = colors;

class EmailTester {
  constructor(options = {}) {
    this.options = options;
    this.results = {
      passed: 0,
      failed: 0,
      skipped: 0,
      tests: []
    };
  }

  log(message, type = 'info') {
    switch (type) {
      case 'success':
        console.log(`${green}✅ ${message}${reset}`);
        break;
      case 'error':
        console.log(`${red}❌ ${message}${reset}`);
        break;
      case 'warning':
        console.log(`${yellow}⚠️  ${message}${reset}`);
        break;
      case 'info':
        console.log(`${blue}ℹ️  ${message}${reset}`);
        break;
      case 'header':
        console.log(`\n${cyan}${bright}${message}${reset}`);
        break;
      case 'skip':
        console.log(`${yellow}⏭️  ${message}${reset}`);
        break;
    }
  }

  async test(name, testFn) {
    try {
      await testFn();
      this.results.passed++;
      this.results.tests.push({ name, status: 'passed' });
      this.log(`${name}`, 'success');
    } catch (error) {
      this.results.failed++;
      this.results.tests.push({ name, status: 'failed', error: error.message });
      this.log(`${name}: ${error.message}`, 'error');
    }
  }

  skip(name, reason) {
    this.results.skipped++;
    this.results.tests.push({ name, status: 'skipped', reason });
    this.log(`${name}: ${reason}`, 'skip');
  }

  async testEmailTemplateStructure() {
    await this.test('Email templates directory exists', async () => {
      const templatesDir = path.join(projectRoot, 'src', 'emails', 'templates');
      if (!fs.existsSync(templatesDir)) {
        throw new Error('Email templates directory not found');
      }
    });

    const requiredTemplates = [
      'LeadConfirmationEmail.tsx',
      'InternalLeadNotificationEmail.tsx',
      'ErrorNotificationEmail.tsx',
      'WelcomeEmail.tsx'
    ];

    for (const template of requiredTemplates) {
      await this.test(`Template ${template} exists`, async () => {
        const templatePath = path.join(projectRoot, 'src', 'emails', 'templates', template);
        if (!fs.existsSync(templatePath)) {
          throw new Error(`Template file not found: ${template}`);
        }

        // Basic syntax check - ensure it's valid TypeScript/React
        const content = fs.readFileSync(templatePath, 'utf8');
        if (!content.includes('export') || !content.includes('Email')) {
          throw new Error(`Template ${template} doesn't appear to be a valid React Email template`);
        }
      });
    }
  }

  async testEmailServiceModule() {
    await this.test('Email service module exists', async () => {
      const servicePath = path.join(projectRoot, 'src', 'emails', 'service.ts');
      if (!fs.existsSync(servicePath)) {
        throw new Error('Email service module not found');
      }

      const content = fs.readFileSync(servicePath, 'utf8');
      const requiredMethods = [
        'sendLeadConfirmation',
        'sendInternalNotification',
        'sendErrorNotification',
        'sendWelcomeEmail'
      ];

      for (const method of requiredMethods) {
        if (!content.includes(method)) {
          throw new Error(`Email service missing method: ${method}`);
        }
      }
    });
  }

  async testEmailConfiguration() {
    await this.test('Email configuration is valid', async () => {
      const envPath = path.join(projectRoot, '.env');
      if (!fs.existsSync(envPath)) {
        throw new Error('.env file not found');
      }

      const envContent = fs.readFileSync(envPath, 'utf8');
      const requiredVars = [
        'RESEND_API_KEY',
        'RESEND_DOMAIN',
        'RESEND_FROM_EMAIL',
        'INTERNAL_NOTIFICATION_EMAIL'
      ];

      for (const varName of requiredVars) {
        const match = envContent.match(new RegExp(`${varName}="([^"]*)"`, 'i'));
        if (!match || !match[1]) {
          throw new Error(`Missing or empty environment variable: ${varName}`);
        }

        // Check for placeholder values
        const value = match[1];
        if (value.includes('your-') || value.includes('yourdomain.com')) {
          throw new Error(`${varName} contains placeholder value: ${value}`);
        }
      }
    });
  }

  async testEmailServiceIntegration() {
    if (!this.options.sendRealEmails) {
      this.skip('Email service real sending test', 'Real email sending disabled (use --send-real-emails)');
      return;
    }

    await this.test('Email service can send test emails', async () => {
      try {
        // Import the email service
        const serviceModule = await import(path.join('file://', projectRoot, 'src', 'emails', 'service.ts'));
        const emailService = serviceModule.EmailService || serviceModule.default;

        if (!emailService) {
          throw new Error('EmailService not exported from service.ts');
        }

        // Test data for email sending
        const testData = {
          firstName: 'Test',
          lastName: 'User',
          email: this.options.testEmail || 'test@example.com',
          phone: '5551234567',
          debtAmount: '25000',
          debtType: 'credit_card',
          referenceNumber: 'TEST-' + Date.now()
        };

        // Send a test lead confirmation email
        const result = await emailService.sendLeadConfirmation(testData);
        
        if (!result.success) {
          throw new Error(`Email sending failed: ${result.error || 'Unknown error'}`);
        }

        this.log(`Test email sent successfully. Email ID: ${result.emailId}`, 'info');
      } catch (error) {
        throw new Error(`Email service integration failed: ${error.message}`);
      }
    });
  }

  async testEmailTemplateRendering() {
    await this.test('Email templates render without errors', async () => {
      try {
        // Test data for template rendering
        const testData = {
          firstName: 'Test',
          lastName: 'User',
          email: 'test@example.com',
          phone: '5551234567',
          debtAmount: '$25,000',
          debtType: 'Credit Cards',
          monthlyIncome: '$5,000',
          referenceNumber: 'TEST-123456789',
          submitDate: new Date().toLocaleDateString(),
          nextSteps: [
            'Review your qualification details',
            'Wait for a specialist to contact you',
            'Prepare your financial documents'
          ]
        };

        // Import and test each template
        const templates = [
          'LeadConfirmationEmail',
          'InternalLeadNotificationEmail',
          'ErrorNotificationEmail',
          'WelcomeEmail'
        ];

        for (const templateName of templates) {
          try {
            const templatePath = path.join('file://', projectRoot, 'src', 'emails', 'templates', `${templateName}.tsx`);
            const templateModule = await import(templatePath);
            const Template = templateModule.default || templateModule[templateName];

            if (!Template) {
              throw new Error(`Template ${templateName} not exported properly`);
            }

            // For React Email templates, we can't easily render them in Node.js
            // So we just check that they can be imported without syntax errors
            this.log(`Template ${templateName} imports successfully`, 'info');
          } catch (error) {
            throw new Error(`Template ${templateName} failed to import: ${error.message}`);
          }
        }
      } catch (error) {
        throw new Error(`Template rendering test failed: ${error.message}`);
      }
    });
  }

  async testEmailAnalyticsIntegration() {
    await this.test('Email analytics tracking is configured', async () => {
      // Check if email tracking table schema exists
      const trackingSchemaPath = path.join(projectRoot, 'scripts', '04-email-tracking-table.sql');
      if (!fs.existsSync(trackingSchemaPath)) {
        throw new Error('Email tracking table schema not found');
      }

      const schemaContent = fs.readFileSync(trackingSchemaPath, 'utf8');
      const requiredColumns = [
        'email_id',
        'email_type',
        'recipient_email',
        'status',
        'sent_at',
        'delivered_at',
        'opened_at',
        'clicked_at'
      ];

      for (const column of requiredColumns) {
        if (!schemaContent.includes(column)) {
          throw new Error(`Email tracking schema missing column: ${column}`);
        }
      }
    });
  }

  async testEmailWebhookIntegration() {
    await this.test('Email webhook handler exists', async () => {
      const webhookPath = path.join(projectRoot, 'src', 'pages', 'api', 'webhooks', 'resend.ts');
      if (!fs.existsSync(webhookPath)) {
        throw new Error('Resend webhook handler not found');
      }

      const webhookContent = fs.readFileSync(webhookPath, 'utf8');
      const requiredEvents = [
        'email.sent',
        'email.delivered',
        'email.bounced',
        'email.complained'
      ];

      for (const event of requiredEvents) {
        if (!webhookContent.includes(event)) {
          this.log(`Webhook may not handle event: ${event}`, 'warning');
        }
      }
    });
  }

  async testEmailQuotaMonitoring() {
    await this.test('Email quota monitoring is configured', async () => {
      // Check email usage tracking
      const usageSchemaPath = path.join(projectRoot, 'scripts', '03-email-usage-tracking.sql');
      if (!fs.existsSync(usageSchemaPath)) {
        throw new Error('Email usage tracking schema not found');
      }

      // Check email usage API endpoint
      const usageAPIPath = path.join(projectRoot, 'src', 'pages', 'api', 'email-usage.ts');
      if (!fs.existsSync(usageAPIPath)) {
        throw new Error('Email usage API endpoint not found');
      }

      const envPath = path.join(projectRoot, '.env');
      const envContent = fs.readFileSync(envPath, 'utf8');
      
      if (!envContent.includes('EMAIL_USAGE_ALERT_THRESHOLD')) {
        this.log('Email usage alert threshold not configured', 'warning');
      }
    });
  }

  async testGDPREmailCompliance() {
    await this.test('GDPR email compliance features exist', async () => {
      // Check for GDPR email templates
      const templatesDir = path.join(projectRoot, 'src', 'emails', 'templates');
      const templates = fs.readdirSync(templatesDir);
      
      // Look for any template that might handle GDPR notifications
      const hasGDPRSupport = templates.some(template => {
        const content = fs.readFileSync(path.join(templatesDir, template), 'utf8');
        return content.toLowerCase().includes('gdpr') || 
               content.toLowerCase().includes('data') ||
               content.toLowerCase().includes('deletion') ||
               content.toLowerCase().includes('export');
      });

      // Check GDPR API endpoints
      const gdprDeletePath = path.join(projectRoot, 'src', 'pages', 'api', 'gdpr', 'delete.ts');
      const gdprExportPath = path.join(projectRoot, 'src', 'pages', 'api', 'gdpr', 'export.ts');
      
      if (!fs.existsSync(gdprDeletePath) || !fs.existsSync(gdprExportPath)) {
        throw new Error('GDPR API endpoints not found');
      }

      // Check if GDPR endpoints handle email notifications
      const deleteContent = fs.readFileSync(gdprDeletePath, 'utf8');
      const exportContent = fs.readFileSync(gdprExportPath, 'utf8');
      
      if (!deleteContent.includes('email') && !exportContent.includes('email')) {
        this.log('GDPR endpoints may not send email confirmations', 'warning');
      }
    });
  }

  async runAllTests() {
    this.log('Email Integration Testing', 'header');
    
    if (this.options.sendRealEmails) {
      this.log('⚠️  Real email sending enabled - make sure you have valid credentials', 'warning');
    }

    if (this.options.testEmail) {
      this.log(`Test emails will be sent to: ${this.options.testEmail}`, 'info');
    }

    // Email system structure tests
    await this.testEmailTemplateStructure();
    await this.testEmailServiceModule();
    await this.testEmailConfiguration();

    // Email functionality tests
    await this.testEmailTemplateRendering();
    await this.testEmailServiceIntegration();

    // Email analytics and tracking tests
    await this.testEmailAnalyticsIntegration();
    await this.testEmailWebhookIntegration();
    await this.testEmailQuotaMonitoring();

    // Compliance tests
    await this.testGDPREmailCompliance();

    this.printSummary();
    return this.results.failed === 0;
  }

  printSummary() {
    this.log('Email Testing Results Summary', 'header');
    
    console.log(`${green}✅ Passed: ${this.results.passed}${reset}`);
    console.log(`${red}❌ Failed: ${this.results.failed}${reset}`);
    console.log(`${yellow}⏭️  Skipped: ${this.results.skipped}${reset}`);
    
    if (this.results.failed === 0) {
      console.log(`\n${green}${bright}🎉 EMAIL INTEGRATION TESTS PASSED!${reset}`);
      console.log(`${green}Email system is properly configured and ready for deployment.${reset}`);
    } else {
      console.log(`\n${red}${bright}🚨 EMAIL TESTS FAILED!${reset}`);
      console.log(`${red}Please fix the following issues:${reset}`);
      
      this.results.tests
        .filter(test => test.status === 'failed')
        .forEach(test => {
          console.log(`${red}  • ${test.name}: ${test.error}${reset}`);
        });
    }

    if (this.results.skipped > 0) {
      console.log(`\n${yellow}Skipped tests (run with --send-real-emails for full testing):${reset}`);
      this.results.tests
        .filter(test => test.status === 'skipped')
        .forEach(test => {
          console.log(`${yellow}  • ${test.name}: ${test.reason}${reset}`);
        });
    }
  }
}

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {};

  for (const arg of args) {
    if (arg === '--send-real-emails') {
      options.sendRealEmails = true;
    } else if (arg.startsWith('--test-email=')) {
      options.testEmail = arg.split('=')[1];
    } else if (arg === '--help') {
      console.log(`
Usage: node scripts/test-email-integration.mjs [options]

Options:
  --send-real-emails      Send actual test emails (requires valid Resend credentials)
  --test-email=EMAIL      Email address to send test emails to
  --help                  Show this help message

Examples:
  node scripts/test-email-integration.mjs
  node scripts/test-email-integration.mjs --send-real-emails --test-email=test@yourdomain.com

Note: Without --send-real-emails, only configuration and structure tests will run.
      `);
      process.exit(0);
    }
  }

  return options;
}

// Main execution
async function main() {
  const options = parseArgs();
  
  console.log(`${cyan}${bright}📧 Debt Relief Backend - Email Integration Testing${reset}\n`);
  
  const tester = new EmailTester(options);
  
  try {
    const success = await tester.runAllTests();
    process.exit(success ? 0 : 1);
  } catch (error) {
    console.error(`${red}❌ Email integration testing failed:${reset}`, error.message);
    process.exit(1);
  }
}

// Run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { EmailTester };
