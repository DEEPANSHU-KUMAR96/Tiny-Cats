export const API_ENDPOINTS = {
  CATS: '/api/cats',
  CAT_BY_ID: (id: string) => `/api/cats/${id}`,
  SEARCH_CATS: (query: string) => `/api/cats/search/all?q=${encodeURIComponent(query)}`,
  AI_RECOMMEND: '/api/ai/aiRecommend/recommendByAi',
  AI_ASK: '/api/ai/ask',
};
