import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//create context
export const AuthContext = createContext();

//AuthProvider component to wrap around your app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); //holds user if logged in
  const [token, settoken] = useState(null); //holds jwt token
  const [loading, setLoading] = useState(true);


  //load user session from local storage if available
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      settoken(storedToken);
      fetchUserInfo(storedToken);
    } else {
      setLoading(false);
    }
  }, []);

  // Function to handle login and store token and user info
  const login = async (token) => {
    settoken(token);
    localStorage.setItem("authToken", token); //store token in local storage
    await fetchUserInfo(token); //fetch userinfo after each login
  };

  // Function to fetch user info using the token
  const fetchUserInfo = async (token) => {
    try {
      const response = await axios.get(
        "http://localhost:5115/api/Users/UserInfo",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(response.data); // Set user info
    } catch (error) {
      console.error("Failed to fetch user info", error);
      logout(); // Log the user out if fetching user info fails
    } finally {
      setLoading(false); // Set loading to false when done
    }
  };
  // Function to handle logout
  const logout = () => {
    settoken(null);
    setUser(null);
    localStorage.removeItem("authToken"); // Remove token from localStorage
  };

  // Context value to be shared
  const contextValue = {
    user,
    token,
    login,
    logout,
    isAuthenticated: !!token, // Boolean to check if the user is logged in
    loading, // Whether the app is still loading user data
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {!loading && children} {/* Only render children when loading is false */}
    </AuthContext.Provider>
  );
};
