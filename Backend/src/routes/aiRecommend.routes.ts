import express from 'express';
import { aiRecommendController } from '../controllers/aiRecommend.controller.ts';

const router = express.Router()


router.post("/recommendByAi", aiRecommendController )


export default router;