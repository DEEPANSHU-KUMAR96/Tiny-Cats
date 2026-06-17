import type { Request, Response } from "express";
import {
    createAdoptionRequest,
    getMyAdoptionRequests,
    getAllAdoptionRequests,
    updateAdoptionRequestStatus,
} from "../services/adoption.service.ts";
import type { CreateAdoptionBody } from "../types/adoption.types.ts";

/**
 * Handle POST /api/adoption/request (User route)
 */
export const createRequestController = async (
    req: Request<{}, {}, CreateAdoptionBody>,
    res: Response
): Promise<void> => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            res.status(401).json({
                success: false,
                message: "Unauthorized: User session not found",
            });
            return;
        }

        const { catId, message } = req.body;
        if (!catId) {
            res.status(400).json({
                success: false,
                message: "Bad Request: Cat ID is required",
            });
            return;
        }

        const request = await createAdoptionRequest(userId, catId, message);

        res.status(201).json({
            success: true,
            message: "Adoption request submitted successfully",
            data: request,
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Failed to create adoption request";
        res.status(500).json({
            success: false,
            message,
        });
    }
};

/**
 * Handle GET /api/adoption/my-requests (User route)
 */
export const getMyRequestsController = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            res.status(401).json({
                success: false,
                message: "Unauthorized: User session not found",
            });
            return;
        }

        const requests = await getMyAdoptionRequests(userId);

        res.status(200).json({
            success: true,
            message: "My adoption requests fetched successfully",
            data: requests,
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Failed to fetch user requests";
        res.status(500).json({
            success: false,
            message,
        });
    }
};

/**
 * Handle GET /api/adoption/all (Admin route)
 */
export const getAllRequestsController = async (req: Request, res: Response): Promise<void> => {
    try {
        const requests = await getAllAdoptionRequests();

        res.status(200).json({
            success: true,
            message: "All adoption requests fetched successfully",
            data: requests,
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Failed to fetch all requests";
        res.status(500).json({
            success: false,
            message,
        });
    }
};

/**
 * Handle PATCH /api/adoption/:id/approve (Admin route)
 */
export const approveRequestController = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const request = await updateAdoptionRequestStatus(id, "approved");

        res.status(200).json({
            success: true,
            message: "Adoption request approved successfully",
            data: request,
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Failed to approve request";
        res.status(500).json({
            success: false,
            message,
        });
    }
};

/**
 * Handle PATCH /api/adoption/:id/reject (Admin route)
 */
export const rejectRequestController = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const request = await updateAdoptionRequestStatus(id, "rejected");

        res.status(200).json({
            success: true,
            message: "Adoption request rejected successfully",
            data: request,
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Failed to reject request";
        res.status(500).json({
            success: false,
            message,
        });
    }
};
