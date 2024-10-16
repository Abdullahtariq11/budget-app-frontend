import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

//Navbar

function Navbar() {
  return (
    <nav className="nav-bar" aria-label="Main navigation">
      <ul className="nav-container">
        <li>
          <img src="path-to-logo.png" alt="Logo" className="logo" />
        </li>
        <div className="nav-holder">
          {/* Placeholder for now, will be replaced with React Router later */}
          <Link to="/LoginPage" className="nav-link">
            <li>Get Started</li>
          </Link>
        </div>
      </ul>
    </nav>
  );
}

export default Navbar;
