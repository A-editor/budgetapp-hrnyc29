const router = require('express').Router();
const controller = require('./controllers.js');

router.get('/transactions', controller.getTransactions);
router.post('/transactions', controller.postTransactions);
router.put('/transactions', controller.updateTransactions);
router.delete('/transactions', controller.deleteTransactions);

router.get('/categories', controller.getCategories);
router.post('/categories', controller.postCategories);
router.put('/categories,', controller.updateCategories);
router.delete('/categories', controller.deleteCategories);

// export - for use by server/index.js
module.exports = router;


/*
TODO:
Test GET with postman  [x]
Test POST with postman [x]
Test PUT with postman  [x]
Conntect the controllers GET    [x]
Conntect the controllers POST   [x]
Conntect the controllers PUT    [x]
Conntect the controllers DELETE [x]
*/