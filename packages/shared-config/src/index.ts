// Minimal shared config for BMAD testing
import React from 'react';

// Basic AppProvider stub
export const AppProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  return React.createElement(React.Fragment, null, children);
};

export const useAppConfig = () => ({
  apiUrl: process.env.VITE_API_URL || '/api',
  environment: process.env.NODE_ENV || 'development'
});

// Auth stubs
export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  return React.createElement(React.Fragment, null, children);
};

export const useAuth = () => ({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {}
});

// Theme stubs  
export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  return React.createElement(React.Fragment, null, children);
};

export const useTheme = () => ({
  theme: 'light',
  toggleTheme: () => {}
});

// Navigation stubs
export const NavigationProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  return React.createElement(React.Fragment, null, children);
};

export const useNavigation = () => ({
  currentPath: '/',
  navigate: () => {}
});