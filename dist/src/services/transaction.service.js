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
exports.getRecentTransactions = exports.getTotalTransactionByPeriods = exports.getTransactionByDate = exports.remove = exports.update = exports.getById = exports.getTransactions = exports.create = void 0;
// create services from Transaction
const mongoose_1 = require("mongoose");
const Transaction_1 = __importDefault(require("../models/Transaction"));
const UserService = __importStar(require("./user.service"));
const WalletService = __importStar(require("./wallet.service"));
// Path: src\services\transaction.service.ts
async function create(transactionData) {
    try {
        if (transactionData.walletId) {
            const wallet = await WalletService.getById(transactionData.walletId);
            if (!wallet)
                throw new Error("Wallet not found");
            if (transactionData.type === "out" && wallet.balance < transactionData.amount)
                throw new Error("Insufficient balance");
        }
        // Create transaction
        const transaction = new Transaction_1.default(transactionData);
        const newTransaction = await transaction.save();
        // Push transaction to user and wallet
        await UserService.pushTransaction(newTransaction.userId, newTransaction._id);
        // if walletId null or undefined, don't push transaction to wallet
        await WalletService.pushTransaction(newTransaction.walletId, newTransaction._id, newTransaction.type === "in" ? newTransaction.amount : -newTransaction.amount);
        return newTransaction;
    }
    catch (error) {
        throw error;
    }
}
exports.create = create;
async function getTransactions(userId, limit) {
    try {
        return await Transaction_1.default.find({ userId: userId })
            .sort({ createdAt: -1 })
            .select({ userId: 0, __v: 0 })
            .limit(limit !== null && limit !== void 0 ? limit : 0);
    }
    catch (error) {
        throw error;
    }
}
exports.getTransactions = getTransactions;
async function getTransactionByDate(userId, timezone = "Asia/Jakarta") {
    try {
        const allTransactions = await Transaction_1.default.aggregate([
            {
                $match: {
                    userId: new mongoose_1.Types.ObjectId(userId),
                },
            },
            {
                $sort: {
                    createdAt: -1,
                },
            },
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: "%d-%m-%Y",
                            date: "$createdAt",
                            timezone: timezone,
                        },
                    },
                    timestamp: {
                        $first: "$createdAt",
                    },
                    transactions: {
                        $push: {
                            _id: "$_id",
                            description: "$description",
                            amount: "$amount",
                            type: "$type",
                            category: "$category",
                            time: {
                                $dateToString: {
                                    format: "%H:%M",
                                    date: "$createdAt",
                                    timezone: timezone,
                                },
                            },
                        },
                    },
                },
            },
            {
                $sort: {
                    timestamp: -1,
                },
            },
        ]);
        return allTransactions;
    }
    catch (error) {
        throw error;
    }
}
exports.getTransactionByDate = getTransactionByDate;
async function getById(id) {
    try {
        return await Transaction_1.default.findById(id);
    }
    catch (error) {
        throw error;
    }
}
exports.getById = getById;
async function update(id, transactionData) {
    try {
        return await Transaction_1.default.findByIdAndUpdate(id, transactionData, {
            new: true,
        });
    }
    catch (error) {
        throw error;
    }
}
exports.update = update;
async function remove(id) {
    try {
        const deletedTransacion = await Transaction_1.default.findByIdAndDelete(id);
        if (!deletedTransacion)
            throw new Error("Transaction not found");
        await UserService.pullTransaction(deletedTransacion.userId, deletedTransacion._id);
        await WalletService.pullTransaction(deletedTransacion.walletId, deletedTransacion._id, deletedTransacion.type === "in" ? deletedTransacion.amount : -deletedTransacion.amount);
        return deletedTransacion;
    }
    catch (error) {
        throw error;
    }
}
exports.remove = remove;
async function getTotalTransactionByPeriods(userId, interval, timezone = "Asia/Jakarta") {
    const intervals = interval === "week" ? 7 : 30;
    const dateInterval = new Date().setDate(new Date().getDate() - intervals);
    try {
        const totalTranscation = await Transaction_1.default.aggregate([
            {
                $match: {
                    userId: new mongoose_1.Types.ObjectId(userId),
                },
            },
            {
                $group: {
                    _id: {
                        day: {
                            $dayOfMonth: {
                                date: "$createdAt",
                                timezone: timezone,
                            },
                        },
                    },
                    timestamp: {
                        $first: "$createdAt",
                    },
                    in: {
                        $sum: {
                            $cond: [{ $eq: ["$type", "in"] }, "$amount", 0],
                        },
                    },
                    out: {
                        $sum: {
                            $cond: [{ $eq: ["$type", "out"] }, "$amount", 0],
                        },
                    },
                    totalAmount: {
                        $sum: "$amount",
                    },
                },
            },
            { $limit: intervals },
            {
                $sort: {
                    timestamp: 1,
                },
            },
            {
                $project: {
                    _id: 1,
                    timestamp: 1,
                    in: 1,
                    out: 1,
                    totalAmount: 1,
                },
            },
        ]);
        const totalTransactionByPeriods = [];
        for (let i = 1; i <= intervals; i++) {
            const date = new Date(dateInterval);
            date.setDate(date.getDate() + i);
            const transaction = totalTranscation.find((transaction) => transaction._id.day === date.getDate());
            totalTransactionByPeriods.push({
                _id: {
                    day: date.getDate(),
                },
                timestamp: date,
                in: transaction ? transaction.in : 0,
                out: transaction ? transaction.out : 0,
                totalAmount: transaction ? transaction.totalAmount : 0,
            });
        }
        return totalTransactionByPeriods;
    }
    catch (error) {
        throw error;
    }
}
exports.getTotalTransactionByPeriods = getTotalTransactionByPeriods;
async function getRecentTransactions(userId, limit) {
    try {
        return await Transaction_1.default.find({ userId })
            .sort({ createdAt: -1 })
            .limit(limit)
            .select({ userId: 0, __v: 0, updatedAt: 0 });
    }
    catch (error) {
        throw error;
    }
}
exports.getRecentTransactions = getRecentTransactions;
