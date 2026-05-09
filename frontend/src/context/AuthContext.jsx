import React from 'react'
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// Create Context
export const AuthContext = createContext();

// Custom Hook
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider Component
export const AuthProvider = ({ children }) => {
  // States
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    localStorage.getItem("token") || null
  );
  const [loading, setLoading] = useState(true);

  // Base API URL
  const API_URL = "http://localhost:4000/api";

  // Set Axios Authorization Header
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common[
        "Authorization"
      ];
    }
  }, [token]);

  // Load User From LocalStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  // Login Function
  const login = async (email, password) => {
    try {
      const response = await axios.post(
        `${API_URL}/auth/login`,
        {
          email,
          password,
        }
      );

      const data = response.data;

      // Save token
      localStorage.setItem("token", data.token);

      // Save user
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      // Update state
      setToken(data.token);
      setUser(data.user);

      return {
        success: true,
        user: data.user,
      };

    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Login failed",
      };
    }
  };


  // Register Function
  const register = async (formData) => {
    try {
      const response = await axios.post(
        `${API_URL}/auth/register`,
        formData
      );

      return {
        success: true,
        data: response.data,
      };

    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Registration failed",
      };
    }
  };

  // Logout Function
  const logout = () => {
    // Remove from localStorage
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    // Clear state
    setToken(null);

    setUser(null);

    // Remove axios header
    delete axios.defaults.headers.common[
      "Authorization"
    ];
  };

  // Check Roles
  const isAdmin =
    user?.role === "ADMIN";

  const isUser =
    user?.role === "USER";

  const isStoreOwner =
    user?.role === "STORE_OWNER";

  // Context Value
  const value = {
    user,
    token,
    loading,

    login,
    register,
    logout,

    isAdmin,
    isUser,
    isStoreOwner,

    isAuthenticated: !!token,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};