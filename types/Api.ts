import { User } from "@/types/User";

export interface GenericResponse {
  status: string;
  message: string;
}

export interface LoginResponse {
  status: string;
  accessToken: string;
}

export interface UserResponse {
  status: string;
  data: {
    user: User;
  };
}
