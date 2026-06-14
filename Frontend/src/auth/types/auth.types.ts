export interface IUser {
  _id: string;
  name: string;
  email: string;
  mobile: string;
}


export interface LoginPayload {
  email: string;
  password: string;
}


export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  mobile: string;
}


export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: IUser;
  } | null;
}


export interface ProfileResponse {
  success: boolean;
  message: string;
  data: IUser;
}


export interface LogoutResponse {
  success: boolean;
  message: string;
  data: null;
}

/** Auth context shape exposed to consumers */
export interface IAuthContext {
  user: IUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, mobile: string) => Promise<void>;
  logout: () => Promise<void>;
}
