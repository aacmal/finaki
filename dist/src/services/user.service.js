"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pullWallet = exports.pushWallet = exports.findByRefreshToken = exports.pullToken = exports.pushToken = exports.pullTransaction = exports.pushTransaction = exports.isUnique = exports.getById = exports.create = void 0;
const User_1 = __importDefault(require("../models/User"));
const RefreshToken_1 = __importDefault(require("../models/RefreshToken"));
async function isUnique(email) {
    const user = await User_1.default.findOne({ email });
    return (user === null || user === void 0 ? void 0 : user.email) === email;
}
exports.isUnique = isUnique;
async function create(userData) {
    try {
        const user = new User_1.default(userData);
        return await user.save();
    }
    catch (error) {
        throw error;
    }
}
exports.create = create;
async function getById(userId) {
    try {
        const user = await User_1.default.findById(userId);
        return user;
    }
    catch (error) {
        throw error;
    }
}
exports.getById = getById;
async function pushTransaction(userId, transactionId) {
    try {
        const user = await User_1.default.findById(userId);
        if (user) {
            user.transactions.push(transactionId);
            await user.save();
        }
    }
    catch (error) {
        throw error;
    }
}
exports.pushTransaction = pushTransaction;
async function pullTransaction(userId, transactionId) {
    try {
        await User_1.default.findByIdAndUpdate({
            _id: userId,
        }, {
            $pull: {
                transactions: transactionId,
            },
        }, {
            new: true,
        });
    }
    catch (error) {
        throw error;
    }
}
exports.pullTransaction = pullTransaction;
async function pushToken(userId, tokenId) {
    try {
        const user = await User_1.default.findById(userId);
        if (user) {
            user.refreshTokens.push(tokenId);
            await user.save();
        }
    }
    catch (error) {
        throw error;
    }
}
exports.pushToken = pushToken;
async function pullToken(userId, tokenId) {
    try {
        await User_1.default.findByIdAndUpdate({
            _id: userId,
        }, {
            $pull: {
                refreshTokens: tokenId,
            },
        }, {
            new: true,
        });
    }
    catch (error) {
        throw error;
    }
}
exports.pullToken = pullToken;
async function pushWallet(userId, walletId) {
    try {
        console.log("pushWallet");
        await User_1.default.findByIdAndUpdate({
            _id: userId,
        }, {
            $push: {
                wallets: walletId,
            },
        }, {
            new: true,
        });
    }
    catch (error) {
        throw error;
    }
}
exports.pushWallet = pushWallet;
async function pullWallet(userId, walletId) {
    try {
        await User_1.default.findByIdAndUpdate({
            _id: userId,
        }, {
            $pull: {
                wallets: walletId,
            },
        }, {
            new: true,
        });
    }
    catch (error) {
        throw error;
    }
}
exports.pullWallet = pullWallet;
async function findByRefreshToken(token) {
    try {
        const tokenResult = await RefreshToken_1.default.findOne({ token }).populate("userId", { refreshTokens: 0, transactions: 0 });
        return tokenResult === null || tokenResult === void 0 ? void 0 : tokenResult.userId;
    }
    catch (error) {
        throw error;
    }
}
exports.findByRefreshToken = findByRefreshToken;
