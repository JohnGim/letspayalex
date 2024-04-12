import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Login.css";
import { loginUser } from "../services/userService";
import PropTypes from "prop-types";


function Login({ onLogin }: { onLogin: Function }) {
  const [username, setUsername] = useState("user");
  const [password, setPassword] = useState("password");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate(); // Initialize useNavigate hook

  const login = async () => {
    try {
      const data: {token : string } = await loginUser(username, password);
      console.log("User logged in successfully!");
      document.cookie = `token=${data.token}; Secure; SameSite=Strict`;
      sessionStorage.setItem("username", username);
      onLogin(username);
      navigate("/transaction/submit");
    } catch (error) {
      if ((error as any).response && (error as any).response.data && (error as any).response.data.message) {
        setErrorMessage((error as any).response.data.message); // Set the error message from the response
      } else {
        setErrorMessage("An error occurred during registration."); // Set a generic error message
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
