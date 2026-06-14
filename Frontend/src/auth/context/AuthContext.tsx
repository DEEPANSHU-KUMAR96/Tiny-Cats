import React, { createContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { IAuthContext, IUser } from '../types/auth.types';
import * as authService from '../services/auth.service';
import axios from 'axios';

const TOKEN_KEY = 'tiny_cats_auth_token';

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem(TOKEN_KEY)
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const isAuthenticated = !!token && !!user;

  /** Persist or clear token in localStorage */
  const persistToken = useCallback((newToken: string | null) => {
    if (newToken) {
      localStorage.setItem(TOKEN_KEY, newToken);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
    setToken(newToken);
  }, []);

  /** On mount, try to restore user session from stored token */
  useEffect(() => {
    const restoreSession = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }
      try {
        const profileRes = await authService.getProfile(token);
        if (profileRes.success && profileRes.data) {
          setUser(profileRes.data);
        } else {
          // Token invalid — clear it
          persistToken(null);
          setUser(null);
        }
      } catch {
        persistToken(null);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    restoreSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Login: call API, store token + user */
  const login = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true);
      try {
        const res = await authService.loginUser(email, password);
        if (res.success && res.data) {
          persistToken(res.data.token);
          setUser(res.data.user);
        } else {
          throw new Error(res.message || 'Login failed');
        }
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          const serverMessage =
            (err.response?.data as { message?: string })?.message ||
            err.message;
          throw new Error(serverMessage);
        }
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [persistToken]
  );

  /** Register: call API, store token + user */
  const register = useCallback(
    async (name: string, email: string, password: string, mobile: string) => {
      setIsLoading(true);
      try {
        const res = await authService.registerUser(name, email, password, mobile);
        if (res.success && res.data) {
          persistToken(res.data.token);
          setUser(res.data.user);
        } else {
          throw new Error(res.message || 'Registration failed');
        }
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          const serverMessage =
            (err.response?.data as { message?: string })?.message ||
            err.message;
          throw new Error(serverMessage);
        }
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [persistToken]
  );

  /** Logout: call API, clear state */
  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      if (token) {
        await authService.logoutUser(token);
      }
    } catch {
      // Even if backend logout fails, clear local state
    } finally {
      persistToken(null);
      setUser(null);
      setIsLoading(false);
    }
  }, [token, persistToken]);

  const value: IAuthContext = {
    user,
    token,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
