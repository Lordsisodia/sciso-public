import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { AuthState, User, Session } from '@shared/types';

interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (user: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    // Check for existing session on mount
    checkExistingSession();
  }, []);

  const checkExistingSession = async () => {
    try {
      const storedSession = localStorage.getItem('siso_session');
      if (storedSession) {
        const session: Session = JSON.parse(storedSession);
        if (session.expires_at > Date.now()) {
          setAuthState({
            user: session.user,
            session,
            loading: false,
            error: null,
          });
          return;
        } else {
          localStorage.removeItem('siso_session');
        }
      }
    } catch (error) {
      console.error('Session check failed:', error);
    }
    
    setAuthState(prev => ({ ...prev, loading: false }));
  };

  const login = async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      // Simulate API call - replace with actual authentication
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      if (!response.ok) {
        throw new Error('Login failed');
      }
      
      const { data: session }: { data: Session } = await response.json();
      
      localStorage.setItem('siso_session', JSON.stringify(session));
      
      setAuthState({
        user: session.user,
        session,
        loading: false,
        error: null,
      });
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Login failed',
      }));
      throw error;
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem('siso_session');
      setAuthState({
        user: null,
        session: null,
        loading: false,
        error: null,
      });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const updateUser = (userUpdate: Partial<User>) => {
    setAuthState(prev => ({
      ...prev,
      user: prev.user ? { ...prev.user, ...userUpdate } : null,
    }));
  };

  const value: AuthContextValue = {
    ...authState,
    login,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
