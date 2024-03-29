import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import "../Styles/Login.css"

const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:6001"

function Login() {
  const [username, setUsername] = useState("user")
  const [password, setPassword] = useState("password")
  const navigate = useNavigate() // Initialize useNavigate hook

  const login = async () => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/auth/login`,
        {
          username,
          password,
        }
      )
      localStorage.setItem("token", data.token)
      localStorage.setItem("username", username) // Store username in local storage
      // Redirect to Transaction landing page after successful login
      navigate("/transaction/submit")
    } catch (error) {
      console.error("An error occurred during login:", error)
    }
  }

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={login}>Login</button>
    </div>
  )
}

export default Login
