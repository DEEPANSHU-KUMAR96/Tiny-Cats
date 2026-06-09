import React from 'react';
import { NavLink } from 'react-router-dom';
export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-pink-100 py-8 px-6 mt-16 text-center text-[#1A0A10]/60 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <span className="text-xl">🐱</span>
          <span className="font-bold bg-gradient-to-r from-[#FF6B9D] to-[#C9184A] bg-clip-text text-transparent">
            Tiny-Cats
          </span>
        </div>
        {/* Links */}
        <div className="flex gap-6 text-sm font-semibold">
          <NavLink to="/" className="hover:text-[#FF6B9D] transition-colors">Home</NavLink>
          <NavLink to="/cats" className="hover:text-[#FF6B9D] transition-colors">Explore Cats</NavLink>
          <NavLink to="/ai-recommend" className="hover:text-[#FF6B9D] transition-colors">AI Recommendations</NavLink>
        </div>
        {/* Copy */}
        <div className="text-xs text-[#1A0A10]/40">
          <p>© {new Date().getFullYear()} Tiny-Cats. Handcrafted with love and catnip.</p>
        </div>
      </div>
    </footer>
  );
};