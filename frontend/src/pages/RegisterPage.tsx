import PropTypes from "prop-types";
import Register from "../components/Register";
import React from "react";
import UserContext from "../context/UserContext";

function RegisterPage() {
  const { setUsername } = React.useContext(UserContext);
  return <Register onRegister={ setUsername }/>;
}

export default RegisterPage;
