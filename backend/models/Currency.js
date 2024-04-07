const mongoose = require("mongoose");

const CurrencySchema = new mongoose.Schema({
  currency: { type: String, required: false },
  amount: { type: Number, required: true },
});

module.exports = mongoose.model("Currency", CurrencySchema);
