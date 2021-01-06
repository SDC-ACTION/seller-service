const mysql = require('./index');

module.exports = {
  retrievePrices: (productId) => {
    console.log(productId);
    const q = 'select * from product_seller where product_id = ?';
    return new Promise((resolve, reject) => {
      mysql.query(q, productId, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
  retrieveAllPrices: () => {
    console.log('All');
    const q = 'select * from product_seller limit 1';
    return new Promise((resolve, reject) => {
      mysql.query(q, null, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
};
