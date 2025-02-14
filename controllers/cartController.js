const Cart = require('../models/carts');
const Product = require('../models/products');
const Order = require('../models/orders');
const User = require('../models/users');

const isAuthenticated = (req, res, next) => {
    if (req.session.isAuth) {
        next();
    } else {
        res.redirect('/form');
    }
};

const cart_get = (req, res) => {
    const userId = req.session.user.id;
    User.findById(userId).populate('cart').then(user => {
        if (!user || !user.cart) {
            res.render('cart', { cart: { items: [], totalPrice: 0 } });
        } else {
            res.render('cart', { cart: user.cart });
        }
    }).catch(error => {
        console.error(error);
        res.status(500).send('Internal Server Error');
    });
}

const cart_add = (req, res) => {
    const userId = req.session.user.id;
    const { productId, productName, productPrice } = req.body;

    if (!productId || !productName || !productPrice) {
        return res.status(400).send('Product ID, name, and price are required');
    }

    let cart;
    User.findById(userId).populate('cart').then(user => {
        if (!user) {
            throw new Error('User not found');
        }
        cart = user.cart;
        if (!cart) {
            cart = new Cart();
            user.cart = cart._id;
        }
        return Product.findById(productId);
    }).then(product => {
        if (!product) {
            throw new Error('Product not found');
        }
        const cartItem = cart.items.find(item => item.productId.toString() === productId);
        if (cartItem) {
            cartItem.quantity += 1;
        } else {
            cart.items.push({
                productId,
                productName,
                productPrice: parseFloat(productPrice),
                quantity: 1
            });
        }
        cart.totalPrice += parseFloat(productPrice);
        return Promise.all([cart.save(), User.updateOne({ _id: userId }, { cart: cart._id })]);
    }).then(() => {
        res.sendStatus(204);
    }).catch(error => {
        console.error(error);
        res.status(500).send('Internal Server Error');
    });
}

const cart_remove = (req, res) => {
    const userId = req.session.user.id;
    const productId = req.params.productId;

    User.findById(userId).populate('cart').then(user => {
        if (!user || !user.cart) {
            throw new Error('Cart not found');
        }
        const cart = user.cart;
        const cartItemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (cartItemIndex === -1) {
            throw new Error('Item not found in cart');
        }
        const cartItem = cart.items[cartItemIndex];
        cart.totalPrice -= cartItem.productPrice * cartItem.quantity;
        cart.items.splice(cartItemIndex, 1);
        return cart.save();
    }).then(() => {
        res.sendStatus(200);
    }).catch(error => {
        console.error(error);
        res.status(500).send('Internal Server Error');
    });
}

const cart_checkout = (req, res) => {
    const userId = req.session.user.id;

    User.findById(userId).populate('cart').then(user => {
        if (!user || !user.cart) {
            return res.status(404).send('Cart not found');
        }

        const cart = user.cart;
        const order = new Order({
            items: cart.items.map(item => ({
                productId: item.productId,
                productName: item.productName,
                productPrice: item.productPrice,
                quantity: item.quantity
            })),
            totalPrice: cart.totalPrice,
            user: user._id
        });

        return order.save().then(() => {
            return Cart.deleteOne({ _id: cart._id });
        }).then(() => {
            user.cart = null;
            return user.save();
        });
    }).then(() => {
        res.redirect('/');
    }).catch(err => {
        console.error(err);
        res.status(500).send('Internal server error');
    });
};


module.exports = {
    cart_get,
    cart_add,
    cart_remove,
    cart_checkout,
    isAuthenticated
}