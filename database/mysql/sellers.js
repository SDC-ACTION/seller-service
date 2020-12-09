const mysql = require('./index');

module.exports = {
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
