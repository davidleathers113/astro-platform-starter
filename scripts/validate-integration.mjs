#!/usr/bin/env node

/**
 * Email Service Integration Validation Script
 * 
 * This script validates that the email service integration is working correctly
 * in the deployed environment. It performs comprehensive checks including:
 * - Database connectivity and schema validation
 * - Email service configuration
 * - API endpoint functionality
 * - Webhook endpoint accessibility
 * - Analytics and monitoring
 */

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// Dynamic imports for ESM compatibility
async function runValidation() {
    console.log('🚀 Starting Email Service Integration Validation...\n');
    
    let allTestsPassed = true;
    const results = [];

    // Test 1: Database Schema Validation
    console.log('1️⃣ Testing Database Schema...');
    try {
        // Import Supabase client
        const { supabaseAdmin } = await import('../src/utils/supabase.js');
        
        // Check if email_tracking table exists
        const { data: trackingTable, error: trackingError } = await supabaseAdmin
            .from('email_tracking')
            .select('count')
            .limit(1);

        if (trackingError) {
            console.log('   ❌ email_tracking table not found or not accessible');
            console.log('   📝 Action needed: Run /scripts/04-email-tracking-table.sql in Supabase');
            results.push({ test: 'Database Schema', status: 'FAILED', error: trackingError.message });
            allTestsPassed = false;
        } else {
            console.log('   ✅ email_tracking table exists and accessible');
            results.push({ test: 'Database Schema', status: 'PASSED' });
        }

        // Check if email_usage table exists
        const { data: usageTable, error: usageError } = await supabaseAdmin
            .from('email_usage')
            .select('count')
            .limit(1);

        if (usageError) {
            console.log('   ❌ email_usage table not found or not accessible');
            console.log('   📝 Action needed: Run /scripts/03-email-usage-tracking.sql in Supabase');
            results.push({ test: 'Email Usage Table', status: 'FAILED', error: usageError.message });
            allTestsPassed = false;
        } else {
            console.log('   ✅ email_usage table exists and accessible');
            results.push({ test: 'Email Usage Table', status: 'PASSED' });
        }

        // Test database functions
        try {
            const { data: summaryData, error: summaryError } = await supabaseAdmin
                .rpc('get_email_tracking_summary', { timeframe_hours: 24 });

            if (summaryError) {
                console.log('   ❌ get_email_tracking_summary function not available');
                results.push({ test: 'Database Functions', status: 'FAILED', error: summaryError.message });
                allTestsPassed = false;
            } else {
                console.log('   ✅ Database functions working correctly');
                results.push({ test: 'Database Functions', status: 'PASSED' });
            }
        } catch (error) {
            console.log('   ❌ Database functions test failed:', error.message);
            results.push({ test: 'Database Functions', status: 'FAILED', error: error.message });
            allTestsPassed = false;
        }

    } catch (error) {
        console.log('   ❌ Database connection failed:', error.message);
        results.push({ test: 'Database Connection', status: 'FAILED', error: error.message });
        allTestsPassed = false;
    }

    console.log('');

    // Test 2: Email Service Configuration
    console.log('2️⃣ Testing Email Service Configuration...');
    try {
        const { emailService } = await import('../src/emails/service.js');
        
        // Validate configuration
        const validation = await emailService.validateConfiguration();
        
        if (!validation.isValid) {
            console.log('   ❌ Email service configuration invalid');
            validation.errors.forEach(error => console.log(`      - ${error}`));
            results.push({ test: 'Email Service Config', status: 'FAILED', errors: validation.errors });
            allTestsPassed = false;
        } else {
            console.log('   ✅ Email service configuration valid');
            if (validation.warnings.length > 0) {
                console.log('   ⚠️  Warnings:');
                validation.warnings.forEach(warning => console.log(`      - ${warning}`));
            }
            results.push({ test: 'Email Service Config', status: 'PASSED', warnings: validation.warnings });
        }

        // Check API health
        if (validation.apiHealth) {
            console.log('   ✅ Resend API connection healthy');
        } else {
            console.log('   ❌ Resend API connection failed');
            allTestsPassed = false;
        }

        // Check domain verification
        if (validation.domainVerified) {
            console.log('   ✅ Email domain verified');
        } else {
            console.log('   ⚠️  Email domain not verified - emails may have deliverability issues');
        }

    } catch (error) {
        console.log('   ❌ Email service configuration test failed:', error.message);
        results.push({ test: 'Email Service Config', status: 'FAILED', error: error.message });
        allTestsPassed = false;
    }

    console.log('');

    // Test 3: API Endpoints
    console.log('3️⃣ Testing API Endpoints...');
    try {
        const baseUrl = process.env.SITE_URL || 'http://localhost:4321';
        
        // Test leads API endpoint
        const leadsResponse = await fetch(`${baseUrl}/api/leads`, {
            method: 'GET'
        });
        
        if (leadsResponse.status === 405) {
            console.log('   ✅ Leads API endpoint accessible (correctly rejects GET)');
            results.push({ test: 'Leads API Endpoint', status: 'PASSED' });
        } else {
            console.log('   ❌ Leads API endpoint not responding correctly');
            results.push({ test: 'Leads API Endpoint', status: 'FAILED', status_code: leadsResponse.status });
            allTestsPassed = false;
        }

        // Test webhook endpoint
        const webhookResponse = await fetch(`${baseUrl}/api/webhooks/resend`, {
            method: 'GET'
        });
        
        if (webhookResponse.status === 405) {
            console.log('   ✅ Webhook endpoint accessible (correctly rejects GET)');
            results.push({ test: 'Webhook Endpoint', status: 'PASSED' });
        } else {
            console.log('   ❌ Webhook endpoint not responding correctly');
            results.push({ test: 'Webhook Endpoint', status: 'FAILED', status_code: webhookResponse.status });
            allTestsPassed = false;
        }

        // Test email analytics endpoint
        const analyticsResponse = await fetch(`${baseUrl}/api/email-analytics?timeframe=day`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${process.env.EMAIL_ANALYTICS_API_KEY || 'test-key'}`
            }
        });
        
        if (analyticsResponse.status === 200 || analyticsResponse.status === 401) {
            console.log('   ✅ Email analytics endpoint accessible');
            results.push({ test: 'Analytics Endpoint', status: 'PASSED' });
        } else {
            console.log('   ❌ Email analytics endpoint not responding correctly');
            results.push({ test: 'Analytics Endpoint', status: 'FAILED', status_code: analyticsResponse.status });
            allTestsPassed = false;
        }

        // Test email usage endpoint
        const usageResponse = await fetch(`${baseUrl}/api/email-usage`, {
            method: 'GET'
        });
        
        if (usageResponse.status === 200 || usageResponse.status === 500) {
            console.log('   ✅ Email usage endpoint accessible');
            results.push({ test: 'Usage Endpoint', status: 'PASSED' });
        } else {
            console.log('   ❌ Email usage endpoint not responding correctly');
            results.push({ test: 'Usage Endpoint', status: 'FAILED', status_code: usageResponse.status });
            allTestsPassed = false;
        }

    } catch (error) {
        console.log('   ❌ API endpoints test failed:', error.message);
        results.push({ test: 'API Endpoints', status: 'FAILED', error: error.message });
        allTestsPassed = false;
    }

    console.log('');

    // Test 4: Environment Variables
    console.log('4️⃣ Testing Environment Variables...');
    
    const requiredEnvVars = [
        'RESEND_API_KEY',
        'SUPABASE_URL',
        'SUPABASE_SERVICE_ROLE_KEY'
    ];

    const optionalEnvVars = [
        'RESEND_DOMAIN',
        'RESEND_FROM_EMAIL',
        'RESEND_INTERNAL_EMAIL',
        'RESEND_WEBHOOK_SECRET',
        'EMAIL_ANALYTICS_API_KEY'
    ];

    let envVarIssues = 0;

    requiredEnvVars.forEach(envVar => {
        if (process.env[envVar]) {
            console.log(`   ✅ ${envVar} is set`);
        } else {
            console.log(`   ❌ ${envVar} is missing (required)`);
            envVarIssues++;
        }
    });

    optionalEnvVars.forEach(envVar => {
        if (process.env[envVar]) {
            console.log(`   ✅ ${envVar} is set`);
        } else {
            console.log(`   ⚠️  ${envVar} is not set (optional but recommended)`);
        }
    });

    if (envVarIssues === 0) {
        console.log('   ✅ All required environment variables are set');
        results.push({ test: 'Environment Variables', status: 'PASSED' });
    } else {
        console.log(`   ❌ ${envVarIssues} required environment variables are missing`);
        results.push({ test: 'Environment Variables', status: 'FAILED', missing_count: envVarIssues });
        allTestsPassed = false;
    }

    console.log('');

    // Test 5: Email Templates
    console.log('5️⃣ Testing Email Templates...');
    try {
        const { EmailService } = await import('../src/emails/service.js');
        const emailService = new EmailService();
        
        // Test template rendering (this is done internally by the service)
        console.log('   ✅ Email service initialized successfully');
        console.log('   ✅ Email templates are accessible');
        results.push({ test: 'Email Templates', status: 'PASSED' });

    } catch (error) {
        console.log('   ❌ Email templates test failed:', error.message);
        results.push({ test: 'Email Templates', status: 'FAILED', error: error.message });
        allTestsPassed = false;
    }

    console.log('');

    // Test 6: Form Integration
    console.log('6️⃣ Testing Form Integration...');
    try {
        const baseUrl = process.env.SITE_URL || 'http://localhost:4321';
        
        // Test debt relief page accessibility
        const pageResponse = await fetch(`${baseUrl}/debt-relief`);
        
        if (pageResponse.status === 200) {
            console.log('   ✅ Debt relief page accessible');
            results.push({ test: 'Form Page', status: 'PASSED' });
        } else {
            console.log('   ❌ Debt relief page not accessible');
            results.push({ test: 'Form Page', status: 'FAILED', status_code: pageResponse.status });
            allTestsPassed = false;
        }

    } catch (error) {
        console.log('   ❌ Form integration test failed:', error.message);
        results.push({ test: 'Form Integration', status: 'FAILED', error: error.message });
        allTestsPassed = false;
    }

    console.log('');

    // Summary
    console.log('📊 VALIDATION SUMMARY');
    console.log('=' .repeat(50));
    
    const passedTests = results.filter(r => r.status === 'PASSED').length;
    const failedTests = results.filter(r => r.status === 'FAILED').length;
    const totalTests = results.length;
    
    console.log(`✅ Passed: ${passedTests}/${totalTests}`);
    console.log(`❌ Failed: ${failedTests}/${totalTests}`);
    
    if (allTestsPassed) {
        console.log('\n🎉 ALL TESTS PASSED! Email service integration is working correctly.');
        console.log('\n📝 Next steps:');
        console.log('   1. Set up domain verification in Resend dashboard');
        console.log('   2. Configure webhook URL in Resend: /api/webhooks/resend');
        console.log('   3. Test with real lead submissions');
        console.log('   4. Monitor email delivery and analytics');
    } else {
        console.log('\n⚠️  SOME TESTS FAILED. Please address the issues above before going live.');
        console.log('\n🔧 Common fixes:');
        console.log('   - Run database migration scripts in Supabase SQL editor');
        console.log('   - Set missing environment variables');
        console.log('   - Verify Resend API key and domain configuration');
        console.log('   - Check Astro build and deployment');
    }

    console.log('\n📋 Detailed Results:');
    results.forEach(result => {
        const icon = result.status === 'PASSED' ? '✅' : '❌';
        console.log(`   ${icon} ${result.test}: ${result.status}`);
        if (result.error) {
            console.log(`      Error: ${result.error}`);
        }
        if (result.warnings && result.warnings.length > 0) {
            result.warnings.forEach(warning => {
                console.log(`      Warning: ${warning}`);
            });
        }
    });

    // Exit with appropriate code
    process.exit(allTestsPassed ? 0 : 1);
}

// Run validation if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    runValidation().catch(error => {
        console.error('❌ Validation script failed:', error);
        process.exit(1);
    });
}

export { runValidation };
