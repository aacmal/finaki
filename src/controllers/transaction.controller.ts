// import Transaction from "../models/Transaction";
import { validationResult } from "express-validator";
import * as Transaction from "../services/transaction.service";
import { Request, Response } from "express";
import * as UserService from "../services/user.service";
import { Types } from "mongoose";

async function getAllTransactions(req: Request, res: Response) {
  try {
    // const transactions = await Transaction.getAll();
    const userId = req.user;
    const transactions = await Transaction.getTransactionByUser(userId);
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function createTransaction(req: Request, res: Response) {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }

  try {
    const userId = req.user;
    const { description, amount, type, category } = req.body;
    const newTransaction = await Transaction.create({ userId, description, amount, type, category });
    await UserService.pushTransaction(userId as string, newTransaction._id);
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function updateTransaction(req: Request, res: Response) {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
  try {
    const id = req.query.id as string;
    const { description, amount, type, category } = req.body;
    const updatedTransaction = await Transaction.update(id, { description, amount, type, category });
    res.json(updatedTransaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteTransaction(req: Request, res: Response) {
  try {
    const userId = req.user;
    const id = req.query.id as string;
    const deletedTransaction = await Transaction.remove(id);
    await UserService.pullTransaction(userId as string, id);
    res.json(deletedTransaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getTransactionById(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const transaction = await Transaction.getById(id);
    res.json(transaction);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

async function getTotalTransaction(req: Request, res: Response) {
  try {
    const userId = req.user;
    const interval = (req.query.interval as "week" | "month") ?? "week";
    const timezone = "Asia/Jakarta";

    const totalTranscation = await Transaction.getTotalTransactionByPeriods(
      userId as Types.ObjectId,
      interval,
      timezone,
    );

    if (!totalTranscation) return res.status(404).json({ message: "No data found" });
    res.json(totalTranscation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export {
  getAllTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getTransactionById,
  getTotalTransaction,
};
