/**
 * Welcome Email Template
 * 
 * Sent to new users who register for the debt relief service
 * to welcome them and guide them through the onboarding process.
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
import { WelcomeEmailData } from '../types';

interface WelcomeEmailProps {
    data: WelcomeEmailData;
}

export const WelcomeEmail: React.FC<WelcomeEmailProps> = ({ data }) => {
    const { user, account, onboarding, resources } = data;
    
    // Format account creation date
    const creationDate = new Date(account.createdAt).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Calculate progress
    const completedSteps = onboarding.steps.filter(step => step.completed).length;
    const totalSteps = onboarding.steps.length;
    const progressPercentage = Math.round((completedSteps / totalSteps) * 100);

    return (
        <BaseEmailLayout
            preview={`Welcome to Debt Relief, ${user.firstName || 'valued member'}! Let's get you started on your path to financial freedom.`}
            title="Welcome to Debt Relief"
            headerTitle="🎉 Welcome to Debt Relief!"
            headerSubtitle="Your journey to financial freedom starts here"
            headerBgColor="#28a745"
        >
            {/* Personal Welcome */}
            <Text style={welcomeStyle}>
                Hello {user.firstName || 'there'}, and welcome! 👋
            </Text>
            
            <Text style={paragraphStyle}>
                Congratulations on taking the first step toward financial freedom! We're thrilled 
                to have you join our community of people who are actively working to overcome their 
                debt challenges and build a brighter financial future.
            </Text>

            {/* Account Summary */}
            <Section style={accountSummaryStyle}>
                <Text style={sectionHeaderStyle}>
                    📊 Your Account Summary
                </Text>
                
                <Row style={summaryRowStyle}>
                    <Column style={{ width: '50%' }}>
                        <Text style={summaryLabelStyle}>Account Type:</Text>
                        <Text style={summaryValueStyle}>
                            {account.type === 'premium' ? '⭐ Premium' : '📝 Basic'}
                        </Text>
                    </Column>
                    <Column style={{ width: '50%' }}>
                        <Text style={summaryLabelStyle}>Created:</Text>
                        <Text style={summaryValueStyle}>{creationDate}</Text>
                    </Column>
                </Row>
                
                <Row style={summaryRowStyle}>
                    <Column style={{ width: '50%' }}>
                        <Text style={summaryLabelStyle}>Email:</Text>
                        <Text style={summaryValueStyle}>{user.email}</Text>
                    </Column>
                    <Column style={{ width: '50%' }}>
                        <Text style={summaryLabelStyle}>Status:</Text>
                        <Text style={summaryValueStyle}>
                            {account.activationRequired ? '⏳ Pending Activation' : '✅ Active'}
                        </Text>
                    </Column>
                </Row>
            </Section>

            {/* Account Activation (if required) */}
            {account.activationRequired && account.activationUrl && (
                <Section style={activationStyle}>
                    <Text style={activationHeaderStyle}>
                        🔐 Account Activation Required
                    </Text>
                    
                    <Text style={paragraphStyle}>
                        To get started, please activate your account by clicking the button below. 
                        This will verify your email address and give you full access to our platform.
                    </Text>
                    
                    <div style={{ textAlign: 'center', margin: '20px 0' }}>
                        <Button href={account.activationUrl} style={activationButtonStyle}>
                            🔓 Activate My Account
                        </Button>
                    </div>
                    
                    <Text style={activationNoticeStyle}>
                        This activation link will expire in 24 hours. If you need a new link, 
                        please contact our support team.
                    </Text>
                </Section>
            )}

            {/* Onboarding Progress */}
            <Section style={onboardingStyle}>
                <Text style={sectionHeaderStyle}>
                    🚀 Your Onboarding Progress
                </Text>
                
                <div style={progressBarContainerStyle}>
                    <div style={{
                        ...progressBarStyle,
                        width: `${progressPercentage}%`
                    }}></div>
                </div>
                
                <Text style={progressTextStyle}>
                    {completedSteps} of {totalSteps} steps completed ({progressPercentage}%)
                    <br />
                    <em>Estimated time to complete: {onboarding.estimatedTime}</em>
                </Text>
                
                <Text style={paragraphStyle}>
                    Follow these steps to get the most out of your debt relief journey:
                </Text>
                
                {onboarding.steps.map((step, index) => (
                    <Row key={index} style={stepRowStyle}>
                        <Column style={{ width: '10%' }}>
                            <Text style={stepIconStyle}>
                                {step.completed ? '✅' : '⭕'}
                            </Text>
                        </Column>
                        <Column style={{ width: '90%' }}>
                            <Text style={step.completed ? stepCompletedStyle : stepPendingStyle}>
                                <strong>{step.title}</strong>
                                <br />
                                {step.description}
                            </Text>
                            {!step.completed && (
                                <Button href={step.url} style={stepButtonStyle}>
                                    Start Step {index + 1}
                                </Button>
                            )}
                        </Column>
                    </Row>
                ))}
            </Section>

            <Hr style={hrStyle} />

            {/* What You Get */}
            <Section style={benefitsStyle}>
                <Text style={sectionHeaderStyle}>
                    💎 What You Get with Debt Relief
                </Text>
                
                <Row>
                    <Column style={{ width: '33.33%', textAlign: 'center', paddingRight: '10px' }}>
                        <Text style={benefitStyle}>
                            <strong>🎯 Personalized Plan</strong>
                            <br />
                            Custom debt relief strategy tailored to your specific financial situation
                        </Text>
                    </Column>
                    <Column style={{ width: '33.33%', textAlign: 'center', padding: '0 5px' }}>
                        <Text style={benefitStyle}>
                            <strong>👥 Expert Support</strong>
                            <br />
                            Certified debt relief specialists available to guide you every step
                        </Text>
                    </Column>
                    <Column style={{ width: '33.33%', textAlign: 'center', paddingLeft: '10px' }}>
                        <Text style={benefitStyle}>
                            <strong>📈 Progress Tracking</strong>
                            <br />
                            Monitor your debt reduction and celebrate your financial milestones
                        </Text>
                    </Column>
                </Row>
                
                {account.type === 'premium' && (
                    <>
                        <Hr style={benefitDividerStyle} />
                        <Text style={premiumBenefitsHeaderStyle}>
                            ⭐ Premium Member Benefits
                        </Text>
                        
                        <ul style={premiumListStyle}>
                            <li style={premiumItemStyle}>Priority customer support (24/7 access)</li>
                            <li style={premiumItemStyle}>Advanced debt consolidation tools</li>
                            <li style={premiumItemStyle}>Credit score monitoring and improvement tips</li>
                            <li style={premiumItemStyle}>Exclusive financial education resources</li>
                            <li style={premiumItemStyle}>One-on-one consultations with senior specialists</li>
                        </ul>
                    </>
                )}
            </Section>

            {/* Quick Start Actions */}
            <Section style={quickStartStyle}>
                <Text style={sectionHeaderStyle}>
                    ⚡ Quick Start Actions
                </Text>
                
                <Text style={paragraphStyle}>
                    Ready to dive in? Here are some immediate actions you can take:
                </Text>
                
                <Row>
                    <Column style={{ width: '50%', paddingRight: '10px' }}>
                        <Button href="/dashboard" style={primaryActionButtonStyle}>
                            📊 View Dashboard
                        </Button>
                    </Column>
                    <Column style={{ width: '50%', paddingLeft: '10px' }}>
                        <Button href="/debt-calculator" style={secondaryActionButtonStyle}>
                            🧮 Debt Calculator
                        </Button>
                    </Column>
                </Row>
                
                <div style={{ margin: '15px 0' }}>
                    <Button href="/consultation" style={consultationButtonStyle}>
                        📞 Schedule Free Consultation
                    </Button>
                </div>
            </Section>

            {/* Resources */}
            <Section style={resourcesStyle}>
                <Text style={sectionHeaderStyle}>
                    📚 Helpful Resources
                </Text>
                
                <Text style={paragraphStyle}>
                    We've prepared some valuable resources to help you on your journey:
                </Text>
                
                <Row>
                    <Column style={{ width: '33.33%', textAlign: 'center' }}>
                        <Button href={resources.supportUrl} style={resourceButtonStyle}>
                            🛟 Support Center
                        </Button>
                        <Text style={resourceDescStyle}>
                            Get answers to common questions
                        </Text>
                    </Column>
                    <Column style={{ width: '33.33%', textAlign: 'center' }}>
                        <Button href={resources.documentationUrl} style={resourceButtonStyle}>
                            📖 Learning Hub
                        </Button>
                        <Text style={resourceDescStyle}>
                            Educational articles and guides
                        </Text>
                    </Column>
                    <Column style={{ width: '33.33%', textAlign: 'center' }}>
                        <Button href={resources.communityUrl} style={resourceButtonStyle}>
                            👥 Community
                        </Button>
                        <Text style={resourceDescStyle}>
                            Connect with others on similar journeys
                        </Text>
                    </Column>
                </Row>
            </Section>

            {/* Success Stories */}
            <Section style={successStoriesStyle}>
                <Text style={sectionHeaderStyle}>
                    🌟 Success Stories
                </Text>
                
                <Text style={testimonialStyle}>
                    "I reduced my debt by 60% in just 18 months with their help. The personalized 
                    plan made all the difference!" - Sarah M., California
                </Text>
                
                <Text style={testimonialStyle}>
                    "The support team was incredible. They guided me through every step and 
                    never made me feel judged about my financial situation." - Michael R., Texas
                </Text>
                
                <Text style={encouragementStyle}>
                    <strong>You're in good company!</strong> Join thousands of people who have 
                    successfully reduced their debt and regained financial control.
                </Text>
            </Section>

            {/* Contact Information */}
            <Section style={contactStyle}>
                <Text style={sectionHeaderStyle}>
                    📞 Need Help Getting Started?
                </Text>
                
                <Text style={paragraphStyle}>
                    Our team is here to support you every step of the way. Don't hesitate to reach out:
                </Text>
                
                <Row>
                    <Column style={{ width: '50%', textAlign: 'center' }}>
                        <Text style={contactMethodStyle}>
                            <strong>📞 Phone Support</strong>
                            <br />
                            1-800-DEBT-HELP
                            <br />
                            <em>Mon-Fri: 8AM-8PM EST</em>
                        </Text>
                    </Column>
                    <Column style={{ width: '50%', textAlign: 'center' }}>
                        <Text style={contactMethodStyle}>
                            <strong>✉️ Email Support</strong>
                            <br />
                            support@yourdomain.com
                            <br />
                            <em>Response within 24 hours</em>
                        </Text>
                    </Column>
                </Row>
            </Section>

            <Text style={closingStyle}>
                Welcome aboard! We're excited to be part of your journey to financial freedom. 
                Remember, every small step counts, and we're here to help you make steady progress 
                toward your goals.
                <br /><br />
                To your success,
                <br />
                <strong>The Debt Relief Team</strong>
            </Text>
        </BaseEmailLayout>
    );
};

// Styles
const welcomeStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#28a745',
    margin: '0 0 20px 0',
    textAlign: 'center' as const
};

const paragraphStyle = {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#333333',
    margin: '0 0 20px 0'
};

const accountSummaryStyle = {
    backgroundColor: '#f8f9fa',
    border: '1px solid #dee2e6',
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

const summaryRowStyle = {
    marginBottom: '15px'
};

const summaryLabelStyle = {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#666666',
    margin: '0 0 5px 0'
};

const summaryValueStyle = {
    fontSize: '16px',
    color: '#333333',
    margin: '0'
};

const activationStyle = {
    backgroundColor: '#fff3cd',
    border: '2px solid #ffc107',
    borderRadius: '8px',
    padding: '25px',
    margin: '20px 0',
    textAlign: 'center' as const
};

const activationHeaderStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#856404',
    margin: '0 0 15px 0'
};

const activationButtonStyle = {
    backgroundColor: '#ffc107',
    color: '#212529',
    padding: '15px 30px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '16px',
    display: 'inline-block'
};

const activationNoticeStyle = {
    fontSize: '14px',
    color: '#856404',
    fontStyle: 'italic',
    margin: '15px 0 0 0'
};

const onboardingStyle = {
    backgroundColor: '#e8f4f8',
    border: '1px solid #b8d4da',
    borderRadius: '8px',
    padding: '25px',
    margin: '20px 0'
};

const progressBarContainerStyle = {
    backgroundColor: '#dee2e6',
    borderRadius: '10px',
    height: '20px',
    margin: '15px 0',
    overflow: 'hidden'
};

const progressBarStyle = {
    backgroundColor: '#28a745',
    height: '100%',
    borderRadius: '10px',
    transition: 'width 0.3s ease'
};

const progressTextStyle = {
    fontSize: '14px',
    color: '#2d7984',
    textAlign: 'center' as const,
    margin: '10px 0 20px 0'
};

const stepRowStyle = {
    marginBottom: '20px',
    backgroundColor: '#ffffff',
    padding: '15px',
    borderRadius: '6px',
    border: '1px solid #dee2e6'
};

const stepIconStyle = {
    fontSize: '20px',
    margin: '0',
    textAlign: 'center' as const
};

const stepCompletedStyle = {
    fontSize: '14px',
    color: '#155724',
    margin: '0'
};

const stepPendingStyle = {
    fontSize: '14px',
    color: '#333333',
    margin: '0 0 10px 0'
};

const stepButtonStyle = {
    backgroundColor: '#2d7984',
    color: '#ffffff',
    padding: '8px 16px',
    borderRadius: '4px',
    textDecoration: 'none',
    fontSize: '12px',
    fontWeight: 'bold',
    display: 'inline-block'
};

const hrStyle = {
    border: 'none',
    borderTop: '2px solid #e9ecef',
    margin: '30px 0'
};

const benefitsStyle = {
    backgroundColor: '#f8f9fa',
    border: '1px solid #dee2e6',
    borderRadius: '8px',
    padding: '25px',
    margin: '20px 0'
};

const benefitStyle = {
    fontSize: '14px',
    color: '#333333',
    margin: '0',
    lineHeight: '1.6'
};

const benefitDividerStyle = {
    border: 'none',
    borderTop: '1px solid #dee2e6',
    margin: '20px 0'
};

const premiumBenefitsHeaderStyle = {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#ffc107',
    margin: '0 0 15px 0',
    textAlign: 'center' as const
};

const premiumListStyle = {
    paddingLeft: '20px',
    margin: '0'
};

const premiumItemStyle = {
    fontSize: '14px',
    color: '#333333',
    marginBottom: '8px',
    lineHeight: '1.5'
};

const quickStartStyle = {
    backgroundColor: '#d4edda',
    border: '1px solid #c3e6cb',
    borderRadius: '8px',
    padding: '25px',
    margin: '20px 0',
    textAlign: 'center' as const
};

const primaryActionButtonStyle = {
    backgroundColor: '#28a745',
    color: '#ffffff',
    padding: '12px 20px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '14px',
    display: 'inline-block',
    width: '100%',
    textAlign: 'center' as const
};

const secondaryActionButtonStyle = {
    backgroundColor: '#6c757d',
    color: '#ffffff',
    padding: '12px 20px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '14px',
    display: 'inline-block',
    width: '100%',
    textAlign: 'center' as const
};

const consultationButtonStyle = {
    backgroundColor: '#2d7984',
    color: '#ffffff',
    padding: '15px 30px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '16px',
    display: 'inline-block',
    width: '100%',
    textAlign: 'center' as const
};

const resourcesStyle = {
    backgroundColor: '#f8f9fa',
    border: '1px solid #dee2e6',
    borderRadius: '8px',
    padding: '25px',
    margin: '20px 0'
};

const resourceButtonStyle = {
    backgroundColor: '#007bff',
    color: '#ffffff',
    padding: '10px 15px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontSize: '12px',
    fontWeight: 'bold',
    display: 'inline-block',
    width: '90%',
    textAlign: 'center' as const,
    margin: '0 0 10px 0'
};

const resourceDescStyle = {
    fontSize: '12px',
    color: '#666666',
    margin: '0',
    lineHeight: '1.4'
};

const successStoriesStyle = {
    backgroundColor: '#fff3cd',
    border: '1px solid #ffeaa7',
    borderRadius: '8px',
    padding: '25px',
    margin: '20px 0'
};

const testimonialStyle = {
    fontSize: '14px',
    color: '#856404',
    fontStyle: 'italic',
    margin: '0 0 15px 0',
    padding: '15px',
    backgroundColor: '#fcf8e3',
    borderRadius: '6px',
    borderLeft: '4px solid #ffc107'
};

const encouragementStyle = {
    fontSize: '15px',
    color: '#856404',
    textAlign: 'center' as const,
    margin: '20px 0 0 0'
};

const contactStyle = {
    backgroundColor: '#e8f4f8',
    border: '1px solid #b8d4da',
    borderRadius: '8px',
    padding: '25px',
    margin: '20px 0'
};

const contactMethodStyle = {
    fontSize: '14px',
    color: '#2d7984',
    margin: '0',
    lineHeight: '1.6'
};

const closingStyle = {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#333333',
    margin: '30px 0 0 0',
    textAlign: 'center' as const
};

export default WelcomeEmail;
