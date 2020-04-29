const router = require('express').Router();
const controller = require('./controllers.js');

// add controllers to the callbacks
router.get('/transactions', controller.getTransactions);
router.get('/categories', controller.getCategories);
router.post('/transactions', controller.postTransactions);
router.post('/categories', controller.postCategories);
router.put('/transactions', controller.updateTransactions);
router.delete('/transactions', controller.deleteTransactions);

// export - for use by server/index.js
module.exports = router;


/*
TODO:
Test GET with postman  [x]
Test POST with postman [x]
Test PUT with postman  [x]
Conntect the controllers GET    []
Conntect the controllers POST   []
Conntect the controllers PUT    []
Conntect the controllers DELETE []
*/