import React from "react";
import "./Navbar.css";

//Navbar

function Navbar() {
  return (
    <nav className="nav-bar" aria-label="Main navigation">
      <ul className="nav-container">
        <li>
          <img src="path-to-logo.png" alt="Logo" className="logo" />
        </li>
        <div className="nav-holder">
          <li>Login</li>  {/* Placeholder for now, will be replaced with React Router later */}
          <li>Signup</li> {/* Placeholder for now, will be replaced with React Router later */}
        </div>
      </ul>
    </nav>
  );
}

export default Navbar;