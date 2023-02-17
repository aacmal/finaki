import { Types } from "mongoose";
import * as UserService from "../services/user.service";
import WalletModel from "../models/wallet.model";
import TransactionModel from "../models/transaction.model";
import UserModel from "../models/token.model";
import { BalanceHistory, IWalletData } from "../interfaces/Wallet";

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

export async function deleteById(walletId: Types.ObjectId, deleteTransactions?: string) {
  try {
    const wallet = await WalletModel.findById(walletId);
    if (!wallet) return;
    if (deleteTransactions === "true") {
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

export async function balanceHistory(walletId: Types.ObjectId, interval: "week" | "month") {
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

    const balanceHistoryResult: BalanceHistory[] = [];
    let lastBalance = 0;
    for (let i = 1; i <= intervals; i++) {
      const date = new Date(dateInterval);
      date.setDate(date.getDate() + i);

      const walletTransaction = walletTransactionsPerDay.find((transaction) => transaction._id === date.getDate());
      lastBalance = walletTransaction ? lastBalance + (walletTransaction.in - walletTransaction.out) : lastBalance;

      balanceHistoryResult.push({
        timestamp: date,
        value: lastBalance,
      });
    }

    return balanceHistoryResult;
  } catch (error) {
    throw error;
  }
}

export async function getWalletTransactions(walletId: Types.ObjectId) {
  try {
    const transactions = await TransactionModel.find({
      walletId: new Types.ObjectId(walletId),
    });

    return transactions;
  } catch (error) {
    throw error;
  }
}
