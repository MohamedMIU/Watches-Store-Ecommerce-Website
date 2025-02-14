const express = require('express');
const cartController = require('../controllers/cartController');
const router = express.Router();



router.get('/cart', cartController.isAuthenticated, cartController.cart_get);
router.post('/add-to-cart', cartController.isAuthenticated, cartController.cart_add);
router.delete('/remove-item/:productId', cartController.isAuthenticated, cartController.cart_remove);
router.post('/checkout', cartController.isAuthenticated, cartController.cart_checkout);

module.exports = router;