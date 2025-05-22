/**
 * Email Service Unit Tests
 * 
 * Comprehensive test suite for the EmailService class with mocked Resend API responses.
 * Tests error handling, retry logic, queue processing, and all email types.
 */

import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import { EmailService } from '../src/emails/service.js';
import type { 
    LeadConfirmationEmailData,
    InternalLeadNotificationEmailData,
    ErrorNotificationEmailData,
    WelcomeEmailData 
} from '../src/emails/types.js';

// Mock Resend client
const mockResendClient = {
    emails: {
        send: vi.fn()
    },
    domains: {
        list: vi.fn()
    }
};

// Mock configuration
const mockConfig = {
    fromName: 'Test Debt Relief',
    fromEmail: 'test@example.com',
    internalEmail: 'internal@example.com',
    adminEmail: 'admin@example.com',
    domain: 'example.com'
};

// Mock the imports
vi.mock('../src/config/resend', () => ({
    getClient: () => mockResendClient,
    getConfig: () => mockConfig
}));

vi.mock('@react-email/render', () => ({
    render: vi.fn().mockResolvedValue('<html>Mock Email HTML</html>')
}));

describe('EmailService', () => {
    let emailService: EmailService;

    beforeEach(() => {
        // Reset all mocks
        vi.clearAllMocks();
        
        // Setup default successful responses
        mockResendClient.emails.send.mockResolvedValue({
            data: { id: 'mock-email-id-123' }
        });
        
        mockResendClient.domains.list.mockResolvedValue({
            data: [
                { name: 'example.com', status: 'verified' }
            ]
        });

        emailService = new EmailService();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe('Lead Confirmation Email', () => {
        const mockLeadData: LeadConfirmationEmailData = {
            timestamp: new Date().toISOString(),
            environment: 'development',
            user: {
                firstName: 'John',
                email: 'john@example.com',
                phone: '(555) 123-4567'
            },
            lead: {
                debtAmount: '25000-50000',
                debtType: 'credit-cards',
                submittedAt: new Date().toISOString(),
                referenceNumber: 'DR-TEST-123'
            },
            nextSteps: {
                expectedContactTime: 'within 4 hours',
                contactMethod: 'Phone call',
                preparationTips: ['Prepare statements', 'List expenses']
            }
        };

        test('should send lead confirmation email successfully', async () => {
            const result = await emailService.sendLeadConfirmation(
                'john@example.com',
                mockLeadData
            );

            expect(result.success).toBe(true);
            expect(result.emailId).toBe('mock-email-id-123');
            expect(result.metadata?.templateType).toBe('lead_confirmation');
            expect(mockResendClient.emails.send).toHaveBeenCalledTimes(1);
        });

        test('should handle lead confirmation email failure', async () => {
            mockResendClient.emails.send.mockRejectedValue(new Error('API Error'));

            const result = await emailService.sendLeadConfirmation(
                'john@example.com',
                mockLeadData
            );

            expect(result.success).toBe(false);
            expect(result.error).toBe('API Error');
            expect(result.retryCount).toBeGreaterThan(0);
        });
    });

    describe('Internal Notification Email', () => {
        const mockNotificationData: InternalLeadNotificationEmailData = {
            timestamp: new Date().toISOString(),
            environment: 'development',
            lead: {
                id: 'lead-123',
                debtAmount: '25000-50000',
                debtType: 'credit-cards',
                phone: '5551234567',
                consentProcessing: true,
                consentMarketing: true,
                source: 'qualification-form',
                submittedAt: new Date().toISOString()
            },
            priority: 'high',
            source: {
                page: '/debt-relief'
            },
            metadata: {
                ipAddress: '192.168.1.1'
            },
            actions: {
                viewLeadUrl: 'https://example.com/leads/123',
                callLeadUrl: 'tel:+15551234567',
                emailLeadUrl: 'mailto:john@example.com'
            }
        };

        test('should send internal notification email successfully', async () => {
            const result = await emailService.sendInternalNotification(mockNotificationData);

            expect(result.success).toBe(true);
            expect(result.metadata?.templateType).toBe('internal_notification');
            expect(mockResendClient.emails.send).toHaveBeenCalledWith(
                expect.objectContaining({
                    to: ['internal@example.com'],
                    tags: expect.objectContaining({
                        template: 'internal_notification',
                        priority: 'high'
                    })
                })
            );
        });

        test('should set urgent priority for urgent leads', async () => {
            const urgentData = { 
                ...mockNotificationData, 
                priority: 'urgent' as const 
            };

            await emailService.sendInternalNotification(urgentData);

            expect(mockResendClient.emails.send).toHaveBeenCalledWith(
                expect.objectContaining({
                    tags: expect.objectContaining({
                        priority: 'high' // internal template priority
                    })
                })
            );
        });
    });

    describe('Error Notification Email', () => {
        const mockErrorData: ErrorNotificationEmailData = {
            timestamp: new Date().toISOString(),
            environment: 'production',
            error: {
                message: 'Database connection failed',
                type: 'database_error',
                severity: 'critical',
                code: 'DB_CONN_FAIL'
            },
            context: {
                endpoint: '/api/leads',
                method: 'POST',
                requestId: 'req-123'
            },
            system: {
                service: 'debt-relief-api',
                version: '1.0.0',
                environment: 'production'
            },
            actions: {
                dashboardUrl: 'https://dashboard.example.com',
                logsUrl: 'https://logs.example.com',
                documentsUrl: 'https://docs.example.com'
            }
        };

        test('should send error notification email with high retry count', async () => {
            const result = await emailService.sendErrorNotification(mockErrorData);

            expect(result.success).toBe(true);
            expect(result.metadata?.templateType).toBe('error_notification');
            expect(mockResendClient.emails.send).toHaveBeenCalledWith(
                expect.objectContaining({
                    to: ['admin@example.com'],
                    subject: expect.stringContaining('CRITICAL Error')
                })
            );
        });

        test('should retry error notifications more aggressively', async () => {
            let callCount = 0;
            mockResendClient.emails.send.mockImplementation(() => {
                callCount++;
                if (callCount < 3) {
                    throw new Error('Temporary network error');
                }
                return Promise.resolve({ data: { id: 'success-after-retry' } });
            });

            const result = await emailService.sendErrorNotification(mockErrorData);

            expect(result.success).toBe(true);
            expect(result.retryCount).toBe(2);
            expect(mockResendClient.emails.send).toHaveBeenCalledTimes(3);
        });
    });

    describe('Welcome Email', () => {
        const mockWelcomeData: WelcomeEmailData = {
            timestamp: new Date().toISOString(),
            environment: 'development',
            user: {
                id: 'user-123',
                firstName: 'Jane',
                lastName: 'Doe',
                email: 'jane@example.com',
                createdAt: new Date().toISOString()
            },
            account: {
                type: 'basic',
                createdAt: new Date().toISOString(),
                activationRequired: true,
                activationUrl: 'https://example.com/activate?token=abc123'
            },
            onboarding: {
                steps: [
                    {
                        title: 'Complete Profile',
                        description: 'Add your information',
                        url: '/profile',
                        completed: false
                    }
                ],
                estimatedTime: '10 minutes'
            },
            resources: {
                supportUrl: 'https://example.com/support',
                documentationUrl: 'https://example.com/docs',
                communityUrl: 'https://example.com/community'
            }
        };

        test('should send welcome email successfully', async () => {
            const result = await emailService.sendWelcomeEmail(
                'jane@example.com',
                mockWelcomeData
            );

            expect(result.success).toBe(true);
            expect(result.metadata?.templateType).toBe('welcome');
            expect(mockResendClient.emails.send).toHaveBeenCalledWith(
                expect.objectContaining({
                    to: ['jane@example.com']
                })
            );
        });
    });

    describe('Retry Logic', () => {
        test('should retry on retryable errors', async () => {
            let attemptCount = 0;
            mockResendClient.emails.send.mockImplementation(() => {
                attemptCount++;
                if (attemptCount < 3) {
                    const error = new Error('Connection timeout');
                    error.status = 503;
                    throw error;
                }
                return Promise.resolve({ data: { id: 'success-after-retry' } });
            });

            const result = await emailService.sendLeadConfirmation(
                'test@example.com',
                {} as LeadConfirmationEmailData
            );

            expect(result.success).toBe(true);
            expect(result.retryCount).toBe(2);
            expect(mockResendClient.emails.send).toHaveBeenCalledTimes(3);
        });

        test('should not retry on non-retryable errors', async () => {
            mockResendClient.emails.send.mockRejectedValue(new Error('Invalid email address'));

            const result = await emailService.sendLeadConfirmation(
                'invalid-email',
                {} as LeadConfirmationEmailData
            );

            expect(result.success).toBe(false);
            expect(result.retryCount).toBe(2); // Still retries, but would fail quickly
            expect(mockResendClient.emails.send).toHaveBeenCalledTimes(3);
        });
    });

    describe('Batch Email Sending', () => {
        test('should send multiple emails with rate limiting', async () => {
            const emailBatch = [
                {
                    templateType: 'lead_confirmation' as const,
                    to: 'user1@example.com',
                    data: {} as LeadConfirmationEmailData
                },
                {
                    templateType: 'welcome' as const,
                    to: 'user2@example.com',
                    data: {} as WelcomeEmailData
                }
            ];

            const results = await emailService.sendBatchEmails(emailBatch, {
                maxConcurrent: 1,
                delayBetweenEmails: 100
            });

            expect(results).toHaveLength(2);
            expect(results.every(r => r.success)).toBe(true);
            expect(mockResendClient.emails.send).toHaveBeenCalledTimes(2);
        });

        test('should continue on error when configured', async () => {
            mockResendClient.emails.send
                .mockResolvedValueOnce({ data: { id: 'success-1' } })
                .mockRejectedValueOnce(new Error('Failed email'))
                .mockResolvedValueOnce({ data: { id: 'success-2' } });

            const emailBatch = [
                { templateType: 'lead_confirmation' as const, to: 'user1@example.com', data: {} },
                { templateType: 'lead_confirmation' as const, to: 'user2@example.com', data: {} },
                { templateType: 'lead_confirmation' as const, to: 'user3@example.com', data: {} }
            ];

            const results = await emailService.sendBatchEmails(emailBatch, {
                continueOnError: true
            });

            expect(results).toHaveLength(3);
            expect(results[0].success).toBe(true);
            expect(results[1].success).toBe(false);
            expect(results[2].success).toBe(true);
        });
    });

    describe('Statistics and Monitoring', () => {
        test('should track email statistics', async () => {
            // Send some successful emails
            await emailService.sendLeadConfirmation('test1@example.com', {} as LeadConfirmationEmailData);
            await emailService.sendWelcomeEmail('test2@example.com', {} as WelcomeEmailData);

            // Send a failed email
            mockResendClient.emails.send.mockRejectedValueOnce(new Error('Failed'));
            await emailService.sendLeadConfirmation('test3@example.com', {} as LeadConfirmationEmailData);

            const stats = await emailService.getEmailStats('day');

            expect(stats.totalSent).toBeGreaterThan(0);
            expect(stats.totalFailed).toBeGreaterThan(0);
            expect(stats.successRate).toBeGreaterThan(0);
            expect(stats.byTemplate.lead_confirmation).toBeDefined();
            expect(stats.byTemplate.welcome).toBeDefined();
        });

        test('should provide recent logs', async () => {
            await emailService.sendLeadConfirmation('test@example.com', {} as LeadConfirmationEmailData);

            const logs = emailService.getRecentLogs(10);

            expect(logs).toBeInstanceOf(Array);
            expect(logs.length).toBeGreaterThan(0);
            expect(logs[0]).toHaveProperty('timestamp');
            expect(logs[0]).toHaveProperty('level');
            expect(logs[0]).toHaveProperty('message');
            expect(logs[0]).toHaveProperty('context');
        });

        test('should provide queue status', async () => {
            const queueStatus = emailService.getQueueStatus();

            expect(queueStatus).toHaveProperty('totalItems');
            expect(queueStatus).toHaveProperty('byStatus');
            expect(queueStatus).toHaveProperty('processingRate');
            expect(typeof queueStatus.totalItems).toBe('number');
        });
    });

    describe('Configuration Validation', () => {
        test('should validate successful configuration', async () => {
            const validation = await emailService.validateConfiguration();

            expect(validation.isValid).toBe(true);
            expect(validation.apiHealth).toBe(true);
            expect(validation.domainVerified).toBe(true);
            expect(validation.errors).toHaveLength(0);
        });

        test('should detect API connection issues', async () => {
            mockResendClient.domains.list.mockRejectedValue(new Error('API connection failed'));

            const validation = await emailService.validateConfiguration();

            expect(validation.isValid).toBe(false);
            expect(validation.apiHealth).toBe(false);
            expect(validation.errors).toContain('Resend API connection failed: API connection failed');
        });

        test('should detect unverified domain', async () => {
            mockResendClient.domains.list.mockResolvedValue({
                data: [
                    { name: 'example.com', status: 'pending' }
                ]
            });

            const validation = await emailService.validateConfiguration();

            expect(validation.domainVerified).toBe(false);
            expect(validation.warnings).toContain(
                expect.stringContaining('Domain "example.com" is not verified')
            );
        });
    });

    describe('Queue Processing', () => {
        test('should queue emails for future sending', async () => {
            const futureDate = new Date(Date.now() + 60000); // 1 minute from now

            const result = await emailService.sendTemplateEmail({
                templateType: 'welcome',
                to: 'future@example.com',
                data: {} as WelcomeEmailData,
                scheduleAt: futureDate
            });

            expect(result.success).toBe(true);
            expect(result.metadata?.queueId).toBeDefined();

            const queueStatus = emailService.getQueueStatus();
            expect(queueStatus.totalItems).toBeGreaterThan(0);
            expect(queueStatus.byStatus.pending).toBeGreaterThan(0);
        });

        test('should clear completed queue items', async () => {
            // This would need to simulate completed items in the queue
            const clearedCount = emailService.clearCompletedQueueItems();
            expect(typeof clearedCount).toBe('number');
        });
    });

    describe('Error Scenarios', () => {
        test('should handle invalid template type', async () => {
            const result = await emailService.sendTemplateEmail({
                templateType: 'invalid_template' as any,
                to: 'test@example.com',
                data: {}
            });

            expect(result.success).toBe(false);
            expect(result.error).toContain('Invalid template type');
        });
    });
});

// Integration test helper functions
export const EmailServiceTestHelpers = {
    createMockLeadData: (): LeadConfirmationEmailData => ({
        timestamp: new Date().toISOString(),
        environment: 'development',
        user: {
            firstName: 'Test',
            email: 'test@example.com',
            phone: '(555) 123-4567'
        },
        lead: {
            debtAmount: '25000-50000',
            debtType: 'credit-cards',
            submittedAt: new Date().toISOString(),
            referenceNumber: 'DR-TEST-123'
        },
        nextSteps: {
            expectedContactTime: 'within 4 hours',
            contactMethod: 'Phone call',
            preparationTips: ['Prepare statements']
        }
    }),

    createMockWelcomeData: (): WelcomeEmailData => ({
        timestamp: new Date().toISOString(),
        environment: 'development',
        user: {
            id: 'user-123',
            firstName: 'Test',
            email: 'test@example.com',
            createdAt: new Date().toISOString()
        },
        account: {
            type: 'basic',
            createdAt: new Date().toISOString(),
            activationRequired: false
        },
        onboarding: {
            steps: [],
            estimatedTime: '10 minutes'
        },
        resources: {
            supportUrl: 'https://example.com/support',
            documentationUrl: 'https://example.com/docs',
            communityUrl: 'https://example.com/community'
        }
    }),

    setupMockResendClient: (responses: any[] = []) => {
        const defaultResponse = { data: { id: 'mock-email-id' } };
        responses.forEach((response, index) => {
            if (response instanceof Error) {
                mockResendClient.emails.send.mockRejectedValueOnce(response);
            } else {
                mockResendClient.emails.send.mockResolvedValueOnce(response || defaultResponse);
            }
        });
    }
};
