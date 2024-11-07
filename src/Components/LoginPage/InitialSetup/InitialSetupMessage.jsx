// InitialSetupMessage.js
import React from "react";
import "./InitialSetupMessage.css"

function InitialSetupMessage() {
  return (
    <div className="setup-message">
      <h2>Welcome to Your Dashboard!</h2>
      <p>
        Before you start, we need to set up a few things. Please complete the initial setup to create your primary card and budget categories.
      </p>
      <p>This setup will only take a few moments, and you'll be able to start managing your finances right away!</p>
    </div>
  );
}

export default InitialSetupMessage;