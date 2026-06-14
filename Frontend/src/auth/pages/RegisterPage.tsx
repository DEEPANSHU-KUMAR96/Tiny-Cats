import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { AuthLayout } from '../components/AuthLayout';
import { RegisterForm } from '../components/RegisterForm';

export const RegisterPage: React.FC = () => {
  const { register, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  // If already logged in, redirect to home
  if (isAuthenticated && !isLoading) {
    return <Navigate to="/" replace />;
  }

  const handleRegister = async (
    name: string,
    email: string,
    password: string,
    mobile: string
  ) => {
    setError(null);
    try {
      await register(name, email, password, mobile);
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
      title="Join Tiny-Cats"
      subtitle="Create your account to get started 🐱"
    >
      <RegisterForm onSubmit={handleRegister} error={error} />
    </AuthLayout>
  );
};
