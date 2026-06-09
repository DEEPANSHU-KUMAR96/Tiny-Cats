import React from 'react';
import { useSearch } from '../hooks/useSearch';
import { SearchBar } from '../components/cats/SearchBar';
import { CatGrid } from '../components/cats/CatGrid';
import { SkeletonGrid } from '../components/ui/Loader';
import { ShieldAlert, RefreshCw } from 'lucide-react';
import { Button } from '../components/ui/Button';
export const CatsPage: React.FC = () => {
  const { query, setQuery, clearSearch, results, loading, error, executeSearch } = useSearch();
  return (
    <div className="page-transition w-full space-y-8">
      {/* Page Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <h1 className="text-4xl font-extrabold text-[#1A0A10] tracking-tight">
          Explore Our Cats 🐱
        </h1>
        <p className="text-[#1A0A10]/60 font-medium text-md">
          Browse through our list of lovely cats or search for specific breeds and characteristics.
        </p>
      </div>
      {/* Debounced Search Bar */}
      <SearchBar
        value={query}
        onChange={setQuery}
        onClear={clearSearch}
        loading={loading && query.length > 0}
      />
      {/* Main Content Area */}
      <div className="min-h-[400px]">
        {/* Error State */}
        {error && (
          <div className="bg-rose-50 border border-rose-200 rounded-3xl p-8 max-w-md mx-auto text-center space-y-4 shadow-sm">
            <div className="w-12 h-12 bg-rose-100 rounded-2xl flex items-center justify-center text-[#C9184A] mx-auto font-bold">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#1A0A10]">Failed to load cats</h3>
            <p className="text-sm text-gray-500">{error}</p>
            <Button
              variant="accent"
              onClick={() => executeSearch(query)}
              className="py-2.5 px-6"
            >
              <RefreshCw className="w-4 h-4 mr-2" /> Try Again
            </Button>
          </div>
        )}
        {/* Loading Skeletons */}
        {loading && results.length === 0 && <SkeletonGrid count={8} />}
        {/* Empty State */}
        {!loading && !error && results.length === 0 && (
          <div className="bg-white border border-pink-100/60 rounded-3xl p-12 max-w-md mx-auto text-center space-y-4 shadow-pink-card">
            <span className="text-5xl block animate-bounce">😿</span>
            <h3 className="text-xl font-bold text-[#1A0A10]">No cats found</h3>
            <p className="text-sm text-[#1A0A10]/60">
              We couldn't find any cats matching <span className="font-semibold text-[#FF6B9D]">"{query}"</span>. Try adjusting your search query!
            </p>
            <Button
              variant="outline"
              onClick={clearSearch}
              className="py-2.5 px-6"
            >
              Clear Search Query
            </Button>
          </div>
        )}
        {/* Cat Grid */}
        {!error && results.length > 0 && (
          <div className={loading ? 'opacity-60 transition-opacity duration-300' : 'transition-opacity duration-300'}>
            <CatGrid cats={results} />
          </div>
        )}
      </div>
    </div>
  );
};
