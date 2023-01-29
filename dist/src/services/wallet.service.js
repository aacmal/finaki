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
exports.updateBalance = exports.decreseBalance = exports.increseBalance = exports.deleteById = exports.create = exports.getBalance = exports.getById = exports.pullTransaction = exports.pushTransaction = void 0;
const mongoose_1 = require("mongoose");
const Wallet_1 = __importDefault(require("../models/Wallet"));
const UserService = __importStar(require("./user.service"));
async function pushTransaction(walletId, transactionId, amount) {
    try {
        if (!walletId)
            return;
        await Wallet_1.default.findByIdAndUpdate({
            _id: walletId,
        }, {
            $push: {
                transactions: transactionId,
            },
            $inc: {
                balance: amount,
            },
        }, {
            new: true,
        });
    }
    catch (error) {
        throw error;
    }
}
exports.pushTransaction = pushTransaction;
async function pullTransaction(walletId, transactionId, amount) {
    try {
        if (!walletId)
            return;
        await Wallet_1.default.findByIdAndUpdate({
            _id: walletId,
        }, {
            $pull: {
                transactions: transactionId,
            },
            $inc: {
                balance: -amount,
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
async function getById(walletId) {
    try {
        return await Wallet_1.default.findById(walletId);
    }
    catch (error) {
        throw error;
    }
}
exports.getById = getById;
async function getBalance(walletId) {
    try {
        const wallet = await Wallet_1.default.findById(walletId);
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
        const wallet = new Wallet_1.default(walletData);
        const savedWallet = await wallet.save();
        await UserService.pushWallet(walletData.userId, savedWallet._id);
        return savedWallet;
    }
    catch (error) {
        throw error;
    }
}
exports.create = create;
async function deleteById(walletId) {
    try {
        const wallet = await Wallet_1.default.findById(walletId);
        if (!wallet)
            return;
        await UserService.pullWallet(wallet.userId, walletId);
        return await wallet.remove();
    }
    catch (error) {
        throw error;
    }
}
exports.deleteById = deleteById;
async function increseBalance(walletId, amount) {
    try {
        const wallet = await Wallet_1.default.findById(walletId);
        if (wallet) {
            wallet.balance = wallet.balance + amount;
            await wallet.save();
        }
    }
    catch (error) {
        throw error;
    }
}
exports.increseBalance = increseBalance;
async function decreseBalance(walletId, amount) {
    try {
        const wallet = await Wallet_1.default.findById(walletId);
        if (wallet) {
            wallet.balance = wallet.balance - amount;
            await wallet.save();
        }
    }
    catch (error) {
        throw error;
    }
}
exports.decreseBalance = decreseBalance;
async function updateBalance(walletId) {
    try {
        const currentBalance = await Wallet_1.default.aggregate([
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
        console.log("currentBalance", currentBalance[0].balance);
        await Wallet_1.default.findByIdAndUpdate(walletId, {
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
