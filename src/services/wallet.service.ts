import { Types } from "mongoose";
import * as UserService from "../services/user.service";
import WalletModel from "../models/wallet.model";
import TransactionModel from "../models/transaction.model";
import UserModel from "../models/token.model";
import { IWalletData } from "../interfaces/Wallet";

export async function getById(walletId: Types.ObjectId) {
  try {
    return await WalletModel.findById(walletId);
  } catch (error) {
    throw error;
  }
}

export async function getBalance(walletId: Types.ObjectId) {
  try {
    const wallet = await WalletModel.findById(walletId);
    if (!wallet) throw new Error("Wallet not found");
    return wallet.balance;
  } catch (error) {
    throw error;
  }
}

export async function create(walletData: IWalletData) {
  try {
    const savedWallet = await WalletModel.create(walletData);
    await UserService.pushWallet(walletData.userId, savedWallet._id);

    return savedWallet;
  } catch (error) {
    throw error;
  }
}

export async function deleteById(walletId: Types.ObjectId, deleteTransactions?: boolean) {
  try {
    const wallet = await WalletModel.findById(walletId);
    if (!wallet) return;

    if (deleteTransactions) {
      await TransactionModel.deleteMany({
        _id: {
          $in: wallet.transactions,
        },
      });
      await UserModel.updateOne(
        {
          _id: wallet.userId,
        },
        {
          $pull: {
            transactions: {
              $in: wallet.transactions,
            },
          },
        },
      );
    }
    await UserService.pullWallet(wallet.userId, walletId);
    return await wallet.remove();
  } catch (error) {
    throw error;
  }
}

export async function updateBalance(walletId: Types.ObjectId) {
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

    if (!currentBalance[0]) throw new Error("Wallet not found");

    await WalletModel.findByIdAndUpdate(walletId, {
      $set: {
        balance: currentBalance[0].balance,
      },
    });
  } catch (error) {
    throw error;
  }
}

export async function getTotalBalance(userId: Types.ObjectId) {
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

    if (!totalBalance[0]) return 0;

    return totalBalance[0].totalBalance;
  } catch (error) {
    throw error;
  }
}
