const express = require('express');
const formController = require('../controllers/formController');
const adminController = require('../controllers/adminController');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/users');
const Cart = require('../models/carts');
const router = express.Router();

router.get('/form', formController.redirectIfAuthenticated,formController.form_get);
router.post('/signup', formController.form_signup);
router.get('/verify-email', formController.form_verify);
router.post('/signin', formController.form_signin)
router.get('/logout', formController.form_logout)
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/form' }), 
    (req, res) => {
        req.session.user = {
            id: req.user._id,
            username: req.user.username,
            email: req.user.email,
            phoneno: req.user.phoneno,
            street: req.user.street,
            city: req.user.city,
            state: req.user.state,
            zip: req.user.zip,
            country: req.user.country,
            isAdmin: req.user.isAdmin,
            isVerified: req.user.isVerified,
            cart: req.user.cart 
        };
        req.session.isAuth = true;

        if (req.session.user.isAdmin) {
            res.redirect('/admin/users');
        } else {
            res.redirect('/');
        }
    }
);

module.exports = router;