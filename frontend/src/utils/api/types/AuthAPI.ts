import { GenericResponse } from "./Api";

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RefreshTokenResponse extends GenericResponse {
  data: {
    accessToken: string;
  };
}

export interface LoginResponse extends GenericResponse {
  data: {
    accessToken: string;
  };
}

export interface LogoutResponse extends GenericResponse {
  data: null;
}

export interface ResetPasswordInput {
  token: string;
  password: string;
}
