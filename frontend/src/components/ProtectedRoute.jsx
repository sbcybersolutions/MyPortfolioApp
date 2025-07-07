import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import useAuth hook

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth(); // Get authentication status from context

  if (!isAuthenticated) {
    // If not authenticated, redirect them to the login page.
    // The 'replace' prop ensures that the user can't go back to the protected page via browser back button.
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the children components (the protected content)
  return children;
};

export default ProtectedRoute;