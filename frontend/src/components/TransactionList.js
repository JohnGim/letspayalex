import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/TransactionList.css";
import config from "../config";

function TransactionList() {
  const [transactions, setTransactions] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    setUsername(localStorage.getItem("username"));
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const token = getTokenFromCookie();
      if (!token) {
        setErrorMessage("Token not found. Please log in again.");
        return;
      }
      const response = await axios.get(`${config.backend.url}/transaction/list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTransactions(response.data);
    } catch (error) {
      setErrorMessage("An error occurred while fetching transactions.");
      console.error("Error fetching transactions:", error);
    }
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
      <h2>Transactions List</h2>
      <p>Welcome, {username}!</p>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <ul>
        {transactions.map((transaction, index) => (
          <li key={index}>
            <p>Amount: {transaction.amount}</p>
            <p>Description: {transaction.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionList;
