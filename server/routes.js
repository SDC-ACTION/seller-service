const express = require('express');
const products = require('../controller/products');
// const prices = require('../controller/prices');
const sellers = require('../controller/sellers');

const router = express.Router();

router.get('/product/prices/:productId', products.prices);
router.get('/product/sellers', products.sellers);
router.get('/product/quotes', products.quotes);

// router.post('price', prices.create);
// router.get('price', prices.read);
// router.put('price', prices.update);
// router.delete('price', prices.delete);

router.post('seller', sellers.create);
router.get('seller', sellers.read);
router.put('seller', sellers.update);
router.delete('seller', sellers.delete);

module.exports = router;
