const User = require('../models/users');
const Cart = require('../models/carts');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { sendVerificationEmail, sendPasswordResetEmail } = require('../mailer');

const redirectIfAuthenticated = (req, res, next) => {
    if (req.session.isAuth && req.session.isAdmin) {
        return res.redirect('/admin/dashboard');
    }
    if (req.session.isAuth){
        return res.redirect('/user/dashboard');
    }
    next();
};

const form_get = (req,res) => {
        res.render('form');
}
    const form_signup = async (req,res) => {
            try {
                const existingUser = await User.findOne({ email: req.body.email });
                if (existingUser) {
                    return res.render('Form', { error: 'Email already in use. Please use a different email.' });
                } else {
                    const saltRounds = 10;
                    bcrypt.hash(req.body.password, saltRounds, async (err, hashedPassword) => {
                        if (err) {
                            console.log('Hashing error:', err);
                            return res.render('Form', { error: 'An error occurred while hashing the password. Please try again.' });
                        }
        
                        const emailVerificationToken = crypto.randomBytes(32).toString('hex');
                        const cart = new Cart();
                        const user = new User({
                            email: req.body.email,
                            password: hashedPassword,
                            username: req.body.username,
                            phoneno: req.body.phoneno,
                            street: req.body.street,
                            city: req.body.city,
                            state: req.body.state,
                            zip: req.body.zip,
                            country :req.body.country,
                            emailVerificationToken: emailVerificationToken,
                            cart: cart._id
        
                        });
        
                        try {
                            await user.save();
                            await cart.save(); 
                            sendVerificationEmail(user, emailVerificationToken);
                            res.render('Form', { success: 'Verification email sent. Please check your inbox.' });
                        } catch (saveErr) {
                            console.log('Saving error:', saveErr);
                            res.render('Form', { error: 'An error occurred while saving the user. Please try again.' });
                        }
                    });
                }
            } catch (err) {
                console.log('Signup error:', err);
                res.render('Form', { error: 'An error occurred. Please try again.' });
            }
        };
    
const form_verify = async (req,res) =>{
    const { token } = req.query;

    if (!token) {
        return res.render('Form', { error: 'Invalid verification token.' });
    }

    try {
        const user = await User.findOne({ emailVerificationToken: token });

        if (!user) {
            return res.render('Form', { error: 'Invalid or expired verification token.' });
        }

        user.isVerified = true;
        user.emailVerificationToken = null;

        await user.save();
        res.render('Form', { success: 'Email verified successfully. You can now sign in.' });
    } catch (err) {
        console.log('Verification error:', err);
        res.render('Form', { error: 'An error occurred during email verification. Please try again.' });
    }
};

const form_signin = async (req, res) => {
    try {
        console.log('Sign-in request received for email:', req.body.email);
        const user = await User.findOne({ email: req.body.email }).populate('cart');

        if (!user) {
            console.log('Email not found in the database:', req.body.email);
            return res.render('Form', { signinError: 'Email not found. Please sign up.' });
        }

        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) {
            console.log('Invalid password for email:', req.body.email);
            return res.render('Form', { signinError: 'Invalid password. Please try again.' });
        }

        if (!user.cart) {
            const cart = new Cart();
            await cart.save();
            user.cart = cart._id;
            await user.save(); 
        }


        req.session.user = {
            id: user._id,
            username: user.username,
            email: user.email,
            phoneno: user.phoneno,
            street: user.street,
            city: user.city,
            state: user.state,
            zip: user.zip,
            country: user.country,
            isAdmin: user.isAdmin,
            isVerified: user.isVerified,
            cart: user.cart 
        };
        req.session.isAuth = true;

        if (req.session.user.isAdmin) {
            res.redirect('/admin/dashboard');
        } else {
            res.redirect('/');
        }
    } catch (err) {
        console.log('Signin error:', err);
        res.render('Form', { signinError: 'An error occurred. Please try again.' });
    }
};


const form_logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) throw err;
        res.redirect("/Form");
      });
};



module.exports = {
    form_get,
    form_signup,
    form_verify,
    form_signin,
    form_logout,
    redirectIfAuthenticated
}