const sellers = require('../database/models/sellers');

module.exports = {
  create: (req, res) => {
    if (req.body.seller !== undefined) {
      console.log('body seller', req.body.seller);
      sellers.create(req.body.seller)
        .then((data) => {
          console.log('returned data after save', data);
          res.sendStatus(201);
        })
        .catch((error) => {
          console.log(error);
          res.sendStatus(500);
        });
    } else {
      res.send(500);
    }
  },
  get: (req, res) => {
    if (req.params.sellerId !== undefined) {
      sellers.get(req.params.sellerId)
        .then((data) => res.send(data))
        .catch((error) => {
          console.log(error);
          res.sendStatus(500);
        });
    } else {
      res.send(500);
    }
  },
  update: (req, res) => {
    if (req.body.seller !== undefined) {
      sellers.update(req.body.seller)
        .then(() => res.send(200))
        .catch((error) => {
          console.log(error);
          res.sendStatus(500);
        });
    } else {
      res.sendStatus(500);
    }
  },
  remove: (req, res) => {
    console.log(req.params.sellerId);
    if (req.params.sellerId !== undefined) {
      sellers.remove(req.params.sellerId)
        .then(() => res.send(200))
        .catch((error) => {
          console.log(error);
          res.send(500);
        });
    } else {
      res.send(500);
    }
  },
};
