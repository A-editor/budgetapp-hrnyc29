const express = require('express');
const parser = require('body-parser');
const port = process.env.PORT || 3000;
const morgan = require('morgan');

const app = express();
app.use(parser.json());
app.use(morgan('dev'));

// Need to set headers to allow liveserver to run on my machine
app.use((req, res, next) => {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE',
  })
  next();
});

// serve files in client/ double check file location
app.use(express.static(__dirname + "/../dist"));

// sends all request/responses to the router
const router = require('./routes.js');
app.use('/', router);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});