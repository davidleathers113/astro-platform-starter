/**
 * Email Template Testing Script
 * 
 * Tests all email templates with sample data and validates their rendering.
 * Run with: npm run email:test
 */

import { previewAllTemplates, validateTemplateRendering, EmailPreviewData } from '../src/emails/preview.js';
import { EmailService } from '../src/emails/service.js';
import type { EmailTemplateType } from '../src/emails/types.js';

async function testAllTemplates() {
    console.log('🧪 Testing Email Templates\n');
    
    const templates: EmailTemplateType[] = ['lead_confirmation', 'internal_notification', 'error_notification', 'welcome'];
    let allPassed = true;
    
    for (const templateType of templates) {
        console.log(`📧 Testing ${templateType}...`);
        
        try {
            // Test template rendering
            const validation = await validateTemplateRendering(templateType);
            
            if (validation.success) {
                console.log(`✅ ${templateType}: Rendering successful`);
            } else {
                console.log(`❌ ${templateType}: Rendering failed`);
                validation.errors.forEach(error => console.log(`   Error: ${error}`));
                allPassed = false;
            }
            
            if (validation.warnings.length > 0) {
                validation.warnings.forEach(warning => console.log(`   ⚠️  Warning: ${warning}`));
            }
            
        } catch (error) {
            console.log(`❌ ${templateType}: Exception during testing - ${error}`);
            allPassed = false;
        }
        
        console.log('');
    }
    
    // Test email service configuration (if possible)
    console.log('🔧 Testing Email Service Configuration...');
    try {
        const emailService = new EmailService();
        const configValidation = await emailService.validateConfiguration();
        
        if (configValidation.isValid) {
            console.log('✅ Email service configuration is valid');
        } else {
            console.log('⚠️  Email service configuration has issues:');
            configValidation.errors.forEach(error => console.log(`   Error: ${error}`));
            configValidation.warnings.forEach(warning => console.log(`   Warning: ${warning}`));
        }
    } catch (error) {
        console.log(`⚠️  Email service configuration test failed: ${error}`);
        console.log('   This is expected if Resend API keys are not configured.');
    }
    
    console.log('\n📊 Test Summary:');
    console.log(allPassed ? '✅ All template tests passed!' : '❌ Some template tests failed.');
    
    if (allPassed) {
        console.log('\n🚀 Templates are ready for production use!');
        console.log('   View templates: npm run email:preview');
        console.log('   Configure Resend: Check docs/resend-setup-guide.md');
    } else {
        console.log('\n🔧 Please fix the issues above before deploying.');
        process.exit(1);
    }
}

// Run tests
testAllTemplates().catch(error => {
    console.error('🚨 Test script failed:', error);
    process.exit(1);
});
