const express = require("express");

const router = express.Router();
const Transaction = require("../models/Transaction");
const authenticate = require("../middleware/authenticate");

// GET route to fetch transactions for a user
router.get("/list", authenticate, async (req, res) => {
  try {
    // Fetch transactions associated with the provided username
    const { username } = req.query; // Retrieve username from query parameters
    console.log(`username: ${username}`);
    const transactions = await Transaction.find({ username });

    // Respond with the list of transactions
    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// This route handles submitting a transaction
router.post("/submit", authenticate, async (req, res) => {
  const { amount, description, username } = req.body;

  // Check for missing fields
  if (!amount || !description || !username) {
    return res.status(400).json({ message: "Please provide amount and description" });
  }

  try {
    // Save the transaction to the database (You need to define your model)
    const transaction = await Transaction.create({
      amount,
      description,
      username,
      // You might also want to associate the transaction with a user here
    });

    // Respond with success message
    res.status(200).json({ message: "Transaction submitted successfully", transaction });
  } catch (error) {
    console.error("Error submitting transaction:", error);
    res.status(500).json({ message: "Internal server error" });
  }
  return false;
});

module.exports = router;
