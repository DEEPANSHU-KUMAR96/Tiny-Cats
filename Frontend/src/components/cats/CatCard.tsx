import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Building2, Heart } from 'lucide-react';
import type { ICat } from '../../types/cats.types';
import { Badge } from '../ui/Badge';
import { CatImage } from '../ui/CatImage';
interface CatCardProps {
  cat: ICat;
}
export const CatCard: React.FC<CatCardProps> = ({ cat }) => {
  const navigate = useNavigate();
  const getEnergyVariant = (level: string) => {
    const norm = level.toLowerCase();
    if (norm === 'low') return 'energy-low';
    if (norm === 'high') return 'energy-high';
    return 'energy-medium';
  };
  return (
    <div
      onClick={() => navigate(`/cats/${cat._id}`)}
      className="group bg-white rounded-3xl p-5 border border-pink-100/40 shadow-[0_8px_32px_rgba(255,107,157,0.12)] hover:shadow-[0_16px_48px_rgba(255,107,157,0.28)] hover:scale-105 transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col h-full hover:border-[#FF6B9D]/30"
    >
      {/* Pink Gradient Border Glow on Hover */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#FF8FAB]/30 rounded-3xl pointer-events-none transition-all duration-300" />
      
      {/* Cat Image Container */}
      <div className="relative rounded-2xl overflow-hidden aspect-[4/3] mb-4 shadow-sm">
        <CatImage src={cat.image} alt={cat.name} className="w-full h-full" />
        {/* Heart Icon/Badge Overlay */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="absolute top-3 right-3 bg-white/70 backdrop-blur-md p-2 rounded-full text-[#FF6B9D] hover:text-[#C9184A] hover:bg-white transition-all duration-200 shadow-sm"
        >
          <Heart className="w-4 h-4 fill-current opacity-80 hover:scale-110" />
        </button>
      </div>
      {/* Name and Breed */}
      <div className="mb-2">
        <h3 className="text-lg font-bold text-[#1A0A10] group-hover:text-[#C9184A] transition-colors duration-300 truncate">
          {cat.name}
        </h3>
        <p className="text-xs font-semibold text-[#FF8FAB] tracking-wide uppercase truncate">
          {cat.breed}
        </p>
      </div>
      {/* Description */}
      <p className="text-sm text-[#1A0A10]/60 line-clamp-2 mb-4 flex-grow">
        {cat.description}
      </p>
      {/* Attributes & Icons Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-pink-50/60 mt-auto">
        {/* Energy Level Badge */}
        <Badge
          label={`Energy: ${cat.energyLevel}`}
          variant={getEnergyVariant(cat.energyLevel)}
        />
        {/* Friendly Icons */}
        <div className="flex items-center gap-2">
          {cat.kidsFriendly && (
            <div className="p-1.5 bg-emerald-50 rounded-lg text-emerald-600 border border-emerald-100 hover:scale-110 transition-transform" title="Kids Friendly">
              <Users className="w-4 h-4" />
            </div>
          )}
          {cat.apartmentFriendly && (
            <div className="p-1.5 bg-sky-50 rounded-lg text-sky-600 border border-sky-100 hover:scale-110 transition-transform" title="Apartment Friendly">
              <Building2 className="w-4 h-4" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
