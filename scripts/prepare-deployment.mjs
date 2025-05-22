#!/usr/bin/env node

/**
 * Deployment Preparation Script for Debt Relief Form Backend
 * 
 * This script validates the environment configuration and provides deployment
 * readiness assessment for the Astro Platform Starter debt relief system.
 * 
 * Usage:
 *   node scripts/prepare-deployment.mjs
 *   node scripts/prepare-deployment.mjs --check-production
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

// ANSI color codes for console output
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

class DeploymentChecker {
  constructor() {
    this.issues = [];
    this.warnings = [];
    this.successes = [];
  }

  log(message, type = 'info') {
    const timestamp = new Date().toISOString();
    switch (type) {
      case 'success':
        console.log(`${green}✅ ${message}${reset}`);
        this.successes.push(message);
        break;
      case 'warning':
        console.log(`${yellow}⚠️  ${message}${reset}`);
        this.warnings.push(message);
        break;
      case 'error':
        console.log(`${red}❌ ${message}${reset}`);
        this.issues.push(message);
        break;
      case 'info':
        console.log(`${blue}ℹ️  ${message}${reset}`);
        break;
      case 'header':
        console.log(`\n${cyan}${bright}${message}${reset}`);
        break;
    }
  }

  async checkEnvironmentVariables() {
    this.log('Environment Variables Validation', 'header');
    
    const envPath = path.join(projectRoot, '.env');
    const envExamplePath = path.join(projectRoot, '.env.example');
    
    // Check if .env file exists
    if (!fs.existsSync(envPath)) {
      this.log('.env file not found - create from .env.example', 'error');
      return;
    }
    
    // Load environment variables
    const envContent = fs.readFileSync(envPath, 'utf8');
    const envExampleContent = fs.readFileSync(envExamplePath, 'utf8');
    
    // Required variables for debt relief system
    const requiredVars = [
      'SUPABASE_URL',
      'SUPABASE_ANON_KEY', 
      'SUPABASE_SERVICE_ROLE_KEY',
      'RESEND_API_KEY',
      'RESEND_DOMAIN',
      'RESEND_FROM_EMAIL',
      'INTERNAL_NOTIFICATION_EMAIL',
      'ADMIN_NOTIFICATION_EMAIL'
    ];
    
    const placeholderPatterns = [
      'your-project-id',
      'your-anon-key-here',
      'your-service-role-key-here',
      're_your-resend-api-key-here',
      'yourdomain.com',
      'noreply@yourdomain.com',
      'leads@yourdomain.com',
      'admin@yourdomain.com'
    ];
    
    for (const variable of requiredVars) {
      const match = envContent.match(new RegExp(`${variable}="([^"]*)"`, 'i'));
      if (!match) {
        this.log(`Missing required variable: ${variable}`, 'error');
        continue;
      }
      
      const value = match[1];
      if (!value || placeholderPatterns.some(pattern => value.includes(pattern))) {
        this.log(`${variable} contains placeholder value - needs real credentials`, 'error');
      } else {
        this.log(`${variable} configured`, 'success');
      }
    }
    
    // Validate specific formats
    this.validateSupabaseConfig(envContent);
    this.validateResendConfig(envContent);
  }
  
  validateSupabaseConfig(envContent) {
    const urlMatch = envContent.match(/SUPABASE_URL="([^"]*)"/);
    if (urlMatch && urlMatch[1]) {
      const url = urlMatch[1];
      if (url.startsWith('https://') && url.includes('.supabase.co')) {
        this.log('Supabase URL format is valid', 'success');
      } else {
        this.log('Supabase URL should be in format: https://your-project.supabase.co', 'error');
      }
    }
    
    const anonKeyMatch = envContent.match(/SUPABASE_ANON_KEY="([^"]*)"/);
    if (anonKeyMatch && anonKeyMatch[1] && anonKeyMatch[1].startsWith('eyJ')) {
      this.log('Supabase anon key format appears valid', 'success');
    } else {
      this.log('Supabase anon key should be a JWT token starting with "eyJ"', 'error');
    }
    
    const serviceKeyMatch = envContent.match(/SUPABASE_SERVICE_ROLE_KEY="([^"]*)"/);
    if (serviceKeyMatch && serviceKeyMatch[1] && serviceKeyMatch[1].startsWith('eyJ')) {
      this.log('Supabase service role key format appears valid', 'success');
    } else {
      this.log('Supabase service role key should be a JWT token starting with "eyJ"', 'error');
    }
  }
  
  validateResendConfig(envContent) {
    const apiKeyMatch = envContent.match(/RESEND_API_KEY="([^"]*)"/);
    if (apiKeyMatch && apiKeyMatch[1] && apiKeyMatch[1].startsWith('re_')) {
      this.log('Resend API key format is valid', 'success');
    } else {
      this.log('Resend API key should start with "re_"', 'error');
    }
    
    const domainMatch = envContent.match(/RESEND_DOMAIN="([^"]*)"/);
    const fromEmailMatch = envContent.match(/RESEND_FROM_EMAIL="([^"]*)"/);
    
    if (domainMatch && fromEmailMatch) {
      const domain = domainMatch[1];
      const fromEmail = fromEmailMatch[1];
      
      if (fromEmail.includes(domain)) {
        this.log('Email domain configuration is consistent', 'success');
      } else {
        this.log('FROM_EMAIL should use the same domain as RESEND_DOMAIN', 'warning');
      }
    }
  }

  async checkDatabaseSetup() {
    this.log('Database Setup Validation', 'header');
    
    const scriptsDir = path.join(projectRoot, 'scripts');
    const requiredScripts = [
      '01-create-schema.sql',
      '02-setup-rls.sql', 
      '03-email-usage-tracking.sql',
      '04-email-tracking-table.sql'
    ];
    
    for (const script of requiredScripts) {
      const scriptPath = path.join(scriptsDir, script);
      if (fs.existsSync(scriptPath)) {
        this.log(`Database script found: ${script}`, 'success');
      } else {
        this.log(`Missing database script: ${script}`, 'error');
      }
    }
    
    // Check for setup documentation
    const setupDocPath = path.join(scriptsDir, 'DATABASE_SETUP.md');
    if (fs.existsSync(setupDocPath)) {
      this.log('Database setup documentation found', 'success');
    } else {
      this.log('Missing DATABASE_SETUP.md documentation', 'warning');
    }
  }

  async checkAPIEndpoints() {
    this.log('API Endpoints Validation', 'header');
    
    const apiDir = path.join(projectRoot, 'src', 'pages', 'api');
    const requiredEndpoints = [
      'leads.ts',
      'email-analytics.ts',
      'email-usage.ts',
      'health.ts',
      'gdpr/delete.ts',
      'gdpr/export.ts',
      'webhooks/resend.ts'
    ];
    
    for (const endpoint of requiredEndpoints) {
      const endpointPath = path.join(apiDir, endpoint);
      if (fs.existsSync(endpointPath)) {
        this.log(`API endpoint found: /api/${endpoint.replace('.ts', '')}`, 'success');
      } else {
        this.log(`Missing API endpoint: ${endpoint}`, 'error');
      }
    }
  }

  async checkEmailTemplates() {
    this.log('Email Templates Validation', 'header');
    
    const emailsDir = path.join(projectRoot, 'src', 'emails');
    const templatesDir = path.join(emailsDir, 'templates');
    
    if (!fs.existsSync(emailsDir)) {
      this.log('Email templates directory not found', 'error');
      return;
    }
    
    const requiredTemplates = [
      'LeadConfirmationEmail.tsx',
      'InternalLeadNotificationEmail.tsx',
      'ErrorNotificationEmail.tsx',
      'WelcomeEmail.tsx'
    ];
    
    for (const template of requiredTemplates) {
      const templatePath = path.join(templatesDir, template);
      if (fs.existsSync(templatePath)) {
        this.log(`Email template found: ${template}`, 'success');
      } else {
        this.log(`Missing email template: ${template}`, 'error');
      }
    }
    
    // Check for email service
    const servicePath = path.join(emailsDir, 'service.ts');
    if (fs.existsSync(servicePath)) {
      this.log('Email service module found', 'success');
    } else {
      this.log('Missing email service module', 'error');
    }
  }

  async checkSecurityFeatures() {
    this.log('Security Features Validation', 'header');
    
    const utilsDir = path.join(projectRoot, 'src', 'utils');
    const securityFiles = [
      'csrf.ts',
      'rate-limiting.ts',
      'validation-middleware.ts'
    ];
    
    for (const file of securityFiles) {
      const filePath = path.join(utilsDir, file);
      if (fs.existsSync(filePath)) {
        this.log(`Security module found: ${file}`, 'success');
      } else {
        this.log(`Missing security module: ${file}`, 'error');
      }
    }
  }

  async checkDeploymentConfiguration() {
    this.log('Deployment Configuration Validation', 'header');
    
    // Check Astro config
    const astroConfigPath = path.join(projectRoot, 'astro.config.mjs');
    if (fs.existsSync(astroConfigPath)) {
      const configContent = fs.readFileSync(astroConfigPath, 'utf8');
      if (configContent.includes('@astrojs/netlify')) {
        this.log('Astro configured for Netlify deployment', 'success');
      } else {
        this.log('Astro not configured for Netlify - add @astrojs/netlify adapter', 'error');
      }
    } else {
      this.log('Missing astro.config.mjs', 'error');
    }
    
    // Check netlify.toml
    const netlifyConfigPath = path.join(projectRoot, 'netlify.toml');
    if (fs.existsSync(netlifyConfigPath)) {
      this.log('Netlify configuration file found', 'success');
    } else {
      this.log('Missing netlify.toml - will use default Netlify settings', 'warning');
    }
    
    // Check package.json scripts
    const packagePath = path.join(projectRoot, 'package.json');
    if (fs.existsSync(packagePath)) {
      const packageContent = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
      const requiredScripts = ['build', 'dev', 'preview'];
      
      for (const script of requiredScripts) {
        if (packageContent.scripts && packageContent.scripts[script]) {
          this.log(`Package script found: ${script}`, 'success');
        } else {
          this.log(`Missing package script: ${script}`, 'error');
        }
      }
    }
  }

  async checkTestingInfrastructure() {
    this.log('Testing Infrastructure Validation', 'header');
    
    const validationScript = path.join(projectRoot, 'scripts', 'validate-integration.mjs');
    if (fs.existsSync(validationScript)) {
      this.log('Integration validation script found', 'success');
    } else {
      this.log('Missing validate-integration.mjs testing script', 'error');
    }
    
    const testsDir = path.join(projectRoot, 'tests');
    if (fs.existsSync(testsDir)) {
      this.log('Tests directory found', 'success');
    } else {
      this.log('Tests directory not found - consider adding tests', 'warning');
    }
  }

  generateDeploymentGuide() {
    this.log('Deployment Preparation Guide', 'header');
    
    console.log(`
${cyan}=== DEPLOYMENT PREPARATION CHECKLIST ===${reset}

${bright}1. Environment Configuration:${reset}
   □ Copy .env.example to .env and fill in real credentials
   □ Get Supabase credentials from: https://app.supabase.com/project/[your-project]/settings/api
   □ Get Resend API key from: https://resend.com/api-keys
   □ Verify domain in Resend dashboard and configure DNS records
   
${bright}2. Database Setup:${reset}
   □ Run database migration scripts in Supabase SQL editor:
     - scripts/01-create-schema.sql
     - scripts/02-setup-rls.sql
     - scripts/03-email-usage-tracking.sql
     - scripts/04-email-tracking-table.sql
   □ Enable Row Level Security in Supabase dashboard
   
${bright}3. Email Configuration:${reset}
   □ Verify domain in Resend dashboard
   □ Set up SPF, DKIM, DMARC records (see docs/resend-setup-guide.md)
   □ Test email sending with scripts/validate-email-config.ts
   
${bright}4. Security Configuration:${reset}
   □ Verify CSRF protection is enabled
   □ Check rate limiting is configured
   □ Validate input sanitization
   □ Test GDPR compliance endpoints
   
${bright}5. Netlify Deployment:${reset}
   □ Connect repository to Netlify
   □ Set environment variables in Netlify dashboard
   □ Configure build settings: Command: "npm run build", Directory: "dist"
   □ Set up webhook URLs in Resend dashboard to point to your Netlify domain
   
${bright}6. Production Testing:${reset}
   □ Run scripts/validate-integration.mjs after deployment
   □ Test form submission end-to-end
   □ Verify email delivery and tracking
   □ Test GDPR endpoints
   □ Check monitoring and analytics
   
${bright}7. Monitoring Setup:${reset}
   □ Set up Netlify function monitoring
   □ Configure Supabase project alerts
   □ Monitor Resend email quotas
   □ Set up uptime monitoring for critical endpoints
`);
  }

  printSummary() {
    this.log('Deployment Readiness Summary', 'header');
    
    console.log(`${green}✅ Successes: ${this.successes.length}${reset}`);
    console.log(`${yellow}⚠️  Warnings: ${this.warnings.length}${reset}`);
    console.log(`${red}❌ Issues: ${this.issues.length}${reset}`);
    
    if (this.issues.length === 0) {
      console.log(`\n${green}${bright}🎉 DEPLOYMENT READY!${reset}`);
      console.log(`${green}All critical checks passed. You can proceed with deployment.${reset}`);
    } else {
      console.log(`\n${red}${bright}🚨 DEPLOYMENT BLOCKED!${reset}`);
      console.log(`${red}Please resolve the following issues before deployment:${reset}`);
      this.issues.forEach(issue => console.log(`${red}  • ${issue}${reset}`));
    }
    
    if (this.warnings.length > 0) {
      console.log(`\n${yellow}⚠️  Warnings (recommended to address):${reset}`);
      this.warnings.forEach(warning => console.log(`${yellow}  • ${warning}${reset}`));
    }
  }

  async run() {
    console.log(`${cyan}${bright}🚀 Debt Relief Form Backend - Deployment Preparation${reset}\n`);
    
    await this.checkEnvironmentVariables();
    await this.checkDatabaseSetup();
    await this.checkAPIEndpoints();
    await this.checkEmailTemplates();
    await this.checkSecurityFeatures();
    await this.checkDeploymentConfiguration();
    await this.checkTestingInfrastructure();
    
    this.generateDeploymentGuide();
    this.printSummary();
    
    return this.issues.length === 0;
  }
}

// Main execution
async function main() {
  const isProductionCheck = process.argv.includes('--check-production');
  const checker = new DeploymentChecker();
  
  try {
    const isReady = await checker.run();
    process.exit(isReady ? 0 : 1);
  } catch (error) {
    console.error(`${red}❌ Deployment preparation failed:${reset}`, error.message);
    process.exit(1);
  }
}

// Run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { DeploymentChecker };
