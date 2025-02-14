const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/users');
const Cart = require('./models/carts');
const { sendVerificationEmail } = require('./mailer');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

passport.use(new GoogleStrategy({
    clientID: '761580749462-9i922bcp2m7c8203aqh4do6ibf4hfjau.apps.googleusercontent.com', // Replace with your Client ID
    clientSecret: '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', // Replace with your Client Secret
    callbackURL: 'http://localhost:8080/auth/google/callback'
},
async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ email: profile.emails[0].value });
        if (user) {
            if (!user.googleId) {
                user.googleId = profile.id;
                await user.save();
            }
            if (!user.cart) {
                const cart = new Cart();
                await cart.save();
                user.cart = cart._id;
            }
            return done(null, user);
        } else {
            const randomPassword = crypto.randomBytes(16).toString('hex');
            const hashedPassword = await bcrypt.hash(randomPassword, 10);
            const emailVerificationToken = crypto.randomBytes(32).toString('hex');
            const cart = new Cart(); // Create a new cart for the new user

            const newUser = new User({
                googleId: profile.id,
                email: profile.emails[0].value,
                username: profile.displayName,
                password: hashedPassword,
                phoneno: '00',
                street: 'none',
                city: 'none',
                state: 'none',
                zip: '00000',
                country: 'none',
                emailVerificationToken: emailVerificationToken,
                cart: cart._id // Associate the cart with the user
            });

            await cart.save(); // Save the cart
            await newUser.save(); // Save the new user
            sendVerificationEmail(newUser, emailVerificationToken);

            return done(null, newUser);
        }
    } catch (err) {
        return done(err, null);
    }
}));

module.exports = passport;