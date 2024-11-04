import React, { useState, useContext } from "react";
import "./SignupForm.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function SignupForm({ setTab }) {
  const { login } = useContext(AuthContext);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: "",
    phoneNumber: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEditChange = (field, value) => {
    setUserData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5115/api/Users/Register", userData);
      const { token } = response.data;
      login(token); // Store the token and log the user in
      navigate("/InitialSetupPage"); // Redirect to the initial setup page
    } catch (error) {
      setError(error.response?.data?.Message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="signup-form-container">
      <h2>Signup</h2>
      <form className="signup-form" onSubmit={handleSignup}>
        <input
          onChange={(e) => handleEditChange("firstName", e.target.value)}
          value={userData.firstName}
          type="text"
          placeholder="First Name"
          required
        />
        <input
          onChange={(e) => handleEditChange("lastName", e.target.value)}
          value={userData.lastName}
          type="text"
          placeholder="Last Name"
          required
        />
        <input
          onChange={(e) => handleEditChange("email", e.target.value)}
          value={userData.email}
          type="email"
          placeholder="Email"
          required
        />
        <input
          onChange={(e) => handleEditChange("username", e.target.value)}
          value={userData.username}
          type="text"
          placeholder="Username"
          required
        />
        <input
          onChange={(e) => handleEditChange("password", e.target.value)}
          value={userData.password}
          type="password"
          placeholder="Password"
          required
        />
        <input
          onChange={(e) => handleEditChange("phoneNumber", e.target.value)}
          value={userData.phoneNumber}
          type="tel"
          placeholder="Phone Number"
          required
        />
        <button type="submit">Signup</button>
        {error && <p className="error-message">{error}</p>}
        <p>
          Already have an account?{" "}
          <span className="switch-tab" onClick={() => setTab("Login")}>
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

export default SignupForm;