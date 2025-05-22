/**
 * Lead Confirmation Email Template
 * 
 * Sent to users who submit the debt relief qualification form
 * to confirm their submission and provide next steps.
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
    LeadConfirmationEmailData, 
    debtAmountDisplayMap, 
    debtTypeDisplayMap,
    formatPhoneForDisplay,
    DebtAmountRange,
    DebtType
} from '../types';

interface LeadConfirmationEmailProps {
    data: LeadConfirmationEmailData;
}

export const LeadConfirmationEmail: React.FC<LeadConfirmationEmailProps> = ({ data }) => {
    const { user, lead, nextSteps } = data;
    const formattedPhone = formatPhoneForDisplay(user.phone);
    const debtAmountDisplay = debtAmountDisplayMap[lead.debtAmount as DebtAmountRange] || lead.debtAmount;
    const debtTypeDisplay = debtTypeDisplayMap[lead.debtType as DebtType] || lead.debtType;
    
    // Format submission time
    const submissionDate = new Date(lead.submittedAt).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        timeZoneName: 'short'
    });

    return (
        <BaseEmailLayout
            preview={`Thank you for your debt relief inquiry, ${user.firstName || 'valued customer'}. Your submission has been received.`}
            title="Debt Relief Confirmation"
            headerTitle="Debt Relief Confirmation"
            headerSubtitle="Your inquiry has been received"
        >
            {/* Personal Greeting */}
            <Text style={greetingStyle}>
                Hello {user.firstName || 'there'},
            </Text>
            
            <Text style={paragraphStyle}>
                Thank you for taking the first step toward financial freedom. We have successfully 
                received your debt relief inquiry and our team is reviewing your information.
            </Text>

            {/* Submission Details Section */}
            <Section style={cardStyle}>
                <Text style={cardHeaderStyle}>
                    📋 Your Submission Details
                </Text>
                
                <Row style={detailRowStyle}>
                    <Column style={labelColumnStyle}>
                        <Text style={labelStyle}>Reference Number:</Text>
                    </Column>
                    <Column style={valueColumnStyle}>
                        <Text style={valueStyle}>{lead.referenceNumber}</Text>
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
                        <Text style={labelStyle}>Contact Phone:</Text>
                    </Column>
                    <Column style={valueColumnStyle}>
                        <Text style={valueStyle}>{formattedPhone}</Text>
                    </Column>
                </Row>
            </Section>

            {/* What Happens Next Section */}
            <Section style={nextStepsStyle}>
                <Text style={sectionHeaderStyle}>
                    🚀 What Happens Next
                </Text>
                
                <Text style={paragraphStyle}>
                    <strong>Expected Contact Time:</strong> {nextSteps.expectedContactTime}
                    <br />
                    <strong>Contact Method:</strong> {nextSteps.contactMethod}
                </Text>
                
                <Text style={paragraphStyle}>
                    A certified debt relief specialist will contact you to:
                </Text>
                
                <ul style={listStyle}>
                    <li style={listItemStyle}>Review your specific financial situation</li>
                    <li style={listItemStyle}>Explain available debt relief options</li>
                    <li style={listItemStyle}>Answer any questions you may have</li>
                    <li style={listItemStyle}>Help you create a personalized action plan</li>
                </ul>
            </Section>

            {/* Preparation Tips */}
            <Section style={tipsStyle}>
                <Text style={sectionHeaderStyle}>
                    💡 How to Prepare for Your Call
                </Text>
                
                {nextSteps.preparationTips.map((tip, index) => (
                    <Text key={index} style={tipStyle}>
                        • {tip}
                    </Text>
                ))}
            </Section>

            <Hr style={hrStyle} />

            {/* Immediate Help Section */}
            <Section style={helpSectionStyle}>
                <Text style={sectionHeaderStyle}>
                    Need Immediate Assistance?
                </Text>
                
                <Text style={paragraphStyle}>
                    If you have urgent questions or need to update your information, 
                    our support team is here to help.
                </Text>
                
                <Row>
                    <Column style={{ width: '50%', paddingRight: '10px' }}>
                        <Button 
                            href="tel:+1-800-DEBT-HELP" 
                            style={primaryButtonStyle}
                        >
                            📞 Call Now
                        </Button>
                    </Column>
                    <Column style={{ width: '50%', paddingLeft: '10px' }}>
                        <Button 
                            href="mailto:support@yourdomain.com" 
                            style={secondaryButtonStyle}
                        >
                            ✉️ Email Support
                        </Button>
                    </Column>
                </Row>
            </Section>

            {/* Important Notice */}
            <Section style={noticeStyle}>
                <Text style={noticeTextStyle}>
                    <strong>Important:</strong> Keep this email for your records. Your reference number 
                    ({lead.referenceNumber}) will help us quickly access your information when you call.
                </Text>
            </Section>

            {/* Trust Indicators */}
            <Section style={trustStyle}>
                <Text style={trustHeaderStyle}>
                    Why Choose Our Debt Relief Service?
                </Text>
                
                <Row>
                    <Column style={{ width: '33.33%', textAlign: 'center' }}>
                        <Text style={trustItemStyle}>
                            <strong>🛡️ Accredited</strong>
                            <br />
                            AFCC Certified
                        </Text>
                    </Column>
                    <Column style={{ width: '33.33%', textAlign: 'center' }}>
                        <Text style={trustItemStyle}>
                            <strong>⭐ Rated A+</strong>
                            <br />
                            Better Business Bureau
                        </Text>
                    </Column>
                    <Column style={{ width: '33.33%', textAlign: 'center' }}>
                        <Text style={trustItemStyle}>
                            <strong>🔒 Secure</strong>
                            <br />
                            Your information is protected
                        </Text>
                    </Column>
                </Row>
            </Section>

            <Text style={closingStyle}>
                Thank you for trusting us with your financial future. We look forward to 
                helping you achieve the debt relief you deserve.
                <br /><br />
                Best regards,
                <br />
                <strong>The Debt Relief Team</strong>
            </Text>
        </BaseEmailLayout>
    );
};

// Styles
const greetingStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#2d7984',
    margin: '0 0 20px 0'
};

const paragraphStyle = {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#333333',
    margin: '0 0 20px 0'
};

const cardStyle = {
    backgroundColor: '#f8f9fa',
    border: '1px solid #e9ecef',
    borderRadius: '8px',
    padding: '20px',
    margin: '20px 0'
};

const cardHeaderStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#2d7984',
    margin: '0 0 15px 0'
};

const detailRowStyle = {
    marginBottom: '10px'
};

const labelColumnStyle = {
    width: '40%',
    paddingRight: '10px'
};

const valueColumnStyle = {
    width: '60%'
};

const labelStyle = {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#666666',
    margin: '0'
};

const valueStyle = {
    fontSize: '14px',
    color: '#333333',
    margin: '0'
};

const nextStepsStyle = {
    backgroundColor: '#e8f4f8',
    border: '1px solid #b8d4da',
    borderRadius: '8px',
    padding: '20px',
    margin: '20px 0'
};

const sectionHeaderStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#2d7984',
    margin: '0 0 15px 0'
};

const listStyle = {
    paddingLeft: '20px',
    margin: '15px 0'
};

const listItemStyle = {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#333333',
    marginBottom: '8px'
};

const tipsStyle = {
    backgroundColor: '#fff3cd',
    border: '1px solid #ffeaa7',
    borderRadius: '8px',
    padding: '20px',
    margin: '20px 0'
};

const tipStyle = {
    fontSize: '14px',
    lineHeight: '1.6',
    color: '#333333',
    margin: '0 0 8px 0'
};

const hrStyle = {
    border: 'none',
    borderTop: '2px solid #e9ecef',
    margin: '30px 0'
};

const helpSectionStyle = {
    textAlign: 'center' as const,
    margin: '30px 0'
};

const primaryButtonStyle = {
    backgroundColor: '#2d7984',
    color: '#ffffff',
    padding: '12px 24px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '14px',
    display: 'inline-block',
    width: '100%',
    textAlign: 'center' as const
};

const secondaryButtonStyle = {
    backgroundColor: '#ffffff',
    color: '#2d7984',
    border: '2px solid #2d7984',
    padding: '10px 24px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '14px',
    display: 'inline-block',
    width: '100%',
    textAlign: 'center' as const
};

const noticeStyle = {
    backgroundColor: '#d4edda',
    border: '1px solid #c3e6cb',
    borderRadius: '8px',
    padding: '15px',
    margin: '20px 0'
};

const noticeTextStyle = {
    fontSize: '14px',
    color: '#155724',
    margin: '0'
};

const trustStyle = {
    backgroundColor: '#f8f9fa',
    border: '1px solid #dee2e6',
    borderRadius: '8px',
    padding: '20px',
    margin: '30px 0'
};

const trustHeaderStyle = {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#2d7984',
    textAlign: 'center' as const,
    margin: '0 0 20px 0'
};

const trustItemStyle = {
    fontSize: '12px',
    color: '#666666',
    margin: '0',
    lineHeight: '1.4'
};

const closingStyle = {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#333333',
    margin: '30px 0 0 0'
};

export default LeadConfirmationEmail;
