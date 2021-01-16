const express = require('express');
const products = require('../controller/products');
const sellers = require('../controller/sellers');

const router = express.Router();

// mysql & mongodb implemented routes
router.get('/product/quotes', products.quotes);

// mongodb implemented routes
router.get('/product/prices', products.prices);
router.get('/product/prices/:productId', products.prices);
router.get('/product/sellers', products.sellers);

// mysql implemented routes
router.post('/seller', sellers.create);
router.get('/seller/:sellerId', sellers.get);
router.put('/seller', sellers.update);
router.delete('/seller/:sellerId', sellers.remove);

module.exports = router;
