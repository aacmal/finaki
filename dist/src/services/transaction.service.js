"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecentTransactions = exports.getTotalTransactionByPeriods = exports.getTransactionByUser = exports.remove = exports.update = exports.getById = exports.getAll = exports.create = void 0;
// create services from Transaction
const mongoose_1 = require("mongoose");
const Transaction_1 = __importDefault(require("../models/Transaction"));
// Path: src\services\transaction.service.ts
async function create(transactionData) {
    try {
        const transaction = new Transaction_1.default(transactionData);
        return await transaction.save();
    }
    catch (error) {
        throw error;
    }
}
exports.create = create;
async function getAll() {
    try {
        return await Transaction_1.default.find();
    }
    catch (error) {
        throw error;
    }
}
exports.getAll = getAll;
async function getTransactionByUser(userId, timezone = "Asia/Jakarta") {
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
                    _id: -1,
                },
            },
        ]);
        return allTransactions;
    }
    catch (error) {
        throw error;
    }
}
exports.getTransactionByUser = getTransactionByUser;
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
        return await Transaction_1.default.findByIdAndDelete(id);
    }
    catch (error) {
        throw error;
    }
}
exports.remove = remove;
async function getTotalTransactionByPeriods(userId, interval, timezone = "Asia/Jakarta") {
    const intervals = interval === "week" ? 7 : 30;
    const dateInterval = new Date().setDate(new Date().getDate() - intervals);
    const currentDate = new Date();
    const bounds = [new Date(dateInterval), currentDate];
    try {
        const totalTranscation = await Transaction_1.default.aggregate([
            {
                $match: {
                    userId: new mongoose_1.Types.ObjectId(userId),
                },
            },
            {
                $densify: {
                    field: "createdAt",
                    range: {
                        step: 1,
                        unit: "day",
                        bounds: bounds,
                    },
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
            {
                $sort: {
                    timestamp: -1,
                },
            },
            { $limit: intervals },
            {
                $sort: {
                    timestamp: 1,
                },
            },
        ]);
        return totalTranscation;
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
