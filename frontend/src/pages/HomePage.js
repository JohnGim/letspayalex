import React from "react"
import { Link } from "react-router-dom"
import "../Styles/HomePage.css" // Import CSS file for HomePage styles

const HomePage = () => {
  return (
    <div className="hero">
      <div className="hero-content">
        <h1>Let's Pay Alex</h1>
        <p>Sharing is caring and so is paying Alex. Long live Alex</p>
        <Link to="/register">Register</Link>
        <br />
        <Link to="/login">Login</Link>
      </div>
    </div>
  )
}

export default HomePage
