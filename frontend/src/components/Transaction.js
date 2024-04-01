import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/Transaction.css";
import config from "../config";

function Transaction() {
  const [amount, setAmount] = useState(1.00);
  const [description, setDescription] = useState("coffee");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    setUsername(localStorage.getItem("username"));
  }, []);

  const transaction = async (token) => {
    try {
      await axios.post(
        `${config.backend.url}/transaction/submit`,
        {
          amount: amount,
          description: description,
          username: username,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccessMessage("Transaction entered successfully!");
    } catch (error) {
      setErrorMessage("An error occurred during entering transaction");
      console.error("An error occurred during entering transaction:", error);
    }
  };

  const handleTransactionFormSubmit = async (event) => {
    event.preventDefault();

    // Retrieve token from session cookie
    const token = getTokenFromCookie();

    if (!token) {
      setErrorMessage("Token not found. Please log in again.");
      return;
    }

    // Make transaction call with token
    await transaction(token);
  };

  // Function to retrieve token from session cookie
  const getTokenFromCookie = () => {
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
      const [name, value] = cookie.split("=");
      if (name === "token") {
        return value;
      }
    }
    return null;
  };

  return (
    <div className="transaction-container">
      <h2>Enter transaction</h2>
      <p>Welcome, {username}!</p>
      <form onSubmit={handleTransactionFormSubmit}>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Transaction</button>
      </form>
      {successMessage && <p className="success">{successMessage}</p>}
      {errorMessage && <p className="error">{errorMessage}</p>}
    </div>
  );
}

export default Transaction;
