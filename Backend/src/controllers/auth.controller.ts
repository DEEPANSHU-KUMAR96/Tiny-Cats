import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { registerService, loginService, getProfileService } from "../services/auth.service.ts";
import type { RegisterBody, LoginBody, JWTPayload } from "../types/user.types.ts";

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

export const register = async (req: Request<{}, {}, RegisterBody>, res: Response): Promise<void> => {
    try {
        const user = await registerService(req.body);

        const payload: JWTPayload = { userId: user._id.toString(), email: user.email };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions);

        res.status(201).json({
            success: true,
            message: "Registered successfully",
            data: {
                token,
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    mobile: user.mobile,
                },
            },
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Registration failed";
        res.status(500).json({ success: false, message });
    }
};

export const login = async (req: Request<{}, {}, LoginBody>, res: Response): Promise<void> => {
    try {
        const user = await loginService(req.body);

        const payload: JWTPayload = { userId: user._id.toString(), email: user.email };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions);

        res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                token,
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    mobile: user.mobile,
                },
            },
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Login failed";
        res.status(500).json({ success: false, message });
    }
};

export const getProfile = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = (req as any).user?.userId;

        const user = await getProfileService(userId);
        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }

        res.status(200).json({
            success: true,
            message: "Profile fetched successfully",
            data: user,
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Failed to fetch profile";
        res.status(500).json({ success: false, message });
    }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
    try {
        res.status(200).json({
            success: true,
            message: "Logged out successfully",
            data: null
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Logout failed";
        res.status(500).json({ success: false, message });
    }
};