import React, { type ButtonHTMLAttributes } from 'react';
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline';
  fullWidth?: boolean;
}
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseStyle = 'inline-flex items-center justify-center font-semibold rounded-2xl py-3 px-6 transition-all duration-300 transform active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FF6B9D] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none';
  
  const variants = {
    primary: 'bg-[#FF6B9D] text-white hover:bg-[#C9184A] shadow-[0_4px_14px_rgba(255,107,157,0.4)] hover:shadow-[0_6px_20px_rgba(255,107,157,0.6)] hover:-translate-y-0.5',
    secondary: 'bg-[#FF8FAB] text-white hover:bg-[#FF6B9D] shadow-[0_4px_14px_rgba(255,143,171,0.3)] hover:shadow-[0_6px_20px_rgba(255,143,171,0.5)] hover:-translate-y-0.5',
    accent: 'bg-[#C9184A] text-white hover:bg-[#1A0A10] shadow-[0_4px_14px_rgba(201,24,74,0.4)] hover:shadow-[0_6px_20px_rgba(201,24,74,0.6)] hover:-translate-y-0.5',
    outline: 'border-2 border-[#FF6B9D] text-[#FF6B9D] hover:bg-[#FFF0F6] hover:-translate-y-0.5',
  };
  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
