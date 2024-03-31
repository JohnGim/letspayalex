import { Schema, model } from "mongoose";

const TransactionSchema = new Schema({
  amount: { type: Number, required: true, unique: true },
  description: { type: String, required: false },
});

export default model("Transaction", TransactionSchema);
