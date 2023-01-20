import jwtDecode from "jwt-decode";
import { refreshAccessToken } from "./authApi";
import { commonApi } from "./config";

commonApi.interceptors.request.use(
  async (config) => {
    let currentToken = localStorage.getItem("access-token");

    if (currentToken === null || currentToken === undefined) {
      const refreshToken = await refreshAccessToken();
      localStorage.setItem("access-token", refreshToken.data.access_token);
      currentToken = refreshToken.data.access_token;
    } else {
      const decodedToken = jwtDecode(currentToken);
      const currentTime = new Date().getTime();
      if ((decodedToken as any).exp * 1000 < currentTime) {
        const refreshToken = await refreshAccessToken();
        console.log(refreshToken);
        localStorage.setItem("access-token", refreshToken.data.access_token);
        currentToken = refreshToken.data.access_token;
      }
    }

    config.headers["Authorization"] = currentToken;

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
