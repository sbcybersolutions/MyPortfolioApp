import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
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

  // Login function: now accepts userData which should include role
  const login = (userData, token) => {
    setUser(userData); // userData should now contain _id, username, and role
    setAuthToken(token);
  };

  const logout = () => {
    setUser(null);
    setAuthToken(null);
  };

  const authContextValue = {
    user,
    authToken,
    isAuthenticated: !!user && !!authToken,
    isAdmin: user?.role === 'admin', // NEW: Check if the user is an admin
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};