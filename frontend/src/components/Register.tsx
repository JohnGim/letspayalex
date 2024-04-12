import React, { useState } from "react";
import "../Styles/Login.css";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/userService";
import PropTypes from "prop-types";

function Register({ onRegister }: { onRegister: Function }) {
  const [username, setUsername] = useState("user");
  const [password, setPassword] = useState("password");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const register = async () => {
    try {
      const { data } = await registerUser(username, password);
      console.log("User registered successfully!");
      sessionStorage.setItem("username", username);
      onRegister(username);
      console.log(data.token);
      document.cookie = `token=${data.token}; Secure; SameSite=Strict`;
      navigate("/transaction/submit");
    } catch (error) {
      console.error("An error occurred during registration:", error);
      if ((error as any).response && (error as any).response.data && (error as any).response.data.message) {
        setErrorMessage((error as any).response.data.message); // Set the error message from the response
      } else {
        setErrorMessage("An error occurred during registration."); // Set a generic error message
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Register</h2>
      {errorMessage && <p className="error">{errorMessage}</p>}
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
  );
}
Register.propTypes = {
  onRegister: PropTypes.func.isRequired,
};
export default Register;
