import React from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '../ui/Input';
interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  placeholder?: string;
  loading?: boolean;
}
export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onClear,
  placeholder = 'Search by name, breed, or personality...',
  loading = false,
}) => {
  return (
    <div className="relative w-full max-w-2xl mx-auto mb-8">
      <div className="relative flex items-center">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          icon={<Search className="w-5 h-5" />}
          className="pr-12"
        />
        {value && onClear && (
          <button
            onClick={onClear}
            className="absolute right-4 p-1.5 rounded-xl text-[#FF8FAB] hover:text-[#C9184A] hover:bg-[#FFF0F6] transition-colors duration-200 cursor-pointer"
            title="Clear search"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
      {loading && (
        <div className="absolute right-14 top-1/2 -translate-y-1/2 flex items-center">
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#FF6B9D] border-t-transparent"></div>
        </div>
      )}
    </div>
  );
};
