import React from "react";
import "./HeroSection.css";

function HeroSection() {
  return (
    <div className="heroSection-container">
      <div className="main-section">
        <h1 className="main-heading">
          Effortless Budgeting for Smarter Spending
        </h1>
        <button>Get Started</button>
      </div>
      <h4>
        Track your expenses, set budgets, and achieve your financial goals all
        in one place.
      </h4>
    </div>
  );
}

export default HeroSection;
