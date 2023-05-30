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
exports.detachTelegramAccount = exports.logoutDevices = exports.getLoggedDevices = exports.getUser = void 0;
const UserService = __importStar(require("../services/user.service"));
const user_model_1 = __importDefault(require("../models/user.model"));
const token_model_1 = __importDefault(require("../models/token.model"));
async function getUser(req, res) {
    var _a, _b;
    try {
        const userId = req.user;
        const user = await UserService.getById(userId);
        if (!user)
            return res.status(404).json({ message: "User not found" });
        res.statusMessage = "User found";
        res.json({
            message: "User has been fetched successfully",
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                token: user.token,
                telegramAccount: {
                    username: (_a = user.telegramAccount) === null || _a === void 0 ? void 0 : _a.username,
                    firstName: (_b = user.telegramAccount) === null || _b === void 0 ? void 0 : _b.first_name,
                },
            },
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
exports.getUser = getUser;
async function getLoggedDevices(req, res) {
    try {
        const userId = req.user;
        const cookie = req.cookies.refresh_token;
        const user = await user_model_1.default.findById(userId).populate({
            path: "refreshTokens",
            select: {
                userAgent: 1,
                createdAt: 1,
                token: 1,
                _id: 1,
            },
        });
        if (!user)
            return res.status(404).json({ message: "User not found" });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const refreshToken = user.refreshTokens.map((token) => ({
            _id: token._id,
            userAgent: token.userAgent,
            createdAt: token.createdAt,
            isCurrent: token.token === cookie,
        }));
        res.json({
            message: "Devices has been fetched successfully",
            data: refreshToken,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
exports.getLoggedDevices = getLoggedDevices;
async function logoutDevices(req, res) {
    try {
        const userId = req.user;
        const cookie = req.cookies.refresh_token;
        const currentToken = await token_model_1.default.findOne({ token: cookie });
        if (!currentToken)
            return res.status(401).json({ message: "Refresh Token not valid" });
        const deviceIds = req.body.deviceIds;
        await user_model_1.default.updateOne({
            _id: userId,
        }, {
            $pull: {
                transactions: {
                    $in: deviceIds,
                },
            },
        });
        await token_model_1.default.deleteMany({
            _id: {
                $in: deviceIds,
            },
        });
        res.json({
            message: "Devices has been logged out successfully",
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
exports.logoutDevices = logoutDevices;
async function detachTelegramAccount(req, res) {
    try {
        const userId = req.user;
        const user = await user_model_1.default.findByIdAndUpdate(userId, {
            telegramAccount: {
                id: null,
            },
        }, {
            new: true,
        }).select({
            name: 1,
            email: 1,
            telegramAccount: 1,
        });
        if (!user)
            return res.status(404).json({ message: "User not found" });
        res.json({
            message: "Telegram account has been detached successfully",
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
exports.detachTelegramAccount = detachTelegramAccount;
