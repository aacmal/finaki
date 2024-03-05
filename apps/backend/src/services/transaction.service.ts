// create services from Transaction
import { Types } from "mongoose";

import {
  ICreateTransactionInput,
  Interval,
  ITotalTransaction,
  ITransactionRequestQuery,
  IUpdateTransactionInput,
  TransactionType,
} from "../interfaces/Transaction";
import TransactionModel from "../models/transaction.model";
import WalletModel from "../models/wallet.model";
import * as UserService from "./user.service";
import * as WalletService from "./wallet.service";

// Create new Transaction
export async function create(transactionData: ICreateTransactionInput) {
  try {
    let wallet;
    if (transactionData.walletId) {
      transactionData.amount = Number(transactionData.amount);
      wallet = await WalletModel.findById(transactionData.walletId);
      if (!wallet) throw new Error("Dompet tidak ditemukan");
      if (
        transactionData.type === TransactionType.OUT &&
        wallet.balance < transactionData.amount
      )
        throw new Error("Saldo tidak mencukupi");
    }
    // Create transaction data
    const newTransaction = await TransactionModel.create(transactionData);

    // Push transaction to user and wallet
    await UserService.pushTransaction(
      newTransaction.userId,
      newTransaction._id,
    );
    // if transaction has walletId, push transaction to wallet, and update wallet balance
    if (wallet) {
      wallet.transactions.push(newTransaction._id);
      wallet.balance +=
        transactionData.type === TransactionType.IN
          ? transactionData.amount
          : -transactionData.amount;
      await wallet.save();
    }

    return newTransaction;
  } catch (error) {
    throw error;
  }
}

export async function getTransactions(
  userId: Types.ObjectId,
  query: ITransactionRequestQuery,
) {
  try {
    const { page, limit } = query;

    const transactions = await TransactionModel.find({
      userId: userId,
      includeInCalculation: true,
      ...(query.search && {
        description: { $regex: query.search, $options: "i" },
      }),
    })
      .limit(parseInt(limit) ?? 0)
      .skip((parseInt(page) - 1) * parseInt(limit))
      .sort({ createdAt: -1 })
      .select({ userId: 0, __v: 0, includeInCalculation: 0 });

    const count = await TransactionModel.countDocuments({
      userId: userId,
      includeInCalculation: true,
      ...(query.search && {
        description: { $regex: query.search, $options: "i" },
      }),
    });

    return {
      transactions,
      count,
    };
  } catch (error) {
    throw error;
  }
}

export async function getTransactionByDate(
  userId: Types.ObjectId,
  timezone = "Asia/Jakarta",
) {
  try {
    const allTransactions = await TransactionModel.aggregate([
      {
        $match: {
          userId: new Types.ObjectId(userId),
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
              walletId: "$walletId",
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

export async function getById(id: string) {
  try {
    return await TransactionModel.findById(id);
  } catch (error) {
    throw error;
  }
}

export async function update(
  id: string,
  newTransactionData: IUpdateTransactionInput,
) {
  try {
    const oldTransaction = await TransactionModel.findById(id);
    if (!oldTransaction) return;
    newTransactionData.amount = Number(newTransactionData.amount);

    const currentWallet = await WalletModel.findById(
      oldTransaction.walletId as Types.ObjectId,
    );

    const isTypeChanged = oldTransaction.type !== newTransactionData.type;
    const isAmountChanged = oldTransaction.amount !== newTransactionData.amount;

    oldTransaction.description = newTransactionData.description;

    if (currentWallet && (isTypeChanged || isAmountChanged)) {
      const validateTransaction = (status: boolean) => {
        if (status)
          throw new Error(
            "Tidak dapat melakuakan perubahan pada transaksi ini, karena akan mengakibatkan saldo wallet menjadi minus. Silahkan lakukan perubahan pada jumlah transaksi",
          );
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
      const typeOutValidation =
        (oldTransaction.type === TransactionType.OUT &&
          currentWallet.balance -
            (newTransactionData.amount - oldTransaction.amount) >=
            0) ||
        currentWallet.balance -
          (oldTransaction.amount + newTransactionData.amount) >=
          0;

      // explanation of type in validation:
      // 1. validation type IN is simple than OUT, the purpose is for prevent wallet balance to negative same as type OUT too;
      // example: I have two transaction, Transaciton 1 is 600 Type IN and transaction 2 is 600 Type OUT so the balance will be 0;
      // in this case, I will edit Transaction I amount to 300, this is cannot apply the update because:
      // currentWallet.balance - (oldTransaction.amount - newTransactionData.amount) >= 0
      // 0 - (600 - 300) = -300; -300 is negative number then return false to throw Error
      const typeInValidation =
        currentWallet.balance -
          (oldTransaction.amount - newTransactionData.amount) >=
        0;

      if (newTransactionData.type === TransactionType.OUT) {
        validateTransaction(!typeOutValidation);
      } else if (newTransactionData.type === TransactionType.IN) {
        validateTransaction(!typeInValidation);
      } else {
        throw new Error("Ada yang salah");
      }

      oldTransaction.type = newTransactionData.type;
      oldTransaction.amount = newTransactionData.amount;
      const updatedTransaction = await oldTransaction.save(); // return updated transaction

      // update balance in wallet collection based on transaction type
      await WalletService.updateBalance(
        updatedTransaction.walletId as Types.ObjectId,
      );

      return updatedTransaction;
    }

    oldTransaction.type = newTransactionData.type;
    oldTransaction.amount = newTransactionData.amount;

    return await oldTransaction.save(); // return updated transaction
  } catch (error) {
    throw error;
  }
}

export async function remove(id: string) {
  try {
    const transaction = await TransactionModel.findById(id);
    // if transaction not found, return null
    if (!transaction) return;

    const wallet = await WalletModel.findById(transaction.walletId);
    // check if transaction type is out
    // and wallet balance is less than transaction amount then throw error

    if (wallet) {
      if (
        transaction.type === TransactionType.IN &&
        wallet.balance < transaction.amount
      ) {
        throw new Error(
          "Tidak dapat menghapus transaksi ini, karena akan mengakibatkan saldo wallet menjadi minus",
        );
      }
      const deletedTransaction = await transaction.delete();

      // remove transactionId from wallet collection
      // and decrese balance or increse balance based on transaction type
      (wallet.transactions as Types.DocumentArray<Types.ObjectId>).pull(
        deletedTransaction._id,
      );
      wallet.balance -=
        deletedTransaction.type === TransactionType.IN
          ? deletedTransaction.amount
          : -deletedTransaction.amount;
      await wallet.save();

      return deletedTransaction;
    }

    // delete transaction
    const deletedTransaction = await transaction.delete();

    // remove transactionId from user collection
    await UserService.pullTransaction(
      deletedTransaction.userId,
      deletedTransaction._id,
    );

    return deletedTransaction;
  } catch (error) {
    throw error;
  }
}

export async function getTotalTransactionByPeriods(
  userId: Types.ObjectId,
  interval: Interval,
  timezone = "Asia/Jakarta",
): Promise<ITotalTransaction[]> {
  const intervals = interval === Interval.Weekly ? 7 : 30;

  const dateInterval = new Date().setDate(new Date().getDate() - intervals);

  try {
    const totalTranscation = await TransactionModel.aggregate([
      {
        $match: {
          userId: new Types.ObjectId(userId),
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
            month: {
              $month: {
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
      {
        $sort: {
          timestamp: -1,
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
        (transaction: ITotalTransaction) =>
          transaction._id.day === date.getDate() &&
          transaction._id.month === date.getMonth() + 1, // because month start from 0
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

export async function getTransactionByMonth(
  userId: Types.ObjectId,
  date: {
    month: string;
    year: string;
  },
) {
  try {
    const { month, year } = date;
    const transactions = await TransactionModel.aggregate([
      {
        $project: {
          month: {
            $month: {
              date: "$createdAt",
            },
          },
          year: {
            $year: {
              date: "$createdAt",
            },
          },
          _id: 1,
          userId: 1,
          createdAt: 1,
          description: 1,
          amount: 1,
          type: 1,
          walletId: 1,
        },
      },
      {
        $match: {
          month: parseInt(month),
          year: parseInt(year),
          userId: userId,
        },
      },
      {
        $lookup: {
          from: "wallets",
          localField: "walletId",
          foreignField: "_id",
          as: "wallet",
        },
      },
      {
        $group: {
          _id: {
            month: {
              $month: {
                date: "$createdAt",
              },
            },
          },
          timestamp: {
            $first: "$createdAt",
          },
          transactions: {
            $push: {
              _id: "$_id",
              createdAt: "$createdAt",
              description: "$description",
              amount: "$amount",
              type: "$type",
              category: "$category",
              wallet: {
                $arrayElemAt: ["$wallet", 0],
              },
            },
          },
        },
      },
    ]);

    return transactions;
  } catch (error) {
    throw error;
  }
}
