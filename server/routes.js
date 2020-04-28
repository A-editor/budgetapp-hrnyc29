const router = require('express').Router();
const controller = require('./controllers.js');

// add controllers to the callbacks
router.get('/transactions', (req, res) => {
  res.sendStatus(200);
});




module.exports = router;


/*
TODO: 
Test with postman [x]

*/