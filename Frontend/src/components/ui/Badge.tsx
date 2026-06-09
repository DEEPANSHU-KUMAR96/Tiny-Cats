import React from 'react';
interface BadgeProps {
  label: string;
  variant?: 'energy-low' | 'energy-medium' | 'energy-high' | 'primary' | 'secondary' | 'accent' | 'default';
  className?: string;
}
export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'default',
  className = '',
}) => {
  const baseStyle = 'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide border transition-all duration-300';
  
  const variants = {
    'energy-low': 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100',
    'energy-medium': 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100',
    'energy-high': 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100',
    primary: 'bg-pink-50 text-[#FF6B9D] border-pink-200 hover:bg-pink-100',
    secondary: 'bg-pink-50 text-[#FF8FAB] border-pink-100 hover:bg-pink-100/50',
    accent: 'bg-red-50 text-[#C9184A] border-red-200 hover:bg-red-100',
    default: 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100',
  };
  return (
    <span className={`${baseStyle} ${variants[variant]} ${className}`}>
      {label}
    </span>
  );
};