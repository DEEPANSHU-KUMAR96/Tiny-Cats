import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * Wraps child routes and redirects to /login when unauthenticated.
 * Displays a branded loading spinner while the auth state initialises.
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFF0F6] via-[#FFE0EB] to-[#FFD6E0]">
        <div className="flex flex-col items-center gap-4 animate-[fade-in_0.3s_ease-out_forwards]">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FF6B9D] to-[#C9184A] flex items-center justify-center shadow-[0_8px_24px_rgba(255,107,157,0.3)]">
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          </div>
          <p className="text-sm font-semibold text-[#FF6B9D]">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Preserve the attempted URL so we can redirect after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
