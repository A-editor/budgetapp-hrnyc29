const models = require('./models.js');

module.exports = {
  getTransactions: (req, res) => {
    console.log('This is the request body');
    console.log(req.body);  
      models.retrieve('transaction') // pass model
      .then((results) => res.json(results))
      .catch((err) => console.log(err));
  },

  postTransactions: (req, res) => {
    console.log('post transaction');
    models.save(req.body, 'transaction')
      .then(() => res.sendStatus(201))
      .catch((err) => console.error(err));
  },

  updateTransactions: (req, res) => {
    console.log(req.body);
    models.update(req.body)
      .then(() => res.sendStatus(204))
      .catch((err) => console.error(err));
  },

  deleteTransactions: (req, res) => {
    models.del(req.body)
      .then(() => res.sendStatus(205))
      .catch((err) => console.error(err));
  },

  getCategories: (req, res) => {
    models.retrieve('category')
      .then((results) => res.json(results))
      .catch((err) => res.sendStatus(404));
  },

  postCategories: (req, res) => {
    console.log('post categoty')
    models.save(req.body, 'category')
      .then(() => res.sendStatus(201))
      .catch((err) => console.error(err));
  }
}

/*
TODO:
plug in models to methods [x]

RUN TEST with dummy data  [x]
*/
