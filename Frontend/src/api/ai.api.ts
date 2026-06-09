import axiosInstance from './axiosInstance';
import type { IAiRecommendRequest, IApiResponse } from '../types/cats.types';
import { API_ENDPOINTS } from '../constants/api.constants';

export const aiApi = {

    recommendByAi: async (data: IAiRecommendRequest): Promise<IApiResponse<string>> => {
    const response = await axiosInstance.post<IApiResponse<string>>(API_ENDPOINTS.AI_RECOMMEND, data);
    return response.data;
  },

   askAi: async (prompt: string): Promise<IApiResponse<string>> => {
    const response = await axiosInstance.post<IApiResponse<string>>(API_ENDPOINTS.AI_ASK, { prompt });
    return response.data;
  },
  getMcpTest: async (): Promise<IApiResponse<string>> => {
    const response = await axiosInstance.get<IApiResponse<string>>(API_ENDPOINTS.MCP_TEST);
    return response.data;
  },
};