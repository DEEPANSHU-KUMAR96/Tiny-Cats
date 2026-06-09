import React, { type HTMLAttributes } from 'react';
interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}
export const Card: React.FC<CardProps> = ({
  children,
  hoverEffect = true,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`bg-white rounded-3xl p-6 border border-pink-100/50 
        ${hoverEffect 
          ? 'shadow-[0_8px_32px_rgba(255,107,157,0.15)] hover:shadow-[0_16px_48px_rgba(255,107,157,0.30)] hover:scale-[1.03] transition-all duration-300 hover:border-pink-200' 
          : 'shadow-[0_8px_32px_rgba(255,107,157,0.15)]'
        } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
