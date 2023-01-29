// create services from Transaction
import { Types } from "mongoose";
import { ITotalTransaction, ITransaction, TransactionType } from "../../types/Transaction";
import Transaction from "../models/Transaction";
import * as UserService from "./user.service";
import * as WalletService from "./wallet.service";
import Wallet from "../models/Wallet";
// Path: src\services\transaction.service.ts

// Create new Transaction
async function create(transactionData: ITransaction) {
  try {
    if (transactionData.walletId) {
      const wallet = await WalletService.getById(transactionData.walletId as Types.ObjectId);
      if (!wallet) throw new Error("Wallet not found");
      if (transactionData.type === "out" && wallet.balance < transactionData.amount)
        throw new Error("Insufficient balance");
    }

    // Create transaction data
    const newTransaction = await Transaction.create(transactionData);

    // Push transaction to user and wallet
    await UserService.pushTransaction(newTransaction.userId, newTransaction._id);
    // if walletId null or undefined, don't push transaction to wallet
    await WalletService.pushTransaction(
      newTransaction.walletId,
      newTransaction._id,
      newTransaction.type === "in" ? newTransaction.amount : -newTransaction.amount,
    );

    return newTransaction;
  } catch (error) {
    throw error;
  }
}

async function getTransactions(userId: Types.ObjectId, limit?: number) {
  try {
    return await Transaction.find({ userId: userId })
      .sort({ createdAt: -1 })
      .select({ userId: 0, __v: 0 })
      .limit(limit ?? 0);
  } catch (error) {
    throw error;
  }
}

async function getTransactionByDate(userId: Types.ObjectId, timezone = "Asia/Jakarta") {
  try {
    const allTransactions = await Transaction.aggregate([
      {
        $match: {
          userId: new Types.ObjectId(userId),
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
  } catch (error) {
    throw error;
  }
}

async function getById(id: string) {
  try {
    return await Transaction.findById(id);
  } catch (error) {
    throw error;
  }
}

async function update(id: string, newTransaction: ITransaction) {
  try {
    const oldTransaction = await Transaction.findById(id);
    if (!oldTransaction) return;

    const isTypeChanged = oldTransaction.type !== newTransaction.type;
    const isAmountChanged = oldTransaction.amount !== newTransaction.amount;

    oldTransaction.description = newTransaction.description;

    if (oldTransaction.walletId && (isTypeChanged || isAmountChanged)) {
      const currentWalletBalance = await WalletService.getBalance(oldTransaction.walletId as Types.ObjectId);

      console.log(oldTransaction.amount, newTransaction.amount);

      // for transaction type IN validation, if the change transaction amount causes the balance to be less than 0 then return false
      const differenceAmount = oldTransaction.amount - newTransaction.amount;
      console.log(currentWalletBalance, differenceAmount);

      const isBalanceEnough = currentWalletBalance - differenceAmount >= 0;
      const typeInIsValid = newTransaction.type === TransactionType.IN && !isBalanceEnough;

      // for transaction type OUT validation, if balance is less than transaction amount then return false
      const isBalanceEnoughForTypeChangesToOut =
        currentWalletBalance - (oldTransaction.amount + newTransaction.amount) >= 0;
      const typeOutIsValid =
        (newTransaction.type === TransactionType.OUT && currentWalletBalance < newTransaction.amount) ||
        !isBalanceEnoughForTypeChangesToOut;

      // throw error if type IN or type OUT is not valid
      if (typeInIsValid || typeOutIsValid) {
        throw new Error(
          "Tidak bisa melakuakan perubahan pada transaksi ini, karena akan mengakibatkan saldo wallet menjadi minus. Silahkan lakukan perubahan pada jumlah transaksi",
        );
      }

      oldTransaction.type = newTransaction.type;
      oldTransaction.amount = newTransaction.amount;
      const updatedTransaction = await oldTransaction.save(); // return updated transaction

      // update balance in wallet collection based on transaction type
      await WalletService.updateBalance(updatedTransaction.walletId as Types.ObjectId);

      return updatedTransaction;
    }

    oldTransaction.type = newTransaction.type;
    oldTransaction.amount = newTransaction.amount;

    return await oldTransaction.save(); // return updated transaction
  } catch (error) {
    throw error;
  }
}

async function remove(id: string) {
  try {
    const transaction = await Transaction.findById(id);
    // if transaction not found, return null
    if (!transaction) return;

    const wallet = await Wallet.findById(transaction.walletId);
    // check if transaction type is out
    // and wallet balance is less than transaction amount then throw error
    console.log(wallet);

    if (wallet) {
      if (transaction.type === TransactionType.IN && wallet.balance < transaction.amount) {
        throw new Error("Tidak dapat menghapus transaksi ini, karena akan mengakibatkan saldo wallet menjadi minus");
      }
      const deletedTransaction = await transaction.delete();

      // remove transactionId from wallet collection
      // and decrese balance or increse balance based on transaction type
      await WalletService.pullTransaction(
        deletedTransaction.walletId,
        deletedTransaction._id,
        deletedTransaction.type === "in" ? deletedTransaction.amount : -deletedTransaction.amount,
      );

      return deletedTransaction;
    }

    // delete transaction
    const deletedTransaction = await transaction.delete();

    // remove transactionId from user collection
    await UserService.pullTransaction(deletedTransaction.userId, deletedTransaction._id);

    return deletedTransaction;
  } catch (error) {
    throw error;
  }
}

async function getTotalTransactionByPeriods(
  userId: Types.ObjectId,
  interval: "week" | "month",
  timezone = "Asia/Jakarta",
): Promise<ITotalTransaction[]> {
  const intervals = interval === "week" ? 7 : 30;

  const dateInterval = new Date().setDate(new Date().getDate() - intervals);

  try {
    const totalTranscation = await Transaction.aggregate([
      {
        $match: {
          userId: new Types.ObjectId(userId),
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

    const totalTransactionByPeriods: ITotalTransaction[] = [];

    for (let i = 1; i <= intervals; i++) {
      const date = new Date(dateInterval);
      date.setDate(date.getDate() + i);

      const transaction = totalTranscation.find(
        (transaction: ITotalTransaction) => transaction._id.day === date.getDate(),
      );

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
  } catch (error) {
    throw error;
  }
}

async function getRecentTransactions(userId: Types.ObjectId, limit: number) {
  try {
    return await Transaction.find({ userId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .select({ userId: 0, __v: 0, updatedAt: 0 });
  } catch (error) {
    throw error;
  }
}

export {
  create,
  getTransactions,
  getById,
  update,
  remove,
  getTransactionByDate,
  getTotalTransactionByPeriods,
  getRecentTransactions,
};
