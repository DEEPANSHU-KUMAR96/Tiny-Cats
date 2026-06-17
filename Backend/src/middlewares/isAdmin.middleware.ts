import type { Request, Response, NextFunction } from "express";
import UserModel from "../models/user.model.ts";

export const isAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.user?.userId;

        if (!userId) {
            res.status(401).json({
                success: false,
                message: "Unauthorized: Access token missing or invalid",
            });
            return;
        }

        const user = await UserModel.findById(userId);

        if (!user) {
            res.status(404).json({
                success: false,
                message: "User not found",
            });
            return;
        }

        if (user.role !== "admin") {
            res.status(403).json({
                success: false,
                message: "Forbidden: Admin resource access denied",
            });
            return;
        }

        next();
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Internal server error in authorization";
        res.status(500).json({
            success: false,
            message,
        });
    }
};
