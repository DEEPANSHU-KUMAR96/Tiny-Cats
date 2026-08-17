import 'dotenv/config'
import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY!,
});

export const generateAiResponse = async (prompt: string) => {

    console.log("Prompt:", prompt); 

    const completion = await groq.chat.completions.create({
        model: "openai/gpt-oss-120b",
        messages: [
            {
                role: "user",
                content: prompt, 
            },
        ],
    });

    return completion.choices[0]?.message?.content ?? "Sorry, I could not recommend a cat at this time.";
};