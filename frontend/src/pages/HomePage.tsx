import React from "react";
import catImage from "../images/cat.png"; // Import the image
import "../Styles/HomePage.css"; // Import CSS file for HomePage styles

const HomePage = () => {
  return (
    <div>
      <div className="hero">
        <div className="hero-content">
          <h1>{"Let's Pay Alex"}</h1>
          <p>Sharing is caring and so is paying Alex. Long live Alex</p>
        </div>
        <img src={catImage} alt="Cute Cat" className="hero-image" /> {/* Place the image inside the hero div */}
      </div>
    </div>
  );
};

export default HomePage;
