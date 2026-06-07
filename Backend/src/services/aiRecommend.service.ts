import { recommendCatService } from "./cat.service.ts";
import { generateAiResponse } from "./groq.service.ts";


export const aiRecommendService = async (kidsFriendly: boolean, apartmentFriendly: boolean) => {
    
    const matchCatsFromDb =  await recommendCatService(kidsFriendly, apartmentFriendly)

  const prompt = `
You are an expert cat specialist and professional cat dealer with 20+ years of experience. 
You have deep knowledge about cat breeds, their behaviors, and suitability for different lifestyles.

A user wants to find the perfect cat based on their living situation and family needs.

User Preferences:
- Kids Friendly: ${kidsFriendly}
- Apartment Friendly: ${apartmentFriendly}

Based on the user preferences above, provide a detailed comparison of the TOP 3 most suitable cats in the following format:

1. 🐱 Cat Name & Breed
   - Why it matches: (explain why this cat suits their needs)
   - Energy Level: 
   - Life Span:
   - Kid Friendly: ✅ or ❌
   - Apartment Friendly: ✅ or ❌
   - Overall Score: X/10

2. 🐱 Cat Name & Breed
   ...

3. 🐱 Cat Name & Breed
   ...

🏆 Final Recommendation:
(Give a final verdict on which cat is the absolute best choice and why)

Keep the response friendly, helpful, and easy to understand.
`;


const aiResonse = await generateAiResponse(prompt)

return aiResonse;
};