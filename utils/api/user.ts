import { instance } from "./api";
import { UserDevicesResponse, UserResponse } from "./types/UserAPI";

export const getUserData = async () => {
  const response = await instance.get<UserResponse>("/user");
  return response.data.data;
};

export const getUserDevices = async () => {
  const response = await instance.get<UserDevicesResponse>("/user/devices", {
    withCredentials: true,
  });
  return response.data.data;
}

export const logoutDevices = async (deviceIds: string[]) => {
  const response = await instance.post("/user/devices", { deviceIds }, {
    withCredentials: true,
  });
  return response.data.data;
}