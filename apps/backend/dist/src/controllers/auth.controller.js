import crypto from "crypto";
import { compare } from "bcrypt";
import dotenv from "dotenv";
import { validationResult } from "express-validator";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";
import { REFRESH_TOKEN_SECRET } from "../../index";
import TokenModel from "../models/token.model";
import UserModel from "../models/user.model";
import * as mailService from "../services/mail.service";
import * as UserService from "../services/user.service";
import { errorResponse } from "../utils/errorHander";
import { generateAccessToken, generateForgotPasswordToken, generateRefreshToken, } from "../utils/generateToken";
dotenv.config();
const MAX_AGE_REFRESH_TOKEN = 3 * 30 * 24 * 60 * 60 * 1000; // 3 months
/**
 * A Promise that returns a string of access token after user logged in or registered
 * function to Generate access token and refresh token then set the refresh token as a cookie to the client then store the refresh token to the database.
 *
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @param {IUser} user - User object
 *
 * @returns {string} access token string
 **/
export async function generateAuthCredential(req, res, user) {
    try {
        // generate access token and refresh token
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        // set refresh token as a cookie to the client
        res.cookie("refresh_token", refreshToken, {
            httpOnly: true,
            maxAge: MAX_AGE_REFRESH_TOKEN,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none",
        });
        const userAgent = req.get("user-agent");
        // save refresh token to database
        const savedRefreshToken = await TokenModel.create({
            userId: user._id,
            token: refreshToken,
            userAgent: userAgent,
        });
        await UserService.pushToken(user._id, savedRefreshToken._id);
        return accessToken;
    }
    catch (error) {
        throw error;
    }
}
export async function register(req, res) {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }
    try {
        const { email, name, password } = req.body;
        if (await UserService.isUnique(email)) {
            return res.status(400).json({
                errors: [
                    {
                        msg: "Email telah terdaftar",
                        param: "email",
                    },
                ],
            });
        }
        const telegramToken = crypto.randomBytes(10).toString("hex");
        const newUser = await UserService.create({
            email,
            name,
            password,
            token: telegramToken,
        });
        // generate access token and refresh token
        const accessToken = await generateAuthCredential(req, res, newUser);
        res.status(200).json({
            message: "User has been created successfully",
            data: {
                accessToken,
            },
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}
export async function sign(req, res) {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                errors: [
                    {
                        msg: "Email tidak terdaftar",
                        param: "email",
                    },
                ],
            });
        }
        if (!user.password) {
            return res.status(400).json({
                errors: [
                    {
                        msg: "Email ini telah terdaftar dengan Google. Silahkan login dengan Google",
                        param: "email",
                    },
                ],
            });
        }
        // compare password
        const isPassowrdValid = await compare(password, user.password);
        if (!isPassowrdValid) {
            return res.status(400).json({
                errors: [
                    {
                        msg: "Password salah",
                        param: "password",
                    },
                ],
            });
        }
        // generate access token and refresh token
        const accessToken = await generateAuthCredential(req, res, user);
        res.status(200).json({
            message: "User has been logged in successfully",
            data: {
                accessToken,
            },
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}
export async function refreshToken(req, res) {
    try {
        const refreshToken = req.cookies.refresh_token;
        if (!refreshToken) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }
        const user = await UserService.findByRefreshToken(refreshToken);
        if (!user) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-unused-vars
        jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (error, decoded) => {
            if (error) {
                return res.status(403).json({
                    message: "Forbidden",
                });
            }
            const accessToken = generateAccessToken(user);
            res.status(200).json({
                message: "Access token has been refreshed successfully",
                data: {
                    accessToken,
                },
            });
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}
export async function logout(req, res) {
    try {
        const refreshToken = req.cookies.refresh_token;
        const user = await UserService.findByRefreshToken(refreshToken);
        if (!user) {
            return res.status(500).json({
                message: "Something went wrong",
            });
        }
        const deletedRefreshToken = await TokenModel.findOneAndDelete({
            token: refreshToken,
        });
        if (!deletedRefreshToken) {
            return res.status(500).json({
                message: "Something went wrong",
            });
        }
        await UserService.pullToken(user._id, deletedRefreshToken?._id);
        res.status(200).json({
            message: "User has been logged out successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}
export async function forgotPassword(req, res) {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }
    try {
        const { email } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "Email belum terdaftar",
            });
        }
        const token = generateForgotPasswordToken(user);
        await mailService.sendForgotPasswordToken(email, token);
        user.resetPasswordToken = token;
        await user.save();
        res.status(200).json({
            message: "Forgot password token has been sent to your email",
        });
    }
    catch (error) {
        res.status(500).json(errorResponse("root", error.message));
    }
}
export async function verifyResetPasswordToken(req, res) {
    try {
        const token = req.query.token;
        if (!token) {
            return res.status(400).json({
                message: "Token is required",
            });
        }
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-unused-vars
        jwt.verify(token, process.env.RESET_PASSWORD_TOKEN_SECRET_KEY, async (error, decoded) => {
            if (error) {
                return res.status(403).json({
                    message: "Forbidden",
                });
            }
            const decodedToken = decoded;
            const user = await UserModel.findOne({
                email: decodedToken.email,
                resetPasswordToken: token,
            });
            if (!user) {
                return res.status(403).json({
                    message: "Forbidden",
                    data: false,
                });
            }
            res.status(200).json({
                message: "Token is valid",
                data: true,
            });
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}
export async function resetPassword(req, res) {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }
    try {
        const { token, password } = req.body;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const decoded = jwt.verify(token, process.env.RESET_PASSWORD_TOKEN_SECRET_KEY);
        const user = await UserModel.findOne({ email: decoded.email });
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        // if user has password, check if the new password is the same as the old one
        if (user.password) {
            const isPasswordMatch = await compare(password, user.password);
            if (isPasswordMatch) {
                return res.status(400).json({
                    message: "Password baru tidak boleh sama dengan password lama",
                });
            }
        }
        user.password = password;
        user.resetPasswordToken = "";
        await user.save();
        res.status(200).json({
            message: "Password berhasil diubah",
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}
export async function loginWithGoogle(req, res) {
    try {
        const oAuth2Client = new OAuth2Client(process.env.CLIENT_ID, process.env.CLIENT_SECRET, "postmessage");
        const { code } = req.body;
        if (!code) {
            return res.status(400).json({
                message: "Token is required",
            });
        }
        const { tokens } = await oAuth2Client.getToken(code);
        if (!tokens.id_token)
            return res.status(400).json({
                message: "Something went wrong",
            });
        const decodedIdToken = jwtDecode(tokens.id_token);
        const user = await UserModel.findOne({ email: decodedIdToken.email });
        if (!user) {
            // if user not registered yet, register the user
            const telegramToken = crypto.randomBytes(10).toString("hex");
            const newUser = await UserService.create({
                email: decodedIdToken.email,
                name: decodedIdToken.name,
                token: telegramToken,
            });
            // generate access token and refresh token
            const accessToken = await generateAuthCredential(req, res, newUser);
            return res.status(200).json({
                message: "User has been created successfully",
                data: {
                    accessToken,
                },
            });
        }
        // generate access token and refresh token
        const accessToken = await generateAuthCredential(req, res, user);
        res.status(200).json({
            message: "User has been logged in successfully",
            data: {
                accessToken,
            },
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}
