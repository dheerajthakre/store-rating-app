import React from 'react'
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

// Custom Auth Hook
function useAuth () {
  const context = useContext(AuthContext);

  // Check if used inside AuthProvider
  if (!context) {
    throw new Error(
      "useAuth must be used within AuthProvider"
    );
  }

  return context;
};

export default useAuth;