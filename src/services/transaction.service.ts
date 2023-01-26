// create services from Transaction
import { Types } from "mongoose";
import { ITotalTransaction, ITransaction } from "../../types/Transaction";
import Transaction from "../models/Transaction";

// Path: src\services\transaction.service.ts

async function create(transactionData: ITransaction) {
  try {
    const transaction = new Transaction(transactionData);
    return await transaction.save();
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

async function update(id: string, transactionData: ITransaction) {
  try {
    return await Transaction.findByIdAndUpdate(id, transactionData, {
      new: true,
    });
  } catch (error) {
    throw error;
  }
}

async function remove(id: string) {
  try {
    return await Transaction.findByIdAndDelete(id);
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
