import React from "react";
import "./HeroSection.css";
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <div className="heroSection-container">
      <div className="main-section">
        <h1 className="main-heading">
          Effortless Budgeting for Smarter Spending
        </h1>
        <Link to="/LoginPage" className="hero-nav-link">
          <button>Get Started</button>
        </Link>
      </div>
      <h4>
        Track your expenses, set budgets, and achieve your financial goals all
        in one place.
      </h4>
    </div>
  );
}

export default HeroSection;
