import { GenericResponse, LoginResponse } from "@/types/Api";
import { authApi } from "./config";

export interface RegisterInput {
  email: string;
  password: string;
  name: string;
}

const refreshAccessToken = async () => {
  const response = await authApi.get<LoginResponse>("/refresh-token", {
    withCredentials: true,
  });
  return response.data.accessToken;
};

export const loginUser = async (email: string, password: string) => {
  const response = await authApi.post<LoginResponse>("/login", {
    email,
    password,
  });
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

authApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      await refreshAccessToken();
      return authApi(originalRequest);
    }
  }
);
