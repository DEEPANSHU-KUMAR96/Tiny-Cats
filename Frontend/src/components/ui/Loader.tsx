import React from 'react';
export const CatPawSpinner: React.FC<{ size?: number; text?: string }> = ({ 
  size = 64, 
  text = 'Consulting AI whiskers...' 
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="relative animate-[paw-spin_2s_ease-in-out_infinite] mb-4" style={{ width: size, height: size }}>
        <svg className="text-[#FF6B9D] w-full h-full" viewBox="0 0 100 100" fill="currentColor">
          {/* Main Pad */}
          <path d="M50 45 C38 45, 30 54, 30 65 C30 76, 38 85, 50 85 C62 85, 70 76, 70 65 C70 54, 62 45, 50 45 Z" />
          {/* Toes */}
          <circle cx="26" cy="37" r="10" />
          <circle cx="42" cy="21" r="10" />
          <circle cx="58" cy="21" r="10" />
          <circle cx="74" cy="37" r="10" />
        </svg>
      </div>
      {text && <p className="text-[#C9184A] font-semibold text-lg animate-pulse">{text}</p>}
    </div>
  );
};
export const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl p-6 border border-pink-100/50 shadow-[0_8px_32px_rgba(255,107,157,0.15)] animate-pulse flex flex-col h-full">
      {/* Image Skeleton */}
      <div className="bg-pink-50 rounded-2xl w-full aspect-[4/3] mb-4"></div>
      
      {/* Title Skeleton */}
      <div className="h-6 bg-pink-100 rounded-full w-2/3 mb-2"></div>
      
      {/* Subtitle Skeleton */}
      <div className="h-4 bg-pink-50 rounded-full w-1/2 mb-4"></div>
      
      {/* Details Skeleton */}
      <div className="space-y-2 mb-4 flex-grow">
        <div className="h-3 bg-pink-50/50 rounded-full w-full"></div>
        <div className="h-3 bg-pink-50/50 rounded-full w-5/6"></div>
      </div>
      
      {/* Footer Skeleton */}
      <div className="flex items-center justify-between pt-2 border-t border-pink-50">
        <div className="h-6 bg-pink-100 rounded-full w-1/4"></div>
        <div className="flex space-x-2">
          <div className="h-6 w-6 bg-pink-50 rounded-full"></div>
          <div className="h-6 w-6 bg-pink-50 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};
export const SkeletonGrid: React.FC<{ count?: number }> = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
};