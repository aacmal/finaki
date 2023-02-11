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
exports.getTotalTransactionByPeriods = exports.remove = exports.update = exports.getById = exports.getTransactionByDate = exports.getTransactions = exports.create = void 0;
// create services from Transaction
const mongoose_1 = require("mongoose");
const Transaction_1 = require("../interfaces/Transaction");
const UserService = __importStar(require("./user.service"));
const WalletService = __importStar(require("./wallet.service"));
const transaction_model_1 = __importDefault(require("../models/transaction.model"));
const wallet_model_1 = __importDefault(require("../models/wallet.model"));
// Create new Transaction
async function create(transactionData) {
    try {
        let wallet;
        if (transactionData.walletId) {
            wallet = await wallet_model_1.default.findById(transactionData.walletId);
            if (!wallet)
                throw new Error("Dompet tidak ditemukan");
            if (transactionData.type === Transaction_1.TransactionType.OUT && wallet.balance < transactionData.amount)
                throw new Error("Saldo tidak mencukupi");
        }
        // Create transaction data
        const newTransaction = await transaction_model_1.default.create(transactionData);
        // Push transaction to user and wallet
        await UserService.pushTransaction(newTransaction.userId, newTransaction._id);
        // if transaction has walletId, push transaction to wallet, and update wallet balance
        if (wallet) {
            wallet.transactions.push(newTransaction._id);
            wallet.balance += transactionData.type === Transaction_1.TransactionType.IN ? transactionData.amount : -transactionData.amount;
            await wallet.save();
        }
        return newTransaction;
    }
    catch (error) {
        throw error;
    }
}
exports.create = create;
async function getTransactions(userId, limit) {
    try {
        return await transaction_model_1.default.find({ userId: userId, includeInCalculation: true })
            .sort({ createdAt: -1 })
            .select({ userId: 0, __v: 0, includeInCalculation: 0 })
            .limit(limit !== null && limit !== void 0 ? limit : 0);
    }
    catch (error) {
        throw error;
    }
}
exports.getTransactions = getTransactions;
async function getTransactionByDate(userId, timezone = "Asia/Jakarta") {
    try {
        const allTransactions = await transaction_model_1.default.aggregate([
            {
                $match: {
                    userId: new mongoose_1.Types.ObjectId(userId),
                    includeInCalculation: true,
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
        return await transaction_model_1.default.findById(id);
    }
    catch (error) {
        throw error;
    }
}
exports.getById = getById;
async function update(id, newTransactionData) {
    try {
        const oldTransaction = await transaction_model_1.default.findById(id);
        if (!oldTransaction)
            return;
        const currentWallet = await wallet_model_1.default.findById(oldTransaction.walletId);
        const isTypeChanged = oldTransaction.type !== newTransactionData.type;
        const isAmountChanged = oldTransaction.amount !== newTransactionData.amount;
        oldTransaction.description = newTransactionData.description;
        if (currentWallet && (isTypeChanged || isAmountChanged)) {
            const validateTransaction = (status) => {
                if (status)
                    throw new Error("Tidak dapat melakuakan perubahan pada transaksi ini, karena akan mengakibatkan saldo wallet menjadi minus. Silahkan lakukan perubahan pada jumlah transaksi");
            };
            // explanation of Type out validation:
            // 1. if the old transaction type is OUT, then the new transaction amount must not bring the wallet balance below zero or negative.
            // example: the current balance is 500, then I created a new transaction with amount 500 by Type out,
            // so the balance will be 0. So I will edit transaction amount to 700, this is cannot apply the update because :
            // (oldTransaction.type === TransactionType.OUT && currentWallet.balance - (newTransactionData.amount - oldTransaction.amount) >= 0)
            // 0 - (700 - 500) = -200; -200 is negative number
            // 2. Actually the second condition for if the old transaction type is IN change to OUT
            // example: the current balance is 500, then I created a new transaction with Type In by 500,
            // so the balance will be 1000, then I edit the transaction to Type Out with amount 600, this transaction cannot updated because:
            // currentWallet.balance - (oldTransaction.amount + newTransactionData.amount) >= 0
            // 500 - (500 + 600) = -600; -600 is negative number so return false
            const typeOutValidation = (oldTransaction.type === Transaction_1.TransactionType.OUT &&
                currentWallet.balance - (newTransactionData.amount - oldTransaction.amount) >= 0) ||
                currentWallet.balance - (oldTransaction.amount + newTransactionData.amount) >= 0;
            // explanation of type in validation:
            // 1. validation type IN is simple than OUT, the purpose is for prevent wallet balance to negative same as type OUT too;
            // example: I have two transaction, Transaciton 1 is 600 Type IN and transaction 2 is 600 Type OUT so the balance will be 0;
            // in this case, I will edit Transaction I amount to 300, this is cannot apply the update because:
            // currentWallet.balance - (oldTransaction.amount - newTransactionData.amount) >= 0
            // 0 - (600 - 300) = -300; -300 is negative number then return false to throw Error
            const typeInValidation = currentWallet.balance - (oldTransaction.amount - newTransactionData.amount) >= 0;
            if (newTransactionData.type === Transaction_1.TransactionType.OUT) {
                validateTransaction(!typeOutValidation);
            }
            else if (newTransactionData.type === Transaction_1.TransactionType.IN) {
                validateTransaction(!typeInValidation);
            }
            else {
                throw new Error("Ada yang salah");
            }
            oldTransaction.type = newTransactionData.type;
            oldTransaction.amount = newTransactionData.amount;
            const updatedTransaction = await oldTransaction.save(); // return updated transaction
            // update balance in wallet collection based on transaction type
            await WalletService.updateBalance(updatedTransaction.walletId);
            return updatedTransaction;
        }
        oldTransaction.type = newTransactionData.type;
        oldTransaction.amount = newTransactionData.amount;
        return await oldTransaction.save(); // return updated transaction
    }
    catch (error) {
        throw error;
    }
}
exports.update = update;
async function remove(id) {
    try {
        const transaction = await transaction_model_1.default.findById(id);
        // if transaction not found, return null
        if (!transaction)
            return;
        const wallet = await wallet_model_1.default.findById(transaction.walletId);
        // check if transaction type is out
        // and wallet balance is less than transaction amount then throw error
        if (wallet) {
            if (transaction.type === Transaction_1.TransactionType.IN && wallet.balance < transaction.amount) {
                throw new Error("Tidak dapat menghapus transaksi ini, karena akan mengakibatkan saldo wallet menjadi minus");
            }
            const deletedTransaction = await transaction.delete();
            // remove transactionId from wallet collection
            // and decrese balance or increse balance based on transaction type
            wallet.transactions.pull(deletedTransaction._id);
            wallet.balance -=
                deletedTransaction.type === Transaction_1.TransactionType.IN ? deletedTransaction.amount : -deletedTransaction.amount;
            await wallet.save();
            return deletedTransaction;
        }
        // delete transaction
        const deletedTransaction = await transaction.delete();
        // remove transactionId from user collection
        await UserService.pullTransaction(deletedTransaction.userId, deletedTransaction._id);
        return deletedTransaction;
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
        const totalTranscation = await transaction_model_1.default.aggregate([
            {
                $match: {
                    userId: new mongoose_1.Types.ObjectId(userId),
                    includeInCalculation: true,
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
