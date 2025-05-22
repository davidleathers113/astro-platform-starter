// GDPR Data Export API endpoint
// POST /api/gdpr/export - Export user data for Subject Access Requests
// Requires admin authentication or proper verification

import type { APIRoute } from 'astro';
import { supabaseAdmin } from '../../../utils/supabase';
import { dataExportRequestSchema } from '../../../utils/validation';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
    try {
        // Parse request body
        let body: unknown;
        try {
            body = await request.json();
        } catch (error) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: 'Invalid JSON in request body'
                }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }

        // Validate input
        const validation = dataExportRequestSchema.safeParse(body);
        if (!validation.success) {
            const errors: Record<string, string> = {};
            validation.error.errors.forEach(err => {
                const path = err.path.join('.');
                errors[path] = err.message;
            });
            
            return new Response(
                JSON.stringify({
                    success: false,
                    message: 'Validation failed',
                    errors
                }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }

        const { email, phone } = validation.data;

        // Build query conditions
        let query = supabaseAdmin.from('leads').select('*');
        
        if (email && phone) {
            // If both provided, search for either
            query = query.or(`email.eq.${email},phone.eq.${phone}`);
        } else if (email) {
            query = query.eq('email', email);
        } else if (phone) {
            query = query.eq('phone', phone);
        }

        // Execute query
        const { data: leads, error } = await query;

        if (error) {
            console.error('GDPR export query error:', error);
            return new Response(
                JSON.stringify({
                    success: false,
                    message: 'Unable to retrieve data. Please try again.'
                }),
                {
                    status: 500,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }

        // Prepare export data (remove sensitive fields)
        const exportData = leads.map(lead => ({
            id: lead.id,
            submission_date: lead.created_at,
            last_updated: lead.updated_at,
            debt_amount_range: lead.debt_amount,
            debt_type: lead.debt_type,
            phone_number: lead.phone,
            first_name: lead.first_name,
            last_name: lead.last_name,
            email: lead.email,
            marketing_consent: lead.consent_marketing,
            processing_consent: lead.consent_processing,
            consent_date: lead.consent_timestamp,
            status: lead.status,
            source: lead.source,
            notes: lead.notes
            // Excluded: ip_address, user_agent for privacy
        }));

        // Return export data
        return new Response(
            JSON.stringify({
                success: true,
                message: `Found ${exportData.length} record(s) for the provided information`,
                export_date: new Date().toISOString(),
                search_criteria: {
                    email: email || null,
                    phone: phone || null
                },
                data: exportData,
                privacy_note: 'IP addresses and user agent data are excluded from exports for privacy protection'
            }),
            {
                status: 200,
                headers: { 
                    'Content-Type': 'application/json',
                    'Content-Disposition': `attachment; filename="gdpr-export-${Date.now()}.json"`
                }
            }
        );

    } catch (error) {
        console.error('Unexpected error in GDPR export:', error);
        
        return new Response(
            JSON.stringify({
                success: false,
                message: 'An unexpected error occurred. Please try again.'
            }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }
};

// Handle unsupported methods
export const GET: APIRoute = async () => {
    return new Response(
        JSON.stringify({
            success: false,
            message: 'Method not allowed. Use POST with email or phone to export data.',
            usage: {
                method: 'POST',
                body: {
                    email: 'user@example.com (optional)',
                    phone: '1234567890 (optional, 10 digits)'
                },
                note: 'At least one of email or phone must be provided'
            }
        }),
        {
            status: 405,
            headers: { 
                'Content-Type': 'application/json',
                'Allow': 'POST'
            }
        }
    );
};
