import React, { useContext, useEffect, useState } from "react";
import "./LoginForm.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function LoginForm({ setTab }) {
  const { login, loading, isAuthenticated, setupComplete } =
    useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [logTab, setLogTab] = useState("Login");

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
      setError(
        error.response?.data?.Message || "Login failed. Please try again."
      );
    }
  };

  // Handle login request logic
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      // Get the base URL of the front-end application
      const clientUrl = `${window.location.origin}/ResetPassword`;
      const response = await axios.post(
        "http://localhost:5115/api/Users/ForgotPassword",
        {
          email,
          clientUrl,
        }
      ); // sends the request to backend

      alert(response.data);
    } catch (error) {
      setError(
        error.response?.data?.Message || "Login failed. Please try again."
      );
    }
  };

  // Ensure user is navigated to the appropriate page if already logged in
  useEffect(() => {
    if (isAuthenticated && !loading) {
      setupComplete
        ? navigate("/DashboardPage")
        : navigate("/InitialSetupPage");
    }
  }, [isAuthenticated, loading, setupComplete, navigate]);

  return (
    <div className="login-form-container">
      {logTab == "Login" ? (
        <>
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
            <p
              className="changeButton"
              onClick={() => setLogTab("ForgotPassword")}
            >
              Forgot Password?
            </p>
            <p>
              Don't have an account?{" "}
              <span className="switch-tab" onClick={() => setTab("Signup")}>
                {" "}
                Signup
              </span>
            </p>
          </form>
        </>
      ) : (
        <>
          <h2>Forgot Password</h2>
          <form className="login-form" onSubmit={handleForgotPassword}>
            <p>Enter you email to reset password.</p>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
            {error && <p className="error-message">{error}</p>}
            <button type="submit">Submit</button>
            <p className="changeButton" onClick={() => setLogTab("Login")}>
              Login
            </p>
          </form>
        </>
      )}
    </div>
  );
}

export default LoginForm;
