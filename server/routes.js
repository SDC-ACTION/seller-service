const express = require('express');
const products = require('../controller/products');
const sellers = require('../controller/sellers');

const router = express.Router();

router.get('/product/prices', products.prices);
router.get('/product/sellers', products.sellers);
router.get('/product/quotes', products.quotes);

router.post('/seller', sellers.create);
router.get('/seller/:sellerId', sellers.get);
router.put('/seller', sellers.update);
router.delete('/seller/:sellerId', sellers.remove);

module.exports = router;
