import React, { useState } from "react";
import "../Styles/Login.css";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/userService";
import PropTypes from "prop-types";
import { AxiosError } from "axios";

function Register({ onRegister }: { onRegister: (username: string) => void }) {
  const [username, setUsername] = useState("user");
  const [password, setPassword] = useState("password");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const register = async () => {
    try {
      await registerUser(username, password, onRegister);
      navigate("/transaction/submit");
    } catch (error) {
      console.error("An error occurred during registration:", error);
      if (error instanceof AxiosError && error.response?.data?.message) {
        setErrorMessage(error.response.data.message); // Set the error message from the response
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
