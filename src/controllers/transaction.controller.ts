// import Transaction from "../models/Transaction";
import { validationResult } from "express-validator";
import * as Transaction from "../services/transaction.service";
import { Request, Response } from "express";
import { Types } from "mongoose";

async function getAllTransactionsByDate(req: Request, res: Response) {
  try {
    // const transactions = await Transaction.getAll();
    const userId = req.user as Types.ObjectId;
    const transactions = await Transaction.getTransactionByDate(userId);
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
    const { description, amount, type, walletId } = req.body;
    const newTransaction = await Transaction.create({ userId, description, amount, type, walletId });
    res.status(201).json({
      message: "Transaction has been created successfully",
      data: newTransaction,
    });
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
    const { description, amount, type } = req.body;
    const updatedTransaction = await Transaction.update(id, { description, amount, type });
    if (!updatedTransaction) return res.status(404).json({ message: "Transaction not found" });
    res.json({
      message: "Transaction has been updated successfully",
      data: updatedTransaction,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteTransaction(req: Request, res: Response) {
  try {
    const id = req.query.id as string;
    const deletedTransaction = await Transaction.remove(id);

    res.json({
      message: "Transaction has been deleted successfully",
      data: {
        _id: deletedTransaction._id,
      },
    });
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

async function getAllTransactions(req: Request, res: Response) {
  try {
    const userId = req.user;
    const limit = parseInt(req.query.limit as string) ?? 0;
    const transactions = await Transaction.getTransactions(userId as Types.ObjectId, limit);
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export {
  getAllTransactionsByDate,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getTransactionById,
  getTotalTransaction,
  getAllTransactions,
};
