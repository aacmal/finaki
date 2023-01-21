import axios from "axios";
import jwtDecode from "jwt-decode";
import { refreshAccessToken } from "./authApi";
import { BASE_URL } from "./config";

export const commonApi = axios.create({
  baseURL: `${BASE_URL}/`,
  headers: {
    "Content-Type": "application/json",
  },
});

commonApi.interceptors.request.use(
  async (config) => {
    let currentToken = window?.localStorage.getItem("access-token");

    if (currentToken === null || currentToken === undefined) {
      const refreshToken = await refreshAccessToken();
      window?.localStorage.setItem(
        "access-token",
        refreshToken.data.access_token
      );
      currentToken = refreshToken.data.access_token;
    } else {
      const decodedToken = jwtDecode(currentToken);
      const currentTime = new Date().getTime();
      if ((decodedToken as any).exp * 1000 < currentTime) {
        const refreshToken = await refreshAccessToken();
        window?.localStorage.setItem(
          "access-token",
          refreshToken.data.access_token
        );
        currentToken = refreshToken.data.access_token;
      }
    }

    config.headers["Authorization"] = `Bearer ${currentToken}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getUserData = async () => {
  const response = await commonApi.get("/user");
  return response.data;
};
