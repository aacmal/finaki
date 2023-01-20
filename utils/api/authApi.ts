import { GenericResponse, LoginResponse } from "@/types/Api";
import axios from "axios";
import useStore from "../../stores/store";
import { authApi } from "./config";

export interface RegisterInput {
  email: string;
  password: string;
  name: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export const refreshAccessToken = async () => {
  const response = await authApi.get("/refresh-token", {
    withCredentials: true,
  });
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
  const response = await authApi.delete("/logout", {
    withCredentials: true,
  });
  return response;
};

export const getUser = async () => {
  const response = await authApi.get<GenericResponse>("/user");
  return response.data;
};
