import { User } from "@/types/User";

export interface GenericResponse {
  status: string;
  message: string;
}

export interface LoginResponse {
  status: string;
  access_token: string;
}

export interface UserResponse {
  status: string;
  data: {
    user: User;
  };
}
