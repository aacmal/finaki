import axios from "axios";
import { BASE_URL } from "./config";
import { GenericResponse } from "./types/Api";
import {
  LoginInput,
  LoginResponse,
  LogoutResponse,
  RefreshTokenResponse,
  RegisterInput,
} from "./types/AuthAPI";

export const authApi = axios.create({
  baseURL: `${BASE_URL}/auth`,
  withCredentials: true,
});

export const refreshAccessToken = async () => {
  const response = await authApi.get<RefreshTokenResponse>("/refresh-token");
  return response.data.data;
};

export const loginUser = async (data: LoginInput) => {
  const response = await authApi.post<LoginResponse>("/sign", data);
  return response.data.data;
};

export const registerUser = async (data: RegisterInput) => {
  const response = await authApi.post<LoginResponse>("/register", data);
  return response.data.data;
};

export const logoutUser = async () => {
  const response = await authApi.delete<LogoutResponse>("/logout");
  return response.data.message;
};

export const getUser = async () => {
  const response = await authApi.get<GenericResponse>("/user");
  return response.data.data;
};
