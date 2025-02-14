const User = require('../models/users');
const { sendPasswordResetEmail } = require('../mailer');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

const password_getForgot = (req,res) => {
    res.render('forgot-password', { error: null, success: null });
}

const password_postForgot = async (req,res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.render('forgot-password', { error: 'No account found with that email address.', success: null });
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; 

        await user.save();
        sendPasswordResetEmail(user, resetToken);
        res.render('forgot-password', { error: null, success: 'Password reset email sent. Please check your inbox.' });
    } catch (err) {
        console.log('Forgot password error:', err);
        res.render('forgot-password', { error: 'An error occurred. Please try again.', success: null });
    }
}

const password_getReset = (req,res) => {
    const { token } = req.query;

    if (!token) {
        return res.render('reset-password', { token: null, error: 'Invalid or expired password reset token.', success: null });
    }

    res.render('reset-password', { token, error: null, success: null });
}
const password_postReset = async (req,res) => {
    const { token, password } = req.body;

        try {
            const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
            if (!user) {
                return res.render('reset-password', { token: null, error: 'Invalid or expired password reset token.', success: null });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
            user.resetPasswordToken = null;
            user.resetPasswordExpires = null;

            await user.save();
            res.render('reset-password', { token: null, error: null, success: 'Password reset successfully. You can now sign in.' });
        } catch (err) {
            console.log('Reset password error:', err);
            res.render('reset-password', { token: null, error: 'An error occurred. Please try again.', success: null });
        }
    }

module.exports = {
    password_getForgot,
    password_postForgot,
    password_getReset,
    password_postReset
}