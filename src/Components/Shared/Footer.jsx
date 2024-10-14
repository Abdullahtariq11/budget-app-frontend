import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer-container">
      <ul className="footer-list">
        <li className="footer-left">All rights reserved to Abdullah Tariq</li>

        <ul className="footer-links">
          <li>
            <a href="/privacy">Privacy Policy</a>
          </li>
          <li>
            <a href="/terms">Terms and Conditions</a>
          </li>
          <li>
            <a href="/about">About Us</a>
          </li>
        </ul>
      </ul>
    </footer>
  );
}

export default Footer;
