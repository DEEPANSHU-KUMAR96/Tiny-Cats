import React, { useState } from 'react';
interface CatImageProps {
  src?: string;
  alt: string;
  className?: string;
}
export const CatImage: React.FC<CatImageProps> = ({ src, alt, className = '' }) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const handleImageLoad = () => {
    setIsLoading(false);
  };
  const handleImageError = () => {
    setHasError(true);
    setIsLoading(false);
  };
  if (!src || hasError) {
    return (
      <div className={`relative flex items-center justify-center bg-gradient-to-tr from-[#FFF0F6] to-[#FFD3E2] overflow-hidden ${className}`}>
        <svg className="w-1/2 h-1/2 min-w-[48px] text-[#FF8FAB]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Ears */}
          <path d="M30 35 L12 8 L28 20 Z" fill="#FF8FAB" />
          <path d="M30 35 L16 14 L24 21 Z" fill="#C9184A" opacity="0.6" />
          
          <path d="M70 35 L88 8 L72 20 Z" fill="#FF8FAB" />
          <path d="M70 35 L84 14 L76 21 Z" fill="#C9184A" opacity="0.6" />
          {/* Head & Body */}
          <circle cx="50" cy="50" r="28" fill="#FFFFFF" shadow="0 4px 10px rgba(0,0,0,0.05)" />
          
          {/* Cheeks blush */}
          <circle cx="36" cy="54" r="5" fill="#FFD3E2" />
          <circle cx="64" cy="54" r="5" fill="#FFD3E2" />
          {/* Eyes */}
          <circle cx="42" cy="46" r="3.5" fill="#1A0A10" />
          <circle cx="58" cy="46" r="3.5" fill="#1A0A10" />
          <circle cx="43.5" cy="44.5" r="1" fill="#FFFFFF" />
          <circle cx="59.5" cy="44.5" r="1" fill="#FFFFFF" />
          {/* Nose */}
          <polygon points="50,53 46,49 54,49" fill="#FF6B9D" />
          {/* Mouth */}
          <path d="M46 56 C48 58 50 58 50 56 C50 58 52 58 54 56" stroke="#1A0A10" strokeWidth="2.5" strokeLinecap="round" />
          {/* Whiskers */}
          <line x1="26" y1="52" x2="14" y2="49" stroke="#FF8FAB" strokeWidth="2" strokeLinecap="round" />
          <line x1="26" y1="56" x2="12" y2="56" stroke="#FF8FAB" strokeWidth="2" strokeLinecap="round" />
          <line x1="74" y1="52" x2="86" y2="49" stroke="#FF8FAB" strokeWidth="2" strokeLinecap="round" />
          <line x1="74" y1="56" x2="88" y2="56" stroke="#FF8FAB" strokeWidth="2" strokeLinecap="round" />
          {/* Paw Prints Decorative */}
          <path d="M20 78 C20 74 24 74 24 78 C24 82 20 82 20 78 Z M16 82 C16 80 18 80 18 82 C18 84 16 84 16 82 Z" fill="#FF6B9D" opacity="0.3" />
        </svg>
        <span className="absolute bottom-3 text-xs font-semibold text-[#C9184A]/60 tracking-wider">TINY-CATS 🐱</span>
      </div>
    );
  }
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-pink-50 animate-pulse flex items-center justify-center">
          <span className="text-xl">🐱</span>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        onLoad={handleImageLoad}
        onError={handleImageError}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
      />
    </div>
  );
};
