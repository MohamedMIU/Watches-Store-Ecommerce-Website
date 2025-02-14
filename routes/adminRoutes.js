const express = require('express');
const adminController = require('../controllers/adminController');
const router = express.Router();

router.get('/admin/products', [adminController.isAuth, adminController.isAdmin], adminController.admin_readProducts);
router.get('/admin/users', [adminController.isAuth, adminController.isAdmin],adminController.admin_readUsers);
router.get('/admin/orders', [adminController.isAuth, adminController.isAdmin], adminController.admin_readOrders);
router.get('/admin/dashboard', [adminController.isAuth, adminController.isAdmin], adminController.admin_dashboard);
router.get('/user/dashboard', adminController.isAuth,adminController.user_dashboard);
router.delete('/admin/orders/:orderId', [adminController.isAuth, adminController.isAdmin], adminController.admin_deleteOrders);
router.delete('/admin/users/:id', [adminController.isAuth, adminController.isAdmin], adminController.admin_deleteUsers);
router.get('/admin/users/edit/:id', [adminController.isAuth, adminController.isAdmin], adminController.admin_editGetUsers);
router.post('/admin/users/edit/:id', [adminController.isAuth, adminController.isAdmin], adminController.admin_editPostUsers);
router.get('/admin/users/new', [adminController.isAuth, adminController.isAdmin], adminController.admin_addGetUser);
router.post('/admin/users/new', [adminController.isAuth, adminController.isAdmin], adminController.admin_addPostUser);
router.post('/update-profile', adminController.user_editProfile);
router.get('/add-product', [adminController.isAuth, adminController.isAdmin], adminController.admin_addGetProduct);
router.post('/add-product', [adminController.isAuth, adminController.isAdmin], adminController.admin_addPostProduct);
router.delete('/delete-product/:id', [adminController.isAuth, adminController.isAdmin], adminController.admin_deleteProducts);
router.get('/edit-product/:id', [adminController.isAuth, adminController.isAdmin], adminController.admin_getEditProducts);
router.post('/update-product/:id', [adminController.isAuth, adminController.isAdmin], adminController.admin_postEditProducts);
router.post('/update-product/:id', [adminController.isAuth, adminController.isAdmin], adminController.admin_postEditProducts);



module.exports = router;