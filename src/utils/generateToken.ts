/* eslint-disable @typescript-eslint/no-non-null-assertion */
import jwt from "jsonwebtoken";
import { IUser } from "../../types/User";

export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET_KEY;
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET_KEY;

export function generateAccessToken(user: IUser) {
  return jwt.sign({ _id: user._id, name: user.name }, ACCESS_TOKEN_SECRET!, { expiresIn: "15m" });
}

export function generateRefreshToken(user: IUser) {
  // console.log(REFRESH_TOKEN_SECRET);

  return jwt.sign({ _id: user._id, name: user.name }, REFRESH_TOKEN_SECRET!, { expiresIn: "30d" });
}
