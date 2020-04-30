// Imports
const { db, Txn, Budget, PayType, Account } = require('../database/index.js')

// Model Methods // (1)
const save = (params, model) => {
  if (model === 'transaction') {
    let txnInstance = new Txn({
      date: params.date,
      descr: params.inputdescription,
      amount: params.inputamount,
      type: params.type,
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
};

const retrieve = (model) => {
  if (model === 'transaction') {
    return Txn.find().sort('-date').exec() // sort by date
  } else if (model === 'category') {
    return Budget.find().exec();
  }
};

const update = (param, model, options) => {
  let updatedQuery = { $set: { category: param.category } };
  if (model === 'transaction') {
    return Txn.findByIdAndUpdate(param.id, updatedQuery, options).exec();
  } else if (model === 'category') {
    return Budget.findByIdAndUpdate(param_id, updatedQuery, options).exec();
  }
};

const del = (params, model) => {
  if (model === 'transaction') {
    return Txn.deleteOne(params).exec();
  } else if (model === 'category') {
    return Budget.deleteOne(params).exec();
  }
};
  
const totalByCategory = () => {
  return Txn.find().sort('category').exec();
};
// Exports
module.exports = {
  save,
  retrieve,
  update,
  del,
  totalByCategory
}

// TODO:
// [x] Write models
// [x] Test models w/ console.logs

// NOTES /////////////////////////////////////////////////////////////////////////////////
// (1)? Where do the inner methods come from? Mongoose API?
// (2)? What args to pass into models? req, res; callbacks, params, etc.
