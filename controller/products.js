/* eslint-disable consistent-return */
/* eslint-disable no-restricted-globals */
const { retrievePrices } = require('../database/mongodb/prices');
const { retrieveSellers } = require('../database/mongodb/sellers');
const { createQuotes } = require('../services/quotes');

const prices = (req, res) => {
  if (req.params.productId !== undefined) {
    retrievePrices(req.params.productId)
      .then((productData) => {
        res.status(200).send(productData);
      });
  } else {
    retrievePrices()
      .then((productData) => res.status(200).send(productData));
  }
};

const sellers = (req, res) => {
  retrieveSellers()
    .then((sellerData) => res.send(sellerData));
};

const quotes = (req, res) => {
  let id = null;
  if (req.query.productId) {
    id = req.query.productId;
  }

  if (id && isNaN(Number(id))) {
    return res.status(400).send('Bad Request.');
  }

  let priceInfo;
  let sellerInfo;

  retrieveSellers()
    .then((sellerData) => {
      sellerInfo = sellerData;
      return retrievePrices(id);
    })
    .then((productData) => {
      priceInfo = productData;
      return true;
    })
    .then(() => createQuotes(priceInfo, sellerInfo, req.params.sellerLimit))
    .then((quoteData) => {
      if (!quoteData.length) {
        return res.status(404).send('Product Not Found.');
      }
      return res.send(quoteData);
    })
    .catch(() => res.status(500).send('Internal Server Error.'));
};

module.exports = {
  prices,
  sellers,
  quotes,
};
