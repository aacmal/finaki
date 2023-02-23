import { instance } from "./api";
import { UserResponse } from "./types/UserAPI";

export const getUserData = async () => {
  const response = await instance.get<UserResponse>("/user");
  return response.data.data;
};
