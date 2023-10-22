"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateForgotPasswordToken = exports.generateRefreshToken = exports.generateAccessToken = void 0;
/* eslint-disable @typescript-eslint/no-non-null-assertion */
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const __1 = require("../..");
function generateAccessToken(user) {
    return jsonwebtoken_1.default.sign({ _id: user._id, name: user.name }, __1.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.NODE_ENV === "production" ? "10m" : "1h",
    });
}
exports.generateAccessToken = generateAccessToken;
function generateRefreshToken(user) {
    // console.log(REFRESH_TOKEN_SECRET);
    return jsonwebtoken_1.default.sign({ _id: user._id, name: user.name }, __1.REFRESH_TOKEN_SECRET, { expiresIn: "90d" });
}
exports.generateRefreshToken = generateRefreshToken;
function generateForgotPasswordToken(user) {
    return jsonwebtoken_1.default.sign({ email: user.email }, process.env.RESET_PASSWORD_TOKEN_SECRET_KEY, {
        expiresIn: "30m",
    });
}
exports.generateForgotPasswordToken = generateForgotPasswordToken;
