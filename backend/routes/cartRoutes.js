const express = require('express');
const router = express.Router();
const { getCart, addToCart, updateCart } = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getCart);
router.post('/', protect, addToCart);
router.put('/', protect, updateCart);

module.exports = router;