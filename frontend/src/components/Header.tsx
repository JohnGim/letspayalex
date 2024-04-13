import React, { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import "../Styles/Header.css"; // Import CSS file for Header styles
import UserContext from "../context/UserContext";
import PropTypes from "prop-types";

const Header = () => {
  const { username, onLogout } = useContext(UserContext);
  const [transactionsMenuOpen, setTransactionsMenuOpen] = useState(false);
  const [groupsMenuOpen, setGroupsMenuOpen] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    // Add event listener when component mounts
    document.addEventListener("click", handleClickOutside);
    return () => {
      // Remove event listener when component unmounts
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event: { target: any; }) => {
    const current = headerRef.current; // Add type assertion
    if (current && !(current as HTMLElement).contains(event.target)) {
      // If clicked outside the header, close the menus
      setTransactionsMenuOpen(false);
      setGroupsMenuOpen(false);
    }
  };

  const toggleTransactionsMenu = () => {
    setTransactionsMenuOpen(!transactionsMenuOpen);
    // Close groups menu when transactions menu is opened
    setGroupsMenuOpen(false);
  };

  const toggleGroupsMenu = () => {
    setGroupsMenuOpen(!groupsMenuOpen);
    // Close transactions menu when groups menu is opened
    setTransactionsMenuOpen(false);
  };

  return (
    <header ref={headerRef}>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li className="menu-item">
            <span className="transactions" onClick={toggleTransactionsMenu}>Transactions</span>
            <ul className="submenu" style={{ display: transactionsMenuOpen ? "block" : "none" }}>
              <li><Link to="/transaction/list">List Transactions</Link></li>
              <li><Link to="/transaction/submit">Submit Transactions</Link></li>
            </ul>
          </li>
          <li className="menu-item">
            <span className="groups" onClick={toggleGroupsMenu}>Groups</span>
            <ul className="submenu-group" style={{ display: groupsMenuOpen ? "block" : "none" }}>
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

export default Header;
