const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const TransactionSchema = new mongoose.Schema({
  amount: { type: Number, required: true, unique: true },
  description: { type: String, required: false },
})

module.exports = mongoose.model("Transaction", TransactionSchema)
