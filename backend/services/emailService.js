import asyncHandler from 'express-async-handler';
import dotenv from 'dotenv';
import Sib from 'sib-api-v3-sdk';
import { otpTemplate, resetPasswordTemplate } from '../utils/emailTemplate.js';

// Initialize dotenv
dotenv.config();

// Creating the Brevo client
const client = Sib.ApiClient.instance;

// Set the Brevo API key (make sure it's properly set)
const apiKey = client.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_EMAIL_API_KEY

// Send a transactional email for Brevo
const transactionalEmailApi = new Sib.TransactionalEmailsApi();

// This is the main function to send the email
// for otp, password-reset, notifications, promotionals, etc.
export const sendEmailTemplate = asyncHandler(async (recieverEmail, emailTemplate, subject) => {
    // Sender details
    const sender = { email: 'pramaniksouvick086@gmail.com', name: 'WooCommerce' };

    // Recipient details
    const receivers = [
        { email: recieverEmail },
    ];

    console.log("Email details:", recieverEmail, emailTemplate, subject);

    try {
        const response = await transactionalEmailApi.sendTransacEmail({
            sender,
            to: receivers,
            subject,
            htmlContent: emailTemplate,
        });

        console.log('Email sent successfully:', response);
    } catch (error) {
        console.error('Error sending email:', error.response.body);
        throw new Error(error.response.body.message || 'Error sending email');
    }
});

// Send OTP email
export const sendOtpEmail = asyncHandler(async (userEmail, dynamicData) => {
    const template = otpTemplate(dynamicData);
    await sendEmailTemplate(userEmail, template, 'Verify your Email');
});

// Send reset password email
export const resetPasswordEmail = asyncHandler(async (userEmail, dynamicData) => {
    const template = resetPasswordTemplate(dynamicData);
    await sendEmailTemplate(userEmail, template, 'Request for reset password');
});
