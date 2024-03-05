import { User } from "@/types/User";

import { GenericResponse } from "./Api";

export interface UserResponse extends GenericResponse {
  data: User;
}

export interface UserDevicesResponse extends GenericResponse {
  data: {
    userAgent: string;
    createdAt: string;
    isCurrent: boolean;
    _id: string;
  }[];
}
