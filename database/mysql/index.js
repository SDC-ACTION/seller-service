const mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'shopping',
});

connection.connect((err) => {
  if (err) {
    console.error(err.stack);
  } else {
    console.log('connected to mysql database');
  }
});

module.exports = connection;
