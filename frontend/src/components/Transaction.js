import React, { useState, useEffect } from "react"
import axios from "axios"
import "../Styles/Transaction.css"
const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:6001"

function Transaction() {
  const [amount, setAmount] = useState(1.00)
  const [description, setDescription] = useState("coffee") 
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [username, setUsername] = useState("")

  useEffect(() => {
    // Fetch user information after component mounts
    const token = localStorage.getItem("token");
    if (token) {
      axios.get(`${backendUrl}/auth/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        setUsername(response.data.username);
      })
      .catch(error => {
        console.error("Error fetching user information:", error);
      })
    }
  }, [])

  const transaction = async (token) => {
    try {
      await axios.post(
        `${backendUrl}/transaction/submit`,
        {
          amount: amount,
          description: description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token to request headers
          },
        }
      );
      setSuccessMessage("Transaction entered successfully!")
    } catch (error) {
      setErrorMessage("An error occurred during entering transaction")
      console.error("An error occurred during entering transaction:", error)
    }
  }

  const handleTransactionFormSubmit = async (event) => {
    event.preventDefault() // Prevent default form submission behavior
    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    if (token) {
      await transaction(token) // Call transaction function with token
    } else {
      setErrorMessage("Token not found. Please log in again.") // Handle case where token is not found
    }
  }

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
  )
}

export default Transaction;
