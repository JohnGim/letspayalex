const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  description: { type: String, required: false },
});

module.exports = mongoose.model("Transaction", TransactionSchema);
