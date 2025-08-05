export interface User {
  id: string;
  name: string;
  lastName: string;
  email: string;
  cpf: string;
  institution: string;
  avatar: string | null;
  profile: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user?: User,
  access_token: string;
  refresh_token: string;
}