import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/TransactionList.css";
import config from "../config";
import currencySymbolMap from "./CurrencySymbolMap";

function TransactionList() {
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [currency, setCurrency] = useState("EUR");
  const [transactions, setTransactions] = useState([]);
  const [selectedGlobalCurrency, setSelectedGlobalCurrency] = useState("EUR"); // Set default value to "EUR"
  const [totalSum, setTotalSum] = useState(0); // State variable to hold the total sum

  useEffect(() => {
    setUsername(sessionStorage.getItem("username"));
    fetchTransactions(); // Call fetchTransactions when component mounts
  }, []);

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

  const updateCurrencies = async () => {
    try {
      const token = getTokenFromCookie();
      if (!token) {
        setErrorMessage("Token not found. Please log in again.");
        return;
      }

      const response = await axios.get(
        `${config.backend.url}/transaction/update-currencies`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      setTransactions(response.data);
    } catch (error) {
      setErrorMessage("An error occurred while updating currencies.");
      console.error("Error updating currencies:", error);
    }
    return false;
  };

  const convertTransactions = async () => {
    try {
      const token = getTokenFromCookie();
      if (!token) {
        setErrorMessage("Token not found. Please log in again.");
        return;
      }

      console.log(`selectedGlobalCurrency: ${selectedGlobalCurrency}`);
      const response = await axios.get(
        `${config.backend.url}/transaction/convert`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            username: sessionStorage.getItem("username"),
            currency: selectedGlobalCurrency,
          },
        }
      );

      const convertedTransactions = response.data;
      setTransactions(convertedTransactions);

      const newTotalSum = convertedTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);
      setTotalSum(newTotalSum);
    } catch (error) {
      setErrorMessage("An error occurred while converting transactions.");
      console.error("Error converting transactions:", error);
    }
  };

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
      <div className="button-group">
        <span>So you want to pay him in...</span>
        <select
          value={currency}
          onChange={(e) => {
            setCurrency(e.target.value); // Update currency state
            setSelectedGlobalCurrency(e.target.value); // Update selectedGlobalCurrency state
          }}
        >
          {Object.keys(currencySymbolMap).map((currencyCode) => (
            <option key={currencyCode} value={currencyCode}>
              {currencyCode}
            </option>
          ))}
        </select>
        <button onClick={convertTransactions}>Convert!</button>
        <button onClick={updateCurrencies}>Update currencies</button>
      </div>
      {transactions.length > 0 && (
        <div>
          <p>Total Sum: {totalSum + " " + selectedGlobalCurrency}</p>
          <table>
            <thead>
              <tr>
                <th>Amount</th>
                <th>Currency</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={index}>
                  <td>{transaction.amount}</td>
                  <td>{transaction.currency}</td>
                  <td>{transaction.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TransactionList;
