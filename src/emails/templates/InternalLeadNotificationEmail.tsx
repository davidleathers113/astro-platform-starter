/**
 * Internal Lead Notification Email Template
 * 
 * Sent to the debt relief team when a new lead is submitted
 * to provide comprehensive lead information and quick actions.
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
import { 
    InternalLeadNotificationEmailData, 
    debtAmountDisplayMap, 
    debtTypeDisplayMap,
    formatPhoneForDisplay,
    DebtAmountRange,
    DebtType
} from '../types';

interface InternalLeadNotificationEmailProps {
    data: InternalLeadNotificationEmailData;
}

export const InternalLeadNotificationEmail: React.FC<InternalLeadNotificationEmailProps> = ({ data }) => {
    const { lead, priority, source, metadata, actions } = data;
    
    const formattedPhone = formatPhoneForDisplay(lead.phone);
    const debtAmountDisplay = debtAmountDisplayMap[lead.debtAmount as DebtAmountRange] || lead.debtAmount;
    const debtTypeDisplay = debtTypeDisplayMap[lead.debtType as DebtType] || lead.debtType;
    
    // Format submission time
    const submissionDate = new Date(lead.submittedAt).toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        timeZoneName: 'short'
    });

    // Priority styling and icon
    const getPriorityStyle = (priority: string) => {
        switch (priority) {
            case 'urgent':
                return { backgroundColor: '#dc3545', color: '#ffffff', icon: '🚨' };
            case 'high':
                return { backgroundColor: '#fd7e14', color: '#ffffff', icon: '⚡' };
            case 'medium':
                return { backgroundColor: '#ffc107', color: '#212529', icon: '⚠️' };
            case 'low':
            default:
                return { backgroundColor: '#28a745', color: '#ffffff', icon: '📝' };
        }
    };

    const priorityData = getPriorityStyle(priority);

    return (
        <BaseEmailLayout
            preview={`New ${priority} priority lead: ${debtAmountDisplay} in ${debtTypeDisplay} debt`}
            title="New Lead Alert"
            headerTitle="🔔 New Lead Alert"
            headerSubtitle="Debt Relief Inquiry Received"
            headerBgColor="#0062b3"
        >
            {/* Priority Alert */}
            <Section style={{
                ...priorityBannerStyle,
                backgroundColor: priorityData.backgroundColor,
                color: priorityData.color
            }}>
                <Text style={priorityTextStyle}>
                    {priorityData.icon} {priority.toUpperCase()} PRIORITY LEAD
                </Text>
            </Section>

            {/* Quick Stats */}
            <Section style={statsStyle}>
                <Row>
                    <Column style={{ width: '25%', textAlign: 'center' }}>
                        <Text style={statLabelStyle}>Debt Amount</Text>
                        <Text style={statValueStyle}>{debtAmountDisplay}</Text>
                    </Column>
                    <Column style={{ width: '25%', textAlign: 'center' }}>
                        <Text style={statLabelStyle}>Debt Type</Text>
                        <Text style={statValueStyle}>{debtTypeDisplay}</Text>
                    </Column>
                    <Column style={{ width: '25%', textAlign: 'center' }}>
                        <Text style={statLabelStyle}>Marketing Consent</Text>
                        <Text style={statValueStyle}>
                            {lead.consentMarketing ? '✅ Yes' : '❌ No'}
                        </Text>
                    </Column>
                    <Column style={{ width: '25%', textAlign: 'center' }}>
                        <Text style={statLabelStyle}>Source</Text>
                        <Text style={statValueStyle}>{lead.source}</Text>
                    </Column>
                </Row>
            </Section>

            {/* Quick Actions */}
            <Section style={actionsStyle}>
                <Text style={actionsHeaderStyle}>
                    🎯 Quick Actions
                </Text>
                
                <Row>
                    <Column style={{ width: '33.33%', paddingRight: '5px' }}>
                        <Button href={actions.callLeadUrl} style={callButtonStyle}>
                            📞 Call Lead
                        </Button>
                    </Column>
                    <Column style={{ width: '33.33%', padding: '0 2.5px' }}>
                        <Button href={actions.emailLeadUrl} style={emailButtonStyle}>
                            ✉️ Email Lead
                        </Button>
                    </Column>
                    <Column style={{ width: '33.33%', paddingLeft: '5px' }}>
                        <Button href={actions.viewLeadUrl} style={viewButtonStyle}>
                            👁️ View Details
                        </Button>
                    </Column>
                </Row>
            </Section>

            <Hr style={hrStyle} />

            {/* Lead Details */}
            <Section style={detailsStyle}>
                <Text style={sectionHeaderStyle}>
                    📋 Lead Information
                </Text>
                
                <Row style={detailRowStyle}>
                    <Column style={labelColumnStyle}>
                        <Text style={labelStyle}>Lead ID:</Text>
                    </Column>
                    <Column style={valueColumnStyle}>
                        <Text style={valueStyle}>{lead.id}</Text>
                    </Column>
                </Row>
                
                <Row style={detailRowStyle}>
                    <Column style={labelColumnStyle}>
                        <Text style={labelStyle}>Phone Number:</Text>
                    </Column>
                    <Column style={valueColumnStyle}>
                        <Text style={{...valueStyle, fontWeight: 'bold', color: '#2d7984'}}>
                            {formattedPhone}
                        </Text>
                    </Column>
                </Row>
                
                <Row style={detailRowStyle}>
                    <Column style={labelColumnStyle}>
                        <Text style={labelStyle}>Submitted:</Text>
                    </Column>
                    <Column style={valueColumnStyle}>
                        <Text style={valueStyle}>{submissionDate}</Text>
                    </Column>
                </Row>
                
                <Row style={detailRowStyle}>
                    <Column style={labelColumnStyle}>
                        <Text style={labelStyle}>Debt Amount:</Text>
                    </Column>
                    <Column style={valueColumnStyle}>
                        <Text style={valueStyle}>{debtAmountDisplay}</Text>
                    </Column>
                </Row>
                
                <Row style={detailRowStyle}>
                    <Column style={labelColumnStyle}>
                        <Text style={labelStyle}>Debt Type:</Text>
                    </Column>
                    <Column style={valueColumnStyle}>
                        <Text style={valueStyle}>{debtTypeDisplay}</Text>
                    </Column>
                </Row>
                
                <Row style={detailRowStyle}>
                    <Column style={labelColumnStyle}>
                        <Text style={labelStyle}>Processing Consent:</Text>
                    </Column>
                    <Column style={valueColumnStyle}>
                        <Text style={valueStyle}>
                            {lead.consentProcessing ? '✅ Granted' : '❌ Not Granted'}
                        </Text>
                    </Column>
                </Row>
                
                <Row style={detailRowStyle}>
                    <Column style={labelColumnStyle}>
                        <Text style={labelStyle}>Marketing Consent:</Text>
                    </Column>
                    <Column style={valueColumnStyle}>
                        <Text style={valueStyle}>
                            {lead.consentMarketing ? '✅ Granted' : '❌ Not Granted'}
                        </Text>
                    </Column>
                </Row>
            </Section>

            {/* Source & Technical Details */}
            <Section style={technicalStyle}>
                <Text style={sectionHeaderStyle}>
                    🔍 Source & Technical Details
                </Text>
                
                <Row style={detailRowStyle}>
                    <Column style={labelColumnStyle}>
                        <Text style={labelStyle}>Source Page:</Text>
                    </Column>
                    <Column style={valueColumnStyle}>
                        <Text style={valueStyle}>{source.page}</Text>
                    </Column>
                </Row>
                
                {source.campaign && (
                    <Row style={detailRowStyle}>
                        <Column style={labelColumnStyle}>
                            <Text style={labelStyle}>Campaign:</Text>
                        </Column>
                        <Column style={valueColumnStyle}>
                            <Text style={valueStyle}>{source.campaign}</Text>
                        </Column>
                    </Row>
                )}
                
                {source.referrer && (
                    <Row style={detailRowStyle}>
                        <Column style={labelColumnStyle}>
                            <Text style={labelStyle}>Referrer:</Text>
                        </Column>
                        <Column style={valueColumnStyle}>
                            <Text style={valueStyle}>{source.referrer}</Text>
                        </Column>
                    </Row>
                )}
                
                {metadata.ipAddress && (
                    <Row style={detailRowStyle}>
                        <Column style={labelColumnStyle}>
                            <Text style={labelStyle}>IP Address:</Text>
                        </Column>
                        <Column style={valueColumnStyle}>
                            <Text style={valueStyle}>{metadata.ipAddress}</Text>
                        </Column>
                    </Row>
                )}
                
                {metadata.location && (
                    <Row style={detailRowStyle}>
                        <Column style={labelColumnStyle}>
                            <Text style={labelStyle}>Location:</Text>
                        </Column>
                        <Column style={valueColumnStyle}>
                            <Text style={valueStyle}>
                                {metadata.location.city && `${metadata.location.city}, `}
                                {metadata.location.state && `${metadata.location.state}, `}
                                {metadata.location.country}
                            </Text>
                        </Column>
                    </Row>
                )}
                
                {metadata.userAgent && (
                    <Row style={detailRowStyle}>
                        <Column style={{ width: '100%' }}>
                            <Text style={labelStyle}>User Agent:</Text>
                            <Text style={{...valueStyle, fontSize: '12px', wordBreak: 'break-all'}}>
                                {metadata.userAgent}
                            </Text>
                        </Column>
                    </Row>
                )}
            </Section>

            {/* Follow-up Guidelines */}
            <Section style={guidelinesStyle}>
                <Text style={sectionHeaderStyle}>
                    📞 Follow-up Guidelines
                </Text>
                
                {priority === 'urgent' && (
                    <Text style={urgentGuidelineStyle}>
                        🚨 <strong>URGENT:</strong> Contact within 1 hour. High-value lead with marketing consent.
                    </Text>
                )}
                
                {priority === 'high' && (
                    <Text style={highGuidelineStyle}>
                        ⚡ <strong>HIGH PRIORITY:</strong> Contact within 4 hours. Strong potential for conversion.
                    </Text>
                )}
                
                <ul style={guidelineListStyle}>
                    <li style={guidelineItemStyle}>
                        Call from your assigned business line ({formattedPhone})
                    </li>
                    <li style={guidelineItemStyle}>
                        Reference their specific debt type: {debtTypeDisplay}
                    </li>
                    <li style={guidelineItemStyle}>
                        Mention their debt amount range: {debtAmountDisplay}
                    </li>
                    {lead.consentMarketing ? (
                        <li style={guidelineItemStyle}>
                            ✅ Marketing consent given - can discuss promotional offers
                        </li>
                    ) : (
                        <li style={guidelineItemStyle}>
                            ❌ No marketing consent - stick to debt relief information only
                        </li>
                    )}
                    <li style={guidelineItemStyle}>
                        Log all contact attempts in the CRM system
                    </li>
                </ul>
            </Section>

            {/* Compliance Reminder */}
            <Section style={complianceStyle}>
                <Text style={complianceHeaderStyle}>
                    ⚖️ Compliance Reminder
                </Text>
                <ul style={complianceListStyle}>
                    <li style={complianceItemStyle}>
                        Follow all TCPA regulations for phone contacts
                    </li>
                    <li style={complianceItemStyle}>
                        Respect consent preferences indicated above
                    </li>
                    <li style={complianceItemStyle}>
                        Document all interactions per company policy
                    </li>
                    <li style={complianceItemStyle}>
                        Provide opt-out options if requested
                    </li>
                </ul>
            </Section>

            <Text style={footerStyle}>
                This lead notification was generated automatically by the debt relief system.
                <br />
                For technical issues, contact the development team.
            </Text>
        </BaseEmailLayout>
    );
};

// Styles
const priorityBannerStyle = {
    padding: '15px',
    textAlign: 'center' as const,
    borderRadius: '8px',
    margin: '0 0 20px 0'
};

const priorityTextStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '0'
};

const statsStyle = {
    backgroundColor: '#f8f9fa',
    border: '1px solid #dee2e6',
    borderRadius: '8px',
    padding: '20px',
    margin: '20px 0'
};

const statLabelStyle = {
    fontSize: '12px',
    color: '#666666',
    fontWeight: 'bold',
    margin: '0 0 5px 0'
};

const statValueStyle = {
    fontSize: '14px',
    color: '#333333',
    fontWeight: 'bold',
    margin: '0'
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

const callButtonStyle = {
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

const emailButtonStyle = {
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

const viewButtonStyle = {
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

const detailsStyle = {
    backgroundColor: '#ffffff',
    border: '1px solid #dee2e6',
    borderRadius: '8px',
    padding: '20px',
    margin: '20px 0'
};

const technicalStyle = {
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
    width: '35%',
    paddingRight: '10px'
};

const valueColumnStyle = {
    width: '65%'
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

const guidelinesStyle = {
    backgroundColor: '#fff3cd',
    border: '1px solid #ffeaa7',
    borderRadius: '8px',
    padding: '20px',
    margin: '20px 0'
};

const urgentGuidelineStyle = {
    fontSize: '14px',
    color: '#721c24',
    backgroundColor: '#f8d7da',
    padding: '10px',
    borderRadius: '4px',
    margin: '0 0 15px 0'
};

const highGuidelineStyle = {
    fontSize: '14px',
    color: '#856404',
    backgroundColor: '#fff3cd',
    padding: '10px',
    borderRadius: '4px',
    margin: '0 0 15px 0'
};

const guidelineListStyle = {
    paddingLeft: '20px',
    margin: '15px 0 0 0'
};

const guidelineItemStyle = {
    fontSize: '14px',
    lineHeight: '1.6',
    color: '#333333',
    marginBottom: '8px'
};

const complianceStyle = {
    backgroundColor: '#d4edda',
    border: '1px solid #c3e6cb',
    borderRadius: '8px',
    padding: '20px',
    margin: '20px 0'
};

const complianceHeaderStyle = {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#155724',
    margin: '0 0 15px 0'
};

const complianceListStyle = {
    paddingLeft: '20px',
    margin: '0'
};

const complianceItemStyle = {
    fontSize: '13px',
    lineHeight: '1.6',
    color: '#155724',
    marginBottom: '6px'
};

const footerStyle = {
    fontSize: '12px',
    color: '#666666',
    textAlign: 'center' as const,
    margin: '30px 0 0 0',
    fontStyle: 'italic'
};

export default InternalLeadNotificationEmail;
