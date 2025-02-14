const express = require('express');
const womenController = require('../controllers/womenController') 
const router = express.Router();

router.get('/women', womenController.women_readProducts);
router.get('/women/search', womenController.women_search)
router.get('/women/productss', womenController.women_sortBy);

module.exports = router;