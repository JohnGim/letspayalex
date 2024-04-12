import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/TransactionSubmit.css";
import config from "../config";
import currencySymbolMap from "./CurrencySymbolMap";


function TransactionSubmit() {
  const [amount, setAmount] = useState(1.00);
  const [currency, setCurrency] = useState("EUR");
  const [description, setDescription] = useState("coffee");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    setUsername(sessionStorage.getItem("username") ?? "");
  }, []);

  interface TransactionData {
    amount: number;
    description: string;
    username: string;
    currency: string;
  }

  const transaction = async (token: string | null) => {
    try {
      await axios.post(
        `${config.backend.url}/transaction/submit`,
        {
          amount: amount,
          description: description,
          username: username,
          currency: currency
        } as TransactionData,
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

  const handleTransactionFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Retrieve token from session cookie
    const token: string | null = getTokenFromCookie();

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
      <p>{`Alex let you borrow money? Or you're just really nice, ${username}`}!</p>
      <form onSubmit={handleTransactionFormSubmit}>
        <div className="input-amount-group">
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
          />
          <select
          value={currency}
          onChange={(e) => {
            setCurrency(e.target.value); // Update currency state
          }}
        >
          {Object.keys(currencySymbolMap).map((currencyCode) => (
            <option key={currencyCode} value={currencyCode}>
              {currencyCode}
            </option>
          ))}
        </select>
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">Submit Transaction</button>
      </form>
      {successMessage && <p className="success">{successMessage}</p>}
      {errorMessage && <p className="error">{errorMessage}</p>}
    </div>
  );
}

export default TransactionSubmit;
