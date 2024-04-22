import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Login.css";
import { loginUser } from "../services/userService";
import PropTypes from "prop-types";
import { AxiosError } from "axios";


function Login({ onLogin }: { onLogin: (username: string) => void }) {
  const [username, setUsername] = useState("user");
  const [password, setPassword] = useState("password");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate(); // Initialize useNavigate hook

  const login = async () => {
    try {
      await loginUser(username, password, onLogin);
      navigate("/transaction/submit");
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An unexpected error occurred during registration.");
      }
    }
  };
  return (
    <div className="login-container">
      <h2>Login</h2>
      {errorMessage && <p className="error">{errorMessage}</p>}
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
  );
}

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};
export default Login;
