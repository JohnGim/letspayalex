const express = require("express");
const axios = require("axios");

const router = express.Router();
const Dinero = require("dinero.js");
const util = require("util");
const Transaction = require("../models/Transaction");
const Currency = require("../models/Currency");
const authenticate = require("../middleware/authenticate");
const config = require("../config");

const fetchCurrencies = async () => {
  try {
    const currencies = await Currency.find({});

    const rates = {};
    currencies.forEach((currency) => {
      rates[currency.currency.toUpperCase()] = currency.amount;
    });

    return rates;
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    return null;
  }
};

router.get("/list", authenticate, async (req, res) => {
  try {
    const { username } = req.query;
    const transactions = await Transaction.find({ username });

    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const convertAmount = (amount, currency, targetCurrency, rates) => {
  if (currency === targetCurrency) {
    return amount;
  }
  if (currency === "EUR") {
    return amount * rates[targetCurrency];
  } else {
    if (targetCurrency !== "EUR") {
      return (amount / rates[currency]) * rates[targetCurrency];
    }
    return amount / rates[currency];
  }
};

router.get("/convert", authenticate, async (req, res) => {
  try {
    const { username, currency: targetCurrency, denom } = req.query;
    const transactions = await Transaction.find({ username });

    const exchangeRates = await fetchCurrencies();

    if (!exchangeRates) {
      return res.status(500).json({ message: "Error fetching exchange rates" });
    }

    const convertedTransactions = transactions.map((transaction) => {
      const convertedAmount = convertAmount(
        transaction.amount,
        transaction.currency,
        targetCurrency,
        exchangeRates,
      );
      const roundedAmount = (Math.round(convertedAmount / 10 ** denom) * 10 ** denom).toFixed(Math.abs(denom));
      return {
        ...transaction.toObject(),
        amount: roundedAmount,
        currency: targetCurrency,
      };
    });

    res.status(200).json(convertedTransactions);
  } catch (error) {
    console.error("Error converting currency:", error);
    res.status(500).json({ message: "Internal server error" });
  }
  return false;
});

router.post("/submit", authenticate, async (req, res) => {
  const {
    amount, description, username, currency,
  } = req.body;

  if (!amount || !description || !username || !currency) {
    return res.status(400).json({ message: "Please provide amount and description" });
  }

  try {
    const transaction = await Transaction.create({
      amount,
      description,
      username,
      currency,
    });

    res.status(200).json({ message: "Transaction submitted successfully", transaction });
  } catch (error) {
    console.error("Error submitting transaction:", error);
    res.status(500).json({ message: "Internal server error" });
  }
  return false;
});

router.get("/update-currencies", async (req, res) => {
  try {
    const response = await axios.get(config.ecb.url);

    const rates = response.data.eur;
    const currencies = Object.keys(rates);

    // Clear existing currencies
    await Currency.deleteMany({});

    // Insert new currencies
    const currencyDocs = currencies.map((currency) => ({
      currency,
      amount: rates[currency],
    }));

    await Currency.insertMany(currencyDocs);

    res.status(200).json({ success: true, message: "Currency data updated successfully." });
  } catch (error) {
    console.error("Error updating currency data:", error);
    res.status(500).json({ success: false, message: "Failed to update currency data." });
  }
});

module.exports = router;
