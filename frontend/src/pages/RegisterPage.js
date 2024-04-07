import PropTypes from "prop-types";
import Register from "../components/Register";
import React from "react";

function RegisterPage({onRegister}) {
  return <Register onRegister={ onRegister }/>;
}

RegisterPage.propTypes = {
  onRegister: PropTypes.func.isRequired
};

export default RegisterPage;
