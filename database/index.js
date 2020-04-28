// Imports
const mongoose = require('mongoose')

// Connect to DB
const dbUrl = 'mongodb://localhost:27017/budgetapp'
const db = mongoose.connect(dbUrl, { useNewUrlParser: true })

// Schemas
const txnSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  descr: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String, required: true },
  category: { type: String, required: false }
})

const budgetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  budget: { type: Number, required: true },
  remaining: { type: Number, required: true }
})

const payTypeSchema = new mongoose.Schema({
  name: { type: String, required: true }
})

const accountSchema = new mongoose.Schema({
  name: { type: String, required: true }
})

// Models
const Txn = mongoose.model('Txn', txnSchema)
const Budget = mongoose.model('Budget', budgetSchema)
const PayType = mongoose.model('PayType', payTypeSchema)
const Account = mongoose.model('Account', accountSchema)

// Exports
module.exports = {
  db,
  Txn,
  Budget,
  PayType,
  Account
}
