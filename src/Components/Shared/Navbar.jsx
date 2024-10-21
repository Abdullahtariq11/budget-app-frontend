import React, { useContext } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

//Navbar

function Navbar() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  return (
    <nav className="nav-bar" aria-label="Main navigation">
      <ul className="nav-container">
        <li>
          <img src="path-to-logo.png" alt="Logo" className="logo" />
        </li>
        {isAuthenticated ? (
          <div className="nav-holder">
            {/* Placeholder for now, will be replaced with React Router later */}
            <Link to="/DashboardPage" className="nav-link">
              <li>Dashboard</li>
            </Link>
            <Link to="/DataManagement" className="nav-link">
              <li>Data Management</li>
            </Link>
            <Link to="/Setting" className="nav-link">
              <li>Setting</li>
            </Link>
            <Link to="/" className="nav-link">
              <li onClick={()=>logout()}>Logout</li>
            </Link>

          </div>
        ) : (
          <div className="nav-holder">
            {/* Placeholder for now, will be replaced with React Router later */}
            <Link to="/LoginPage" className="nav-link">
              <li>Get Started</li>
            </Link>
          </div>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
