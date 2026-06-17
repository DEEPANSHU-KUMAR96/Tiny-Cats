import mongoose, { Schema } from "mongoose";
import type { IAdoptionRequestDocument } from "../types/adoption.types.ts";

const adoptionRequestSchema = new Schema<IAdoptionRequestDocument>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User ID is required"],
        },
        catId: {
            type: Schema.Types.ObjectId,
            ref: "Cat",
            required: [true, "Cat ID is required"],
        },
        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending",
        },
        message: {
            type: String,
            trim: true,
        },
    },
    { timestamps: true }
);

const AdoptionRequestModel =
    (mongoose.models.AdoptionRequest as mongoose.Model<IAdoptionRequestDocument>) ||
    mongoose.model<IAdoptionRequestDocument>("AdoptionRequest", adoptionRequestSchema);

export default AdoptionRequestModel;
