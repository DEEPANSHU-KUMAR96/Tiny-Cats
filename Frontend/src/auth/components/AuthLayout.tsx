import React from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
}) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#FFF0F6] via-[#FFE0EB] to-[#FFD6E0] px-4 py-8 relative overflow-hidden">
      {/* Decorative floating paw prints */}
      <div className="absolute top-[10%] left-[8%] text-4xl opacity-10 animate-[pulse-glow_3s_infinite_alternate] pointer-events-none select-none" aria-hidden="true">
        🐾
      </div>
      <div className="absolute top-[25%] right-[12%] text-5xl opacity-8 animate-[pulse-glow_4s_infinite_alternate] pointer-events-none select-none" aria-hidden="true">
        🐾
      </div>
      <div className="absolute bottom-[15%] left-[15%] text-3xl opacity-10 animate-[pulse-glow_3.5s_infinite_alternate] pointer-events-none select-none" aria-hidden="true">
        🐾
      </div>
      <div className="absolute bottom-[30%] right-[8%] text-4xl opacity-6 animate-[pulse-glow_5s_infinite_alternate] pointer-events-none select-none" aria-hidden="true">
        🐾
      </div>
      <div className="absolute top-[60%] left-[5%] text-2xl opacity-8 animate-[pulse-glow_2.5s_infinite_alternate] pointer-events-none select-none" aria-hidden="true">
        ✨
      </div>
      <div className="absolute top-[5%] right-[30%] text-2xl opacity-8 animate-[pulse-glow_3s_infinite_alternate] pointer-events-none select-none" aria-hidden="true">
        ✨
      </div>

      {/* Auth Card */}
      <div className="relative w-full max-w-md animate-[slide-up_0.5s_cubic-bezier(0.16,1,0.3,1)_forwards]">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_32px_rgba(255,107,157,0.15)] border border-pink-100/50 p-8 sm:p-10">
          {/* Logo & Branding */}
          <div className="text-center mb-8">
            <Link
              to="/"
              className="inline-block group"
            >
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#FF6B9D] to-[#C9184A] flex items-center justify-center shadow-[0_8px_24px_rgba(255,107,157,0.3)] group-hover:shadow-[0_12px_32px_rgba(255,107,157,0.45)] transition-all duration-300 group-hover:scale-105">
                <span className="text-4xl leading-none select-none">🐱</span>
              </div>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#FF6B9D] via-[#FF8FAB] to-[#C9184A] bg-clip-text text-transparent mb-1">
              {title}
            </h1>
            <p className="text-sm text-[#1A0A10]/50 font-medium">
              {subtitle}
            </p>
          </div>

          {/* Form Content */}
          {children}
        </div>

        {/* Bottom decorative accent */}
        <div className="mt-6 text-center text-xs text-[#1A0A10]/30 font-medium">
          <span>🐾 Tiny-Cats · Find Your Purrfect Cat 🐾</span>
        </div>
      </div>
    </div>
  );
};
