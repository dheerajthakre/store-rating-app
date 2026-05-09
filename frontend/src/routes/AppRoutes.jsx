import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Login from "../pages/Login";
import Register from "../pages/Signup";
import AdminDashboard from "../pages/AdminDashboard";
import UserDashboard from "../pages/UserDashboard";
import OwnerDashboard from "../pages/OwnerDashboard";
import ProtectedRoute from "../components/ProtectedRoute";
import useAuth from "../hooks/useAuth";

// Home Redirect Component
const HomeRedirect = () => {
  const {
    isAuthenticated,
    isAdmin,
    isUser,
    isStoreOwner,
  } = useAuth();

  // Not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Redirect based on role
  if (isAdmin) {
    return <Navigate to="/admin" />;
  }

  if (isUser) {
    return <Navigate to="/stores" />;
  }

  if (isStoreOwner) {
    return (
      <Navigate to="/owner-dashboard" />
    );
  }

  return <Navigate to="/login" />;
};


// App Routes
function AppRoutes () {
  return (
    <BrowserRouter>

      {/* Navbar */}
      <Navbar />

      <Routes>

        {/* Home */}
        <Route
          path="/"
          element={<HomeRedirect />}
        />

        {/* Login */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Register */}
        <Route
          path="/register"
          element={<Register />}
        />

        {/* ADMIN ROUTES */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute
              allowedRoles={["ADMIN"]}
            >
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* USER ROUTES */}
        <Route
          path="/stores"
          element={
            <ProtectedRoute
              allowedRoles={["USER"]}
            >
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        {/* STORE OWNER ROUTES */}
        <Route
          path="/owner-dashboard"
          element={
            <ProtectedRoute
              allowedRoles={[
                "STORE_OWNER",
              ]}
            >
              <OwnerDashboard />
            </ProtectedRoute>
          }
        />

        {/* 404 PAGE */}
        <Route
          path="*"
          element={
            <div className="flex items-center justify-center min-h-screen text-3xl font-bold">
              404 Page Not Found
            </div>
          }
        />

      </Routes>

    </BrowserRouter>
  );
};

export default AppRoutes;