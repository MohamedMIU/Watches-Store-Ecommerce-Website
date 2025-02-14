const express = require('express');
const passwordController = require('../controllers/passwordControllers');
const router = express.Router();

router.get('/forgot-password', passwordController.password_getForgot);
router.post('/forgot-password', passwordController.password_postForgot);
router.get('/reset-password', passwordController.password_getReset);
router.post('/reset-password', passwordController.password_postReset);

module.exports = router;