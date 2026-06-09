// src/components/ui/CatImage.tsx
import { useState } from "react";

interface CatImageProps {
  src?: string;
  alt: string;
  className?: string;
}

export const CatImage = ({ src, alt, className }: CatImageProps) => {
  const [error, setError] = useState(false);

  // Agar image undefined ya error ho toh SVG placeholder dikhao
  if (!src || error) {
    return (
      <div className={`${className} bg-pink-50 flex flex-col items-center justify-center w-full h-full`}>
        <span className="text-5xl">🐱</span>
        <span className="text-xs text-[#FF6B9D] font-semibold mt-2 tracking-widest">TINY-CATS</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setError(true)} // ✅ broken image pe placeholder show hoga
      className={`${className} object-cover w-full h-full`}
    />
  );
};

export default CatImage;