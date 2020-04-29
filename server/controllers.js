const models = require('./models.js');

module.exports = {
  getTransactions: (req, res) => {
    console.log(req.body);
    models
      .retrieve()
      .then((results) => res.json(results.data))
      .catch((err) => console.log(err));
  },

  postTransactions: (req, res) => {
    models
      .save(transaction)
      .then(() => res.sendStatus(201))
      .catch((err) => console.error(err));
  },

  updateTransactions: (req, res) => {
    models
      .update()
      .then(() => res.sendStatus(204))
      .catch((err) => console.error(err));
  },

  deleteTransactions: (req, res) => {
    models
      .del()
      .then(() => res.sendStatus(205))
      .catch((err) => console.error(err));
  },
}

/*
TODO:
plug in models to methods [x]
RUN TEST with dummy data  []
*/