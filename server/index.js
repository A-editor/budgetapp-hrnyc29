const express = require('express');
const parser = require('body-parser');
const port = process.env.PROCESS || 3000;

const app = express();
app.use(parser.json());

// serve files in client
app.use(express.static(__dirname + '/./dist'))

// sends incoming and outgoing to routers
const router = require('./routes.js');
app.use('/', router);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});