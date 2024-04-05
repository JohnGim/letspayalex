import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/TransactionList.css";
import config from "../config";

function TransactionList() {
  const [transactions, setTransactions] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    setUsername(sessionStorage.getItem("username"));
    fetchTransactions();
  }, []);

  useEffect(() => {
    const storedUsername = sessionStorage.getItem("username");
    if (username !== storedUsername) {
      setUsername(storedUsername);
      fetchTransactions();
    }
  }, [username]);

  const fetchTransactions = async () => {
    try {
      const token = getTokenFromCookie();
      if (!token) {
        setErrorMessage("Token not found. Please log in again.");
        return;
      }
      const response = await axios.get(
        `${config.backend.url}/transaction/list`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            username: sessionStorage.getItem("username"),
          },
        }
      );
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
      <h2>{"Transactions List"}</h2>
      <p>{`Alex needs some love! ${username}.`}</p>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <table>
        <thead>
          <tr>
            <th>Amount</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.amount}</td>
              <td>{transaction.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionList;
