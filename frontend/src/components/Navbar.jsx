import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Navbar () {
  const navigate = useNavigate();

  const {
    user,
    logout,
    isAuthenticated,
    isAdmin,
    isUser,
    isStoreOwner,
  } = useAuth();

  // Handle Logout
  const handleLogout = () => {
    logout();

    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white shadow-lg">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-blue-400"
        >
          Store Rating
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-6">

          {isAuthenticated && isAdmin && (
            <Link
              to="/admin"
              className="hover:text-blue-400 transition"
            >
              Admin Dashboard
            </Link>
          )}

          {isAuthenticated && isUser && (
            <Link
              to="/stores"
              className="hover:text-blue-400 transition"
            >
              Stores
            </Link>
          )}

          {isAuthenticated &&
            isStoreOwner && (
              <Link
                to="/owner-dashboard"
                className="hover:text-blue-400 transition"
              >
                Owner Dashboard
              </Link>
            )}

          {/* User Info */}
          {isAuthenticated ? (
            <div className="flex items-center gap-4">

              <span className="font-medium">
                {user?.name}
              </span>

              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition"
              >
                Logout
              </button>

            </div>
          ) : (
            <div className="flex gap-4">

              <Link
                to="/login"
                className="hover:text-blue-400"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition"
              >
                Register
              </Link>

            </div>
          )}

        </div>

      </div>

    </nav>
  );
};

export default Navbar;