import axiosInstance from '../../api/axiosInstance';
import type {
  AuthResponse,
  ProfileResponse,
  LogoutResponse,
} from '../types/auth.types';

const AUTH_BASE = '/api/auth';

/**
 * Calls POST /api/auth/login
 */
export const loginUser = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>(
    `${AUTH_BASE}/login`,
    { email, password }
  );
  return response.data;
};

/**
 * Calls POST /api/auth/register
 */
export const registerUser = async (
  name: string,
  email: string,
  password: string,
  mobile: string
): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>(
    `${AUTH_BASE}/register`,
    { name, email, password, mobile }
  );
  return response.data;
};

/**
 * Calls POST /api/auth/logout
 */
export const logoutUser = async (token: string): Promise<LogoutResponse> => {
  const response = await axiosInstance.post<LogoutResponse>(
    `${AUTH_BASE}/logout`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

/**
 * Calls GET /api/auth/profile
 */
export const getProfile = async (token: string): Promise<ProfileResponse> => {
  const response = await axiosInstance.get<ProfileResponse>(
    `${AUTH_BASE}/profile`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};
