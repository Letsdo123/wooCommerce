// TEMPLATE FOR OTP
export const otpTemplate = ({ otp }) => {
    const otpHtml = `
        <body>
            <div>
                <p>Your OTP is: <strong>${otp}</strong></p>
                <p>This OTP is valid for 10 minutes.</p>
            </div>
        </body>
    `
    return otpHtml
}

// TEMPLATE FOR RESET PASSWORD
export const resetPasswordTemplate = ({ username, reset_url }) => {
    const resetPasswordHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset Request</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .header {
            font-size: 24px;
            color: #333333;
            text-align: center;
        }
        .content {
            font-size: 16px;
            color: #555555;
            line-height: 1.5;
            margin-top: 20px;
            text-align: center;
        }
        .button {
            margin-top: 30px;
            display: inline-block;
            padding: 10px 20px;
            background-color: #ff6b6b;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
        }
        .footer {
            font-size: 12px;
            color: #aaaaaa;
            text-align: center;
            margin-top: 30px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">Password Reset Request</div>
        <div class="content">
            <p>Hi, ${username}!</p>
            <p>We received a request to reset your password. Click the button below to reset it:</p>
            <a href="${reset_url}" class="button">Reset Password</a>
            <p>If you did not request a password reset, please ignore this email or contact support if you have questions.</p>
        </div>
        <div class="footer">Thank you for using our service.</div>
    </div>
</body>
</html>
    `
    return resetPasswordHtml
}