/**
 * Resend Email Configuration
 * 
 * Centralized configuration for Resend email service with validation
 * and environment-specific settings.
 */

import { Resend } from 'resend';

// Configuration interface
export interface ResendConfig {
    apiKey: string;
    domain: string;
    fromEmail: string;
    fromName: string;
    internalEmail: string;
    adminEmail: string;
    usageAlertThreshold: number;
    usageCriticalThreshold: number;
}

// Free tier limits
export const RESEND_LIMITS = {
    FREE_TIER_MONTHLY: 3000,    // 3,000 emails per month
    FREE_TIER_DAILY: 100,       // 100 emails per day
    RATE_LIMIT_PER_SECOND: 2,   // 2 emails per second
    MAX_RECIPIENTS_PER_EMAIL: 50 // 50 recipients per email
} as const;

// Email types for tracking
export type EmailType = 
    | 'user_confirmation' 
    | 'internal_notification' 
    | 'error_alert' 
    | 'welcome' 
    | 'usage_alert'
    | 'system_notification';

/**
 * Validates and loads Resend configuration from environment variables
 */
export function loadResendConfig(): ResendConfig {
    // Validate required environment variables
    const requiredVars = {
        RESEND_API_KEY: import.meta.env.RESEND_API_KEY,
        RESEND_DOMAIN: import.meta.env.RESEND_DOMAIN,
        RESEND_FROM_EMAIL: import.meta.env.RESEND_FROM_EMAIL,
        INTERNAL_NOTIFICATION_EMAIL: import.meta.env.INTERNAL_NOTIFICATION_EMAIL,
        ADMIN_NOTIFICATION_EMAIL: import.meta.env.ADMIN_NOTIFICATION_EMAIL
    };
    
    const missingVars = Object.entries(requiredVars)
        .filter(([_, value]) => !value)
        .map(([key, _]) => key);
    
    if (missingVars.length > 0) {
        throw new Error(
            `Missing required Resend environment variables: ${missingVars.join(', ')}\n` +
            'Please check your .env file and refer to docs/resend-setup-guide.md'
        );
    }
    
    // Validate API key format
    if (!requiredVars.RESEND_API_KEY!.startsWith('re_')) {
        throw new Error('RESEND_API_KEY must start with "re_"');
    }
    
    // Validate email addresses
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailFields = {
        RESEND_FROM_EMAIL: requiredVars.RESEND_FROM_EMAIL!,
        INTERNAL_NOTIFICATION_EMAIL: requiredVars.INTERNAL_NOTIFICATION_EMAIL!,
        ADMIN_NOTIFICATION_EMAIL: requiredVars.ADMIN_NOTIFICATION_EMAIL!
    };
    
    for (const [field, email] of Object.entries(emailFields)) {
        if (!emailRegex.test(email)) {
            throw new Error(`${field} is not a valid email address: ${email}`);
        }
    }
    
    // Validate domain in from email
    const fromEmailDomain = requiredVars.RESEND_FROM_EMAIL!.split('@')[1];
    if (fromEmailDomain !== requiredVars.RESEND_DOMAIN) {
        throw new Error(
            `RESEND_FROM_EMAIL domain (${fromEmailDomain}) must match RESEND_DOMAIN (${requiredVars.RESEND_DOMAIN})`
        );
    }
    
    return {
        apiKey: requiredVars.RESEND_API_KEY!,
        domain: requiredVars.RESEND_DOMAIN!,
        fromEmail: requiredVars.RESEND_FROM_EMAIL!,
        fromName: import.meta.env.RESEND_FROM_NAME || 'Debt Relief Team',
        internalEmail: requiredVars.INTERNAL_NOTIFICATION_EMAIL!,
        adminEmail: requiredVars.ADMIN_NOTIFICATION_EMAIL!,
        usageAlertThreshold: parseInt(import.meta.env.EMAIL_USAGE_ALERT_THRESHOLD || '75'),
        usageCriticalThreshold: parseInt(import.meta.env.EMAIL_USAGE_CRITICAL_THRESHOLD || '90')
    };
}

/**
 * Creates and configures a Resend client instance
 */
export function createResendClient(): Resend {
    const config = loadResendConfig();
    return new Resend(config.apiKey);
}

/**
 * Gets the configured "from" address with display name
 */
export function getFromAddress(): string {
    const config = loadResendConfig();
    return `${config.fromName} <${config.fromEmail}>`;
}

/**
 * Validates the current configuration and tests API connectivity
 */
export async function validateConfiguration(): Promise<{
    isValid: boolean;
    errors: string[];
    warnings: string[];
    domains?: any[];
}> {
    const errors: string[] = [];
    const warnings: string[] = [];
    
    try {
        // Test configuration loading
        const config = loadResendConfig();
        
        // Test API connectivity
        const resend = createResendClient();
        const domains = await resend.domains.list();
        
        // Check if configured domain is verified
        const configuredDomain = config.domain;
        const verifiedDomains = domains.data || [];
        const domainVerified = verifiedDomains.some(
            (domain: any) => domain.name === configuredDomain && domain.status === 'verified'
        );
        
        if (!domainVerified) {
            warnings.push(
                `Domain "${configuredDomain}" is not verified in Resend. ` +
                'This may cause deliverability issues. Please complete domain verification.'
            );
        }
        
        // Check usage thresholds
        if (config.usageAlertThreshold >= config.usageCriticalThreshold) {
            warnings.push(
                'EMAIL_USAGE_ALERT_THRESHOLD should be less than EMAIL_USAGE_CRITICAL_THRESHOLD'
            );
        }
        
        return {
            isValid: errors.length === 0,
            errors,
            warnings,
            domains: verifiedDomains
        };
        
    } catch (error: any) {
        errors.push(`Configuration validation failed: ${error.message}`);
        
        return {
            isValid: false,
            errors,
            warnings
        };
    }
}

/**
 * Environment-specific configuration defaults
 */
export const ENV_DEFAULTS = {
    development: {
        fromName: 'Debt Relief Team (Dev)',
        usageAlertThreshold: 50,  // Lower threshold for development
        usageCriticalThreshold: 75
    },
    production: {
        fromName: 'Debt Relief Team',
        usageAlertThreshold: 75,
        usageCriticalThreshold: 90
    }
} as const;

/**
 * Gets the current environment (development or production)
 */
export function getCurrentEnvironment(): 'development' | 'production' {
    return import.meta.env.PROD ? 'production' : 'development';
}

/**
 * Gets environment-specific configuration with fallbacks
 */
export function getEnvironmentConfig(): ResendConfig {
    const baseConfig = loadResendConfig();
    const env = getCurrentEnvironment();
    const envDefaults = ENV_DEFAULTS[env];
    
    return {
        ...baseConfig,
        fromName: baseConfig.fromName || envDefaults.fromName,
        usageAlertThreshold: baseConfig.usageAlertThreshold || envDefaults.usageAlertThreshold,
        usageCriticalThreshold: baseConfig.usageCriticalThreshold || envDefaults.usageCriticalThreshold
    };
}

// Export singleton instances for convenience
let _configCache: ResendConfig | null = null;
let _clientCache: Resend | null = null;

/**
 * Gets cached configuration (loads once per process)
 */
export function getConfig(): ResendConfig {
    if (!_configCache) {
        _configCache = getEnvironmentConfig();
    }
    return _configCache;
}

/**
 * Gets cached Resend client (creates once per process)
 */
export function getClient(): Resend {
    if (!_clientCache) {
        _clientCache = createResendClient();
    }
    return _clientCache;
}

/**
 * Clears configuration cache (useful for testing)
 */
export function clearCache(): void {
    _configCache = null;
    _clientCache = null;
}
