import React from "react";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const token = userData?.token;

  // If no token, redirect to /signin
  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  // Otherwise, render the children (protected page)
  return children;
};