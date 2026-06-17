import express from "express";
import { protect } from "../middlewares/auth.middleware.ts";
import { isAdmin } from "../middlewares/isAdmin.middleware.ts";
import {
    createRequestController,
    getMyRequestsController,
    getAllRequestsController,
    approveRequestController,
    rejectRequestController,
} from "../controllers/adoption.controller.ts";

const router = express.Router();

// User routes
router.post("/request", protect, createRequestController);
router.get("/my-requests", protect, getMyRequestsController);

// Admin routes
router.get("/all", protect, isAdmin, getAllRequestsController);
router.patch("/:id/approve", protect, isAdmin, approveRequestController);
router.patch("/:id/reject", protect, isAdmin, rejectRequestController);

export default router;
