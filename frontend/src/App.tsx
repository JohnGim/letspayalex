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

function App() {
  const [username, setUsername] = useState(sessionStorage.getItem("username"));

  const handleLogout = () => {
    setUsername(null);
    sessionStorage.removeItem("username");
    document.cookie = "token=; expires=Thu, 01 Jan1970 00:00:00 UTC; path=/;";
    console.log("User logged out successfully!");
  };

  return (
    <Router>
      <div className="container">
        <Header username={ username } onLogout={handleLogout} /> {}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage onLogin={setUsername}/>} />
          <Route path="/register" element={<RegisterPage onRegister={setUsername}/>} />
          <Route path="/transaction/submit" element={<TransactionSubmitPage />} />
          <Route path="/transaction/list" element={<TransactionListPage />} />
          <Route path="/group/list" element={<GroupListPage />} />
          <Route path="/group/submit" element={<GroupSubmitPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
