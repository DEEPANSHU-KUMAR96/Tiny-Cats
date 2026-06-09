import React from 'react';
import type { ICat } from '../../types/cats.types';
import { CatCard } from './CatCard';
interface CatGridProps {
  cats: ICat[];
}
export const CatGrid: React.FC<CatGridProps> = ({ cats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {cats.map((cat) => (
        <CatCard key={cat._id} cat={cat} />
      ))}
    </div>
  );
};
