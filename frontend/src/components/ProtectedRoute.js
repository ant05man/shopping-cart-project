import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Check if the user is logged in (i.e., token exists)
  
  // If there's no token (user isn't logged in), redirect them to the login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If there's a token (user is logged in), render the child component (e.g., Checkout)
  return children;
};

export default ProtectedRoute;
