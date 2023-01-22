import { GenericResponse, LoginResponse } from "@/types/Api";
import axios from "axios";
import { BASE_URL } from "./config";

export interface RegisterInput {
  email: string;
  password: string;
  name: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export const authApi = axios.create({
  baseURL: `${BASE_URL}/auth`,
  withCredentials: true,
});

export const refreshAccessToken = async () => {
  const response = await authApi.get("/refresh-token");
  return response.data;
};

export const loginUser = async (user: LoginInput) => {
  const response = await authApi.post("/sign", user);
  return response.data;
};

export const registerUser = async (user: RegisterInput) => {
  const response = await authApi.post("/register", user);
  return response.data;
};

export const logoutUser = async () => {
  const response = await authApi.delete("/logout");
  return response;
};

export const getUser = async () => {
  const response = await authApi.get<GenericResponse>("/user");
  return response.data;
};
