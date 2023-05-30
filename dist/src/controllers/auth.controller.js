"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.verifyResetPasswordToken = exports.forgotPassword = exports.logout = exports.refreshToken = exports.sign = exports.register = exports.generateAuthCredential = void 0;
const express_validator_1 = require("express-validator");
const generateToken_1 = require("../utils/generateToken");
const user_model_1 = __importDefault(require("../models/user.model"));
const UserService = __importStar(require("../services/user.service"));
const bcrypt_1 = require("bcrypt");
const token_model_1 = __importDefault(require("../models/token.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const __1 = require("../..");
const crypto_1 = __importDefault(require("crypto"));
const mailService = __importStar(require("../services/mail.service"));
const errorHander_1 = require("../utils/errorHander");
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
async function generateAuthCredential(req, res, user) {
    try {
        // generate access token and refresh token
        const accessToken = (0, generateToken_1.generateAccessToken)(user);
        const refreshToken = (0, generateToken_1.generateRefreshToken)(user);
        // set refresh token as a cookie to the client
        res.cookie("refresh_token", refreshToken, {
            httpOnly: true,
            maxAge: MAX_AGE_REFRESH_TOKEN,
            secure: false,
        });
        const userAgent = req.get("user-agent");
        // save refresh token to database
        const savedRefreshToken = await token_model_1.default.create({
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
exports.generateAuthCredential = generateAuthCredential;
async function register(req, res) {
    const error = (0, express_validator_1.validationResult)(req);
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
        const telegramToken = crypto_1.default.randomBytes(10).toString("hex");
        const newUser = await UserService.create({ email, name, password, token: telegramToken });
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
exports.register = register;
async function sign(req, res) {
    const error = (0, express_validator_1.validationResult)(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }
    try {
        const { email, password } = req.body;
        const user = await user_model_1.default.findOne({ email });
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
        // compare password
        const isPassowrdValid = await (0, bcrypt_1.compare)(password, user.password);
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
exports.sign = sign;
async function refreshToken(req, res) {
    try {
        const refreshToken = req.cookies.refresh_token;
        if (!refreshToken) {
            return res.status(401).json({
                message: "Unauthorizedsadsd",
            });
        }
        const user = await UserService.findByRefreshToken(refreshToken);
        if (!user) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-unused-vars
        jsonwebtoken_1.default.verify(refreshToken, __1.REFRESH_TOKEN_SECRET, (error, decoded) => {
            if (error) {
                return res.status(403).json({
                    message: "Forbidden",
                });
            }
            const accessToken = (0, generateToken_1.generateAccessToken)(user);
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
exports.refreshToken = refreshToken;
async function logout(req, res) {
    try {
        const refreshToken = req.cookies.refresh_token;
        const user = await UserService.findByRefreshToken(refreshToken);
        if (!user) {
            return res.status(500).json({
                message: "Something went wrong",
            });
        }
        const deletedRefreshToken = await token_model_1.default.findOneAndDelete({ token: refreshToken });
        if (!deletedRefreshToken) {
            return res.status(500).json({
                message: "Something went wrong",
            });
        }
        await UserService.pullToken(user._id, deletedRefreshToken === null || deletedRefreshToken === void 0 ? void 0 : deletedRefreshToken._id);
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
exports.logout = logout;
async function forgotPassword(req, res) {
    const error = (0, express_validator_1.validationResult)(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }
    try {
        const { email } = req.body;
        const user = await user_model_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "Email belum terdaftar",
            });
        }
        const token = (0, generateToken_1.generateForgotPasswordToken)(user);
        await mailService.sendForgotPasswordToken(email, token);
        user.resetPasswordToken = token;
        await user.save();
        res.status(200).json({
            message: "Forgot password token has been sent to your email",
        });
    }
    catch (error) {
        res.status(500).json((0, errorHander_1.errorResponse)("root", error.message));
    }
}
exports.forgotPassword = forgotPassword;
async function verifyResetPasswordToken(req, res) {
    try {
        const token = req.query.token;
        if (!token) {
            return res.status(400).json({
                message: "Token is required",
            });
        }
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-unused-vars
        jsonwebtoken_1.default.verify(token, process.env.RESET_PASSWORD_TOKEN_SECRET_KEY, async (error, decoded) => {
            if (error) {
                return res.status(403).json({
                    message: "Forbidden",
                });
            }
            const decodedToken = decoded;
            const user = await user_model_1.default.findOne({ email: decodedToken.email, resetPasswordToken: token });
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
exports.verifyResetPasswordToken = verifyResetPasswordToken;
async function resetPassword(req, res) {
    const error = (0, express_validator_1.validationResult)(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }
    try {
        const { token, password } = req.body;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const decoded = jsonwebtoken_1.default.verify(token, process.env.RESET_PASSWORD_TOKEN_SECRET_KEY);
        const user = await user_model_1.default.findOne({ email: decoded.email });
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        const isPasswordMatch = await (0, bcrypt_1.compare)(password, user.password);
        if (isPasswordMatch) {
            return res.status(400).json({
                message: "Password baru tidak boleh sama dengan password lama",
            });
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
exports.resetPassword = resetPassword;
