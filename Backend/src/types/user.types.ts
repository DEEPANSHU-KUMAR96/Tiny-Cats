import { type Types } from "mongoose";

export interface IUserDocument {
    _id: Types.ObjectId;
    name: string;
    email: string;
    password: string;
    mobile: string;
    role?: "user" | "admin";
    createdAt?: Date;
    updatedAt?: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface RegisterBody {
    name: string;
    email: string;
    password: string;
    mobile: string;
}

export interface LoginBody {
    email: string;
    password: string;
}

export interface JWTPayload {
    userId: string;
    email?: string;
}