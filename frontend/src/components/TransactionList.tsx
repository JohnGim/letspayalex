import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/TransactionList.css";
import config from "../config";
import currencySymbolMap from "./CurrencySymbolMap";
import { Container, CssBaseline } from "@mui/material";

function TransactionList() {
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [selectedGlobalCurrency, setSelectedGlobalCurrency] = useState("EUR");
  const [totalSum, setTotalSum] = useState(0);
  const [currenciesUpdated, setCurrenciesUpdated] = useState(false);

  useEffect(() => {
    setUsername(sessionStorage.getItem("username") || "");
    fetchTransactions();
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

      await axios.get(
        `${config.backend.url}/transaction/update-currencies`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      setCurrenciesUpdated(true);
    } catch (error) {
      setErrorMessage("An error occurred while updating currencies.");
      console.error("Error updating currencies:", error);
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

  const handleCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGlobalCurrency(event.target.value);
    convertTransactions(event.target.value);
  };

  const roundToLowestDenomination = (number: number, currency: string) => {
    const denom = 10 ** currencySymbolMap[currency]["denom"];
    return (Math.round(number / denom) * denom).toFixed(Math.abs(currencySymbolMap[currency]["denom"]));
  };

  const convertTransactions = async (currencyCode: string) => {
    try {
      const token = getTokenFromCookie();
      if (!token) {
        setErrorMessage("Token not found. Please log in again.");
        return;
      }

      const response = await axios.get(
        `${config.backend.url}/transaction/convert`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            username: sessionStorage.getItem("username"),
            currency: currencyCode,
            denom: currencySymbolMap[currencyCode]["denom"]
          },
        }
      );

      const convertedTransactions = response.data;
      setTransactions(convertedTransactions);

      const newTotalSum = convertedTransactions.reduce(
        (sum: any, transaction: any) => parseFloat(sum) + parseFloat(transaction.amount),
        0
      );
      setTotalSum(newTotalSum);
    } catch (error) {
      setErrorMessage("An error occurred while converting transactions.");
      console.error("Error converting transactions:", error);
    }
  };

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <div className="transaction-container">
        <h2>Transactions List</h2>
        <p>{`Alex needs some love! ${username}.`}</p>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <div className="row-container">
          <div className="currency-select">
            <select value={selectedGlobalCurrency} onChange={handleCurrencyChange}>
              {Object.keys(currencySymbolMap).map((currencyCode) => (
                <option key={currencyCode} value={currencyCode}>
                  {currencyCode}
                </option>
              ))}
            </select>
            <button onClick={updateCurrencies} className={currenciesUpdated ? "updated" : ""}>
              {currenciesUpdated ? "Currencies updated!" : "Update currencies"}
            </button>
          </div>
          {totalSum !== 0 && (
            <div className="total-sum-container">
              <span>{currencySymbolMap[selectedGlobalCurrency]["symbol"]} {roundToLowestDenomination(totalSum, selectedGlobalCurrency)} </span>
            </div>
          )}
        </div>
        {transactions.length > 0 && (
          <div>
            <table>
              <thead>
                <tr>
                  <th>Amount</th>
                  <th>Currency</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction: any, index: number) => (
                  <tr key={index}>
                    <td>{transaction.amount}</td>
                    <td>{currencySymbolMap[transaction.currency]["symbol"]}</td>
                    <td>{transaction.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Container>
  );
}

export default TransactionList;
