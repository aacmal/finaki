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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllTransactions = exports.getTotalTransaction = exports.getTransactionById = exports.deleteTransaction = exports.updateTransaction = exports.createTransaction = exports.getAllTransactionsByDate = void 0;
// import Transaction from "../models/Transaction";
const express_validator_1 = require("express-validator");
const TransactionService = __importStar(require("../services/transaction.service"));
async function getAllTransactionsByDate(req, res) {
    try {
        // const transactions = await Transaction.getAll();
        const userId = req.user;
        const transactions = await TransactionService.getTransactionByDate(userId);
        res.json(transactions);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
exports.getAllTransactionsByDate = getAllTransactionsByDate;
async function createTransaction(req, res) {
    const error = (0, express_validator_1.validationResult)(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }
    try {
        const userId = req.user;
        const { description, note, amount, type, walletId } = req.body;
        const newTransaction = await TransactionService.create({ userId, description, note, amount, type, walletId });
        res.status(201).json({
            message: "Transaction has been created successfully",
            data: newTransaction,
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
exports.createTransaction = createTransaction;
async function updateTransaction(req, res) {
    const error = (0, express_validator_1.validationResult)(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }
    try {
        const id = req.params.id;
        const { description, amount, type } = req.body;
        const updatedTransaction = await TransactionService.update(id, { description, amount, type });
        if (!updatedTransaction)
            return res.status(404).json({ message: "Transaction not found" });
        res.json({
            message: "Transaction has been updated successfully",
            data: updatedTransaction,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
exports.updateTransaction = updateTransaction;
async function deleteTransaction(req, res) {
    try {
        const id = req.params.id;
        const deletedTransaction = await TransactionService.remove(id);
        // console.log(deletedTransaction);
        if (!deletedTransaction)
            return res.status(404).json({ message: "Transaction not found" });
        res.json({
            message: "Transaction has been deleted successfully",
            data: {
                _id: deletedTransaction._id,
            },
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
exports.deleteTransaction = deleteTransaction;
async function getTransactionById(req, res) {
    try {
        const id = req.params.id;
        const transaction = await TransactionService.getById(id);
        res.json({
            message: "Transaction has been fetched successfully",
            data: transaction,
        });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}
exports.getTransactionById = getTransactionById;
async function getTotalTransaction(req, res) {
    var _a;
    try {
        const userId = req.user;
        const interval = (_a = req.query.interval) !== null && _a !== void 0 ? _a : "week";
        const timezone = "Asia/Jakarta";
        const totalTranscation = await TransactionService.getTotalTransactionByPeriods(userId, interval, timezone);
        if (!totalTranscation)
            return res.status(404).json({ message: "No data found" });
        res.json({
            message: "Total transaction has been fetched successfully",
            data: totalTranscation,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
exports.getTotalTransaction = getTotalTransaction;
async function getAllTransactions(req, res) {
    var _a;
    try {
        const userId = req.user;
        const limit = (_a = parseInt(req.query.limit)) !== null && _a !== void 0 ? _a : 0;
        const transactions = await TransactionService.getTransactions(userId, limit);
        res.json({
            message: "Transactions has been fetched successfully",
            data: transactions,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
exports.getAllTransactions = getAllTransactions;
