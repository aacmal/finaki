"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = exports.generateAccessToken = exports.REFRESH_TOKEN_SECRET = exports.ACCESS_TOKEN_SECRET = void 0;
/* eslint-disable @typescript-eslint/no-non-null-assertion */
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET_KEY;
exports.REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET_KEY;
function generateAccessToken(user) {
    return jsonwebtoken_1.default.sign({ _id: user._id, name: user.name }, exports.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
}
exports.generateAccessToken = generateAccessToken;
function generateRefreshToken(user) {
    // console.log(REFRESH_TOKEN_SECRET);
    return jsonwebtoken_1.default.sign({ _id: user._id, name: user.name }, exports.REFRESH_TOKEN_SECRET, { expiresIn: "30d" });
}
exports.generateRefreshToken = generateRefreshToken;
