import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./Styles/global.css";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TransactionSubmitPage from "./pages/TransactionSubmitPage";
import TransactionListPage from "./pages/TransactionListPage";
import GroupListPage from "./pages/GroupListPage";
import GroupSubmitPage from "./pages/GroupSubmitPage";
import UserContext from "./context/UserContext";

function App() {
  const [username, setUsername] = useState(sessionStorage.getItem("username"));

  const onLogout = () => {
    setUsername(null);
    sessionStorage.removeItem("username");
    document.cookie = "token=; expires=Thu, 01 Jan1970 00:00:00 UTC; path=/;";
    console.log("User logged out successfully!");
  };

  return (
    <UserContext.Provider value={{ username, setUsername, onLogout }}>
      <Router>
        <div className="container">
          <Header /> {}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/transaction/submit" element={<TransactionSubmitPage />} />
            <Route path="/transaction/list" element={<TransactionListPage />} />
            <Route path="/group/list" element={<GroupListPage />} />
            <Route path="/group/submit" element={<GroupSubmitPage />} />
          </Routes>
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
