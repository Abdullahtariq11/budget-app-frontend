import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

// Create context
export const AuthContext = createContext();

// AuthProvider component to wrap around your app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Holds user if logged in
  const [token, setToken] = useState(null); // Holds JWT token
  const [loading, setLoading] = useState(true);
  const [setupComplete, setSetupComplete] = useState(false); // Tracks if initial setup is complete

  // Load user session from local storage if available
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setToken(storedToken);
      fetchUserInfo(storedToken); // Load user info if token exists
    } else {
      setLoading(false); // No token, so stop loading
    }
  }, [setupComplete,token]);

  // Function to handle login, store token, and fetch user info
  const login = async (token) => {
    setToken(token);
    localStorage.setItem("authToken", token); // Store token in local storage
    await fetchUserInfo(token); // Fetch user info after login
 // Return setupComplete status for navigation decisions
  };

  // Function to fetch user info using the token
  const fetchUserInfo = async (token) => {
    try {
      const response = await axios.get("http://localhost:5115/api/Users/UserInfo", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data); // Set user info
      setSetupComplete(response.data.setupComplete); // Set setup status from backend data
    } catch (error) {
      console.error("Failed to fetch user info", error);
      logout(); // Log the user out if fetching user info fails
    } finally {
      setLoading(false); // Set loading to false when done
    }
  };

  // Function to handle logout
  const logout = () => {
    setToken(null);
    setUser(null);
    setSetupComplete(false); // Reset setup status
    localStorage.removeItem("authToken"); // Remove token from localStorage
  };

  // Context value to be shared
  const contextValue = {
    user,
    token,
    login,
    logout,
    setupComplete,
    setSetupComplete,
    isAuthenticated: !!token, // Boolean to check if the user is logged in
    loading, // Whether the app is still loading user data
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {!loading && children} {/* Only render children when loading is false */}
    </AuthContext.Provider>
  );
};