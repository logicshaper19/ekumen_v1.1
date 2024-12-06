import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AuthState, LoginCredentials } from '../types/auth';
import { useNavigate } from 'react-router-dom';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    email: null,
  });

  const login = (credentials: LoginCredentials) => {
    setAuthState({
      isAuthenticated: true,
      email: credentials.email,
    });
    navigate('/dashboard/declarations');
  };

  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      email: null,
    });
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}