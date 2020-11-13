var sellers = require('../database/models/sellers');

module.exports = {
  create: (req, res) => {
    if (req.params.seller !== undefined) {
      createSeller(req.params.seller)
        .then(() => res.send(201))
        .catch(error => {
          console.log(error);
          res.send(500);
        });
    } else {
      res.send(500);
    }
  },
  read: (req, res) => {
    if (req.params.sellerId !== undefined) {
      readSeller(req.params.sellerId)
        .then(data => res.send(data))
        .catch(error => {
          console.log(error);
          res.send(500);
        });
    } else {
      res.send(500);
    }
  },
  update: (req, res) => {
    if (req.params.seller != undefined) {
      updateSeller(req.params.seller)
        .then(() => res.send(200))
        .catch(error => {
          console.log(error);
          res.send(500);
        });
    } else {
      res.send(500);
    }
  },
  delete: (req, res) => {
    if (req.params.sellerId != undefined) {
      deleteSeller(req.params.sellerId)
        .then(() => res.send(200))
        .catch(error => {
          console.log(error);
          res.send(500);
        });
    } else {
      res.send(500);
    }
  }
}

