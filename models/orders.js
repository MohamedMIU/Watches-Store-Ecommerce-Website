const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const orderItemSchema = new Schema({
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

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }, items: [orderItemSchema],
    totalPrice: {
        type: Number,
        default: 0
    }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;