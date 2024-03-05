import axios from "axios";
import jwtDecode, { JwtPayload } from "jwt-decode";

import { refreshAccessToken } from "./authApi";
import { BASE_URL } from "./config";

export const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  async (config) => {
    let currentToken = window?.localStorage.getItem("access-token");

    if (currentToken === null || currentToken === undefined) {
      const refreshToken = await refreshAccessToken();
      window?.localStorage.setItem("access-token", refreshToken.accessToken);
      currentToken = refreshToken.accessToken;
    } else {
      const decodedToken = jwtDecode(currentToken) as JwtPayload;
      const currentTime = new Date().getTime();
      if (!!decodedToken.exp && decodedToken.exp * 1000 < currentTime) {
        const refreshToken = await refreshAccessToken();
        window?.localStorage.setItem("access-token", refreshToken.accessToken);
        currentToken = refreshToken.accessToken;
      }
    }

    config.headers["Authorization"] = `Bearer ${currentToken}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
