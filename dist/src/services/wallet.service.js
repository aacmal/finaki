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
exports.getTotalBalance = exports.updateBalance = exports.deleteById = exports.create = exports.getBalance = exports.getById = void 0;
const mongoose_1 = require("mongoose");
const UserService = __importStar(require("../services/user.service"));
const wallet_model_1 = __importDefault(require("../models/wallet.model"));
const transaction_model_1 = __importDefault(require("../models/transaction.model"));
const token_model_1 = __importDefault(require("../models/token.model"));
async function getById(walletId) {
    try {
        return await wallet_model_1.default.findById(walletId);
    }
    catch (error) {
        throw error;
    }
}
exports.getById = getById;
async function getBalance(walletId) {
    try {
        const wallet = await wallet_model_1.default.findById(walletId);
        if (!wallet)
            throw new Error("Wallet not found");
        return wallet.balance;
    }
    catch (error) {
        throw error;
    }
}
exports.getBalance = getBalance;
async function create(walletData) {
    try {
        const savedWallet = await wallet_model_1.default.create(walletData);
        await UserService.pushWallet(walletData.userId, savedWallet._id);
        return savedWallet;
    }
    catch (error) {
        throw error;
    }
}
exports.create = create;
async function deleteById(walletId, deleteTransactions) {
    try {
        const wallet = await wallet_model_1.default.findById(walletId);
        if (!wallet)
            return;
        if (deleteTransactions === "true") {
            await transaction_model_1.default.deleteMany({
                _id: {
                    $in: wallet.transactions,
                },
            });
            await token_model_1.default.updateOne({
                _id: wallet.userId,
            }, {
                $pull: {
                    transactions: {
                        $in: wallet.transactions,
                    },
                },
            });
        }
        await UserService.pullWallet(wallet.userId, walletId);
        return await wallet.remove();
    }
    catch (error) {
        throw error;
    }
}
exports.deleteById = deleteById;
async function updateBalance(walletId) {
    try {
        const currentBalance = await wallet_model_1.default.aggregate([
            {
                $match: {
                    _id: new mongoose_1.Types.ObjectId(walletId),
                },
            },
            {
                $lookup: {
                    from: "transactions",
                    localField: "transactions",
                    foreignField: "_id",
                    as: "transaction",
                },
            },
            {
                $project: {
                    balance: {
                        $sum: {
                            $map: {
                                input: "$transaction",
                                in: {
                                    $cond: [
                                        {
                                            $eq: ["$$this.type", "in"],
                                        },
                                        "$$this.amount",
                                        {
                                            $multiply: ["$$this.amount", -1],
                                        },
                                    ],
                                },
                            },
                        },
                    },
                },
            },
        ]);
        if (!currentBalance[0])
            throw new Error("Wallet not found");
        await wallet_model_1.default.findByIdAndUpdate(walletId, {
            $set: {
                balance: currentBalance[0].balance,
            },
        });
    }
    catch (error) {
        throw error;
    }
}
exports.updateBalance = updateBalance;
async function getTotalBalance(userId) {
    try {
        const totalBalance = await wallet_model_1.default.aggregate([
            {
                $match: {
                    userId: new mongoose_1.Types.ObjectId(userId),
                },
            },
            {
                $group: {
                    _id: "$userId",
                    totalBalance: {
                        $sum: "$balance",
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                    totalBalance: 1,
                },
            },
        ]);
        if (!totalBalance[0])
            return 0;
        return totalBalance[0].totalBalance;
    }
    catch (error) {
        throw error;
    }
}
exports.getTotalBalance = getTotalBalance;
