import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./Styles/global.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TransactionPage from "./pages/TransactionPage";
import React from "react";

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/transaction/submit" element={<TransactionPage />} /> {/* Define the route for submitting a transaction */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
