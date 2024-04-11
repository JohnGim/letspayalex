import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/Header.css"; // Import CSS file for Header styles
import PropTypes from "prop-types";

const Header = ({ username, onLogout }) => {
  const [transactionsMenuOpen, setTransactionsMenuOpen] = useState(false);
  const [groupsMenuOpen, setGroupsMenuOpen] = useState(false);

  const handleTransactionsMouseEnter = () => {
    setTransactionsMenuOpen(true);
  };

  const handleTransactionsMouseLeave = () => {
    setTransactionsMenuOpen(false);
  };

  const handleGroupsMouseEnter = () => {
    setGroupsMenuOpen(true);
  };

  const handleGroupsMouseLeave = () => {
    setGroupsMenuOpen(false);
  };

  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li
            onMouseEnter={handleTransactionsMouseEnter}
            onMouseLeave={handleTransactionsMouseLeave}
            className="menu-item"
          >
            <span className="transactions">Transactions</span>
            <ul
              className="submenu"
              onMouseEnter={handleTransactionsMouseEnter}
              onMouseLeave={handleTransactionsMouseLeave}
              style={{ display: transactionsMenuOpen ? "block" : "none" }}
            >
              <li><Link to="/transaction/list">List Transactions</Link></li>
              <li><Link to="/transaction/submit">Submit Transactions</Link></li>
            </ul>
          </li>
          <li
            onMouseEnter={handleGroupsMouseEnter}
            onMouseLeave={handleGroupsMouseLeave}
            className="menu-item"
          >
            <span className="groups">Groups</span>
            <ul
              className="submenu-group"
              onMouseEnter={handleGroupsMouseEnter}
              onMouseLeave={handleGroupsMouseLeave}
              style={{ display: groupsMenuOpen ? "block" : "none" }}
            >
              <li><Link to="/group/list">List Groups</Link></li>
              <li><Link to="/group/submit">Submit Group</Link></li>
            </ul>
          </li>
          {username ? (
            <>
              <li><Link to="/login" onClick={onLogout}>Logout</Link></li>
              <li className="username">Welcome, {username}!</li>
            </>
          ) : (
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
