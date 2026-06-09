import { aiApi } from '../api/ai.api';
import type { IAiRecommendRequest, IApiResponse } from '../types/cats.types';

export const aiService = {
  getRecommendation: async (request: IAiRecommendRequest): Promise<string> => {
    const apiResponse: IApiResponse<string> = await aiApi.recommendByAi(request);
    console.log("API Response:", apiResponse);
    const rawResult: string = apiResponse.data ?? '';

    if (!rawResult) {
      throw new Error('Could not retrieve a recommendation from the AI. Please try again.');
    }

    return rawResult;
  },
  askQuestion: async (prompt: string): Promise<string> => {
    if (!prompt.trim()) {
      throw new Error('Prompt cannot be empty.');
    }
    const apiResponse: IApiResponse<string> = await aiApi.askAi(prompt);
    console.log("API Response:", apiResponse);
    const rawResult: string = apiResponse.data ?? '';

    if (!rawResult) {
      throw new Error('Could not retrieve a response from the AI. Please try again.');
    }

    return rawResult;
  },
  getMcpRecommendation: async (): Promise<string> => {
    const apiResponse: IApiResponse<string> = await aiApi.getMcpTest();
    console.log("API Response:", apiResponse);
    const rawResult: string = apiResponse.data ?? '';

    if (!rawResult) {
      throw new Error('Could not retrieve MCP response. Please try again.');
    }

    return rawResult;
  }
};
