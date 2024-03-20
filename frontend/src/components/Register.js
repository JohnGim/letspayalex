import React, { useState } from "react"
import axios from "axios"
import "../Styles/Login.css"

function Register() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const register = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/auth/register`,
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
      <h2>Register</h2>
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
      <button onClick={register}>Register</button>
    </div>
  )
}

export default Register
