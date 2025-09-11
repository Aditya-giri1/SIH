import React, { createContext, useState, useContext } from 'react';

// 1. Create the context
const AuthContext = createContext(null);

// 2. Create the Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // The login function updates the user state
  const login = (userData) => {
    setUser(userData);
  };

  // The logout function clears the user state
  const logout = () => {
    setUser(null);
  };

  // Check if the user is authenticated
  const isAuthenticated = user !== null;

  // The value that will be available to all consumer components
  const value = {
    user,
    isAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 3. Create a custom hook to easily use the context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

