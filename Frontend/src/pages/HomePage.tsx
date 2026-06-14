import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Sparkles, LayoutGrid, Heart, ShieldCheck, HeartHandshake } from 'lucide-react';
import { useCats } from '../hooks/useCats';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { cats, fetchCats, loading } = useCats();

  useEffect(() => {
    fetchCats();
  }, [fetchCats]);

  const stats = [
    { label: 'Available Cat Breeds', value: loading ? '...' : String(new Set(cats.map(c => c.breed)).size || 12), icon: LayoutGrid },
    { label: 'Happy Adoptions', value: '450+', icon: Heart },
    { label: 'AI Recommendations', value: '1,200+', icon: Sparkles },
  ];

  const features = [
    {
      title: 'Smart Search',
      description: 'Quickly search and filter cats by name, breed, color, or traits with live debounced response.',
      icon: Search,
      to: '/cats',
      color: 'bg-pink-50 text-[#FF6B9D]',
    },
    {
      title: 'AI Matches',
      description: 'Answer questions about kids and apartment living to get immediate matches tailored for you.',
      icon: Sparkles,
      to: '/ai-recommend',
      color: 'bg-rose-50 text-[#C9184A]',
    },
    {
      title: 'Detailed Profiles',
      description: 'View full coat color, life expectancy, energy levels, and friendly badges before meeting.',
      icon: ShieldCheck,
      to: '/cats',
      color: 'bg-emerald-50 text-emerald-600',
    },
  ];

  return (
    <div className="page-transition w-full space-y-16">
      {/* 1. Hero Section with Animated Gradient Pink Background */}
      <section className="relative rounded-3xl overflow-hidden py-16 px-8 sm:px-12 md:py-24 md:px-16 text-center text-white bg-gradient-to-tr from-[#FF6B9D] via-[#FF8FAB] to-[#C9184A] shadow-[0_16px_48px_rgba(255,107,157,0.25)] border border-pink-100/10">
        {/* Animated ambient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.15),transparent)] animate-[pulse-glow_4s_infinite_alternate]" />
        
        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider uppercase border border-white/10">
            <Sparkles className="w-4 h-4 text-white animate-pulse" />
            Powered by GROQ AI
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-none text-white drop-shadow-sm">
            Find Your <span className="text-[#1A0A10]">Purrfect</span> Cat
          </h1>
          
          <p className="text-lg sm:text-xl text-white/90 font-medium max-w-2xl mx-auto leading-relaxed">
            Discover adorable feline companions and use smart AI matching algorithms to find the ideal kitten matching your lifestyle.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button
              variant="accent"
              onClick={() => navigate('/cats')}
              className="py-4 px-8 text-md font-bold bg-[#1A0A10] hover:bg-[#1A0A10]/80 shadow-lg"
            >
              Explore Cats 🐱
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigate('/ai-recommend')}
              className="py-4 px-8 text-md font-bold bg-white/20 text-white backdrop-blur-md hover:bg-white/40 shadow-lg border border-white/30"
            >
              AI Recommend ✨
            </Button>
          </div>
        </div>
      </section>

      {/* 2. Features Section */}
      <section className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-3xl font-bold text-[#1A0A10]">Core Features</h2>
          <p className="text-[#1A0A10]/60 font-medium">Simplify your companion search with tools designed to matching you with your ideal kitten.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <Card
                key={feat.title}
                onClick={() => navigate(feat.to)}
                className="cursor-pointer group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${feat.color} font-bold shadow-sm`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1A0A10] group-hover:text-[#FF6B9D] transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-[#1A0A10]/60 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
                <div className="pt-6 text-sm font-bold text-[#FF6B9D] group-hover:translate-x-1.5 transition-transform flex items-center gap-1.5 mt-auto">
                  Try it now ➔
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* 3. Stats Section */}
      <section className="bg-white rounded-3xl p-8 border border-pink-100/50 shadow-[0_8px_32px_rgba(255,107,157,0.1)]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-pink-100/80">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="flex flex-col items-center text-center p-4 first:pt-0 md:first:pt-4">
                <div className="p-3 bg-[#FFF0F6] rounded-full text-[#FF6B9D] mb-3 shadow-inner">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-3xl sm:text-4xl font-black text-[#1A0A10] tracking-tight">
                  {stat.value}
                </span>
                <span className="text-sm font-semibold text-[#1A0A10]/50 mt-1">
                  {stat.label}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Cute Cat CTA banner */}
      <section className="bg-pink-50 rounded-3xl p-8 border border-pink-100 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-white rounded-2xl text-[#FF6B9D] shadow-sm">
            <HeartHandshake className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#1A0A10]">Ready to adopt a new family member?</h3>
            <p className="text-sm text-[#1A0A10]/60">Every cat deserves a cozy home and warm treats. Browse our lists today!</p>
          </div>
        </div>
        <Button variant="primary" onClick={() => navigate('/cats')} className="whitespace-nowrap cursor-pointer">
          See All Cats 🐾
        </Button>
      </section>
    </div>
  );
};
