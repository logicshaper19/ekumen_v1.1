export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'farmer' | 'bank';
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}