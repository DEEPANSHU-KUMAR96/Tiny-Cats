// Auth module barrel exports
export { AuthProvider } from './context/AuthContext';
export { useAuth } from './hooks/useAuth';
export { ProtectedRoute } from './components/ProtectedRoute';
export { LoginPage } from './pages/LoginPage';
export { RegisterPage } from './pages/RegisterPage';
export type {
  IUser,
  IAuthContext,
  LoginPayload,
  RegisterPayload,
  AuthResponse,
} from './types/auth.types';
