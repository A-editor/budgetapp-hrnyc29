const models = require('./models.js');
const helper = require('./helper.js');

module.exports = {
  getTransactions: (req, res) => {
    models.retrieve('transaction')
      .then((data) => res.json(data))
      .catch(() => res.sendStatus(404));
  },
  postTransactions: (req, res) => {
    models.save(req.body, 'transaction')
      .then(() => res.sendStatus(201))
      .catch(() => res.sendStatus(500));
  },
  updateTransactions: (req, res) => {
    console.log(req.body);
    let options = { new: true };
    models.update(req.body, 'transaction', options)
      .then(() => res.sendStatus(201))
      .catch(() => res.sendStatus(418));
  },
  deleteTransactions: (req, res) => {
    models.del(req.body, 'transaction')
      .then(() => res.sendStatus(205))
      .catch(() => res.sendStatus(404));
  },
  getCategories: (req, res) => {
    models.retrieve('category')
      .then((data) => res.json(data))
      .catch(() => res.sendStatus(404));
  },
  postCategories: (req, res) => {
    models.save(req.body, 'category')
      .then(() => res.sendStatus(201))
      .catch(() => res.sendStatus(418));
  },
  updateCategories: (req, res) => {
    models.update(req.body, 'category')
      .then(() => res.sendStatus(204))
      .catch(() => res.sendStatus(418));
  },
  deleteCategories: (req, res) => {
    models.del(req.body, 'category')
      .then(() => res.sendStatus(205))
      .catch(() => res.sendStatus(418));
  },
  totalByCategories: (req, res) => {
    models.totalByCategory()
      .then((results) => {
        return helper.getTotals(results)
      })
      .then((data) => res.json(data))
      .catch(() => res.sendStatus(418));
  }
}
/*
TODO:
plug in models to methods [x]
RUN TEST with dummy data  [x]
*/
