import Login from "../components/Login";
import React from "react";
import PropTypes from "prop-types";
import UserContext from "../context/UserContext";

function LoginPage() {
  const { setUsername } = React.useContext(UserContext);
  return <Login onLogin={setUsername} />;
}

export default LoginPage;
