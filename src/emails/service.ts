/**
 * Enhanced Email Service with Retry Logic, Logging, and Queue System
 * 
 * Comprehensive email service module that handles all interactions with the Resend API,
 * including advanced error handling, retry logic, logging, and high-volume queue processing.
 */

import { render } from '@react-email/render';
import { getClient, getConfig } from '../config/resend';
import {
    EmailTemplateType,
    LeadConfirmationEmailData,
    InternalLeadNotificationEmailData,
    ErrorNotificationEmailData,
    WelcomeEmailData,
    EmailTrackingData
} from './types';
import {
    LeadConfirmationEmail,
    InternalLeadNotificationEmail,
    ErrorNotificationEmail,
    WelcomeEmail,
    generateEmailSubject,
    EMAIL_TEMPLATE_METADATA
} from './templates';

// Enhanced email sending result interface
export interface EmailSendResult {
    success: boolean;
    emailId?: string;
    error?: string;
    retryCount?: number;
    duration?: number;
    metadata?: {
        templateType: EmailTemplateType;
        recipientEmail: string;
        sentAt: string;
        resendId?: string;
        attempt: number;
        queueId?: string;
    };
}

// Email sending options with retry configuration
export interface EmailSendOptions {
    templateType: EmailTemplateType;
    to: string | string[];
    data: any;
    subject?: string;
    from?: string;
    replyTo?: string;
    tags?: Record<string, string>;
    trackOpens?: boolean;
    trackClicks?: boolean;
    // Retry configuration
    retryCount?: number;
    retryDelay?: number;
    retryBackoff?: 'linear' | 'exponential';
    // Queue configuration
    priority?: 'low' | 'medium' | 'high' | 'urgent';
    scheduleAt?: Date;
    queueId?: string;
}

// Email queue item interface
interface EmailQueueItem {
    id: string;
    options: EmailSendOptions;
    createdAt: Date;
    scheduledAt: Date;
    attempts: number;
    status: 'pending' | 'processing' | 'completed' | 'failed' | 'retrying';
    lastError?: string;
    completedAt?: Date;
}

// Logging interface
interface EmailLog {
    timestamp: string;
    level: 'info' | 'warn' | 'error' | 'debug';
    message: string;
    context: {
        templateType?: EmailTemplateType;
        recipientEmail?: string;
        emailId?: string;
        queueId?: string;
        attempt?: number;
        error?: string;
        duration?: number;
        [key: string]: any;
    };
}

// Email statistics interface
interface EmailStats {
    totalSent: number;
    totalFailed: number;
    successRate: number;
    averageDeliveryTime: number;
    byTemplate: Record<EmailTemplateType, {
        sent: number;
        failed: number;
        successRate: number;
    }>;
    errors: Array<{
        error: string;
        count: number;
        lastOccurred: string;
    }>;
    queueStats: {
        pending: number;
        processing: number;
        completed: number;
        failed: number;
    };
}

/**
 * Enhanced Email Service Class with Retry Logic, Logging, and Queue System
 */
export class EmailService {
    private resend;
    private config;
    private emailQueue: Map<string, EmailQueueItem> = new Map();
    private logs: EmailLog[] = [];
    private isProcessing = false;
    private retryDefaults = {
        retryCount: 3,
        retryDelay: 1000, // 1 second
        retryBackoff: 'exponential' as const
    };

    constructor() {
        this.resend = getClient();
        this.config = getConfig();
        
        // Start queue processor
        this.startQueueProcessor();
        
        this.log('info', 'EmailService initialized', {
            environment: this.config.fromName
        });
    }

    /**
     * Enhanced email sending with retry logic and queue support
     */
    async sendTemplateEmail(options: EmailSendOptions): Promise<EmailSendResult> {
        const startTime = Date.now();
        const queueId = options.queueId || this.generateId();

        this.log('info', 'Email send requested', {
            templateType: options.templateType,
            recipientEmail: Array.isArray(options.to) ? options.to[0] : options.to,
            queueId,
            priority: options.priority || 'medium'
        });

        // If scheduled for future, add to queue
        if (options.scheduleAt && options.scheduleAt > new Date()) {
            return this.enqueueEmail({ ...options, queueId });
        }

        // Send immediately with retry logic
        return this.sendEmailWithRetry({
            ...this.retryDefaults,
            ...options,
            queueId
        }, startTime);
    }

    /**
     * Send email with comprehensive retry logic
     */
    private async sendEmailWithRetry(
        options: EmailSendOptions & typeof this.retryDefaults,
        startTime: number,
        attempt: number = 1
    ): Promise<EmailSendResult> {
        try {
            // Validate template type
            if (!EMAIL_TEMPLATE_METADATA[options.templateType]) {
                throw new Error(`Invalid template type: ${options.templateType}`);
            }

            // Get template metadata
            const metadata = EMAIL_TEMPLATE_METADATA[options.templateType];

            // Render the email template
            const htmlContent = await this.renderTemplate(options.templateType, options.data);

            // Generate subject line
            const subject = options.subject || this.generateSubject(options.templateType, options.data);

            // Prepare email data
            const emailData = {
                from: options.from || `${this.config.fromName} <${this.config.fromEmail}>`,
                to: Array.isArray(options.to) ? options.to : [options.to],
                subject,
                html: htmlContent,
                replyTo: options.replyTo,
                tags: {
                    template: options.templateType,
                    category: metadata.category,
                    priority: metadata.priority,
                    attempt: attempt.toString(),
                    queue_id: options.queueId,
                    ...options.tags
                }
            };

            // Add tracking if enabled
            if (options.trackOpens !== false && metadata.trackingEnabled) {
                emailData.tags.track_opens = 'true';
            }
            
            if (options.trackClicks !== false && metadata.trackingEnabled) {
                emailData.tags.track_clicks = 'true';
            }

            this.log('debug', 'Sending email via Resend API', {
                templateType: options.templateType,
                recipientEmail: Array.isArray(options.to) ? options.to[0] : options.to,
                attempt,
                queueId: options.queueId
            });

            // Send email via Resend
            const result = await this.resend.emails.send(emailData);
            const duration = Date.now() - startTime;

            // Log successful send
            this.log('info', 'Email sent successfully', {
                templateType: options.templateType,
                recipientEmail: Array.isArray(options.to) ? options.to[0] : options.to,
                emailId: result.data?.id,
                attempt,
                duration,
                queueId: options.queueId
            });

            // Return success result
            return {
                success: true,
                emailId: result.data?.id,
                retryCount: attempt - 1,
                duration,
                metadata: {
                    templateType: options.templateType,
                    recipientEmail: Array.isArray(options.to) ? options.to[0] : options.to,
                    sentAt: new Date().toISOString(),
                    resendId: result.data?.id,
                    attempt,
                    queueId: options.queueId
                }
            };

        } catch (error: any) {
            const duration = Date.now() - startTime;
            
            this.log('error', 'Email send attempt failed', {
                templateType: options.templateType,
                recipientEmail: Array.isArray(options.to) ? options.to[0] : options.to,
                attempt,
                error: error.message,
                duration,
                queueId: options.queueId
            });

            // Check if we should retry
            if (attempt < options.retryCount && this.isRetryableError(error)) {
                const delay = this.calculateRetryDelay(attempt, options.retryDelay, options.retryBackoff);
                
                this.log('warn', `Retrying email send in ${delay}ms`, {
                    templateType: options.templateType,
                    recipientEmail: Array.isArray(options.to) ? options.to[0] : options.to,
                    attempt: attempt + 1,
                    delay,
                    queueId: options.queueId
                });

                // Wait before retry
                await new Promise(resolve => setTimeout(resolve, delay));
                
                // Retry
                return this.sendEmailWithRetry(options, startTime, attempt + 1);
            }

            // Final failure
            this.log('error', 'Email send failed after all retry attempts', {
                templateType: options.templateType,
                recipientEmail: Array.isArray(options.to) ? options.to[0] : options.to,
                totalAttempts: attempt,
                finalError: error.message,
                duration,
                queueId: options.queueId
            });
            
            return {
                success: false,
                error: error.message || 'Unknown email sending error',
                retryCount: attempt - 1,
                duration,
                metadata: {
                    templateType: options.templateType,
                    recipientEmail: Array.isArray(options.to) ? options.to[0] : options.to,
                    sentAt: new Date().toISOString(),
                    attempt,
                    queueId: options.queueId
                }
            };
        }
    }

    /**
     * Add email to queue for later processing
     */
    private async enqueueEmail(options: EmailSendOptions): Promise<EmailSendResult> {
        const queueItem: EmailQueueItem = {
            id: options.queueId!,
            options,
            createdAt: new Date(),
            scheduledAt: options.scheduleAt || new Date(),
            attempts: 0,
            status: 'pending'
        };

        this.emailQueue.set(queueItem.id, queueItem);

        this.log('info', 'Email queued for later processing', {
            templateType: options.templateType,
            recipientEmail: Array.isArray(options.to) ? options.to[0] : options.to,
            queueId: queueItem.id,
            scheduledAt: queueItem.scheduledAt.toISOString()
        });

        return {
            success: true,
            metadata: {
                templateType: options.templateType,
                recipientEmail: Array.isArray(options.to) ? options.to[0] : options.to,
                sentAt: new Date().toISOString(),
                attempt: 1,
                queueId: queueItem.id
            }
        };
    }

    /**
     * Queue processor for scheduled and failed emails
     */
    private startQueueProcessor(): void {
        setInterval(async () => {
            if (this.isProcessing) return;
            
            this.isProcessing = true;
            
            try {
                const now = new Date();
                const pendingItems = Array.from(this.emailQueue.values())
                    .filter(item => 
                        (item.status === 'pending' || item.status === 'retrying') &&
                        item.scheduledAt <= now
                    )
                    .sort((a, b) => {
                        // Sort by priority and then by scheduled time
                        const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
                        const aPriority = priorityOrder[a.options.priority || 'medium'];
                        const bPriority = priorityOrder[b.options.priority || 'medium'];
                        
                        if (aPriority !== bPriority) {
                            return bPriority - aPriority; // Higher priority first
                        }
                        
                        return a.scheduledAt.getTime() - b.scheduledAt.getTime();
                    });

                // Process up to 5 items at a time to respect rate limits
                const itemsToProcess = pendingItems.slice(0, 5);

                for (const item of itemsToProcess) {
                    item.status = 'processing';
                    item.attempts++;

                    try {
                        const result = await this.sendEmailWithRetry({
                            ...this.retryDefaults,
                            ...item.options
                        }, Date.now());

                        if (result.success) {
                            item.status = 'completed';
                            item.completedAt = new Date();
                            
                            // Remove completed items after 24 hours
                            setTimeout(() => {
                                this.emailQueue.delete(item.id);
                            }, 24 * 60 * 60 * 1000);
                        } else {
                            // Retry logic for queue items
                            if (item.attempts < 5) {
                                item.status = 'retrying';
                                item.scheduledAt = new Date(Date.now() + (item.attempts * 5 * 60 * 1000)); // 5 min * attempt
                                item.lastError = result.error;
                            } else {
                                item.status = 'failed';
                                item.lastError = result.error;
                            }
                        }
                    } catch (error: any) {
                        item.status = 'failed';
                        item.lastError = error.message;
                        
                        this.log('error', 'Queue item processing failed', {
                            queueId: item.id,
                            error: error.message,
                            attempts: item.attempts
                        });
                    }

                    // Add small delay between queue items
                    await new Promise(resolve => setTimeout(resolve, 100));
                }

            } catch (error: any) {
                this.log('error', 'Queue processor error', {
                    error: error.message
                });
            } finally {
                this.isProcessing = false;
            }
        }, 30000); // Check every 30 seconds
    }

    /**
     * Send Lead Confirmation Email with enhanced options
     */
    async sendLeadConfirmation(
        recipientEmail: string, 
        data: LeadConfirmationEmailData,
        options: Partial<EmailSendOptions> = {}
    ): Promise<EmailSendResult> {
        return this.sendTemplateEmail({
            templateType: 'lead_confirmation',
            to: recipientEmail,
            data,
            priority: 'high',
            ...options
        });
    }

    /**
     * Send Internal Lead Notification Email with enhanced options
     */
    async sendInternalNotification(
        data: InternalLeadNotificationEmailData,
        options: Partial<EmailSendOptions> = {}
    ): Promise<EmailSendResult> {
        return this.sendTemplateEmail({
            templateType: 'internal_notification',
            to: this.config.internalEmail,
            data,
            priority: data.priority === 'urgent' ? 'urgent' : 'high',
            ...options
        });
    }

    /**
     * Send Error Notification Email with enhanced options
     */
    async sendErrorNotification(
        data: ErrorNotificationEmailData,
        options: Partial<EmailSendOptions> = {}
    ): Promise<EmailSendResult> {
        const priority = data.error.severity === 'critical' ? 'urgent' : 
                        data.error.severity === 'high' ? 'high' : 'medium';

        return this.sendTemplateEmail({
            templateType: 'error_notification',
            to: this.config.adminEmail,
            data,
            subject: `🚨 ${data.error.severity.toUpperCase()} Error in ${data.system.service}`,
            priority,
            // Error emails should be sent immediately, no delays
            retryCount: 5,
            retryDelay: 500,
            ...options
        });
    }

    /**
     * Send Welcome Email with enhanced options
     */
    async sendWelcomeEmail(
        recipientEmail: string,
        data: WelcomeEmailData,
        options: Partial<EmailSendOptions> = {}
    ): Promise<EmailSendResult> {
        return this.sendTemplateEmail({
            templateType: 'welcome',
            to: recipientEmail,
            data,
            priority: 'medium',
            ...options
        });
    }

    /**
     * Send multiple emails in batch with enhanced queue support
     */
    async sendBatchEmails(
        emails: EmailSendOptions[],
        options: {
            delayBetweenEmails?: number;
            maxConcurrent?: number;
            continueOnError?: boolean;
            useQueue?: boolean;
        } = {}
    ): Promise<EmailSendResult[]> {
        const {
            delayBetweenEmails = 500,
            maxConcurrent = 2,
            continueOnError = true,
            useQueue = false
        } = options;

        if (useQueue) {
            // Add all emails to queue
            const results: EmailSendResult[] = [];
            for (const emailOptions of emails) {
                const result = await this.enqueueEmail({
                    ...emailOptions,
                    queueId: emailOptions.queueId || this.generateId()
                });
                results.push(result);
            }
            return results;
        }

        // Process immediately with rate limiting
        const results: EmailSendResult[] = [];
        
        for (let i = 0; i < emails.length; i += maxConcurrent) {
            const batch = emails.slice(i, i + maxConcurrent);
            
            const batchPromises = batch.map(async (emailOptions) => {
                try {
                    return await this.sendTemplateEmail(emailOptions);
                } catch (error: any) {
                    if (!continueOnError) {
                        throw error;
                    }
                    return {
                        success: false,
                        error: error.message,
                        metadata: {
                            templateType: emailOptions.templateType,
                            recipientEmail: Array.isArray(emailOptions.to) ? emailOptions.to[0] : emailOptions.to,
                            sentAt: new Date().toISOString(),
                            attempt: 1
                        }
                    };
                }
            });

            const batchResults = await Promise.all(batchPromises);
            results.push(...batchResults);

            // Add delay between batches
            if (i + maxConcurrent < emails.length) {
                await new Promise(resolve => setTimeout(resolve, delayBetweenEmails));
            }
        }

        return results;
    }

    /**
     * Get comprehensive email statistics
     */
    async getEmailStats(timeframe: 'hour' | 'day' | 'week' | 'month' = 'day'): Promise<EmailStats> {
        const now = new Date();
        let cutoffTime: Date;

        switch (timeframe) {
            case 'hour':
                cutoffTime = new Date(now.getTime() - (60 * 60 * 1000));
                break;
            case 'day':
                cutoffTime = new Date(now.getTime() - (24 * 60 * 60 * 1000));
                break;
            case 'week':
                cutoffTime = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000));
                break;
            case 'month':
                cutoffTime = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));
                break;
        }

        // Filter logs within timeframe
        const relevantLogs = this.logs.filter(log => 
            new Date(log.timestamp) >= cutoffTime
        );

        const sentLogs = relevantLogs.filter(log => 
            log.message === 'Email sent successfully'
        );

        const failedLogs = relevantLogs.filter(log => 
            log.message === 'Email send failed after all retry attempts'
        );

        const totalSent = sentLogs.length;
        const totalFailed = failedLogs.length;
        const successRate = totalSent + totalFailed > 0 ? 
            (totalSent / (totalSent + totalFailed)) * 100 : 0;

        // Calculate average delivery time
        const deliveryTimes = sentLogs
            .map(log => log.context.duration)
            .filter(duration => duration !== undefined) as number[];
        
        const averageDeliveryTime = deliveryTimes.length > 0 ?
            deliveryTimes.reduce((sum, time) => sum + time, 0) / deliveryTimes.length : 0;

        // Stats by template
        const byTemplate: any = {};
        const templates: EmailTemplateType[] = ['lead_confirmation', 'internal_notification', 'error_notification', 'welcome'];
        
        for (const template of templates) {
            const templateSent = sentLogs.filter(log => log.context.templateType === template).length;
            const templateFailed = failedLogs.filter(log => log.context.templateType === template).length;
            
            byTemplate[template] = {
                sent: templateSent,
                failed: templateFailed,
                successRate: templateSent + templateFailed > 0 ? 
                    (templateSent / (templateSent + templateFailed)) * 100 : 0
            };
        }

        // Error analysis
        const errorCounts: Record<string, { count: number; lastOccurred: string }> = {};
        failedLogs.forEach(log => {
            const error = log.context.error || 'Unknown error';
            if (!errorCounts[error]) {
                errorCounts[error] = { count: 0, lastOccurred: log.timestamp };
            }
            errorCounts[error].count++;
            if (new Date(log.timestamp) > new Date(errorCounts[error].lastOccurred)) {
                errorCounts[error].lastOccurred = log.timestamp;
            }
        });

        const errors = Object.entries(errorCounts)
            .map(([error, data]) => ({ error, ...data }))
            .sort((a, b) => b.count - a.count);

        // Queue stats
        const queueStats = {
            pending: Array.from(this.emailQueue.values()).filter(item => item.status === 'pending').length,
            processing: Array.from(this.emailQueue.values()).filter(item => item.status === 'processing').length,
            completed: Array.from(this.emailQueue.values()).filter(item => item.status === 'completed').length,
            failed: Array.from(this.emailQueue.values()).filter(item => item.status === 'failed').length
        };

        return {
            totalSent,
            totalFailed,
            successRate,
            averageDeliveryTime,
            byTemplate,
            errors,
            queueStats
        };
    }

    /**
     * Get recent email logs
     */
    getRecentLogs(limit: number = 100, level?: 'info' | 'warn' | 'error' | 'debug'): EmailLog[] {
        let logs = this.logs;
        
        if (level) {
            logs = logs.filter(log => log.level === level);
        }
        
        return logs
            .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
            .slice(0, limit);
    }

    /**
     * Get queue status
     */
    getQueueStatus(): {
        totalItems: number;
        byStatus: Record<string, number>;
        oldestPending?: Date;
        processingRate: number;
    } {
        const items = Array.from(this.emailQueue.values());
        const byStatus: Record<string, number> = {};
        
        items.forEach(item => {
            byStatus[item.status] = (byStatus[item.status] || 0) + 1;
        });

        const pendingItems = items.filter(item => item.status === 'pending');
        const oldestPending = pendingItems.length > 0 ? 
            pendingItems.reduce((oldest, item) => 
                item.createdAt < oldest.createdAt ? item : oldest
            ).createdAt : undefined;

        // Calculate processing rate (items completed in last hour)
        const hourAgo = new Date(Date.now() - (60 * 60 * 1000));
        const recentlyCompleted = items.filter(item => 
            item.status === 'completed' && 
            item.completedAt && 
            item.completedAt >= hourAgo
        ).length;

        return {
            totalItems: items.length,
            byStatus,
            oldestPending,
            processingRate: recentlyCompleted
        };
    }

    /**
     * Clear completed queue items
     */
    clearCompletedQueueItems(): number {
        const completedItems = Array.from(this.emailQueue.entries())
            .filter(([_, item]) => item.status === 'completed');
        
        completedItems.forEach(([id, _]) => {
            this.emailQueue.delete(id);
        });

        this.log('info', 'Cleared completed queue items', {
            clearedCount: completedItems.length
        });

        return completedItems.length;
    }

    /**
     * Validate email configuration with enhanced checks
     */
    async validateConfiguration(): Promise<{
        isValid: boolean;
        errors: string[];
        warnings: string[];
        apiHealth: boolean;
        domainVerified: boolean;
    }> {
        const errors: string[] = [];
        const warnings: string[] = [];
        let apiHealth = false;
        let domainVerified = false;

        try {
            // Test Resend API connection
            const domains = await this.resend.domains.list();
            apiHealth = true;
            
            // Check domain verification
            const configuredDomain = this.config.domain;
            const verifiedDomains = domains.data || [];
            
            domainVerified = verifiedDomains.some(
                (domain: any) => domain.name === configuredDomain && domain.status === 'verified'
            );
            
            if (!domainVerified) {
                warnings.push(`Domain "${configuredDomain}" is not verified. This may cause deliverability issues.`);
            }

            // Check usage limits (if available)
            // This would require additional API calls that may not be available in free tier

        } catch (error: any) {
            errors.push(`Resend API connection failed: ${error.message}`);
        }

        // Check queue health
        const queueStatus = this.getQueueStatus();
        if (queueStatus.byStatus.failed > 10) {
            warnings.push(`High number of failed queue items: ${queueStatus.byStatus.failed}`);
        }

        return {
            isValid: errors.length === 0,
            errors,
            warnings,
            apiHealth,
            domainVerified
        };
    }

    // Private helper methods

    private renderTemplate(templateType: EmailTemplateType, data: any): Promise<string> {
        let Component;
        
        switch (templateType) {
            case 'lead_confirmation':
                Component = LeadConfirmationEmail;
                break;
            case 'internal_notification':
                Component = InternalLeadNotificationEmail;
                break;
            case 'error_notification':
                Component = ErrorNotificationEmail;
                break;
            case 'welcome':
                Component = WelcomeEmail;
                break;
            default:
                throw new Error(`Unknown template type: ${templateType}`);
        }

        return render(Component({ data }), { pretty: true });
    }

    private generateSubject(templateType: EmailTemplateType, data: any): string {
        const variables: Record<string, string> = {};

        switch (templateType) {
            case 'internal_notification':
                variables.priority = data.priority?.toUpperCase() || 'MEDIUM';
                variables.debtAmount = data.lead?.debtAmount || 'Unknown';
                break;
            case 'error_notification':
                variables.severity = data.error?.severity?.toUpperCase() || 'UNKNOWN';
                variables.service = data.system?.service || 'System';
                break;
        }

        return generateEmailSubject(templateType, variables);
    }

    private log(level: EmailLog['level'], message: string, context: EmailLog['context'] = {}): void {
        const log: EmailLog = {
            timestamp: new Date().toISOString(),
            level,
            message,
            context
        };

        this.logs.push(log);

        // Keep only last 1000 logs to prevent memory issues
        if (this.logs.length > 1000) {
            this.logs = this.logs.slice(-1000);
        }

        // Console output in development
        if (this.config.fromName.includes('Dev')) {
            const logMethod = level === 'error' ? console.error : 
                            level === 'warn' ? console.warn : 
                            level === 'debug' ? console.debug : console.log;
            
            logMethod(`[EmailService] ${message}`, context);
        }
    }

    private isRetryableError(error: any): boolean {
        if (!error) return false;
        
        const retryableErrors = [
            'timeout',
            'network',
            'connection',
            'ECONNRESET',
            'ENOTFOUND',
            'rate limit',
            '429',
            '500',
            '502',
            '503',
            '504'
        ];

        const errorMessage = error.message?.toLowerCase() || '';
        const errorStatus = error.status?.toString() || '';
        
        return retryableErrors.some(pattern => 
            errorMessage.includes(pattern) || errorStatus.includes(pattern)
        );
    }

    private calculateRetryDelay(
        attempt: number, 
        baseDelay: number, 
        backoff: 'linear' | 'exponential'
    ): number {
        if (backoff === 'exponential') {
            return baseDelay * Math.pow(2, attempt - 1);
        } else {
            return baseDelay * attempt;
        }
    }

    private generateId(): string {
        return `email_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
}

// Singleton instance
let emailServiceInstance: EmailService | null = null;

/**
 * Get singleton EmailService instance
 */
export function getEmailService(): EmailService {
    if (!emailServiceInstance) {
        emailServiceInstance = new EmailService();
    }
    return emailServiceInstance;
}

// Convenience functions for common operations
export const emailService = {
    sendLeadConfirmation: async (email: string, data: LeadConfirmationEmailData, options?: Partial<EmailSendOptions>) => {
        return getEmailService().sendLeadConfirmation(email, data, options);
    },

    sendInternalNotification: async (data: InternalLeadNotificationEmailData, options?: Partial<EmailSendOptions>) => {
        return getEmailService().sendInternalNotification(data, options);
    },

    sendErrorNotification: async (data: ErrorNotificationEmailData, options?: Partial<EmailSendOptions>) => {
        return getEmailService().sendErrorNotification(data, options);
    },

    sendWelcomeEmail: async (email: string, data: WelcomeEmailData, options?: Partial<EmailSendOptions>) => {
        return getEmailService().sendWelcomeEmail(email, data, options);
    },

    validateConfiguration: async () => {
        return getEmailService().validateConfiguration();
    },

    getStats: async (timeframe?: 'hour' | 'day' | 'week' | 'month') => {
        return getEmailService().getEmailStats(timeframe);
    },

    getQueueStatus: () => {
        return getEmailService().getQueueStatus();
    },

    getRecentLogs: (limit?: number, level?: 'info' | 'warn' | 'error' | 'debug') => {
        return getEmailService().getRecentLogs(limit, level);
    }
};

// Export types for external use
export type {
    EmailSendResult,
    EmailSendOptions,
    EmailTemplateType,
    EmailStats,
    EmailLog,
    LeadConfirmationEmailData,
    InternalLeadNotificationEmailData,
    ErrorNotificationEmailData,
    WelcomeEmailData
};
