import type { Types, Document } from "mongoose";

export interface IAdoptionRequest {
    userId: Types.ObjectId;
    catId: Types.ObjectId;
    status: "pending" | "approved" | "rejected";
    message?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IAdoptionRequestDocument extends IAdoptionRequest, Document {
    _id: Types.ObjectId;
}

export interface CreateAdoptionBody {
    catId: string;
    message?: string;
}
