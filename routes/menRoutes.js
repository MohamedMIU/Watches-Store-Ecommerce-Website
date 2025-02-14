const express = require('express');
const menController = require('../controllers/menController');
const router = express.Router();

router.get('/men', menController. men_get);
router.get('/men/search', menController.men_search);
router.get('/Men/productss', menController.men_sortBy);

module.exports = router;