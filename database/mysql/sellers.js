const mysql = require('./index');

module.exports = {
  retrieveSellers: (param) => {
    let q = '';
    let p = null;
    if (!param) {
      q = `SELECT ps.product_id AS id,
      s.id AS sellerid,
      s.name AS sellername,
      ps.price,
      rp.description,
      do.fee,
      do.min_amount,
      do.days
      FROM product_seller AS ps
      INNER JOIN seller AS s
      ON ps.seller_id = s.id
      INNER JOIN return_policy as rp
      ON s.return_policy = rp.id
      INNER JOIN delivery_option AS do
      ON s.delivery_id = do.id
      LIMIT ?`;
      p = 100;
    } else {
      q = `SELECT ps.product_id AS id,
      s.id AS sellerid,
      s.name AS sellername,
      ps.price,
      rp.description,
      do.fee,
      do.min_amount,
      do.days
      FROM product_seller AS ps
      INNER JOIN seller AS s
      ON ps.seller_id = s.id
      INNER JOIN return_policy as rp
      ON s.return_policy = rp.id
      INNER JOIN delivery_option AS do
      ON s.delivery_id = do.id
      WHERE ps.product_id = ?`;
      p = param;
    }

    return new Promise((resolve, reject) => {
      mysql.query(q, [p], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
  get: (param) => {
    const q = 'SELECT * FROM seller WHERE id = ?';
    return new Promise((resolve, reject) => {
      mysql.query(q, [param], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
  create: (param) => {
    console.log(param);
    const q = 'INSERT INTO seller SET ?';
    return new Promise((resolve, reject) => {
      mysql.query(q, param, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
  update: (param) => {
    console.log(param);
    const q = 'UPDATE seller SET ? WHERE id = ?';
    return new Promise((resolve, reject) => {
      mysql.query(q, [param, param.id], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(`changed ${results.changedRows} rows`);
        }
      });
    });
  },
  remove: (param) => {
    const q = 'DELETE FROM seller WHERE id = ?';
    return new Promise((resolve, reject) => {
      mysql.query(q, [param], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(`changed ${results.affectedRows} rows`);
        }
      });
    });
  },
};
