"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage on mount
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      try {
        const parsedUser = JSON.parse(storedUser);
        
        // Basic token validation (check if it exists and looks like a JWT)
        if (token.split('.').length === 3) {
          setUser(parsedUser);
        } else {
          console.warn("Invalid token format, clearing auth data");
          localStorage.removeItem("user");
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Failed to parse user data", error);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }
    setLoading(false);
  }, []);

  const login = (userData, token) => {
    try {
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", token);
      setUser(userData);
      
      // Immediate Role Redirect using window.location for reliability
      setTimeout(() => {
        if (userData.role === 'admin') {
          window.location.href = "/admin";
        } else if (userData.role === 'recruiter') {
          window.location.href = "/recruiter";
        } else {
          window.location.href = "/jobs";
        }
      }, 100); // Small delay to ensure state updates
    } catch (error) {
      console.error("Login error:", error);
      // Clear any partial state
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUser(null);
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUser(null);
      
      // Small delay to ensure state clears before redirect
      setTimeout(() => {
        window.location.href = "/login";
      }, 50);
    } catch (error) {
      console.error("Logout error:", error);
      // Force redirect even if there's an error
      window.location.href = "/login";
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
