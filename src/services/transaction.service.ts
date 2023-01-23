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

async function getAll() {
  try {
    return await Transaction.find();
  } catch (error) {
    throw error;
  }
}

async function getTransactionByUser(userId: Types.ObjectId, timezone = "Asia/Jakarta") {
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
          _id: -1,
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
  const currentDate = new Date();

  const bounds = [new Date(dateInterval), currentDate];

  try {
    const totalTranscation = await Transaction.aggregate([
      {
        $match: {
          userId: new Types.ObjectId(userId),
        },
      },
      {
        $densify: {
          field: "createdAt",
          range: {
            step: 1,
            unit: "day",
            bounds: bounds,
          },
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
    ]);

    return totalTranscation;
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
  getAll,
  getById,
  update,
  remove,
  getTransactionByUser,
  getTotalTransactionByPeriods,
  getRecentTransactions,
};
