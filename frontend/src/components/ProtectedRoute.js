import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const user = JSON.parse(localStorage.getItem('user')); // or check for token

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <Component {...props} /> // If user is authenticated, render the component
        ) : (
          <Redirect to="/login" /> // If not authenticated, redirect to login page
        )
      }
    />
  );
};

export default ProtectedRoute;
