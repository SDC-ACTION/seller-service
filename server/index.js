const express = require('express');
require('dotenv').config();
const path = require('path');
const cors = require('cors');

// middleware
const morgan = require('morgan');
const parser = require('body-parser');

// router
const router = require('./routes');

// run express server
const app = express();

// enable CORS
app.use(cors());

// logging & parsing
app.use(morgan('dev'));
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

const isProd = process.env.NODE_ENV === 'production';
const hostname = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3002;

// serve client files
app.use('/', express.static(path.join(__dirname, '/../client/dist')));
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '/../client/dist/index.html'));
// });
app.use('/api', router);

app.listen(PORT, () => {
  console.log(`App listening at http://${hostname}:${PORT}`);
});

if (isProd) {
  setTimeout(() => {
    // eslint-disable-next-line global-require
    require('../database/seed');
  }, 5000);
}
