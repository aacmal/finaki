import { Types } from "mongoose";
import Wallet from "../models/Wallet";
import * as UserService from "./user.service";
import Transaction from "../models/Transaction";
import User from "../models/User";

export async function pushTransaction(
  walletId: Types.ObjectId | undefined,
  transactionId: Types.ObjectId,
  amount: number,
) {
  try {
    if (!walletId) return;
    await Wallet.findByIdAndUpdate(
      {
        _id: walletId,
      },
      {
        $push: {
          transactions: transactionId,
        },
        $inc: {
          balance: amount,
        },
      },
      {
        new: true,
      },
    );
  } catch (error) {
    throw error;
  }
}

export async function pullTransaction(
  walletId: Types.ObjectId | undefined,
  transactionId: Types.ObjectId,
  amount: number,
) {
  try {
    if (!walletId) return;
    await Wallet.findByIdAndUpdate(
      {
        _id: walletId,
      },
      {
        $pull: {
          transactions: transactionId,
        },
        $inc: {
          balance: -amount,
        },
      },
      {
        new: true,
      },
    );
  } catch (error) {
    throw error;
  }
}

export async function getById(walletId: Types.ObjectId) {
  try {
    return await Wallet.findById(walletId);
  } catch (error) {
    throw error;
  }
}

export async function getBalance(walletId: Types.ObjectId) {
  try {
    const wallet = await Wallet.findById(walletId);
    if (!wallet) throw new Error("Wallet not found");
    return wallet.balance;
  } catch (error) {
    throw error;
  }
}

export async function create(walletData: any) {
  try {
    const wallet = new Wallet(walletData);
    const savedWallet = await wallet.save();

    await UserService.pushWallet(walletData.userId, savedWallet._id);

    return savedWallet;
  } catch (error) {
    throw error;
  }
}

export async function deleteById(walletId: Types.ObjectId, deleteTransactions?: boolean) {
  try {
    const wallet = await Wallet.findById(walletId);
    if (!wallet) return;

    if (deleteTransactions) {
      await Transaction.deleteMany({
        _id: {
          $in: wallet.transactions,
        },
      });
      await User.updateOne(
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

export async function increseBalance(walletId: Types.ObjectId, amount: number) {
  try {
    const wallet = await Wallet.findById(walletId);
    if (wallet) {
      wallet.balance = wallet.balance + amount;
      await wallet.save();
    }
  } catch (error) {
    throw error;
  }
}

export async function decreseBalance(walletId: Types.ObjectId, amount: number) {
  try {
    const wallet = await Wallet.findById(walletId);

    if (wallet) {
      wallet.balance = wallet.balance - amount;
      await wallet.save();
    }
  } catch (error) {
    throw error;
  }
}

export async function updateBalance(walletId: Types.ObjectId) {
  try {
    const currentBalance = await Wallet.aggregate([
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

    await Wallet.findByIdAndUpdate(walletId, {
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
    const totalBalance = await Wallet.aggregate([
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
