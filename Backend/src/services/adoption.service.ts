import AdoptionRequestModel from "../models/adoption.model.ts";
import CatModel from "../models/cat.model.ts";
import UserModel from "../models/user.model.ts";
import type { IAdoptionRequestDocument } from "../types/adoption.types.ts";

/**
 * Create a new adoption request for a cat
 */
export const createAdoptionRequest = async (
    userId: string,
    catId: string,
    message?: string
): Promise<IAdoptionRequestDocument> => {
    const cat = await CatModel.findById(catId);
    if (!cat) {
        throw new Error("Cat not found");
    }

    const user = await UserModel.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }

    // Optional constraint: Avoid multiple pending requests by the same user for the same cat
    const existing = await AdoptionRequestModel.findOne({
        userId,
        catId,
        status: "pending",
    });
    if (existing) {
        throw new Error("You already have a pending adoption request for this cat.");
    }

    return await AdoptionRequestModel.create({
        userId,
        catId,
        ...(message !== undefined ? { message } : {}),
    });
};

/**
 * Get all requests submitted by a specific user
 */
export const getMyAdoptionRequests = async (
    userId: string
): Promise<IAdoptionRequestDocument[]> => {
    return await AdoptionRequestModel.find({ userId })
        .populate("catId")
        .sort({ createdAt: -1 });
};

/**
 * Get all adoption requests (for admins) with populated user and cat details
 */
export const getAllAdoptionRequests = async (): Promise<IAdoptionRequestDocument[]> => {
    return await AdoptionRequestModel.find()
        .populate("userId", "name email mobile")
        .populate("catId")
        .sort({ createdAt: -1 });
};

/**
 * Approve or reject an adoption request
 */
export const updateAdoptionRequestStatus = async (
    requestId: string,
    status: "approved" | "rejected"
): Promise<IAdoptionRequestDocument> => {
    const request = await AdoptionRequestModel.findById(requestId);
    if (!request) {
        throw new Error("Adoption request not found");
    }

    request.status = status;
    return await request.save();
};
