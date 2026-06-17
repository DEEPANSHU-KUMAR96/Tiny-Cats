import axiosInstance from "../../api/axiosInstance";
import type { IApiResponse } from "../../types/cats.types";
import type {
  IAdoptionRequest,
  IAdoptionRequestPopulated,
  IAdoptionRequestMyRequests,
  CreateAdoptionPayload,
} from "../types/adoption.types";

const ADOPTION_BASE = "/api/adoption";

export const adoptionService = {
  /**
   * Submit an adoption request for a cat
   */
  createAdoptionRequest: async (
    payload: CreateAdoptionPayload
  ): Promise<IApiResponse<IAdoptionRequest>> => {
    const response = await axiosInstance.post<IApiResponse<IAdoptionRequest>>(
      `${ADOPTION_BASE}/request`,
      payload
    );
    return response.data;
  },

  /**
   * Get own adoption requests (with cat populated)
   */
  getMyRequests: async (): Promise<IAdoptionRequestMyRequests[]> => {
    const response = await axiosInstance.get<IApiResponse<IAdoptionRequestMyRequests[]>>(
      `${ADOPTION_BASE}/my-requests`
    );
    return response.data.data;
  },

  /**
   * Get all adoption requests (Admin only, user + cat populated)
   */
  getAllRequests: async (): Promise<IAdoptionRequestPopulated[]> => {
    const response = await axiosInstance.get<IApiResponse<IAdoptionRequestPopulated[]>>(
      `${ADOPTION_BASE}/all`
    );
    return response.data.data;
  },

  /**
   * Approve an adoption request (Admin only)
   */
  approveRequest: async (id: string): Promise<IApiResponse<IAdoptionRequest>> => {
    const response = await axiosInstance.patch<IApiResponse<IAdoptionRequest>>(
      `${ADOPTION_BASE}/${id}/approve`
    );
    return response.data;
  },

  /**
   * Reject an adoption request (Admin only)
   */
  rejectRequest: async (id: string): Promise<IApiResponse<IAdoptionRequest>> => {
    const response = await axiosInstance.patch<IApiResponse<IAdoptionRequest>>(
      `${ADOPTION_BASE}/${id}/reject`
    );
    return response.data;
  },

  /**
   * Delete an adoption request (Admin only)
   */
  deleteRequest: async (id: string): Promise<IApiResponse<null>> => {
    const response = await axiosInstance.delete<IApiResponse<null>>(
      `${ADOPTION_BASE}/${id}`
    );
    return response.data;
  },
};
