import type { Request, Response } from "express"
import { generateAiResponse } from "../services/groq.service.ts"

export const askAiController = async (req: Request, res: Response) => {
    try {
        const { prompt } = req.body // ✅ fixed

        console.log("Prompt:", prompt) // debug

        if (!prompt) {
            return res.status(400).json({
                success: false,
                message: "Prompt is required",
            })
        }

        const result = await generateAiResponse(prompt)

        return res.status(200).json({
            success: true,
            message: "Ask AI successfully",
            data: result,
        })

    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}