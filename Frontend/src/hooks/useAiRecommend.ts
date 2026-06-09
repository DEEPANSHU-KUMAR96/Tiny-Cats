import { useState, useCallback } from 'react';
import { aiService } from '../services/ai.service';
export const useAiRecommend = () => {
  const [kidsFriendly, setKidsFriendly] = useState<boolean>(false);
  const [apartmentFriendly, setApartmentFriendly] = useState<boolean>(false);
  const [recommendation, setRecommendation] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const getRecommendation = useCallback(async () => {
    setLoading(true);
    setError(null);
    setRecommendation('');
    try {
      const result = await aiService.getRecommendation({
        kidsFriendly,
        apartmentFriendly,
      });
      setRecommendation(result);
    } catch (err: any) {
      console.error('AI Recommendation Error:', err);
      setError(err?.response?.data?.message || err?.message || 'Failed to get recommendation from AI.');
    } finally {
      setLoading(false);
    }
  }, [kidsFriendly, apartmentFriendly]);
  const askCustomPrompt = useCallback(async (prompt: string) => {
    setLoading(true);
    setError(null);
    setRecommendation('');
    try {
      const result = await aiService.askQuestion(prompt);
      setRecommendation(result);
      return result;
    } catch (err: any) {
      console.error('AI Ask Error:', err);
      setError(err?.response?.data?.message || err?.message || 'Failed to get AI response.');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);
  return {
    kidsFriendly,
    setKidsFriendly,
    apartmentFriendly,
    setApartmentFriendly,
    recommendation,
    setRecommendation,
    loading,
    error,
    getRecommendation,
    askCustomPrompt,
  };
};