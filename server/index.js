const express = require('express');
const parser = require('body-parser');
const port = process.env.PROCESS || 3000;
const morgan = require('morgan');

const app = express();
app.use(parser.json());
app.use(morgan('dev'));

// serve files in client/ double check file location
app.use(express.static(__dirname + "/../dist"));

// sends all request/responses to the router
const router = require('./routes.js');
app.use('/', router);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});