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

  // Retrieve username from local storage when component mounts
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const transaction = async (token) => {
    try {
      await axios.post(
        `${config.backend.url}/transaction/submit`,
        {
          amount: amount,
          description: description,
          username: username, // Pass the username in the request body
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token to request headers
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
    event.preventDefault(); // Prevent default form submission behavior
    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    if (token) {
      await transaction(token); // Call transaction function with token
    } else {
      setErrorMessage("Token not found. Please log in again."); // Handle case where token is not found
    }
  };

  return (
    <div className="transaction-container">
      <h2>Enter transaction</h2>
      <p>Welcome, {username}!</p> {/* Display username */}
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
