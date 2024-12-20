import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AuthState, User } from '../types/auth';
import { useNavigate } from 'react-router-dom';

interface AuthContextType extends AuthState {
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
  });

  const login = (user: User) => {
    setAuthState({
      isAuthenticated: true,
      user,
    });
    // Redirect based on user role
    navigate(user.role === 'bank' ? '/bank-dashboard' : '/tableau-de-bord');
  };

  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      user: null,
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