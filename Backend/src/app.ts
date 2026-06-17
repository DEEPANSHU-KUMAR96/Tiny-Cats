import express, { type Request, type Response } from 'express';
import cors from 'cors'

import authRoutes from "./routes/auth.routes.ts";
import catsRoute from './routes/cat.routes.ts';
import aiRoutes from './routes/ai.routes.ts';
import aiRecommendRoutes from './routes/aiRecommend.routes.ts';
import mcpRoutes from './routes/test-mcp.routes.ts';
import adoptionRoutes from "./routes/adoption.routes.ts";

const app = express()

app.use(express.json())

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true
}))

app.get("/", (req: Request, res: Response) => {
    res.send({
        success: true,
        message: "Tiny cats backend running...",
    })
})

app.use("/api/auth", authRoutes);
app.use("/api/cats", catsRoute);
app.use("/api/ai", aiRoutes);
app.use("/api/ai/aiRecommend", aiRecommendRoutes)
app.use("/api/mcp", mcpRoutes)
app.use("/api/adoption", adoptionRoutes);



export default app;