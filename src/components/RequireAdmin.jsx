import React from "react";
import { Navigate } from "react-router-dom";

const RequireAdmin = ({ children }) => {
  const isAuthenticated = localStorage.getItem("adminToken"); // ✅ token check

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RequireAdmin;
