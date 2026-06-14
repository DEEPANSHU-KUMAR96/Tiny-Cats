import UserModel from "../models/user.model.ts";
import type { RegisterBody, LoginBody } from "../types/user.types.ts";

export const registerService = async (payload: RegisterBody) => {
    const existingUser = await UserModel.findOne({ email: payload.email });
    if (existingUser) {
        throw new Error("Email already registered");
    }
    return await UserModel.create(payload);
};

export const loginService = async (payload: LoginBody) => {
    const user = await UserModel.findOne({ email: payload.email });
    if (!user) {
        throw new Error("Invalid email or password");
    }
    const isMatch = await user.comparePassword(payload.password);
    if (!isMatch) {
        throw new Error("Invalid email or password");
    }
    return user;
};

export const getProfileService = async (userId: string) => {
    return await UserModel.findById(userId).select("-password");
};

export const logoutService = async (): Promise<void> => {
    return;
};