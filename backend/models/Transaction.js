const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  description: { type: String, required: false },
  username: { type: String, required: true },
});

module.exports = mongoose.model("Transaction", TransactionSchema);
