/* eslint-disable @typescript-eslint/no-non-null-assertion */
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../../index";
export function generateAccessToken(user) {
    return jwt.sign({ _id: user._id, name: user.name }, ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.NODE_ENV === "production" ? "10m" : "1h",
    });
}
export function generateRefreshToken(user) {
    // console.log(REFRESH_TOKEN_SECRET);
    return jwt.sign({ _id: user._id, name: user.name }, REFRESH_TOKEN_SECRET, {
        expiresIn: "90d",
    });
}
export function generateForgotPasswordToken(user) {
    return jwt.sign({ email: user.email }, process.env.RESET_PASSWORD_TOKEN_SECRET_KEY, {
        expiresIn: "30m",
    });
}
