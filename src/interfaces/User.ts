import { UserSchema } from "../models/user.model";
import { InferSchemaType, Document } from "mongoose";

// export interface IUser {
//   _id?: Types.ObjectId | string;
//   name: string;
//   email: string;
//   password: string;
// }

export type IUserModel = InferSchemaType<typeof UserSchema> & Document;

export type IUser = Pick<IUserModel, "_id" | "email" | "password" | "token" | "name" | "telegramAccount">;
