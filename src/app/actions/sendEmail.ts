"use strict";
"use server";

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: FormData) {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const phonePrefix = formData.get('phonePrefix') as string;
    const date = formData.get('date') as string;
    const venue = formData.get('venue') as string;
    const budget = formData.get('budget') as string;
    const details = formData.get('details') as string;

    if (!name || !email || !phone) {
        return { error: 'Please fill in all required fields.' };
    }

    try {
        const { data, error } = await resend.emails.send({
            from: 'Momentz Gallery <connnect@momentzgallery.com>', // Update this with your verified domain in production
            to: ['sarthakchauhan@arizona.edu'], // Replace with your target email
            subject: `New Inquiry from ${name}`,
            replyTo: email,
            html: `
                <h2>New Inquiry from Contact Form</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phonePrefix} ${phone}</p>
                <p><strong>Event Date:</strong> ${date}</p>
                <p><strong>Venue:</strong> ${venue}</p>
                <p><strong>Budget:</strong> ${budget}</p>
                <p><strong>Message:</strong></p>
                <p>${details}</p>
            `,
        });

        if (error) {
            console.error('Resend Error:', error);
            return { error: 'Failed to send email. Please try again later.' };
        }

        return { success: true };
    } catch (err) {
        console.error('Server Action Error:', err);
        return { error: 'An unexpected error occurred.' };
    }
}
