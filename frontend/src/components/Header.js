import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Styles/Header.css"; // Import CSS file for Header styles

const Header = () => {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const loggedInUser = sessionStorage.getItem("username");
    if (loggedInUser) {
      setUsername(loggedInUser);
    }
  }, []);

  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/transaction/list">List Transactions</Link></li>
          <li><Link to="/transaction/submit">Submit Transactions</Link></li>
          {username ? <li className="username">Welcome, {username}!</li> : null}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
