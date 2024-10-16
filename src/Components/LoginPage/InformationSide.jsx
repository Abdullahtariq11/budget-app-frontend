import React from "react";
import "./InformationSide.css";
import { Link } from "react-router-dom";

function InformationSide() {
  return (
    <div className="informationSide-container">
      <Link to="/" className="information-nav-link">
        <img src="logoPathhere" alt="Logo goes here" />
      </Link>

      <div className="informationSide-section">
        <h1 className="informationSide-main-heading">
          Effortless Budgeting for Smarter Spending
        </h1>
      </div>
      <h4>
        Track your expenses, set budgets, and achieve your financial goals all
        in one place.
      </h4>
    </div>
  );
}

export default InformationSide;
