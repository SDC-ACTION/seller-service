/* eslint-disable consistent-return */
/* eslint-disable no-restricted-globals */
const { retrievePrices } = require('../database/mongodb/prices');
const { retrieveSellers } = require('../database/mongodb/sellers');
const { createQuotes } = require('../services/mongodb/quotes');

const prices = (req, res) => {
  if (req.params.productId !== undefined) {
    retrievePrices(req.params.productId)
      .then((productData) => {
        res.status(200).send(productData);
      });
  } else {
    retrievePrices()
      .then((productData) => {
        res.status(200).send(productData);
      });
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

  retrieveSellers(id)
    .then((data) => createQuotes(data, id))
    .then((data) => {
      if (data.length > 0) {
        res.send(data);
      } else {
        res.status(404).send('product not found');
      }
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
};

module.exports = {
  prices,
  sellers,
  quotes,
};
