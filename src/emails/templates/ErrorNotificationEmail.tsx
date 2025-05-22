/**
 * Error Notification Email Template
 * 
 * Sent to system administrators when errors occur in the debt relief system
 * to provide detailed error information and troubleshooting guidance.
 */

import React from 'react';
import {
    Section,
    Text,
    Button,
    Hr,
    Row,
    Column
} from '@react-email/components';
import { BaseEmailLayout } from '../components/BaseEmailLayout';
import { ErrorNotificationEmailData } from '../types';

interface ErrorNotificationEmailProps {
    data: ErrorNotificationEmailData;
}

export const ErrorNotificationEmail: React.FC<ErrorNotificationEmailProps> = ({ data }) => {
    const { error, context, system, actions } = data;
    
    // Format timestamp
    const errorTime = new Date(data.timestamp).toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
    });

    // Severity styling and icon
    const getSeverityStyle = (severity: string) => {
        switch (severity) {
            case 'critical':
                return { backgroundColor: '#dc3545', color: '#ffffff', icon: '🚨', action: 'IMMEDIATE ACTION REQUIRED' };
            case 'high':
                return { backgroundColor: '#fd7e14', color: '#ffffff', icon: '⚠️', action: 'HIGH PRIORITY' };
            case 'medium':
                return { backgroundColor: '#ffc107', color: '#212529', icon: '⚡', action: 'MODERATE PRIORITY' };
            case 'low':
            default:
                return { backgroundColor: '#6c757d', color: '#ffffff', icon: '📝', action: 'LOW PRIORITY' };
        }
    };

    const severityData = getSeverityStyle(error.severity);

    // Error type icons
    const getErrorTypeIcon = (type: string) => {
        switch (type) {
            case 'api_error': return '🔌';
            case 'database_error': return '🗄️';
            case 'email_error': return '📧';
            case 'validation_error': return '✅';
            case 'system_error': return '⚙️';
            default: return '❌';
        }
    };

    const errorTypeIcon = getErrorTypeIcon(error.type);

    return (
        <BaseEmailLayout
            preview={`${error.severity.toUpperCase()} Error in ${system.service}: ${error.message.substring(0, 50)}...`}
            title="System Error Alert"
            headerTitle="🚨 System Error Alert"
            headerSubtitle="Immediate Attention Required"
            headerBgColor="#dc3545"
        >
            {/* Severity Alert */}
            <Section style={{
                ...severityBannerStyle,
                backgroundColor: severityData.backgroundColor,
                color: severityData.color
            }}>
                <Text style={severityTextStyle}>
                    {severityData.icon} {severityData.action}
                </Text>
                <Text style={severitySubtextStyle}>
                    {error.severity.toUpperCase()} SEVERITY ERROR DETECTED
                </Text>
            </Section>

            {/* Error Summary */}
            <Section style={summaryStyle}>
                <Text style={summaryHeaderStyle}>
                    {errorTypeIcon} Error Summary
                </Text>
                
                <Row style={summaryRowStyle}>
                    <Column style={{ width: '25%' }}>
                        <Text style={summaryLabelStyle}>Type</Text>
                        <Text style={summaryValueStyle}>{error.type.replace('_', ' ').toUpperCase()}</Text>
                    </Column>
                    <Column style={{ width: '25%' }}>
                        <Text style={summaryLabelStyle}>Severity</Text>
                        <Text style={summaryValueStyle}>{error.severity.toUpperCase()}</Text>
                    </Column>
                    <Column style={{ width: '25%' }}>
                        <Text style={summaryLabelStyle}>Service</Text>
                        <Text style={summaryValueStyle}>{system.service}</Text>
                    </Column>
                    <Column style={{ width: '25%' }}>
                        <Text style={summaryLabelStyle}>Environment</Text>
                        <Text style={summaryValueStyle}>{system.environment.toUpperCase()}</Text>
                    </Column>
                </Row>
                
                <Text style={errorMessageStyle}>
                    <strong>Error Message:</strong><br />
                    {error.message}
                </Text>
                
                {error.code && (
                    <Text style={errorCodeStyle}>
                        <strong>Error Code:</strong> {error.code}
                    </Text>
                )}
            </Section>

            {/* Quick Actions */}
            <Section style={actionsStyle}>
                <Text style={actionsHeaderStyle}>
                    🛠️ Quick Actions
                </Text>
                
                <Row>
                    <Column style={{ width: '33.33%', paddingRight: '5px' }}>
                        <Button href={actions.dashboardUrl} style={dashboardButtonStyle}>
                            📊 Dashboard
                        </Button>
                    </Column>
                    <Column style={{ width: '33.33%', padding: '0 2.5px' }}>
                        <Button href={actions.logsUrl} style={logsButtonStyle}>
                            📋 View Logs
                        </Button>
                    </Column>
                    <Column style={{ width: '33.33%', paddingLeft: '5px' }}>
                        <Button href={actions.documentsUrl} style={docsButtonStyle}>
                            📖 Documentation
                        </Button>
                    </Column>
                </Row>
            </Section>

            <Hr style={hrStyle} />

            {/* Context Details */}
            <Section style={contextStyle}>
                <Text style={sectionHeaderStyle}>
                    🔍 Context Details
                </Text>
                
                <Row style={detailRowStyle}>
                    <Column style={labelColumnStyle}>
                        <Text style={labelStyle}>Timestamp:</Text>
                    </Column>
                    <Column style={valueColumnStyle}>
                        <Text style={valueStyle}>{errorTime}</Text>
                    </Column>
                </Row>
                
                {context.endpoint && (
                    <Row style={detailRowStyle}>
                        <Column style={labelColumnStyle}>
                            <Text style={labelStyle}>Endpoint:</Text>
                        </Column>
                        <Column style={valueColumnStyle}>
                            <Text style={codeStyle}>{context.method} {context.endpoint}</Text>
                        </Column>
                    </Row>
                )}
                
                {context.requestId && (
                    <Row style={detailRowStyle}>
                        <Column style={labelColumnStyle}>
                            <Text style={labelStyle}>Request ID:</Text>
                        </Column>
                        <Column style={valueColumnStyle}>
                            <Text style={codeStyle}>{context.requestId}</Text>
                        </Column>
                    </Row>
                )}
                
                {context.userId && (
                    <Row style={detailRowStyle}>
                        <Column style={labelColumnStyle}>
                            <Text style={labelStyle}>User ID:</Text>
                        </Column>
                        <Column style={valueColumnStyle}>
                            <Text style={valueStyle}>{context.userId}</Text>
                        </Column>
                    </Row>
                )}
                
                {context.leadId && (
                    <Row style={detailRowStyle}>
                        <Column style={labelColumnStyle}>
                            <Text style={labelStyle}>Lead ID:</Text>
                        </Column>
                        <Column style={valueColumnStyle}>
                            <Text style={valueStyle}>{context.leadId}</Text>
                        </Column>
                    </Row>
                )}
                
                {context.ipAddress && (
                    <Row style={detailRowStyle}>
                        <Column style={labelColumnStyle}>
                            <Text style={labelStyle}>IP Address:</Text>
                        </Column>
                        <Column style={valueColumnStyle}>
                            <Text style={valueStyle}>{context.ipAddress}</Text>
                        </Column>
                    </Row>
                )}
            </Section>

            {/* System Information */}
            <Section style={systemInfoStyle}>
                <Text style={sectionHeaderStyle}>
                    ⚙️ System Information
                </Text>
                
                <Row style={detailRowStyle}>
                    <Column style={labelColumnStyle}>
                        <Text style={labelStyle}>Service:</Text>
                    </Column>
                    <Column style={valueColumnStyle}>
                        <Text style={valueStyle}>{system.service}</Text>
                    </Column>
                </Row>
                
                <Row style={detailRowStyle}>
                    <Column style={labelColumnStyle}>
                        <Text style={labelStyle}>Version:</Text>
                    </Column>
                    <Column style={valueColumnStyle}>
                        <Text style={valueStyle}>{system.version}</Text>
                    </Column>
                </Row>
                
                <Row style={detailRowStyle}>
                    <Column style={labelColumnStyle}>
                        <Text style={labelStyle}>Environment:</Text>
                    </Column>
                    <Column style={valueColumnStyle}>
                        <Text style={valueStyle}>{system.environment}</Text>
                    </Column>
                </Row>
                
                {system.hostname && (
                    <Row style={detailRowStyle}>
                        <Column style={labelColumnStyle}>
                            <Text style={labelStyle}>Hostname:</Text>
                        </Column>
                        <Column style={valueColumnStyle}>
                            <Text style={codeStyle}>{system.hostname}</Text>
                        </Column>
                    </Row>
                )}
            </Section>

            {/* Stack Trace (if available) */}
            {error.stack && (
                <Section style={stackStyle}>
                    <Text style={sectionHeaderStyle}>
                        🔧 Stack Trace
                    </Text>
                    
                    <Text style={stackTextStyle}>
                        {error.stack}
                    </Text>
                </Section>
            )}

            {/* User Agent (if available) */}
            {context.userAgent && (
                <Section style={userAgentStyle}>
                    <Text style={sectionHeaderStyle}>
                        🌐 User Agent
                    </Text>
                    
                    <Text style={userAgentTextStyle}>
                        {context.userAgent}
                    </Text>
                </Section>
            )}

            {/* Troubleshooting Guidelines */}
            <Section style={troubleshootingStyle}>
                <Text style={sectionHeaderStyle}>
                    🔍 Troubleshooting Guidelines
                </Text>
                
                {error.type === 'api_error' && (
                    <ul style={guidelineListStyle}>
                        <li style={guidelineItemStyle}>Check API endpoint availability and response times</li>
                        <li style={guidelineItemStyle}>Verify API key configurations and permissions</li>
                        <li style={guidelineItemStyle}>Review rate limiting and quota usage</li>
                        <li style={guidelineItemStyle}>Check network connectivity and firewall rules</li>
                    </ul>
                )}
                
                {error.type === 'database_error' && (
                    <ul style={guidelineListStyle}>
                        <li style={guidelineItemStyle}>Check database connection and credentials</li>
                        <li style={guidelineItemStyle}>Verify table schema and column definitions</li>
                        <li style={guidelineItemStyle}>Review query performance and indexing</li>
                        <li style={guidelineItemStyle}>Check database server resources and capacity</li>
                    </ul>
                )}
                
                {error.type === 'email_error' && (
                    <ul style={guidelineListStyle}>
                        <li style={guidelineItemStyle}>Verify Resend API key and domain configuration</li>
                        <li style={guidelineItemStyle}>Check email template rendering and validation</li>
                        <li style={guidelineItemStyle}>Review sending quotas and rate limits</li>
                        <li style={guidelineItemStyle}>Validate recipient email addresses</li>
                    </ul>
                )}
                
                {error.type === 'validation_error' && (
                    <ul style={guidelineListStyle}>
                        <li style={guidelineItemStyle}>Review input validation rules and schemas</li>
                        <li style={guidelineItemStyle}>Check form field requirements and formats</li>
                        <li style={guidelineItemStyle}>Verify data sanitization and transformation</li>
                        <li style={guidelineItemStyle}>Update validation error messages for clarity</li>
                    </ul>
                )}
                
                <Text style={emergencyContactStyle}>
                    <strong>Emergency Contact:</strong> For critical issues requiring immediate attention, 
                    contact the on-call engineer at +1-800-EMERGENCY or emergency@yourdomain.com
                </Text>
            </Section>

            {/* Next Steps */}
            <Section style={nextStepsStyle}>
                <Text style={sectionHeaderStyle}>
                    📋 Immediate Next Steps
                </Text>
                
                <ol style={stepsListStyle}>
                    <li style={stepItemStyle}>
                        <strong>Acknowledge:</strong> Confirm receipt of this error notification
                    </li>
                    <li style={stepItemStyle}>
                        <strong>Investigate:</strong> Use the provided links to access logs and dashboard
                    </li>
                    <li style={stepItemStyle}>
                        <strong>Assess Impact:</strong> Determine if users are affected and scope of the issue
                    </li>
                    <li style={stepItemStyle}>
                        <strong>Implement Fix:</strong> Apply appropriate resolution based on error type
                    </li>
                    <li style={stepItemStyle}>
                        <strong>Monitor:</strong> Verify fix effectiveness and watch for recurring issues
                    </li>
                    <li style={stepItemStyle}>
                        <strong>Document:</strong> Update incident log and post-mortem documentation
                    </li>
                </ol>
            </Section>

            <Text style={footerStyle}>
                This error notification was generated automatically by the monitoring system.
                <br />
                Response time SLA: {error.severity === 'critical' ? '15 minutes' : error.severity === 'high' ? '1 hour' : '4 hours'}
                <br />
                For monitoring system issues, contact devops@yourdomain.com
            </Text>
        </BaseEmailLayout>
    );
};

// Styles
const severityBannerStyle = {
    padding: '20px',
    textAlign: 'center' as const,
    borderRadius: '8px',
    margin: '0 0 20px 0'
};

const severityTextStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
    margin: '0 0 5px 0'
};

const severitySubtextStyle = {
    fontSize: '14px',
    margin: '0',
    opacity: 0.9
};

const summaryStyle = {
    backgroundColor: '#f8f9fa',
    border: '2px solid #dc3545',
    borderRadius: '8px',
    padding: '20px',
    margin: '20px 0'
};

const summaryHeaderStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#dc3545',
    margin: '0 0 15px 0'
};

const summaryRowStyle = {
    marginBottom: '20px'
};

const summaryLabelStyle = {
    fontSize: '12px',
    color: '#666666',
    fontWeight: 'bold',
    margin: '0 0 5px 0',
    textAlign: 'center' as const
};

const summaryValueStyle = {
    fontSize: '14px',
    color: '#333333',
    fontWeight: 'bold',
    margin: '0',
    textAlign: 'center' as const
};

const errorMessageStyle = {
    fontSize: '14px',
    color: '#721c24',
    backgroundColor: '#f8d7da',
    padding: '15px',
    borderRadius: '6px',
    margin: '15px 0',
    lineHeight: '1.6',
    wordBreak: 'break-word' as const
};

const errorCodeStyle = {
    fontSize: '14px',
    color: '#333333',
    fontFamily: 'Monaco, Consolas, "Courier New", monospace',
    backgroundColor: '#f1f3f4',
    padding: '8px',
    borderRadius: '4px',
    margin: '10px 0 0 0'
};

const actionsStyle = {
    backgroundColor: '#e8f4f8',
    border: '1px solid #b8d4da',
    borderRadius: '8px',
    padding: '20px',
    margin: '20px 0',
    textAlign: 'center' as const
};

const actionsHeaderStyle = {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#2d7984',
    margin: '0 0 15px 0'
};

const dashboardButtonStyle = {
    backgroundColor: '#007bff',
    color: '#ffffff',
    padding: '12px 8px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '12px',
    display: 'inline-block',
    width: '100%',
    textAlign: 'center' as const
};

const logsButtonStyle = {
    backgroundColor: '#28a745',
    color: '#ffffff',
    padding: '12px 8px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '12px',
    display: 'inline-block',
    width: '100%',
    textAlign: 'center' as const
};

const docsButtonStyle = {
    backgroundColor: '#6c757d',
    color: '#ffffff',
    padding: '12px 8px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '12px',
    display: 'inline-block',
    width: '100%',
    textAlign: 'center' as const
};

const hrStyle = {
    border: 'none',
    borderTop: '2px solid #e9ecef',
    margin: '30px 0'
};

const contextStyle = {
    backgroundColor: '#ffffff',
    border: '1px solid #dee2e6',
    borderRadius: '8px',
    padding: '20px',
    margin: '20px 0'
};

const systemInfoStyle = {
    backgroundColor: '#f8f9fa',
    border: '1px solid #dee2e6',
    borderRadius: '8px',
    padding: '20px',
    margin: '20px 0'
};

const sectionHeaderStyle = {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#2d7984',
    margin: '0 0 15px 0'
};

const detailRowStyle = {
    marginBottom: '12px'
};

const labelColumnStyle = {
    width: '30%',
    paddingRight: '10px'
};

const valueColumnStyle = {
    width: '70%'
};

const labelStyle = {
    fontSize: '13px',
    fontWeight: 'bold',
    color: '#666666',
    margin: '0'
};

const valueStyle = {
    fontSize: '14px',
    color: '#333333',
    margin: '0'
};

const codeStyle = {
    fontSize: '13px',
    color: '#333333',
    fontFamily: 'Monaco, Consolas, "Courier New", monospace',
    backgroundColor: '#f1f3f4',
    padding: '4px 6px',
    borderRadius: '3px',
    margin: '0'
};

const stackStyle = {
    backgroundColor: '#f1f3f4',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    padding: '20px',
    margin: '20px 0'
};

const stackTextStyle = {
    fontSize: '11px',
    color: '#333333',
    fontFamily: 'Monaco, Consolas, "Courier New", monospace',
    lineHeight: '1.4',
    margin: '0',
    whiteSpace: 'pre-wrap' as const,
    wordBreak: 'break-all' as const
};

const userAgentStyle = {
    backgroundColor: '#f8f9fa',
    border: '1px solid #dee2e6',
    borderRadius: '8px',
    padding: '20px',
    margin: '20px 0'
};

const userAgentTextStyle = {
    fontSize: '12px',
    color: '#666666',
    margin: '0',
    wordBreak: 'break-all' as const
};

const troubleshootingStyle = {
    backgroundColor: '#fff3cd',
    border: '1px solid #ffeaa7',
    borderRadius: '8px',
    padding: '20px',
    margin: '20px 0'
};

const guidelineListStyle = {
    paddingLeft: '20px',
    margin: '15px 0'
};

const guidelineItemStyle = {
    fontSize: '14px',
    lineHeight: '1.6',
    color: '#333333',
    marginBottom: '8px'
};

const emergencyContactStyle = {
    fontSize: '14px',
    color: '#721c24',
    backgroundColor: '#f8d7da',
    padding: '12px',
    borderRadius: '6px',
    margin: '20px 0 0 0'
};

const nextStepsStyle = {
    backgroundColor: '#d4edda',
    border: '1px solid #c3e6cb',
    borderRadius: '8px',
    padding: '20px',
    margin: '20px 0'
};

const stepsListStyle = {
    paddingLeft: '20px',
    margin: '15px 0 0 0'
};

const stepItemStyle = {
    fontSize: '14px',
    lineHeight: '1.6',
    color: '#155724',
    marginBottom: '10px'
};

const footerStyle = {
    fontSize: '12px',
    color: '#666666',
    textAlign: 'center' as const,
    margin: '30px 0 0 0',
    fontStyle: 'italic'
};

export default ErrorNotificationEmail;
