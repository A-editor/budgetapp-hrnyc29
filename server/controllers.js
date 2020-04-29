const models = require('./models.js');

module.exports = {
  getTransactions: (req, res) => {
    console.log(req.body);
    models
    .retrieve()
      .then((results) => res.json(results))
      .catch((err) => console.log(err));
  },

  postTransactions: (req, res) => {
    console.log(req.body);
    models.save(req.body)
      .then(() => res.sendStatus(201))
      .catch((err) => res.sendStatus(500));
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
}

/*
TODO:
plug in models to methods [x]

RUN TEST with dummy data  [x]
*/
