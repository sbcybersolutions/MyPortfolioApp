import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// ProtectedRoute now accepts a requiredRole prop
const ProtectedRoute = ({ children, requiredRole }) => { // <-- ADDED requiredRole
  const { isAuthenticated, user } = useAuth(); // Get isAuthenticated and user object

  if (!isAuthenticated) {
    // If not authenticated, redirect to login
    return <Navigate to="/login" replace />;
  }

  // If a requiredRole is specified, check if the user has that role
  if (requiredRole && (!user || user.role !== requiredRole)) { // <-- NEW ROLE CHECK
    // If authenticated but doesn't have the required role, redirect to a forbidden page or home
    // For simplicity, let's redirect to home for now, or display an error
    return <Navigate to="/" replace />; // Or to a /forbidden page
  }

  // If authenticated and (if applicable) has the required role, render children
  return children;
};

export default ProtectedRoute;