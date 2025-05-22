#!/usr/bin/env node

/**
 * API and Email Integration Testing Script
 * 
 * Comprehensive testing suite for the debt relief form backend API endpoints
 * and email integration functionality. Tests all critical components before
 * production deployment.
 * 
 * Usage:
 *   node scripts/test-integration.mjs
 *   node scripts/test-integration.mjs --production-url=https://your-domain.netlify.app
 *   node scripts/test-integration.mjs --skip-email-tests
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

class IntegrationTester {
  constructor(baseUrl = 'http://localhost:4321', options = {}) {
    this.baseUrl = baseUrl.replace(/\/$/, '');
    this.options = options;
    this.results = {
      passed: 0,
      failed: 0,
      skipped: 0,
      tests: []
    };
    this.csrfToken = null;
  }

  log(message, type = 'info') {
    const timestamp = new Date().toISOString();
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

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const defaultHeaders = {
      'Content-Type': 'application/json',
      'User-Agent': 'DebtReliefTesting/1.0'
    };

    // Add CSRF token if available and needed
    if (this.csrfToken && options.method && options.method !== 'GET') {
      defaultHeaders['X-CSRF-Token'] = this.csrfToken;
    }

    const response = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers
      }
    });

    const contentType = response.headers.get('content-type');
    let data;
    
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    return {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      data
    };
  }

  // Test suite methods
  async testHealthEndpoint() {
    await this.test('Health endpoint responds correctly', async () => {
      const response = await this.request('/api/health');
      
      if (response.status !== 200) {
        throw new Error(`Expected status 200, got ${response.status}`);
      }
      
      if (typeof response.data !== 'object' || !response.data.status) {
        throw new Error('Health endpoint should return JSON with status field');
      }
      
      if (response.data.status !== 'healthy') {
        throw new Error(`Expected status 'healthy', got '${response.data.status}'`);
      }
    });
  }

  async testCSRFToken() {
    await this.test('CSRF token endpoint works', async () => {
      const response = await this.request('/api/csrf-token');
      
      if (response.status !== 200) {
        throw new Error(`Expected status 200, got ${response.status}`);
      }
      
      if (!response.data.token) {
        throw new Error('CSRF endpoint should return a token');
      }
      
      this.csrfToken = response.data.token;
    });
  }

  async testLeadsAPI() {
    await this.test('Leads API accepts valid submission', async () => {
      const testData = {
        firstName: 'Test',
        lastName: 'User',
        phone: '5551234567',
        email: 'test@example.com',
        debtAmount: '25000',
        debtType: 'credit_card',
        monthlyIncome: '5000',
        consentProcessing: true,
        consentMarketing: false
      };

      const response = await this.request('/api/leads', {
        method: 'POST',
        body: JSON.stringify(testData)
      });

      if (response.status !== 200) {
        throw new Error(`Expected status 200, got ${response.status}: ${JSON.stringify(response.data)}`);
      }

      if (!response.data.success) {
        throw new Error(`Expected success=true, got: ${JSON.stringify(response.data)}`);
      }
    });

    await this.test('Leads API rejects invalid data', async () => {
      const invalidData = {
        firstName: '',
        lastName: 'User',
        phone: 'invalid-phone'
      };

      const response = await this.request('/api/leads', {
        method: 'POST',
        body: JSON.stringify(invalidData)
      });

      if (response.status !== 400) {
        throw new Error(`Expected status 400 for invalid data, got ${response.status}`);
      }
    });

    await this.test('Leads API implements rate limiting', async () => {
      // Try to submit multiple requests quickly
      const testData = {
        firstName: 'RateLimit',
        lastName: 'Test',
        phone: '5551234567',
        debtAmount: '25000',
        debtType: 'credit_card',
        consentProcessing: true
      };

      const requests = [];
      for (let i = 0; i < 7; i++) { // Exceed the 5-request limit
        requests.push(this.request('/api/leads', {
          method: 'POST',
          body: JSON.stringify({
            ...testData,
            email: `ratelimit${i}@example.com`
          })
        }));
      }

      const responses = await Promise.all(requests);
      const rateLimited = responses.some(r => r.status === 429);

      if (!rateLimited) {
        throw new Error('Rate limiting should trigger after multiple requests');
      }
    });
  }

  async testEmailAnalyticsAPI() {
    await this.test('Email analytics endpoint responds', async () => {
      const response = await this.request('/api/email-analytics');
      
      if (response.status !== 200) {
        throw new Error(`Expected status 200, got ${response.status}`);
      }
      
      if (typeof response.data !== 'object') {
        throw new Error('Email analytics should return JSON data');
      }
    });
  }

  async testEmailUsageAPI() {
    await this.test('Email usage endpoint responds', async () => {
      const response = await this.request('/api/email-usage');
      
      if (response.status !== 200) {
        throw new Error(`Expected status 200, got ${response.status}`);
      }
      
      if (typeof response.data !== 'object') {
        throw new Error('Email usage should return JSON data');
      }
    });
  }

  async testGDPREndpoints() {
    await this.test('GDPR export endpoint requires valid data', async () => {
      const response = await this.request('/api/gdpr/export', {
        method: 'POST',
        body: JSON.stringify({ email: 'test@example.com', phone: '5551234567' })
      });
      
      // Should either succeed (200) or fail with validation error (400)
      // Rate limiting (429) is also acceptable
      const validStatuses = [200, 400, 429];
      if (!validStatuses.includes(response.status)) {
        throw new Error(`Expected status 200, 400, or 429, got ${response.status}`);
      }
    });

    await this.test('GDPR delete endpoint requires valid data', async () => {
      const response = await this.request('/api/gdpr/delete', {
        method: 'POST',
        body: JSON.stringify({ email: 'test@example.com', phone: '5551234567' })
      });
      
      // Should either succeed (200) or fail with validation error (400)
      // Rate limiting (429) is also acceptable
      const validStatuses = [200, 400, 429];
      if (!validStatuses.includes(response.status)) {
        throw new Error(`Expected status 200, 400, or 429, got ${response.status}`);
      }
    });
  }

  async testWebhookEndpoint() {
    await this.test('Webhook endpoint responds to valid requests', async () => {
      // Simulate a Resend webhook payload
      const webhookData = {
        type: 'email.delivered',
        created_at: new Date().toISOString(),
        data: {
          id: 'test-email-id',
          to: ['test@example.com'],
          subject: 'Test Email',
          created_at: new Date().toISOString()
        }
      };

      const response = await this.request('/api/webhooks/resend', {
        method: 'POST',
        body: JSON.stringify(webhookData),
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Resend'
        }
      });

      // Webhook should accept the request (even if signature verification fails in test)
      const validStatuses = [200, 400, 401]; // 400/401 for missing/invalid signature
      if (!validStatuses.includes(response.status)) {
        throw new Error(`Expected status 200, 400, or 401, got ${response.status}`);
      }
    });
  }

  async testEmailTemplates() {
    if (this.options.skipEmailTests) {
      this.skip('Email template rendering', 'Email tests skipped');
      return;
    }

    await this.test('Email template preview page loads', async () => {
      const response = await this.request('/email-preview');
      
      if (response.status !== 200) {
        throw new Error(`Expected status 200, got ${response.status}`);
      }
    });
  }

  async testSecurityHeaders() {
    await this.test('Security headers are present', async () => {
      const response = await this.request('/api/health');
      
      const requiredHeaders = [
        'x-frame-options',
        'x-content-type-options',
        'x-xss-protection'
      ];

      for (const header of requiredHeaders) {
        if (!response.headers.get(header)) {
          throw new Error(`Missing security header: ${header}`);
        }
      }
    });

    await this.test('API endpoints have cache control headers', async () => {
      const response = await this.request('/api/health');
      
      const cacheControl = response.headers.get('cache-control');
      if (!cacheControl || !cacheControl.includes('no-cache')) {
        throw new Error('API endpoints should have no-cache headers');
      }
    });
  }

  async testErrorHandling() {
    await this.test('Non-existent endpoints return 404', async () => {
      const response = await this.request('/api/non-existent-endpoint');
      
      if (response.status !== 404) {
        throw new Error(`Expected status 404, got ${response.status}`);
      }
    });

    await this.test('Invalid JSON returns 400', async () => {
      try {
        const response = await fetch(`${this.baseUrl}/api/leads`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: 'invalid-json{'
        });

        if (response.status !== 400) {
          throw new Error(`Expected status 400 for invalid JSON, got ${response.status}`);
        }
      } catch (error) {
        if (error.message.includes('Expected status 400')) {
          throw error;
        }
        // Network or parsing errors are expected for invalid JSON
      }
    });
  }

  async testPerformance() {
    await this.test('Health endpoint responds quickly', async () => {
      const start = Date.now();
      const response = await this.request('/api/health');
      const duration = Date.now() - start;

      if (response.status !== 200) {
        throw new Error(`Health check failed with status ${response.status}`);
      }

      if (duration > 5000) { // 5 second timeout
        throw new Error(`Health endpoint too slow: ${duration}ms`);
      }
    });

    await this.test('Form submission completes within timeout', async () => {
      const testData = {
        firstName: 'Performance',
        lastName: 'Test',
        phone: '5551234567',
        debtAmount: '25000',
        debtType: 'credit_card',
        consentProcessing: true
      };

      const start = Date.now();
      const response = await this.request('/api/leads', {
        method: 'POST',
        body: JSON.stringify(testData)
      });
      const duration = Date.now() - start;

      if (response.status === 429) {
        // Rate limited, skip this test
        this.skip('Form submission performance', 'Rate limited');
        return;
      }

      if (response.status !== 200) {
        throw new Error(`Form submission failed with status ${response.status}`);
      }

      if (duration > 15000) { // 15 second timeout
        throw new Error(`Form submission too slow: ${duration}ms`);
      }
    });
  }

  async runAllTests() {
    this.log('API and Email Integration Testing', 'header');
    this.log(`Testing against: ${this.baseUrl}`, 'info');

    // Basic connectivity and security tests
    await this.testHealthEndpoint();
    await this.testCSRFToken();
    await this.testSecurityHeaders();

    // Core API functionality tests
    await this.testLeadsAPI();
    await this.testEmailAnalyticsAPI();
    await this.testEmailUsageAPI();
    await this.testGDPREndpoints();
    await this.testWebhookEndpoint();

    // Email integration tests
    await this.testEmailTemplates();

    // Error handling and edge cases
    await this.testErrorHandling();

    // Performance tests
    await this.testPerformance();

    this.printSummary();
    return this.results.failed === 0;
  }

  printSummary() {
    this.log('Test Results Summary', 'header');
    
    console.log(`${green}✅ Passed: ${this.results.passed}${reset}`);
    console.log(`${red}❌ Failed: ${this.results.failed}${reset}`);
    console.log(`${yellow}⏭️  Skipped: ${this.results.skipped}${reset}`);
    
    if (this.results.failed === 0) {
      console.log(`\n${green}${bright}🎉 ALL TESTS PASSED!${reset}`);
      console.log(`${green}API and email integration is working correctly.${reset}`);
    } else {
      console.log(`\n${red}${bright}🚨 TESTS FAILED!${reset}`);
      console.log(`${red}Please fix the following issues:${reset}`);
      
      this.results.tests
        .filter(test => test.status === 'failed')
        .forEach(test => {
          console.log(`${red}  • ${test.name}: ${test.error}${reset}`);
        });
    }

    if (this.results.skipped > 0) {
      console.log(`\n${yellow}Skipped tests:${reset}`);
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
  let baseUrl = 'http://localhost:4321';
  const options = {};

  for (const arg of args) {
    if (arg.startsWith('--production-url=')) {
      baseUrl = arg.split('=')[1];
    } else if (arg === '--skip-email-tests') {
      options.skipEmailTests = true;
    } else if (arg === '--help') {
      console.log(`
Usage: node scripts/test-integration.mjs [options]

Options:
  --production-url=URL    Test against production URL instead of localhost
  --skip-email-tests      Skip email-related tests
  --help                  Show this help message

Examples:
  node scripts/test-integration.mjs
  node scripts/test-integration.mjs --production-url=https://your-domain.netlify.app
  node scripts/test-integration.mjs --skip-email-tests
      `);
      process.exit(0);
    }
  }

  return { baseUrl, options };
}

// Main execution
async function main() {
  const { baseUrl, options } = parseArgs();
  
  console.log(`${cyan}${bright}🧪 Debt Relief Backend - Integration Testing${reset}\n`);
  
  const tester = new IntegrationTester(baseUrl, options);
  
  try {
    const success = await tester.runAllTests();
    process.exit(success ? 0 : 1);
  } catch (error) {
    console.error(`${red}❌ Integration testing failed:${reset}`, error.message);
    process.exit(1);
  }
}

// Run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { IntegrationTester };
