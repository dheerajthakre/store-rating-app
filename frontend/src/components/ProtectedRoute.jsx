import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function ProtectedRoute ({ children, allowedRoles }) {
  const { user, isAuthenticated } = useAuth();

  // User not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Role not allowed
  if (
    allowedRoles &&
    !allowedRoles.includes(user.role)
  ) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;