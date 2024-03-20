import React, { useState } from "react"
import axios from "axios"
import "../Styles/Login.css"

function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const login = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/auth/login`,
        {
          username,
          password,
        },
      )
      localStorage.setItem("token", data.token)
      window.location.href = "/"
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
        onChange={e => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={login}>Login</button>
    </div>
  )
}

export default Login
