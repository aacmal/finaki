import { User } from "@/types/User";
import { GenericResponse } from "./Api";

export interface UserResponse extends GenericResponse {
  data: User;
}
