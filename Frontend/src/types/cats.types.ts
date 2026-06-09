export interface ICat {
  _id: string;
  name: string;
  breed: string;
  color?: string;
  description: string;
  lifeSpan: number;
  energyLevel: string; 
  kidsFriendly: boolean;
  apartmentFriendly: boolean;
  image?: string;
  createdAt: string;
  updatedAt: string;
}
export interface IAiRecommendRequest {
  kidsFriendly: boolean;
  apartmentFriendly: boolean;
}
export interface IAiRecommendResponse {
  recommendation?: string;
  response?: string;
  text?: string;
  result?: string;
}
export interface IAiAskRequest {
  prompt: string;
}
export interface IAiAskResponse {
  response?: string;
  answer?: string;
  text?: string;
  result?: string;
}
export interface IApiError {
  message: string;
  statusCode?: number;
}
export interface IMcpTestResponse {
  message?: string;
  response?: string;
  text?: string;
  result?: string;
}
export interface IApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}