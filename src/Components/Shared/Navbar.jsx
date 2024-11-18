import React, { useContext } from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom"; // Use NavLink instead of Link
import { AuthContext } from "../../context/AuthContext";
import logo from "../../Assets/logo.png";  

function Navbar() {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <nav className="nav-bar" aria-label="Main navigation">
      <ul className="nav-container">
        <li>
          <img src={logo} alt="Logo" className="logo" />
        </li>
        {isAuthenticated ? (
          <div className="nav-holder">
            <NavLink
              to="/DashboardPage"
              className={({ isActive }) => (isActive ? "nav-link active-tab" : "nav-link")}
            >
              <li>Dashboard</li>
            </NavLink>
            <NavLink
              to="/DataManagement"
              className={({ isActive }) => (isActive ? "nav-link active-tab" : "nav-link")}
            >
              <li>Data Management</li>
            </NavLink>
            <NavLink
              to="/SettingsPage"
              className={({ isActive }) => (isActive ? "nav-link active-tab" : "nav-link")}
            >
              <li>Setting</li>
            </NavLink>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "nav-link active-tab" : "nav-link")}
            >
              <li onClick={() => logout()}>Logout</li>
            </NavLink>
          </div>
        ) : (
          <div className="nav-holder">
            <NavLink to="/LoginPage" className="nav-link">
              <li>Get Started</li>
            </NavLink>
          </div>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;