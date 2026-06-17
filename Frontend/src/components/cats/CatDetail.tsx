import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Building2, ShieldAlert } from 'lucide-react';
import type { ICat } from '../../types/cats.types';
import { Badge } from '../ui/Badge';
import { CatImage } from '../ui/CatImage';
import { AdoptButton } from '../../adoption/components/AdoptButton';
interface CatDetailProps {
  cat: ICat;
}
export const CatDetail: React.FC<CatDetailProps> = ({ cat }) => {
  const navigate = useNavigate();
  const getEnergyVariant = (level: string) => {
    const norm = level.toLowerCase();
    if (norm === 'low') return 'energy-low';
    if (norm === 'high') return 'energy-high';
    return 'energy-medium';
  };
  return (
    <div className="max-w-4xl mx-auto py-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-[#FF6B9D] hover:text-[#C9184A] font-semibold transition-all duration-300 transform hover:-translate-x-1 cursor-pointer bg-white py-2.5 px-5 rounded-2xl shadow-[0_4px_16px_rgba(255,107,157,0.08)] border border-pink-100/50"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Cats</span>
      </button>
      {/* Detail Card Container */}
      <div className="bg-white rounded-3xl overflow-hidden shadow-[0_8px_32px_rgba(255,107,157,0.15)] border border-pink-100/30 flex flex-col md:flex-row min-h-[500px]">
        {/* Left Side: Large Image with Pink Gradient Overlay */}
        <div className="md:w-1/2 relative min-h-[300px] md:min-h-full aspect-[4/3] md:aspect-auto">
          <CatImage src={cat.image} alt={cat.name} className="w-full h-full" />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#C9184A]/20 via-transparent to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B9D]/10 via-transparent to-transparent pointer-events-none" />
        </div>
        {/* Right Side: Cat Fields */}
        <div className="md:w-1/2 p-8 flex flex-col justify-between">
          <div>
            {/* Header / Title */}
            <div className="flex justify-between items-start gap-4 mb-4">
              <div>
                <h1 className="text-3xl font-bold text-[#1A0A10] leading-tight">
                  {cat.name}
                </h1>
                <p className="text-md font-semibold text-[#FF6B9D] tracking-wide mt-1">
                  {cat.breed}
                </p>
              </div>
              <Badge
                label={`Energy: ${cat.energyLevel}`}
                variant={getEnergyVariant(cat.energyLevel)}
                className="mt-1 shrink-0"
              />
            </div>
            {/* Quick stats grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-[#FFF0F6] p-3.5 rounded-2xl border border-pink-100/60">
                <span className="text-xs text-[#FF6B9D] uppercase tracking-wider font-semibold block mb-0.5">Life Span</span>
                <span className="text-md font-bold text-[#1A0A10]">{cat.lifeSpan} years</span>
              </div>
              <div className="bg-[#FFF0F6] p-3.5 rounded-2xl border border-pink-100/60">
                <span className="text-xs text-[#FF6B9D] uppercase tracking-wider font-semibold block mb-0.5">Color</span>
                <span className="text-md font-bold text-[#1A0A10]">{cat.color || 'N/A'}</span>
              </div>
            </div>
            {/* Friendliness section */}
            <div className="flex flex-wrap gap-3 mb-6">
              {cat.kidsFriendly ? (
                <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-100 px-4 py-2 rounded-2xl text-sm font-semibold">
                  <Users className="w-4 h-4 text-emerald-600" />
                  <span>Kids Friendly</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 bg-red-50/50 text-red-800 border border-red-100/30 px-4 py-2 rounded-2xl text-sm font-medium opacity-60">
                  <ShieldAlert className="w-4 h-4 text-red-400" />
                  <span>Not ideal for Kids</span>
                </div>
              )}
              {cat.apartmentFriendly ? (
                <div className="flex items-center gap-2 bg-sky-50 text-sky-800 border border-sky-100 px-4 py-2 rounded-2xl text-sm font-semibold">
                  <Building2 className="w-4 h-4 text-sky-600" />
                  <span>Apartment Friendly</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 bg-red-50/50 text-red-800 border border-red-100/30 px-4 py-2 rounded-2xl text-sm font-medium opacity-60">
                  <ShieldAlert className="w-4 h-4 text-red-400" />
                  <span>Not ideal for Apartments</span>
                </div>
              )}
            </div>
            {/* Description */}
            <div className="mb-6">
              <span className="text-xs text-gray-400 uppercase tracking-wider font-bold block mb-2">About</span>
              <p className="text-[#1A0A10]/75 leading-relaxed text-md">
                {cat.description}
              </p>
            </div>
          </div>
          {/* Action Footer */}
          <div className="border-t border-pink-50 pt-6 mt-4 flex items-center justify-between">
            <span className="text-xs text-gray-400">Added: {new Date(cat.createdAt).toLocaleDateString()}</span>
            <div className="flex gap-2 min-w-[160px]">
              <AdoptButton catId={cat._id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};