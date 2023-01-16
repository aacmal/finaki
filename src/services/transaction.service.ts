// create services from Transaction
import { ITransaction } from "../../types/Transaction";
import Transaction from "../models/Transaction";
import User from "../models/User";

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

async function getTransactionByUser(userId: Express.User | undefined) {
  try {
    const data = await User.findById(userId).populate("transactions");

    return data?.transactions;
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

export { create, getAll, getById, update, remove, getTransactionByUser };
