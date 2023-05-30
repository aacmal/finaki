"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findByRefreshToken = exports.pullWallet = exports.pushWallet = exports.pullToken = exports.pushToken = exports.pullTransaction = exports.pushTransaction = exports.getById = exports.create = exports.isUnique = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const token_model_1 = __importDefault(require("../models/token.model"));
async function isUnique(email) {
    const user = await user_model_1.default.findOne({ email });
    return (user === null || user === void 0 ? void 0 : user.email) === email;
}
exports.isUnique = isUnique;
async function create(userData) {
    try {
        const user = new user_model_1.default(userData);
        return await user.save();
    }
    catch (error) {
        throw error;
    }
}
exports.create = create;
async function getById(userId) {
    try {
        const user = await user_model_1.default.findById(userId);
        return user;
    }
    catch (error) {
        throw error;
    }
}
exports.getById = getById;
async function pushTransaction(userId, transactionId) {
    try {
        const user = await user_model_1.default.findById(userId);
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
        await user_model_1.default.findByIdAndUpdate({
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
        const user = await user_model_1.default.findById(userId);
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
        await user_model_1.default.findByIdAndUpdate({
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
        await user_model_1.default.findByIdAndUpdate({
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
        await user_model_1.default.findByIdAndUpdate({
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
        const tokenResult = await token_model_1.default.findOne({ token }).populate("userId", { refreshTokens: 0, transactions: 0 });
        return tokenResult === null || tokenResult === void 0 ? void 0 : tokenResult.userId;
    }
    catch (error) {
        throw error;
    }
}
exports.findByRefreshToken = findByRefreshToken;
