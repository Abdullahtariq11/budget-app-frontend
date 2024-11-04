import React, { useContext, useEffect, useState } from "react";
import "./LoginForm.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function LoginForm({ setTab }) {
  const { login, loading, isAuthenticated, setupComplete } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate(); // Initialize useNavigate

  // Handle login request logic
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5115/api/Users/Login",
        {
          username,
          password,
        }
      ); // sends the request to backend

      const { token } = response.data;
      const isSetup = await login(token); // Await login to get setupComplete status
      isSetup ? navigate("/DashboardPage") : navigate("/InitialSetupPage");
    } catch (error) {
      setError(error.response?.data?.Message || "Login failed. Please try again.");
    }
  };

  // Ensure user is navigated to the appropriate page if already logged in
  useEffect(() => {
    if (isAuthenticated && !loading) {
      setupComplete ? navigate("/DashboardPage") : navigate("/InitialSetupPage");
    }
  }, [isAuthenticated, loading, setupComplete, navigate]);

  return (
    <div className="login-form-container">
      <h2>Log In</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          required
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Login</button>
        <p>Forgot Password?</p>
        <p>
          Don't have an account?{" "}
          <span className="switch-tab" onClick={() => setTab("Signup")}>
            {" "}
            Signup
          </span>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;