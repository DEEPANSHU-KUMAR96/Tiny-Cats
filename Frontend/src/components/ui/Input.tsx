import React, { type InputHTMLAttributes } from 'react';
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  icon?: React.ReactNode;
}
export const Input: React.FC<InputProps> = ({
  error,
  icon,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full">
      <div className="relative flex items-center">
        {icon && (
          <div className="absolute left-4 text-pink-400 pointer-events-none flex items-center justify-center">
            {icon}
          </div>
        )}
        <input
          className={`w-full bg-white text-[#1A0A10] border-2 border-pink-100 rounded-2xl py-3 px-4 ${
            icon ? 'pl-12' : ''
          } focus:outline-none focus:border-[#FF6B9D] focus:ring-4 focus:ring-[#FF6B9D]/15 placeholder-pink-300 transition-all duration-300 font-medium ${
            error ? 'border-red-400 focus:border-red-400 focus:ring-red-400/15' : ''
          } ${className}`}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1.5 text-xs font-semibold text-red-500 pl-2">
          {error}
        </p>
      )}
    </div>
  );
};
