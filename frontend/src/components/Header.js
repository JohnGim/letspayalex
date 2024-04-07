import React from "react";
import { Link } from "react-router-dom";
import "../Styles/Header.css"; // Import CSS file for Header styles
import PropTypes from "prop-types";
// import Logout from "./Logout";

const Header = ({username, onLogout}) => {

  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          {username && (
            <>
              <li><Link to="/transaction/list">List Transactions</Link></li>
              <li><Link to="/transaction/submit">Submit Transactions</Link></li>
              <li><Link to="/login" onClick={onLogout}>Logout</Link></li>
              <li className="username">Welcome, {username}!</li>
            </>
          )}
          {!username && (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};
Header.propTypes = {
  onLogout: PropTypes.func.isRequired,
  username: PropTypes.string,
};
export default Header;
