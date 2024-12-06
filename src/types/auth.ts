export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}