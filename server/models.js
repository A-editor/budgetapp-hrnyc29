// Imports
const { db, Txn, Budget, PayType, Account } = require('../database/index.js')

// Model Methods // (1)
const save = (params, model) => {
  console.log(params);
  console.log(model);
  if (model === 'transaction') {
  const newDate = new Date();
  let txnInstance = new Txn({
    date: newDate,
    descr: params.inputdescription,
    amount: params.inputamount,
    type: params.type || 'none',
    category: params.inputcategory,
  })
  return txnInstance.save();
} else if (model === 'category') {
  let categoryInst = new Budget({
    category: params.inputcategory,
    budget: params.inputbudget || 0,
    remaining: params.remaining || 0,
  })
  return categoryInst.save();
}
  // console.log(`* Models.save | req.body.params`, req.body.params)
  // let collection = params.
  // db.Txn.insertOne(req.body.params.txn)
  // res.status(201)
}

const retrieve = (model) => {
  // console.log(`* Models.retrieve | req.query`, req.query)
  if (model === 'transaction') {
  return Txn.find().exec()
  } else if (model === 'category'){
    return Budget.find().exec();
  }
  // res.status(200).json(txns)
}

const update = (update) => {
  return Txn.updateOne(update).exec();
  /*
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
  */
}

const del = (params) => {
  return Txn.deleteOne(params).exec();
  
  // TODO: spec variables below on req.body.params and test
  /*
  console.log(`* Models.del | req.body`, req.body)
  let params = req.body.params
  let collection = params.collection
  let deleteFilter = params.deleteFilter
  db.collection.deleteOne(
    deleteFilter
  )
  res.status(204)
  */
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
