// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user')); // Check if the user is logged in

  if (!user) {
    // Redirect to login if no user is found in localStorage
    return <Navigate to="/login" />;
  }

  return children; // If user is logged in, render the protected route
};

export default ProtectedRoute;
