import Login from "../components/Login";
import React from "react";
import PropTypes from "prop-types";
function LoginPage({onLogin}: {onLogin: Function}) {
  return <Login onLogin={onLogin} />;
}

LoginPage.propTypes = {
  onLogin: PropTypes.func.isRequired
};

export default LoginPage;
