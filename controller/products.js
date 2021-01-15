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

  const returnCachedValue = (data) => {
    console.log('*** cache hit');
    const value = JSON.parse(data);
    if (value.length > 0) {
      res.send(value);
    } else {
      res.status(404).send('product not found');
    }
  };

  const returnDatabaseValue = () => {
    console.log('--- cache miss');
    retrieveSellers(id)
      .then((data) => createQuotes(data, id))
      .then((data) => {
        if (data.length > 0) {
          client.set(id, JSON.stringify(data), (error, reply) => {
            console.log('+++ set key result: ', reply);
          });
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

  // check the cache server for the data first
  client.get(id, (err, value) => {
    if (value) {
      returnCachedValue(value);
    } else {
      returnDatabaseValue();
    }
  });
};

module.exports = {
  prices,
  sellers,
  quotes,
};
