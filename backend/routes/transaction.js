import { Router } from "express";
import { create } from "../models/Transaction";
import authenticate from "../utils/jwt";

const router = Router();

// This route handles submitting a transaction
router.post("/submit", authenticate, async (req, res) => {
  const { amount, description } = req.body;

  // Check for missing fields
  if (!amount || !description) {
    return res.status(400).json({ message: "Please provide amount and description" });
  }

  try {
    // Save the transaction to the database (You need to define your model)
    const transaction = await create({
      amount,
      description,
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

export default router;
