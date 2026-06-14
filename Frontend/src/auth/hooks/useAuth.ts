import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import type { IAuthContext } from '../types/auth.types';

/**
 * Custom hook to access the AuthContext.
 * Throws if used outside of an AuthProvider.
 */
export const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
