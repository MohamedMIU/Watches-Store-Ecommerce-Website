const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    discount: {
        type: Number,
        required: false
    },
    oldPrice: {
        type: Number,
        required: false,
        min: 0
    },
    imageUrl: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
}, {timestamps:true});
const Product = mongoose.model('Product', productSchema);
module.exports = Product;
