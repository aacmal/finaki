/* eslint-disable no-console */
import database from "../../src/configs/database.config";
import TransactionModel from "../../src/models/transaction.model";
import UserModel from "../../src/models/user.model";
import WalletModel from "../../src/models/wallet.model";
import { updateBalance } from "../../src/services/wallet.service";

import { faker } from "@faker-js/faker";
import mongoose from "mongoose";

const userId = "6451ae1759bfa320f0728f7e";
const walletId = null;
const transactionType: "in" | "out" = "in";
const seeds = {
  dataPerDay: 7, // random number between 1 and 7 transactions per day
  length: 7, // number of days to generate transaction data for 7 days
};

async function generateTransactions() {
  console.clear();
  await database();
  faker.setLocale("id_ID");
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - seeds.length);
  const transactions = [];
  const transactionIds = [];

  for (let i = 1; i <= seeds.length; i++) {
    const date = new Date();
    date.setDate(startDate.getDate() + i);

    const dataPerDay = Math.floor(Math.random() * seeds.dataPerDay) + 1;

    for (let j = 0; j < dataPerDay; j++) {
      const transaction = {
        _id: new mongoose.Types.ObjectId(),
        userId,
        walletId: walletId,
        description: faker.finance.transactionDescription(),
        amount: Math.floor(Math.random() * 7000) + 1,
        type: transactionType,
        createdAt: date,
        updatedAt: date,
      };
      transactions.push(transaction);
      transactionIds.push(transaction._id);
    }
  }

  const totalBalance = transactions.reduce((acc, curr) => {
    return acc + curr.amount;
  }, 0);
  console.log("Total balance changes: ", totalBalance);

  if (!walletId) {
    await TransactionModel.insertMany(transactions).then(() => {
      console.log("Transactions generated successfully");
    });

    await UserModel.updateOne(
      {
        _id: userId,
      },
      {
        $push: {
          transactions: {
            $each: transactionIds,
          },
        },
      },
    );
    process.exit(0);
  }

  const wallet = await WalletModel.findById(walletId);
  if (!wallet) {
    console.log("Wallet not found");
    process.exit(0);
  }
  if (transactionType === "out") {
    if (wallet.balance < totalBalance) {
      console.log("Balance is not enough");
      console.error("Cancelled");
      process.exit(0);
    }
  }

  await TransactionModel.insertMany(transactions).then(() => {
    console.log("Transactions generated successfully");
  });

  await UserModel.updateOne(
    {
      _id: userId,
    },
    {
      $push: {
        transactions: {
          $each: transactionIds,
        },
      },
    },
  );

  await WalletModel.updateOne(
    {
      _id: walletId,
    },
    {
      $push: {
        transactions: {
          $each: transactionIds,
        },
      },
    },
  );
  await updateBalance(walletId);

  process.exit(0);
}

generateTransactions();
