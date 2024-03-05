/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { validationResult } from "express-validator";
import { TransactionType } from "../interfaces/Transaction";
import TransactionModel from "../models/transaction.model";
import UserModel from "../models/user.model";
import WalletModel from "../models/wallet.model";
import * as TransactionService from "../services/transaction.service";
import * as WalletService from "../services/wallet.service";
export async function createWallet(req, res) {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }
    try {
        const userId = req.user;
        const { name, balance, color, isCredit } = req.body;
        const newWallet = await WalletService.create({
            userId,
            name,
            color,
            balance: balance || 0,
            isCredit: isCredit || false,
        });
        if (balance > 0) {
            const transaction = await TransactionModel.create({
                userId,
                walletId: newWallet._id,
                description: `Pembuatan dompet ${newWallet.name}`,
                amount: balance,
                type: TransactionType.IN,
            });
            newWallet.transactions.push(transaction._id);
            await newWallet.save();
        }
        return res.status(201).json({
            message: "Wallet has been created successfully",
            data: {
                _id: newWallet._id,
                name: newWallet.name,
                color: newWallet.color,
                balance: newWallet.balance,
                isCredit: newWallet.isCredit,
            },
        });
    }
    catch (error) {
        return res.status(500).json(error);
    }
}
export async function getAllWallets(req, res) {
    try {
        const userId = req.user;
        const wallets = await UserModel.findById(userId).populate({
            path: "wallets",
            select: {
                _id: 1,
                name: 1,
                color: 1,
                balance: 1,
                updatedAt: 1,
                isCredit: 1,
            },
        });
        return res.status(200).json({
            message: "Wallets has been fetched successfully",
            data: wallets?.wallets,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export async function deleteWallet(req, res) {
    try {
        const id = req.params.id;
        const deleteTransactions = req.query
            .deleteTransactions;
        const credentials = {
            userId: req.user,
            walletId: id,
        };
        const deletedWallet = await WalletService.deleteById(credentials, deleteTransactions);
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
export async function updateWallet(req, res) {
    const error = validationResult(req);
    const userId = req.user;
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }
    try {
        const id = req.params.id;
        const { name, color, isCredit } = req.body;
        const updatedWallet = await WalletModel.findOneAndUpdate({
            _id: id,
            userId,
        }, {
            name,
            color,
            isCredit,
        }, {
            new: true,
        }).select({
            _id: 1,
            name: 1,
            color: 1,
            isCredit: 1,
        });
        if (!updatedWallet)
            return res.status(404).json({ message: "Wallet not found" });
        res.json({
            message: "Wallet has been updated successfully",
            data: updatedWallet,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export async function updateWalletColor(req, res) {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }
    try {
        const id = req.params.id;
        const userId = req.user;
        const { color } = req.body;
        const updatedColor = await WalletModel.findOneAndUpdate({
            _id: id,
            userId,
        }, {
            $set: {
                color,
            },
        }, {
            new: true,
        }).select({
            _id: 1,
            color: 1,
        });
        if (!updatedColor)
            return res.status(404).json({ message: "Wallet not found" });
        res.json({
            message: "Wallet color has been updated successfully",
            data: updatedColor,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export async function getOneWallet(req, res) {
    try {
        const id = req.params.id;
        const wallet = await WalletModel.findOne({
            _id: id,
            userId: req.user,
        }).select({
            _id: 1,
            name: 1,
            color: 1,
            balance: 1,
            isCredit: 1,
        });
        if (!wallet)
            return res.status(404).json({ message: "Wallet not found" });
        res.json({
            message: "Wallet has been fetched successfully",
            data: wallet,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export async function transferWalletBalance(req, res) {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }
    try {
        const { sourceWallet, destinationWallet, amount, note, description } = req.body;
        if (sourceWallet === destinationWallet) {
            return res
                .status(400)
                .json({ message: "Source and destination wallet cannot be the same" });
        }
        const sourceWalletData = await WalletModel.findOne({
            _id: sourceWallet,
            userId: req.user,
        });
        if (!sourceWalletData)
            return res.status(404).json({ message: "Source wallet not found" });
        const destinationWalletData = await WalletModel.findOne({
            _id: destinationWallet,
            userId: req.user,
        });
        if (!destinationWalletData)
            return res.status(404).json({ message: "Destination wallet not found" });
        const originDescription = description.length > 0
            ? description
            : `Transfer saldo ke dompet ${destinationWalletData.name}`;
        const destinationDescription = description.length > 0
            ? description
            : `Terima saldo dari dompet ${sourceWalletData.name}`;
        const origin = await TransactionService.create({
            userId: req.user,
            walletId: sourceWallet,
            description: originDescription,
            amount,
            note,
            type: TransactionType.OUT,
            includeInCalculation: false,
        });
        const destination = await TransactionService.create({
            userId: req.user,
            walletId: destinationWallet,
            description: destinationDescription,
            amount,
            note,
            type: TransactionType.IN,
            includeInCalculation: false,
        });
        res.json({
            message: "Transfer has been completed successfully",
            data: {
                origin,
                destination,
            },
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export async function walletTransactions(req, res) {
    try {
        const id = req.params.id;
        const transactions = await WalletModel.findOne({
            _id: id,
            userId: req.user,
        }).populate({
            path: "transactions",
            select: {
                includeInCalculation: 0,
                userId: 0,
                __v: 0,
            },
            options: { sort: { createdAt: -1 } },
        });
        res.json({
            message: "Wallet transactions has been fetched successfully",
            data: transactions?.transactions,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export async function reorderWallets(req, res) {
    try {
        const userId = req.user;
        const { walletIds } = req.body;
        const userWallets = await UserModel.findOne(userId).select({ wallets: 1 });
        const arrayWalletIds = JSON.parse(walletIds);
        if (!userWallets)
            return res.status(404).json({ message: "User not defined" });
        const oldOrder = JSON.stringify(userWallets.wallets.sort());
        const newOrder = JSON.stringify([...arrayWalletIds].sort()); // prevent mutation of original array
        if (oldOrder !== newOrder) {
            return res.status(400).json({ message: "Wallets order is not valid" });
        }
        userWallets.wallets = arrayWalletIds;
        await userWallets.save();
        return res
            .status(200)
            .json({ message: "Wallets order has been updated successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
