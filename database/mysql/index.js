const mysql = require('mysql');
require('dotenv').config();

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
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
