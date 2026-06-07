import 'dotenv/config'
import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY!,
});

export const generateAiResponse = async (prompt: string) => {

    console.log("Prompt:", prompt); // ✅ check karo prompt aa raha hai ya nahi

    const completion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
            {
                role: "user",
                content: prompt, // ✅ prompt me already sab kuch hai
            },
        ],
    });

    return completion.choices[0]?.message?.content ?? "Sorry, I could not recommend a cat at this time.";
};