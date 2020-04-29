// Imports
const { db, Txn, Budget, PayType, Account } = require('../database/index.js')

// Model Methods // (1)
const save = (req, res) => {
  console.log(`* Models.save | req.body.params`, req.body.params)
  let collection = req.body.params.collection
  db.collection.insertOne(req.body.params.txn)
  res.status(201)
}
const retrieve = (req, res) => {
  console.log(`* Models.retrieve | req.query`, req.query)
  let txns = db.transactions.find()
  res.status(200).json(txns)
}
const update = (req, res) => {
  // ^ When functional, refactor to destructure { params }
  // TODO: spec variables below on req.body.params and test
  console.log(`* Models.update | req.body`, req.body)
  let params = req.body.params
  let { collection, key, filter, updateKey, updateVal } = params
  // let collection = params.collection
  // let key = params.key
  // let filter = params.filter
  let updateAction = params.updates.map((update) => {
    return { $set: { [updateKey]: updateVal } }
  })
  db.collection.updateOne(
    { key: filter },
    updateAction
  )
  res.status(201)
}
const del = (req, res) => {
  // TODO: spec variables below on req.body.params and test
  console.log(`* Models.del | req.body`, req.body)
  let params = req.body.params
  let collection = params.collection
  let deleteFilter = params.deleteFilter
  db.collection.deleteOne(
    deleteFilter
  )
  res.status(204)
}

// Exports
module.exports = {
  save,
  retrieve,
  update,
  del
}

// TODO:
// [] Write models
// [] Test models w/ console.logs

// NOTES /////////////////////////////////////////////////////////////////////////////////
// (1)? Where do the inner methods come from? Mongoose API?
// (2)? What args to pass into models? req, res; callbacks, params, etc.
