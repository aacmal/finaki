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
exports.deleteWallet = exports.getAllWallets = exports.createWallet = void 0;
const Wallet_1 = __importDefault(require("../models/Wallet"));
const WalletService = __importStar(require("../services/wallet.service"));
const express_validator_1 = require("express-validator");
const TransactionService = __importStar(require("../services/transaction.service"));
const Transaction_1 = require("../../types/Transaction");
async function createWallet(req, res) {
    const error = (0, express_validator_1.validationResult)(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }
    try {
        const userId = req.user;
        const { name, initialBalance } = req.body;
        const newWallet = await WalletService.create({
            userId,
            name,
            balance: initialBalance || 0,
        });
        if (initialBalance) {
            await TransactionService.create({
                userId,
                walletId: newWallet._id,
                description: `Pembuatan dompet ${newWallet.name}`,
                amount: initialBalance,
                type: Transaction_1.TransactionType.IN,
            });
        }
        return res.status(201).json({
            message: "Wallet has been created successfully",
            data: {
                _id: newWallet._id,
                name: newWallet.name,
                balance: newWallet.balance,
            },
        });
    }
    catch (error) {
        return res.status(500).json(error);
    }
}
exports.createWallet = createWallet;
async function getAllWallets(req, res) {
    try {
        const userId = req.user;
        const wallets = await Wallet_1.default.find({ userId: userId }).select({
            _id: 1,
            name: 1,
            balance: 1,
        });
        return res.status(200).json({
            message: "Wallets has been fetched successfully",
            data: wallets,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
exports.getAllWallets = getAllWallets;
async function deleteWallet(req, res) {
    try {
        const id = req.query.id;
        const deleteTransaction = req.query.deleteTransactions || false;
        const deletedWallet = await WalletService.deleteById(id, deleteTransaction);
        if (!deletedWallet)
            return res.status(404).json({ message: "Wallet not found" });
        res.json({
            message: "Wallet has been deleted successfully",
            data: {
                _id: deletedWallet._id,
            },
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
exports.deleteWallet = deleteWallet;
