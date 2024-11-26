import asyncHandler from 'express-async-handler';
import twilio from 'twilio';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceId = process.env.TWILIO_SERVICE_ID;

if (!accountSid || !authToken || !serviceId) {
    throw new Error('Twilio credentials are missing in environment variables');
}

const client = twilio(accountSid, authToken);

export const sendOtp = asyncHandler(async (to) => {
    const formattedTo = to.includes('@') ? to : `+91${to.replace(/^(\+91)?/, '')}`;
    const response = await client.verify.v2.services(serviceId)
        .verifications
        .create({ to: formattedTo, channel: to.includes('@') ? 'email' : 'sms' });
    console.log('OTP sent:', response.status);
    return response;
});

export const verifyOtp = asyncHandler(async (to, code) => {
    console.log("It has come to the verify otp section");
    const formattedTo = to.includes('@') ? to : `+91${to.replace(/^(\+91)?/, '')}`;
    console.log("Formatted Identifier",code);
    // console.log("code Identifier",code);
    const verificationCheck = await client.verify.v2.services(serviceId)
      .verificationChecks
      .create({ to: formattedTo, code });
    console.log("verification check details:",verificationCheck);
    return verificationCheck;
});
