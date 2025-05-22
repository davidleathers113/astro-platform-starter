/**
 * Email Configuration Validation Script
 * 
 * This script validates the Resend email configuration and tests the API connection.
 * Run this script after setting up your Resend account and DNS records.
 * 
 * Usage:
 *   npm run validate-email-config
 *   or
 *   node scripts/validate-email-config.js
 */

import { Resend } from 'resend';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

interface ValidationResult {
    success: boolean;
    errors: string[];
    warnings: string[];
    domains?: any[];
}

/**
 * Validates all required environment variables for email functionality
 */
function validateEnvironmentVariables(): { isValid: boolean; errors: string[]; warnings: string[] } {
    const errors: string[] = [];
    const warnings: string[] = [];
    
    // Required variables
    const required = [
        'RESEND_API_KEY',
    ];
    
    // Recommended variables
    const recommended = [
        'RESEND_DOMAIN',
        'RESEND_FROM_EMAIL', 
        'INTERNAL_NOTIFICATION_EMAIL',
        'ADMIN_NOTIFICATION_EMAIL'
    ];
    
    // Check required variables
    for (const varName of required) {
        if (!process.env[varName]) {
            errors.push(`Missing required environment variable: ${varName}`);
        } else if (process.env[varName]?.includes('your-') || process.env[varName]?.includes('here')) {
            errors.push(`Environment variable ${varName} appears to contain placeholder text`);
        }
    }
    
    // Check recommended variables
    for (const varName of recommended) {
        if (!process.env[varName]) {
            warnings.push(`Missing recommended environment variable: ${varName}`);
        } else if (process.env[varName]?.includes('your-') || process.env[varName]?.includes('here')) {
            warnings.push(`Environment variable ${varName} appears to contain placeholder text`);
        }
    }
    
    // Validate API key format
    if (process.env.RESEND_API_KEY && !process.env.RESEND_API_KEY.startsWith('re_')) {
        errors.push('RESEND_API_KEY should start with "re_"');
    }
    
    // Validate email addresses
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (process.env.RESEND_FROM_EMAIL && !emailRegex.test(process.env.RESEND_FROM_EMAIL)) {
        errors.push('RESEND_FROM_EMAIL is not a valid email address');
    }
    
    if (process.env.INTERNAL_NOTIFICATION_EMAIL && !emailRegex.test(process.env.INTERNAL_NOTIFICATION_EMAIL)) {
        errors.push('INTERNAL_NOTIFICATION_EMAIL is not a valid email address');
    }
    
    if (process.env.ADMIN_NOTIFICATION_EMAIL && !emailRegex.test(process.env.ADMIN_NOTIFICATION_EMAIL)) {
        errors.push('ADMIN_NOTIFICATION_EMAIL is not a valid email address');
    }
    
    return {
        isValid: errors.length === 0,
        errors,
        warnings
    };
}

/**
 * Tests the Resend API connection and retrieves account information
 */
async function testResendConnection(): Promise<{ success: boolean; data?: any; error?: string }> {
    if (!process.env.RESEND_API_KEY) {
        return { success: false, error: 'RESEND_API_KEY not found' };
    }
    
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    try {
        // Test API connection by listing domains
        const domains = await resend.domains.list();
        
        return {
            success: true,
            data: {
                domains: domains.data || [],
                apiKeyValid: true
            }
        };
    } catch (error: any) {
        return {
            success: false,
            error: error.message || 'Unknown Resend API error'
        };
    }
}

/**
 * Sends a test email to verify the email functionality
 */
async function sendTestEmail(): Promise<{ success: boolean; messageId?: string; error?: string }> {
    if (!process.env.RESEND_API_KEY) {
        return { success: false, error: 'RESEND_API_KEY not found' };
    }
    
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    const fromEmail = process.env.RESEND_FROM_EMAIL || `noreply@${process.env.RESEND_DOMAIN || 'example.com'}`;
    const toEmail = process.env.ADMIN_NOTIFICATION_EMAIL || process.env.INTERNAL_NOTIFICATION_EMAIL;
    
    if (!toEmail) {
        return { success: false, error: 'No test recipient email configured (ADMIN_NOTIFICATION_EMAIL or INTERNAL_NOTIFICATION_EMAIL)' };
    }
    
    try {
        const result = await resend.emails.send({
            from: fromEmail,
            to: [toEmail],
            subject: `Email Configuration Test - ${new Date().toLocaleString()}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2 style="color: #2d7984;">✅ Email Configuration Test Successful!</h2>
                    <p>This test email confirms that your Resend integration is working correctly.</p>
                    
                    <div style="background-color: #f0f8ff; padding: 15px; border-radius: 5px; margin: 20px 0;">
                        <h3>Configuration Details:</h3>
                        <ul>
                            <li><strong>From Email:</strong> ${fromEmail}</li>
                            <li><strong>To Email:</strong> ${toEmail}</li>
                            <li><strong>Domain:</strong> ${process.env.RESEND_DOMAIN || 'Not configured'}</li>
                            <li><strong>Timestamp:</strong> ${new Date().toISOString()}</li>
                        </ul>
                    </div>
                    
                    <p>If you received this email in your inbox (not spam), your email configuration is working properly! 🎉</p>
                    
                    <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
                    <p style="font-size: 12px; color: #666;">
                        This is an automated test email from the Astro Platform Starter debt relief system.
                    </p>
                </div>
            `
        });
        
        return {
            success: true,
            messageId: result.data?.id
        };
    } catch (error: any) {
        return {
            success: false,
            error: error.message || 'Unknown error sending test email'
        };
    }
}

/**
 * Main validation function that runs all checks
 */
export async function validateEmailConfiguration(): Promise<ValidationResult> {
    console.log('🔍 Validating Email Configuration...\n');
    
    const result: ValidationResult = {
        success: false,
        errors: [],
        warnings: []
    };
    
    // Step 1: Validate environment variables
    console.log('1. Checking environment variables...');
    const envCheck = validateEnvironmentVariables();
    result.errors.push(...envCheck.errors);
    result.warnings.push(...envCheck.warnings);
    
    if (envCheck.errors.length > 0) {
        console.log('❌ Environment variable validation failed');
        envCheck.errors.forEach(error => console.log(`   - ${error}`));
    } else {
        console.log('✅ Environment variables valid');
    }
    
    if (envCheck.warnings.length > 0) {
        console.log('⚠️  Environment variable warnings:');
        envCheck.warnings.forEach(warning => console.log(`   - ${warning}`));
    }
    
    console.log('');
    
    // Step 2: Test Resend API connection
    console.log('2. Testing Resend API connection...');
    const apiTest = await testResendConnection();
    
    if (apiTest.success) {
        console.log('✅ Resend API connection successful');
        if (apiTest.data?.domains && apiTest.data.domains.length > 0) {
            console.log(`📧 Verified domains: ${apiTest.data.domains.map((d: any) => d.name).join(', ')}`);
            result.domains = apiTest.data.domains;
        } else {
            console.log('⚠️  No verified domains found - you may need to complete domain verification');
            result.warnings.push('No verified domains found in Resend account');
        }
    } else {
        console.log('❌ Resend API connection failed');
        console.log(`   Error: ${apiTest.error}`);
        result.errors.push(`Resend API error: ${apiTest.error}`);
    }
    
    console.log('');
    
    // Step 3: Send test email (only if API connection works)
    if (apiTest.success && envCheck.errors.length === 0) {
        console.log('3. Sending test email...');
        const emailTest = await sendTestEmail();
        
        if (emailTest.success) {
            console.log('✅ Test email sent successfully');
            console.log(`📧 Message ID: ${emailTest.messageId}`);
            console.log('📬 Check your inbox for the test email');
        } else {
            console.log('❌ Test email failed');
            console.log(`   Error: ${emailTest.error}`);
            result.warnings.push(`Test email failed: ${emailTest.error}`);
        }
    } else {
        console.log('3. Skipping test email due to configuration errors');
    }
    
    console.log('');
    
    // Summary
    result.success = result.errors.length === 0;
    
    if (result.success) {
        console.log('🎉 Email configuration validation completed successfully!');
        if (result.warnings.length > 0) {
            console.log(`⚠️  ${result.warnings.length} warning(s) - consider addressing these for optimal performance`);
        }
    } else {
        console.log('❌ Email configuration validation failed');
        console.log(`🔧 Please fix ${result.errors.length} error(s) and run validation again`);
    }
    
    return result;
}

// Run validation if script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    validateEmailConfiguration()
        .then((result) => {
            process.exit(result.success ? 0 : 1);
        })
        .catch((error) => {
            console.error('Unexpected error during validation:', error);
            process.exit(1);
        });
}
