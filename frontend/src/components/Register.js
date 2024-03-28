import React, { useState } from "react"
import axios from "axios"
import "../Styles/Login.css"

function Register() {
  const [username, setUsername] = useState("user") // Set default username
  const [password, setPassword] = useState("password") // Set default password
  const [successMessage, setSuccessMessage] = useState("")

  const register = async () => {
    try {
      const { data } = await axios.post(
        `http://localhost:6001/auth/register`,
        {
          username,
          password,
        },
      )
      localStorage.setItem("token", data.token)
      setSuccessMessage("Registration Successful!") // Set success message upon successful registration
      // Optionally, you can redirect or do something else here
    } catch (error) {
      console.error("An error occurred during registration:", error)
      // Display an error message to the user
      // You can use state to manage error message display in your component
    }
  }


  const handleFormSubmit = event => {
    event.preventDefault(); // Prevent default form submission behavior
    register(); // Call the register function when form is submitted
  }

  return (
    <div className="login-container">
      <h2>Register</h2>
      <form onSubmit={handleFormSubmit}> {/* Use onSubmit event to handle form submission */}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Register</button> {/* Change button type to submit */}
      </form>
      {successMessage && <p>{successMessage}</p>} {/* Display success message if it's not empty */}
    </div>
  )
}

export default Register
