import mongoose from "mongoose";
import type { ICat } from "../types/cats.types.ts";

const catSchema = new mongoose.Schema<ICat>({

    name: {
        type: String,
        required: true
    },
    breed: {
        type: String,
        required: true
    },
    color: {
        type: String,
    },
    description: {
        type: String,
        required: true
    },
    lifeSpan: {
        type: Number,
        default: 1,
    },
    energyLevel: {
        type: String,
        required: true
    },
    kidsFriendly: {
        type: Boolean,
        default: true
    },
    apartmentFriendly: {
        type: Boolean,
        default: true
    },
    image: {
        type: String
    }
}, { timestamps: true })

const CatModel = mongoose.model("Cat", catSchema);

export default CatModel;