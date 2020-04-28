const router = require('express').Router();
const controller = require('./controllers.js');

// add controllers to the callbacks
router.get('/transactions', (req, res) => {
  res.sendStatus(200);
});

router.post('/transactions', (req, res) => {
  res.sendStatus(201);
});

router.put('/transactions', (req, res) => {
  res.sendStatus(202);
});

// export - for use by server/index.js
module.exports = router;


/*
TODO: 
Test GET with postman  [x]
Test POST with postman [x]
Test PUT with postman  [x]
*/