import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./Styles/global.css";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TransactionSubmitPage from "./pages/TransactionSubmitPage";
import TransactionListPage from "./pages/TransactionListPage";

function App() {
  // Define the global currency state
  const [globalCurrency, setGlobalCurrency] = useState("EUR");

  return (
    <Router>
      <div className="container">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/transaction/submit" element={<TransactionSubmitPage globalCurrency={globalCurrency} setGlobalCurrency={setGlobalCurrency} />} />
          <Route path="/transaction/list" element={<TransactionListPage globalCurrency={globalCurrency} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
