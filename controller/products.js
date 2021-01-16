/* eslint-disable consistent-return */
/* eslint-disable no-restricted-globals */
const redis = require('redis');
const { retrievePrices, retrieveAllPrices } = require('../database/mysql/prices');
const { retrieveSellers } = require('../database/mysql/sellers');
const { createQuotes } = require('../services/mysql/quotes');

const client = redis.createClient({
  port: 6379,
  host: '34.217.79.104',
});

client.on('error', (error) => {
  console.error(error);
});
client.on('ready', () => {
  console.log('connected to Redis');
});

const prices = (req, res) => {
  if (req.params.productId !== undefined) {
    retrievePrices(req.params.productId)
      .then((productData) => {
        res.status(200).send(productData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500);
      });
  } else {
    retrieveAllPrices()
      .then((productData) => {
        res.status(200).send(productData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500);
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

  // check the cache server for the data first
  client.get(id, async (err, results) => {
    if (results) {
      console.log('*** cache hit');
      const value = JSON.parse(results);
      if (value.length > 0) {
        res.send(value);
      } else {
        res.status(404).send('product not found');
      }
    } else {
      console.log('--- cache miss');
      try {
        const data = await retrieveSellers(id);
        const quote = createQuotes(data, id);
        client.set(id, JSON.stringify(quote));
        res.send(quote);
      } catch (error) {
        res.status(404).send('product not found');
      }
    }
  });
};

module.exports = {
  prices,
  sellers,
  quotes,
};
