import { useState, useEffect, useCallback } from 'react';
import type { ICat } from '../types/cats.types';
import { catsService } from '../services/cats.service';

export const useCats = (immediate = false) => {
  const [cats, setCats] = useState<ICat[]>([]);
  const [cat, setCat] = useState<ICat | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCats = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await catsService.getAllCats();
      setCats(data);
    } catch (err: any) {
      console.error('Error fetching all cats:', err);
      setError(err?.response?.data?.message || err?.message || 'Failed to fetch cats.');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCatById = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await catsService.getCatById(id);
      setCat(data);
    } catch (err: any) {
      console.error(`Error fetching cat by ID ${id}:`, err);
      setError(err?.response?.data?.message || err?.message || `Failed to fetch cat with ID ${id}.`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (immediate) {
      fetchCats();
    }
  }, [immediate, fetchCats]);

  return {
    cats,
    cat,
    loading,
    error,
    fetchCats,
    fetchCatById,
  };
};
