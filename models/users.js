const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    googleId: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phoneno: {
        type: Number,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zip: {
        type: Number,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
    isVerified: {
        type: Boolean,
        required: true,
        default: false
    },
    twoFactorSecret: {
        type: String,
        required: false
    },
    emailVerificationToken: {
        type: String,
        required: false
    },
    resetPasswordToken: {
        type: String,
        required: false
    },
    resetPasswordExpires: {
        type: Date,
        required: false
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart'
    },
    orders: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    },
    wishlist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Wishlist'
    },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },
    orders: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' }
}, { timestamps: true });

const User = mongoose.model('User', usersSchema);
module.exports = User;
