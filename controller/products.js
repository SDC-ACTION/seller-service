/* eslint-disable consistent-return */
/* eslint-disable no-restricted-globals */
const redis = require('redis');
const { promisify } = require('util');
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

const get = promisify(client.get).bind(client);
const set = promisify(client.set).bind(client);

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

const quotesCached = async (req, res, next) => {
  console.log('looking in cache');
  let id = null;
  if (req.query.productId) {
    id = req.query.productId;
  }

  if (id && isNaN(Number(id))) {
    return res.status(400).send('Bad Request.');
  }

  await get(id)
    .then((data) => {
      if (data) {
        console.log('*** cache hit');
        const value = JSON.parse(data);
        if (value.length > 0) {
          res.send(value);
        } else {
          res.status(404).send('product not found');
        }
      } else {
        next();
      }
    });
};

const quotesDatabase = async (req, res) => {
  console.log('looking in database');
  let id = null;
  if (req.query.productId) {
    id = req.query.productId;
  }

  if (id && isNaN(Number(id))) {
    return res.status(400).send('Bad Request.');
  }

  const sendResponse = (data) => {
    res.send(data);
    return Promise.resolve();
  };

  console.log('--- cache miss');
  retrieveSellers(id)
    .then((data) => createQuotes(data, id))
    .then((data) => {
      if (data.length > 0) {
        sendResponse(data)
          .then(() => {
            set(id, JSON.stringify(data))
              .then((reply) => {
                console.log('+++ set key result: ', reply);
              });
          });
      } else {
        res.status(404).send('product not found');
      }
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
};

const quotes = (req, res, next) => {
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
  get(id)
    .then((value) => {
      if (value) {
        returnCachedValue(value);
      } else {
        console.log('--- cache miss');
        retrieveSellers(id)
          .then((data) => createQuotes(data, id))
          .then((quote) => {
            set(id, JSON.stringify(quote))
              .then((reply) => console.log(reply));
            return quote;
          })
          .then((quote) => {
            if (quote.length > 0) {
              res.send(quote);
            } else {
              res.status(404).send('product not found');
            }
          });
      }
    })
    .catch((error) => console.log(error));
};

module.exports = {
  prices,
  sellers,
  quotes,
  quotesCached,
  quotesDatabase,
};
