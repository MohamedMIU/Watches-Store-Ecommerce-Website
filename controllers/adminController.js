const User = require('../models/users');
const Product = require('../models/products');
const Order = require('../models/orders');
const bodyParser = require('body-parser');

const admin_readUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.render('users', { users });
    } catch (err) {
        console.log('Error fetching users:', err);
        res.status(500).send('Internal Server Error');
    }
}
const isAuth = (req, res, next) => {
    if (req.session.isAuth) {
        return next();
    }
    res.redirect('/Form'); 
};

const isAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.isAdmin) {
        return next();
    }
    res.redirect('user/Dashboard');
};

const user_dashboard = async (req, res) => {
    const userId = req.session.user.id;

    User.findById(userId).populate('orders').then(user => {
        if (!user) {
            return res.status(404).send('User not found');
        }

        Order.find({ user: userId }).then(orders => {
            res.render('user-dashboard', { user: user, orders: orders });
        }).catch(err => {
            console.error(err);
            res.status(500).send('Internal server error');
        });
    }).catch(err => {
        console.error(err);
        res.status(500).send('Internal server error');
    });
};

const admin_readProducts = (req, res) => {
    Product.find()
    .then((result) => {
        res.render('products', {Products: result});
    })
    .catch((err) => {
        console.log(err);
    })
}

const admin_readOrders = (req, res) => {
    Order.find()
    .then((result) => {
        res.render('orders', {Orders: result});
    })
    .catch((err) => {
        console.log(err);
    })
}
const admin_deleteOrders = (req, res) => {
    const orderId = req.params.orderId;
        Order.findByIdAndDelete(orderId)
        .then((deletedOrder) => {
            if (deletedOrder) {
                res.sendStatus(200); 
            } else {
                res.status(404).send('Order not found');
            }
        })
        .catch((err) => {
            console.error('Error deleting order:', err);
            res.status(500).send('Error deleting order');
        });
};

const admin_deleteUsers = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).send('User deleted successfully');
    } catch (err) {
        console.log('Error deleting user:', err);
        res.status(500).send('Internal Server Error');
    }
};

const admin_editGetUsers = async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            res.render('edit-user', { user });
        } catch (err) {
            console.log('Error fetching user:', err);
            res.status(500).send('Internal Server Error');
        }
    };
const admin_editPostUsers = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/admin/users');
    } catch (err) {
        console.log('Error updating user:', err);
        res.status(500).send('Internal Server Error');
    }
};

const admin_dashboard = (req, res) => {
     res.render('admin/dashboard');
}
const admin_addGetUser = async (req, res) => {
    res.render('add-user');
};

const admin_addPostUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.redirect('/admin/users');
    } catch (err) {
        console.log('Error adding user:', err);
        res.status(500).send('Internal Server Error');
    }
};

const user_editProfile = async (req, res) => {
        const { email, phoneno, street, city, state, zip, country } = req.body;
    const userId = req.session.user.id;

    try {
        await User.findByIdAndUpdate(userId, {
            email,
            phoneno,
            street,
            city,
            state,
            zip,
            country
        });
        res.redirect('/user/dashboard');
    } catch (error) {
        res.status(500).send('Error updating profile: ' + error.message);
    }
};
const admin_addGetProduct = async (req, res) => {
    res.render('add-products');
};


const admin_addPostProduct = (req, res) => {
    const { name, price, discount, oldPrice, category ,imageUrl} = req.body;
    Product.findOne({ name: name })
        .then((existingProduct) => {
            if (existingProduct) {
                res.status(400).send('Product with the same name already exists');
            } else {
                const newProduct = new Product({
                    name,
                    price,
                    discount: discount || null,
                    oldPrice: oldPrice || null,
                    imageUrl,
                    category
                });

                newProduct.save()
                    .then((result) => {
                        console.log(result);
                        res.redirect('/');
                    })
                    .catch((err) => {
                        console.log(err);
                        res.status(500).send('Error saving product');
                    });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Error checking for existing product');
        });
};

const admin_deleteProducts = async (req, res) => {
    try {
        console.log('Delete request for product ID:', req.params.id);
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (deletedProduct) {
            console.log('Product deleted successfully');
            res.status(200).send('Product deleted successfully');
        } else {
            console.log('Product not found');
            res.status(404).send('Product not found');
        }
    } catch (err) {
        console.log('Error deleting product:', err);
        res.status(500).send('Internal Server Error');
    }
};

const admin_getEditProducts = (req, res) => {
    const id = req.params.id;
    Product.findById(id)
        .then((result) => {
            res.render('edit-product', { product: result });
        })
        .catch((err) => {
            console.log(err);
            res.status(404).send('Product not found');
        });
};

const admin_postEditProducts = (req, res) => {
    const id = req.params.id;
    const { name, price, discount, oldPrice, imageUrl, category } = req.body;

    Product.findByIdAndUpdate(id, {
        name,
        price,
        discount: discount || null,
        oldPrice: oldPrice || null,
        imageUrl,
        category
    }, { new: true })
    .then((result) => {
        res.redirect('/admin/products');
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send('Error updating product');
    });
};

module.exports = {
    admin_readProducts,
    admin_readUsers,
    admin_readOrders,
    admin_dashboard,
    admin_deleteOrders,
    isAuth,
    isAdmin,
    user_dashboard,
    admin_deleteUsers,
    admin_editGetUsers,
    admin_editPostUsers,
    admin_addGetUser,
    admin_addPostUser,
    user_editProfile,
    admin_deleteProducts,
    admin_getEditProducts,
    admin_postEditProducts,
    admin_addGetProduct,
    admin_addPostProduct
}