import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { AuthLayout } from '../components/AuthLayout';
import { LoginForm } from '../components/LoginForm';

export const LoginPage: React.FC = () => {
  const { login, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  // If already logged in, redirect to home
  if (isAuthenticated && !isLoading) {
    return <Navigate to="/" replace />;
  }

  const handleLogin = async (email: string, password: string) => {
    setError(null);
    try {
      await login(email, password);
      navigate('/', { replace: true });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <AuthLayout
      title="Welcome Back!"
      subtitle="Sign in to find your purrfect cat 🐾"
    >
      <LoginForm onSubmit={handleLogin} error={error} />
    </AuthLayout>
  );
};
