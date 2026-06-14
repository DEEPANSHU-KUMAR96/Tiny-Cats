import express from "express";
import { register, login, getProfile, logout } from "../controllers/auth.controller.ts";
import { protect } from "../middlewares/auth.middleware.ts";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", protect, getProfile);

router.post("/logout", protect, logout);

export default router;