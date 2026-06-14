import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, LogIn, Loader2 } from 'lucide-react';

interface LoginFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
  error: string | null;
}

interface FormErrors {
  email?: string;
  password?: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const errors: FormErrors = {};
    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      await onSubmit(email, password);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Server Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm font-medium px-4 py-3 rounded-xl flex items-start gap-2 animate-[fade-in_0.3s_ease-out_forwards]">
          <span className="shrink-0 mt-0.5">⚠️</span>
          <span>{error}</span>
        </div>
      )}

      {/* Email Field */}
      <div>
        <label
          htmlFor="login-email"
          className="block text-sm font-semibold text-[#1A0A10]/70 mb-1.5"
        >
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#FF8FAB]" />
          <input
            id="login-email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (formErrors.email) setFormErrors((p) => ({ ...p, email: undefined }));
            }}
            placeholder="you@example.com"
            className={`w-full pl-11 pr-4 py-3 rounded-xl border ${
              formErrors.email
                ? 'border-red-300 focus:ring-red-200'
                : 'border-pink-200 focus:ring-[#FF6B9D]/20'
            } bg-white/70 text-[#1A0A10] placeholder:text-[#1A0A10]/30 text-sm font-medium outline-none focus:ring-2 focus:border-[#FF6B9D] transition-all duration-300`}
            autoComplete="email"
          />
        </div>
        {formErrors.email && (
          <p className="text-red-500 text-xs font-medium mt-1.5 ml-1 animate-[fade-in_0.2s_ease-out_forwards]">
            {formErrors.email}
          </p>
        )}
      </div>

      {/* Password Field */}
      <div>
        <label
          htmlFor="login-password"
          className="block text-sm font-semibold text-[#1A0A10]/70 mb-1.5"
        >
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#FF8FAB]" />
          <input
            id="login-password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (formErrors.password) setFormErrors((p) => ({ ...p, password: undefined }));
            }}
            placeholder="••••••••"
            className={`w-full pl-11 pr-12 py-3 rounded-xl border ${
              formErrors.password
                ? 'border-red-300 focus:ring-red-200'
                : 'border-pink-200 focus:ring-[#FF6B9D]/20'
            } bg-white/70 text-[#1A0A10] placeholder:text-[#1A0A10]/30 text-sm font-medium outline-none focus:ring-2 focus:border-[#FF6B9D] transition-all duration-300`}
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#FF8FAB] hover:text-[#FF6B9D] transition-colors cursor-pointer p-0.5"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
        {formErrors.password && (
          <p className="text-red-500 text-xs font-medium mt-1.5 ml-1 animate-[fade-in_0.2s_ease-out_forwards]">
            {formErrors.password}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#FF6B9D] to-[#C9184A] text-white font-bold text-sm tracking-wide shadow-[0_8px_24px_rgba(255,107,157,0.3)] hover:shadow-[0_12px_32px_rgba(255,107,157,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-[0_8px_24px_rgba(255,107,157,0.3)] cursor-pointer"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Signing in...</span>
          </>
        ) : (
          <>
            <LogIn className="w-5 h-5" />
            <span>Sign In</span>
          </>
        )}
      </button>

      {/* Register Link */}
      <p className="text-center text-sm text-[#1A0A10]/50 font-medium">
        Don't have an account?{' '}
        <Link
          to="/register"
          className="text-[#FF6B9D] hover:text-[#C9184A] font-bold transition-colors underline underline-offset-2"
        >
          Create one 🐾
        </Link>
      </p>
    </form>
  );
};
