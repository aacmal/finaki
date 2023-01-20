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

const refreshAccessToken = async () => {
  const response = await authApi.get<LoginResponse>("/refresh-token", {
    withCredentials: true,
  });
  return response.data.accessToken;
};

export const loginUser = async (user: LoginInput) => {
  const response = await authApi.post<LoginResponse>("/sign", user);
  return response.data.accessToken;
};

export const registerUser = async (user: RegisterInput) => {
  const response = await authApi.post("/register", user);
  return response;
};

export const logoutUser = async () => {
  const response = await authApi.delete<GenericResponse>("/logout", {
    withCredentials: true,
  });
  return response.data;
};

export const getUser = async () => {
  const response = await authApi.get<GenericResponse>("/user");
  return response.data;
};

// authApi.interceptors.request.use(
//   async (config) => {
//     const currentDate = new Date();
//     const currentAccessToken = useStore.getState().accessToken;
//     console.log("currentAccessToken", currentAccessToken);

//     const newAccessToken = await refreshAccessToken();

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
