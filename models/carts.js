const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cartItemSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    productPrice: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    }
});

const cartSchema = new Schema({
    items: [cartItemSchema],
    totalPrice: {
        type: Number,
        default: 0
    }
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;