import { Request, Response } from "express";
import * as WalletService from "../services/wallet.service";
import * as TransactionService from "../services/transaction.service";
import { validationResult } from "express-validator";
import { Types } from "mongoose";
import { TransactionType } from "../interfaces/Transaction";
import TransactionModel from "../models/transaction.model";
import WalletModel from "../models/wallet.model";
import UserModel from "../models/user.model";

export async function createWallet(req: Request, res: Response) {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }

  try {
    const userId = req.user as Types.ObjectId;
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
  } catch (error) {
    return res.status(500).json(error);
  }
}

export async function getAllWallets(req: Request, res: Response) {
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
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function deleteWallet(req: Request, res: Response) {
  try {
    const id = req.params.id as unknown;
    const deleteTransactions = req.query.deleteTransactions as unknown as string;

    const credentials = {
      userId: req.user as Types.ObjectId,
      walletId: id as Types.ObjectId,
    };
    const deletedWallet = await WalletService.deleteById(credentials, deleteTransactions);
    if (!deletedWallet) return res.status(404).json({ message: "Wallet not found" });

    res.json({
      message: "Wallet has been deleted successfully",
      data: {
        _id: deletedWallet._id,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function updateWallet(req: Request, res: Response) {
  const error = validationResult(req);
  const userId = req.user as Types.ObjectId;
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
  try {
    const id = req.params.id as unknown;
    const { name, color, isCredit } = req.body;

    const updatedWallet = await WalletModel.findOneAndUpdate(
      {
        _id: id,
        userId,
      },
      {
        name,
        color,
        isCredit,
      },
      {
        new: true,
      },
    ).select({
      _id: 1,
      name: 1,
      color: 1,
      isCredit: 1,
    });

    if (!updatedWallet) return res.status(404).json({ message: "Wallet not found" });

    res.json({
      message: "Wallet has been updated successfully",
      data: updatedWallet,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function updateWalletColor(req: Request, res: Response) {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }

  try {
    const id = req.params.id as unknown;
    const userId = req.user as Types.ObjectId;
    const { color } = req.body;

    const updatedColor = await WalletModel.findOneAndUpdate(
      {
        _id: id,
        userId,
      },
      {
        $set: {
          color,
        },
      },
      {
        new: true,
      },
    ).select({
      _id: 1,
      color: 1,
    });
    if (!updatedColor) return res.status(404).json({ message: "Wallet not found" });
    res.json({
      message: "Wallet color has been updated successfully",
      data: updatedColor,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getOneWallet(req: Request, res: Response) {
  try {
    const id = req.params.id as unknown;
    const wallet = await WalletModel.findOne({
      _id: id,
      userId: req.user as Types.ObjectId,
    }).select({
      _id: 1,
      name: 1,
      color: 1,
      balance: 1,
      isCredit: 1,
    });

    if (!wallet) return res.status(404).json({ message: "Wallet not found" });

    res.json({
      message: "Wallet has been fetched successfully",
      data: wallet,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function transferWalletBalance(req: Request, res: Response) {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
  try {
    const { sourceWallet, destinationWallet, amount, note, description } = req.body;

    if (sourceWallet === destinationWallet) {
      return res.status(400).json({ message: "Source and destination wallet cannot be the same" });
    }

    const sourceWalletData = await WalletModel.findOne({
      _id: sourceWallet,
      userId: req.user as Types.ObjectId,
    });
    if (!sourceWalletData) return res.status(404).json({ message: "Source wallet not found" });

    const destinationWalletData = await WalletModel.findOne({
      _id: destinationWallet,
      userId: req.user as Types.ObjectId,
    });
    if (!destinationWalletData) return res.status(404).json({ message: "Destination wallet not found" });

    const originDescription =
      description.length > 0 ? description : `Transfer saldo ke dompet ${destinationWalletData.name}`;

    const destinationDescription =
      description.length > 0 ? description : `Terima saldo dari dompet ${sourceWalletData.name}`;

    const origin = await TransactionService.create({
      userId: req.user as Types.ObjectId,
      walletId: sourceWallet,
      description: originDescription,
      amount,
      note,
      type: TransactionType.OUT,
      includeInCalculation: false,
    });

    const destination = await TransactionService.create({
      userId: req.user as Types.ObjectId,
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
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function walletTransactions(req: Request, res: Response) {
  try {
    const id = req.params.id as unknown;
    const transactions = await WalletModel.findOne({
      _id: id,
      userId: req.user as Types.ObjectId,
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
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function reorderWallets(req: Request, res: Response) {
  try {
    const userId = req.user as Types.ObjectId;
    const { walletIds } = req.body;
    const userWallets = await UserModel.findOne(userId).select({ wallets: 1 });
    const arrayWalletIds = JSON.parse(walletIds);

    if (!userWallets) return res.status(404).json({ message: "User not defined" });

    const oldOrder = JSON.stringify(userWallets.wallets.sort());
    const newOrder = JSON.stringify([...arrayWalletIds].sort()); // prevent mutation of original array
    if (oldOrder !== newOrder) {
      return res.status(400).json({ message: "Wallets order is not valid" });
    }

    userWallets.wallets = arrayWalletIds;
    await userWallets.save();
    return res.status(200).json({ message: "Wallets order has been updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}