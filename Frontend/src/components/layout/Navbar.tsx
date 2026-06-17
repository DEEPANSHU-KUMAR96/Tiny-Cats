import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Cat, Sparkles, Menu, X, LogOut, HeartHandshake, Shield } from 'lucide-react';
import { useAuth } from '../../auth';

export const Navbar: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  const links = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/cats', label: 'Cats', icon: Cat },
    { to: '/ai-recommend', label: 'AI Recommend', icon: Sparkles },
    ...(isAuthenticated && user
      ? user.role === 'admin'
        ? [{ to: '/admin', label: 'Admin Dashboard', icon: Shield }]
        : [{ to: '/my-requests', label: 'My Requests', icon: HeartHandshake }]
      : [])
  ];

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <>
      {/* 1. Desktop Side Navbar (> 1024px) */}
      <aside className="hidden lg:flex flex-col fixed top-0 left-0 h-screen w-64 bg-white border-r border-pink-100 shadow-[0_8px_32px_rgba(255,107,157,0.08)] py-8 px-6 z-40">
        {/* Logo */}
        <div className="mb-10 px-2">
          <NavLink to="/" className="text-2xl font-bold tracking-tight bg-gradient-to-r from-[#FF6B9D] via-[#FF8FAB] to-[#C9184A] bg-clip-text text-transparent flex items-center gap-2">
            <span className="text-3xl">🐱</span> Tiny-Cats
          </NavLink>
        </div>
        {/* Navigation Links */}
        <nav className="flex-grow space-y-3">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-4 py-3.5 px-4 rounded-2xl font-semibold transition-all duration-300 group cursor-pointer ${
                  isActive
                    ? 'bg-[#FF6B9D] text-white shadow-[0_8px_24px_rgba(255,107,157,0.3)] hover:shadow-[0_12px_28px_rgba(255,107,157,0.45)]'
                    : 'text-[#1A0A10]/70 hover:bg-[#FFF0F6] hover:text-[#FF6B9D]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-white' : 'text-[#FF6B9D]'}`} />
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* User Profile & Logout section in desktop view */}
        {isAuthenticated && user && (
          <div className="mb-6 p-4 rounded-2xl bg-[#FFF0F6] border border-pink-100 flex flex-col gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-[#FF6B9D] flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-sm">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-[#1A0A10] truncate">{user.name}</p>
                <p className="text-[10px] text-[#1A0A10]/50 truncate">{user.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full py-2 px-3 rounded-xl bg-white hover:bg-pink-50 text-[#C9184A] hover:text-[#C9184A] border border-pink-100 hover:border-pink-200 transition-all font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        )}

        {/* Version / Copyright Info */}
        <div className="text-xs text-[#1A0A10]/40 text-center border-t border-pink-50 pt-4">
          <p className="font-semibold">Tiny-Cats App v1.0</p>
          <p>© 2026 AI Cat Finder</p>
        </div>
      </aside>
      {/* 2. Tablet Top Navbar (640px to 1024px) */}
      <header className="hidden sm:flex lg:hidden sticky top-0 left-0 w-full bg-white/85 backdrop-blur-md border-b border-pink-100 shadow-[0_2px_15px_rgba(255,107,157,0.05)] py-4 px-6 items-center justify-between z-40">
        <NavLink to="/" className="text-xl font-bold bg-gradient-to-r from-[#FF6B9D] to-[#C9184A] bg-clip-text text-transparent flex items-center gap-2">
          <span>🐱</span> Tiny-Cats
        </NavLink>
        {/* Nav Links */}
        <nav className="flex items-center gap-6">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `relative py-1.5 px-1 font-semibold text-sm transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                  isActive ? 'text-[#FF6B9D]' : 'text-[#1A0A10]/70 hover:text-[#FF6B9D]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className="w-4 h-4 text-[#FF8FAB]" />
                  <span>{label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#FF6B9D] rounded-full animate-[fade-in_0.3s_ease-out_forwards]" />
                  )}
                </>
              )}
            </NavLink>
          ))}
          {/* Tablet Logout */}
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="py-1.5 px-3 rounded-xl bg-[#FFF0F6] hover:bg-pink-100 text-[#C9184A] font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          )}
        </nav>
      </header>
      {/* 3. Mobile Navigation Layout (< 640px) */}
      {/* Sticky top brand banner for Mobile */}
      <header className="flex sm:hidden sticky top-0 left-0 w-full bg-white/85 backdrop-blur-md border-b border-pink-100/50 py-3 px-4 items-center justify-between z-40">
        <NavLink to="/" className="text-lg font-bold bg-gradient-to-r from-[#FF6B9D] to-[#C9184A] bg-clip-text text-transparent flex items-center gap-1">
          <span>🐱</span> Tiny-Cats
        </NavLink>
        {/* Mobile Hamburger menu for additional navigation drawer */}
        <button
          onClick={toggleDrawer}
          className="text-[#FF6B9D] hover:text-[#C9184A] p-1.5 rounded-xl hover:bg-[#FFF0F6] transition-colors cursor-pointer"
        >
          <Menu className="w-6 h-6" />
        </button>
      </header>
      {/* Mobile drawer (Overlay navigation panel) */}
      {isDrawerOpen && (
        <div className="sm:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div onClick={toggleDrawer} className="fixed inset-0 bg-[#1A0A10]/40 backdrop-blur-sm" />
          
          {/* Drawer content */}
          <div className="relative flex flex-col w-64 max-w-xs h-full bg-white shadow-2xl p-6 animate-[slide-up_0.3s_ease-out_forwards] border-r border-pink-100 ml-auto sm:ml-0">
            <div className="flex items-center justify-between mb-8">
              <span className="font-bold text-[#FF6B9D] flex items-center gap-1.5 text-lg">
                <span>🐱</span> Tiny-Cats
              </span>
              <button
                onClick={toggleDrawer}
                className="p-1 rounded-xl text-gray-400 hover:text-[#FF6B9D] hover:bg-[#FFF0F6] transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="flex-grow space-y-4 flex flex-col">
              <div className="space-y-4 flex-grow animate-[slide-up_0.4s_ease-out_forwards]">
                {links.map(({ to, label, icon: Icon }) => (
                  <NavLink
                    key={to}
                    to={to}
                    onClick={toggleDrawer}
                    className={({ isActive }) =>
                      `flex items-center gap-4 py-3 px-4 rounded-2xl font-semibold transition-all duration-300 ${
                        isActive
                          ? 'bg-[#FF6B9D] text-white shadow-[0_8px_20px_rgba(255,107,157,0.25)]'
                          : 'text-[#1A0A10]/70 hover:bg-[#FFF0F6] hover:text-[#FF6B9D]'
                      }`
                    }
                  >
                    <Icon className="w-5 h-5 text-[#FF8FAB]" />
                    <span>{label}</span>
                  </NavLink>
                ))}
              </div>

              {/* Mobile Drawer Logout */}
              {isAuthenticated && user && (
                <div className="pt-4 border-t border-pink-50 flex flex-col gap-3 mt-auto">
                  <div className="px-2 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#FF6B9D] flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-sm">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-[#1A0A10] truncate">{user.name}</p>
                      <p className="text-xs text-[#1A0A10]/50 truncate">{user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      toggleDrawer();
                      handleLogout();
                    }}
                    className="w-full flex items-center gap-4 py-3 px-4 rounded-2xl font-semibold text-[#C9184A] hover:bg-[#FFF0F6] transition-all cursor-pointer"
                  >
                    <LogOut className="w-5 h-5 text-[#C9184A]" />
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </nav>
          </div>
        </div>
      )}
      {/* Mobile Bottom Navigation Bar (< 640px) */}
      <nav className="sm:hidden fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-lg border-t border-pink-100 shadow-[0_-8px_30px_rgba(255,107,157,0.12)] py-2 px-4 flex justify-around items-center z-40 pb-safe">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all duration-300 relative ${
                isActive 
                  ? 'text-[#C9184A] font-bold shadow-[0_0_15px_rgba(255,107,157,0.4)] bg-pink-50' 
                  : 'text-[#1A0A10]/60 hover:text-[#FF6B9D]'
              }`
            }
          >
            <Icon className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] tracking-wide font-medium">{label}</span>
          </NavLink>
        ))}
      </nav>
    </>
  );
};
