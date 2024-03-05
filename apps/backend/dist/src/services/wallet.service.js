import { Types } from "mongoose";
import UserModel from "../models/token.model";
import TransactionModel from "../models/transaction.model";
import WalletModel from "../models/wallet.model";
import * as UserService from "../services/user.service";
export async function getById(data) {
    try {
        return await WalletModel.findOne({
            _id: data.walletId,
            userId: data.userId,
        });
    }
    catch (error) {
        throw error;
    }
}
export async function getBalance(walletId) {
    try {
        const wallet = await WalletModel.findById(walletId);
        if (!wallet)
            throw new Error("Wallet not found");
        return wallet.balance;
    }
    catch (error) {
        throw error;
    }
}
export async function create(walletData) {
    try {
        const savedWallet = await WalletModel.create(walletData);
        await UserService.pushWallet(walletData.userId, savedWallet._id);
        return savedWallet;
    }
    catch (error) {
        throw error;
    }
}
export async function deleteById(data, deleteTransactions) {
    try {
        const wallet = await WalletModel.findOne({
            _id: data.walletId,
            userId: data.userId,
        });
        if (!wallet)
            return;
        if (deleteTransactions === "true") {
            await TransactionModel.deleteMany({
                _id: {
                    $in: wallet.transactions,
                },
            });
            await UserModel.updateOne({
                _id: wallet.userId,
            }, {
                $pull: {
                    transactions: {
                        $in: wallet.transactions,
                    },
                },
            });
        }
        await UserService.pullWallet(wallet.userId, data.walletId);
        return await wallet.remove();
    }
    catch (error) {
        throw error;
    }
}
export async function updateBalance(walletId) {
    try {
        const currentBalance = await WalletModel.aggregate([
            {
                $match: {
                    _id: new Types.ObjectId(walletId),
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
        await WalletModel.findByIdAndUpdate(walletId, {
            $set: {
                balance: currentBalance[0].balance,
            },
        });
    }
    catch (error) {
        throw error;
    }
}
export async function getTotalBalance(userId) {
    try {
        const totalBalance = await WalletModel.aggregate([
            {
                $match: {
                    userId: new Types.ObjectId(userId),
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
export async function balanceHistory(walletId, interval) {
    try {
        const intervals = interval === "week" ? 7 : 30;
        const dateInterval = new Date().setDate(new Date().getDate() - intervals);
        const walletTransactionsPerDay = await TransactionModel.aggregate([
            {
                $match: {
                    walletId: new Types.ObjectId(walletId),
                },
            },
            {
                $group: {
                    _id: {
                        day: {
                            $dayOfMonth: {
                                date: "$createdAt",
                                timezone: "Asia/Jakarta",
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
                },
            },
            {
                $limit: intervals,
            },
            {
                $sort: {
                    timestamp: 1,
                },
            },
            {
                $project: {
                    _id: "$_id.day",
                    timestamp: 1,
                    in: 1,
                    out: 1,
                },
            },
        ]);
        const balanceHistoryResult = [];
        let lastBalance = 0;
        for (let i = 1; i <= intervals; i++) {
            const date = new Date(dateInterval);
            date.setDate(date.getDate() + i);
            const walletTransaction = walletTransactionsPerDay.find((transaction) => transaction._id === date.getDate());
            lastBalance = walletTransaction
                ? lastBalance + (walletTransaction.in - walletTransaction.out)
                : lastBalance;
            balanceHistoryResult.push({
                timestamp: date,
                value: lastBalance,
            });
        }
        return balanceHistoryResult;
    }
    catch (error) {
        throw error;
    }
}
export async function getWalletTransactions(data) {
    try {
        const transactions = await TransactionModel.find({
            walletId: new Types.ObjectId(data.walletId),
            userId: new Types.ObjectId(data.walletId),
        });
        return transactions;
    }
    catch (error) {
        throw error;
    }
}
