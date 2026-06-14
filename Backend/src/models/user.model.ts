import mongoose, { type Document, type Types } from "mongoose";
import bcrypt from "bcrypt";
import type { IUserDocument } from "../types/user.types.ts";

export interface IUserMongoose extends IUserDocument, Document {
    _id: Types.ObjectId;
}

const userSchema = new mongoose.Schema<IUserMongoose>(
    {
        name: {
            type: String,
            trim: true,
            required: [true, "Name is required"],
        },
        email: {
            type: String,
            trim: true,
            required: [true, "Email is required"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Min 6 characters required"],
        },
        mobile: {
            type: String,
            minlength: [10, "Min 10 characters required"],
            maxlength: [10, "Max 10 characters required"],
        },
    },
    { timestamps: true }
);

userSchema.pre("save", async function (): Promise<void> {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password as string, 10);
});

userSchema.methods.comparePassword = async function (
    candidatePassword: string
): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, this.password as string);
};

const UserModel =
    (mongoose.models.User as mongoose.Model<IUserMongoose>) ||
    mongoose.model<IUserMongoose>("User", userSchema);

export default UserModel;