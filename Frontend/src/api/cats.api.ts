import axiosInstance from './axiosInstance';
import type { ICat, IApiResponse } from '../types/cats.types';
import { API_ENDPOINTS } from '../constants/api.constants';
import type { AxiosResponse } from 'axios';

export const catsApi = {
  getAllCats: async (): Promise<AxiosResponse<IApiResponse<ICat[]>>> => {
    return await axiosInstance.get<IApiResponse<ICat[]>>(API_ENDPOINTS.CATS);
  },
   getCatById: async (id: string): Promise<AxiosResponse<IApiResponse<ICat>>> => {
    return await axiosInstance.get<IApiResponse<ICat>>(API_ENDPOINTS.CAT_BY_ID(id));
  },
  searchCats: async (query: string): Promise<AxiosResponse<IApiResponse<ICat[]>>> => {
    return await axiosInstance.get<IApiResponse<ICat[]>>(API_ENDPOINTS.SEARCH_CATS(query));
  },
};