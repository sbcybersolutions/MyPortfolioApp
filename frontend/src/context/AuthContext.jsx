import React, { createContext, useState, useEffect, useContext } from 'react';

// Create the Auth Context
const AuthContext = createContext(null);

// Create the Auth Provider component
export const AuthProvider = ({ children }) => {
  // Initialize state from localStorage on first load
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      return null;
    }
  });
  const [authToken, setAuthToken] = useState(() => localStorage.getItem('authToken') || null);

  // Effect to update localStorage whenever user or authToken changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
    if (authToken) {
      localStorage.setItem('authToken', authToken);
    } else {
      localStorage.removeItem('authToken');
    }
  }, [user, authToken]);

  // Login function: updates state and localStorage
  const login = (userData, token) => {
    setUser(userData);
    setAuthToken(token);
    // Note: localStorage is updated via useEffect
  };

  // Logout function: clears state and localStorage
  const logout = () => {
    setUser(null);
    setAuthToken(null);
    // Note: localStorage is updated via useEffect
  };

  // Value provided to consumers of this context
  const authContextValue = {
    user,
    authToken,
    isAuthenticated: !!user && !!authToken, // Check if both user data and token exist
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to easily consume the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};