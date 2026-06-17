import type { ICat } from "../../types/cats.types";
import type { IUser } from "../../auth/types/auth.types";

export type AdoptionStatus = "pending" | "approved" | "rejected";

export interface IAdoptionRequest {
  _id: string;
  userId: string | IUser;
  catId: string | ICat;
  status: AdoptionStatus;
  message?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IAdoptionRequestPopulated extends Omit<IAdoptionRequest, "userId" | "catId"> {
  userId: IUser;
  catId: ICat;
}

export interface IAdoptionRequestMyRequests extends Omit<IAdoptionRequest, "catId"> {
  catId: ICat;
}

export interface CreateAdoptionPayload {
  catId: string;
  message?: string;
}
