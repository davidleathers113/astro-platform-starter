/**
 * Base Email Layout Component
 * 
 * Provides consistent layout, styling, and branding for all email templates
 * in the debt relief system.
 */

import React from 'react';
import {
    Html,
    Head,
    Body,
    Container,
    Section,
    Text,
    Hr,
    Link,
    Img,
    Preview
} from '@react-email/components';

interface BaseEmailLayoutProps {
    children: React.ReactNode;
    preview: string;
    title?: string;
    headerTitle?: string;
    headerSubtitle?: string;
    footerText?: string;
    headerBgColor?: string;
}

export const BaseEmailLayout: React.FC<BaseEmailLayoutProps> = ({
    children,
    preview,
    title = 'Debt Relief Assistance',
    headerTitle = 'Debt Relief Team',
    headerSubtitle,
    footerText,
    headerBgColor = '#2d7984'
}) => {
    return (
        <Html>
            <Head>
                <title>{title}</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <Preview>{preview}</Preview>
            <Body style={bodyStyle}>
                <Container style={containerStyle}>
                    {/* Header Section */}
                    <Section style={{
                        ...headerStyle,
                        backgroundColor: headerBgColor
                    }}>
                        <Text style={headerTitleStyle}>
                            {headerTitle}
                        </Text>
                        {headerSubtitle && (
                            <Text style={headerSubtitleStyle}>
                                {headerSubtitle}
                            </Text>
                        )}
                    </Section>

                    {/* Content Section */}
                    <Section style={contentStyle}>
                        {children}
                    </Section>

                    {/* Footer Section */}
                    <Section style={footerStyle}>
                        <Hr style={hrStyle} />
                        <Text style={footerTextStyle}>
                            {footerText || (
                                <>
                                    You received this email because you submitted a debt relief inquiry on our website.
                                    <br />
                                    If you did not make this request, please ignore this email or{' '}
                                    <Link href="mailto:support@yourdomain.com" style={linkStyle}>
                                        contact us
                                    </Link>.
                                </>
                            )}
                        </Text>
                        
                        <Text style={companyInfoStyle}>
                            <strong>Debt Relief Team</strong>
                            <br />
                            Helping Americans achieve financial freedom
                            <br />
                            <Link href="https://yourdomain.com" style={linkStyle}>
                                yourdomain.com
                            </Link>
                            {' • '}
                            <Link href="mailto:support@yourdomain.com" style={linkStyle}>
                                support@yourdomain.com
                            </Link>
                        </Text>

                        <Text style={unsubscribeStyle}>
                            <Link href="https://yourdomain.com/unsubscribe" style={linkStyle}>
                                Unsubscribe
                            </Link>
                            {' • '}
                            <Link href="https://yourdomain.com/privacy" style={linkStyle}>
                                Privacy Policy
                            </Link>
                            {' • '}
                            <Link href="https://yourdomain.com/terms" style={linkStyle}>
                                Terms of Service
                            </Link>
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
};

// Styles
const bodyStyle = {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    backgroundColor: '#f6f9fc',
    margin: 0,
    padding: 0,
    lineHeight: '1.6',
    color: '#333333'
};

const containerStyle = {
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
};

const headerStyle = {
    padding: '30px 30px 20px 30px',
    textAlign: 'center' as const,
    color: '#ffffff'
};

const headerTitleStyle = {
    fontSize: '28px',
    fontWeight: 'bold',
    margin: '0 0 10px 0',
    color: '#ffffff'
};

const headerSubtitleStyle = {
    fontSize: '16px',
    margin: 0,
    opacity: 0.9,
    color: '#ffffff'
};

const contentStyle = {
    padding: '30px'
};

const footerStyle = {
    padding: '20px 30px',
    backgroundColor: '#f8f9fa'
};

const hrStyle = {
    border: 'none',
    borderTop: '1px solid #e6e6e6',
    margin: '20px 0'
};

const footerTextStyle = {
    fontSize: '12px',
    color: '#666666',
    margin: '0 0 15px 0',
    textAlign: 'center' as const
};

const companyInfoStyle = {
    fontSize: '12px',
    color: '#666666',
    margin: '0 0 15px 0',
    textAlign: 'center' as const,
    lineHeight: '1.5'
};

const unsubscribeStyle = {
    fontSize: '11px',
    color: '#999999',
    margin: 0,
    textAlign: 'center' as const
};

const linkStyle = {
    color: '#2d7984',
    textDecoration: 'none'
};

export default BaseEmailLayout;
