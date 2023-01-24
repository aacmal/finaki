"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = exports.generateAccessToken = void 0;
/* eslint-disable @typescript-eslint/no-non-null-assertion */
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const __1 = require("../..");
function generateAccessToken(user) {
    return jsonwebtoken_1.default.sign({ _id: user._id, name: user.name }, __1.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
}
exports.generateAccessToken = generateAccessToken;
function generateRefreshToken(user) {
    // console.log(REFRESH_TOKEN_SECRET);
    return jsonwebtoken_1.default.sign({ _id: user._id, name: user.name }, __1.REFRESH_TOKEN_SECRET, { expiresIn: "90d" });
}
exports.generateRefreshToken = generateRefreshToken;
