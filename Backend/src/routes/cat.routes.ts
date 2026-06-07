import express from 'express';
import { createCatController, getAllCatsController, getSingleCatController, recommendCatController, searchCatController } from '../controllers/cat.controller.ts';

const router = express.Router();

router.post("/create", createCatController);

router.get("/search/all", searchCatController)

router.get("/", getAllCatsController);

router.get("/:id", getSingleCatController);

router.post("/recommend", recommendCatController);


export default router;