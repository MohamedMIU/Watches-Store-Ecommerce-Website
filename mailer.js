const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: 'goldentri22@outlook.com',
        pass: 'projectweb11'
    }
});

const sendVerificationEmail = (user, token) => {
    const verificationUrl = `http://localhost:8080/verify-email?token=${token}`;

    const mailOptions = {
        from: 'goldentri22@outlook.com',
        to: user.email,
        subject: 'Email Verification',
        html: `<h1>Email Verification</h1>
               <p>Please verify your email by clicking the link below:</p>
               <a href="${verificationUrl}">Verify Email</a>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending verification email:', error);
        } else {
            console.log('Verification email sent:', info.response);
        }
    });
};

const sendPasswordResetEmail = (user, token) => {
    const resetUrl = `http://localhost:8080/reset-password?token=${token}`;

    const mailOptions = {
        from: 'goldentri22@outlook.com',
        to: user.email,
        subject: 'Password Reset',
        html: `<h1>Password Reset</h1>
               <p>You requested a password reset. Click the link below to reset your password:</p>
               <a href="${resetUrl}">Reset Password</a>
               <p>If you did not request a password reset, please ignore this email.</p>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending password reset email:', error);
        } else {
            console.log('Password reset email sent:', info.response);
        }
    });
};

module.exports = {
    sendVerificationEmail,
    sendPasswordResetEmail
};
