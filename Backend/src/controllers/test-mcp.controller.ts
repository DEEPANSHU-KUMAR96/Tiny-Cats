import type { Request, Response } from "express";
import { getMcpClient } from "../services/mcp.service.ts";
import { generateAiResponse } from "../services/groq.service.ts";


export const testMcpController = async (req: Request, res: Response) => {

    const client = await getMcpClient();
     const tools = await client.listTools();

     const result = await client.callTool({
        name: "recommend_cats",
        arguments: {
            kidsFriendly: true,
            apartmentFriendly: true
        },
     })

     let catsData = (result as any).content[0].text

     let prompt = `
     
     Avilable cats
     ${catsData}

     recommend best cats from this data
     `;

     let aiResponse = await generateAiResponse(prompt)

    return res.status(200).json({
        success: true,
        data: aiResponse,
        message: "test mcp successfully",
    })
}