import { useState, useEffect, useRef, useCallback } from 'react';
import type { ICat } from '../types/cats.types';
import {catsService} from '../services/cats.service';
export const useSearch = (initialQuery = '') => {
  const [query, setQuery] = useState<string>(initialQuery);
  const [results, setResults] = useState<ICat[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const executeSearch = useCallback(async (searchQuery: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await catsService.searchCats(searchQuery);
      setResults(data);
    } catch (err: any) {
      console.error('Search error:', err);
      setError(err?.response?.data?.message || err?.message || 'Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }
    // Debounce search by 300ms
    timeoutRef.current = window.setTimeout(() => {
      executeSearch(query);
    }, 300);
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [query, executeSearch]);
  const clearSearch = () => {
    setQuery('');
  };
  return {
    query,
    setQuery,
    clearSearch,
    results,
    loading,
    error,
    executeSearch,
  };
};
