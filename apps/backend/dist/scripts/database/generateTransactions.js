"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console */
const database_config_1 = __importDefault(require("../../src/configs/database.config"));
const transaction_model_1 = __importDefault(require("../../src/models/transaction.model"));
const user_model_1 = __importDefault(require("../../src/models/user.model"));
const wallet_model_1 = __importDefault(require("../../src/models/wallet.model"));
const wallet_service_1 = require("../../src/services/wallet.service");
const faker_1 = require("@faker-js/faker");
const mongoose_1 = __importDefault(require("mongoose"));
const userId = "6451ae1759bfa320f0728f7e";
const walletId = null;
const transactionType = "in";
const seeds = {
    dataPerDay: 7,
    length: 7, // number of days to generate transaction data for 7 days
};
async function generateTransactions() {
    console.clear();
    await (0, database_config_1.default)();
    faker_1.faker.setLocale("id_ID");
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
                _id: new mongoose_1.default.Types.ObjectId(),
                userId,
                walletId: walletId,
                description: faker_1.faker.finance.transactionDescription(),
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
        await transaction_model_1.default.insertMany(transactions).then(() => {
            console.log("Transactions generated successfully");
        });
        await user_model_1.default.updateOne({
            _id: userId,
        }, {
            $push: {
                transactions: {
                    $each: transactionIds,
                },
            },
        });
        process.exit(0);
    }
    const wallet = await wallet_model_1.default.findById(walletId);
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
    await transaction_model_1.default.insertMany(transactions).then(() => {
        console.log("Transactions generated successfully");
    });
    await user_model_1.default.updateOne({
        _id: userId,
    }, {
        $push: {
            transactions: {
                $each: transactionIds,
            },
        },
    });
    await wallet_model_1.default.updateOne({
        _id: walletId,
    }, {
        $push: {
            transactions: {
                $each: transactionIds,
            },
        },
    });
    await (0, wallet_service_1.updateBalance)(walletId);
    process.exit(0);
}
generateTransactions();