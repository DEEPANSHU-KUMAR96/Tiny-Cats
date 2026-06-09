import { catsApi } from '../api/cats.api';
import type { ICat, IApiResponse } from '../types/cats.types';

export const catsService = {
  getAllCats: async (): Promise<ICat[]> => {
    const response = await catsApi.getAllCats();
    console.log("API Response:", response.data);
    const apiResponse: IApiResponse<ICat[]> = response.data;
    const data: ICat[] = apiResponse.data ?? [];
    return data.map(catsService.formatCat);
  },
  getCatById: async (id: string): Promise<ICat | null> => {
    const response = await catsApi.getCatById(id);
    console.log("API Response:", response.data);
    const apiResponse: IApiResponse<ICat> = response.data;
    const data: ICat | undefined = apiResponse.data;
    if (!data) return null;
    return catsService.formatCat(data);
  },
  searchCats: async (query: string): Promise<ICat[]> => {
    if (!query.trim()) {
      return catsService.getAllCats();
    }
    const response = await catsApi.searchCats(query);
    console.log("API Response:", response.data);
    const apiResponse: IApiResponse<ICat[]> = response.data;
    const data: ICat[] = apiResponse.data ?? [];
    return data.map(catsService.formatCat);
  },
  formatCat: (cat: ICat): ICat => {
    return {
      ...cat,
      name: cat.name || 'Unknown Cat',
      breed: cat.breed || 'Mixed Breed',
      color: cat.color || 'Unknown Color',
      description: cat.description || 'No description available for this lovely cat.',
      lifeSpan: cat.lifeSpan || 12,
      energyLevel: catsService.normalizeEnergyLevel(cat.energyLevel),
      kidsFriendly: !!cat.kidsFriendly,
      apartmentFriendly: !!cat.apartmentFriendly,
      image: cat.image || '',
    };
  },
  normalizeEnergyLevel: (level?: string): 'Low' | 'Medium' | 'High' => {
    if (!level) return 'Medium';
    const normalized = level.trim().toLowerCase();
    if (normalized === 'low') return 'Low';
    if (normalized === 'high') return 'High';
    return 'Medium';
  }
};