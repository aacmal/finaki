// import Transaction from "../models/Transaction";
import { validationResult } from "express-validator";
import * as TransactionService from "../services/transaction.service";
import { Request, Response } from "express";
import { Types } from "mongoose";
import { ITransactionRequestQuery } from "interfaces/Transaction";

export async function getAllTransactionsByDate(req: Request, res: Response) {
  try {
    // const transactions = await Transaction.getAll();
    const userId = req.user as Types.ObjectId;
    const transactions = await TransactionService.getTransactionByDate(userId);
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function createTransaction(req: Request, res: Response) {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }

  try {
    const userId = req.user as Types.ObjectId;
    const { description, note, amount, type, walletId } = req.body;
    const newTransaction = await TransactionService.create({
      userId,
      description,
      note,
      amount,
      type,
      walletId,
      includeInCalculation: true,
    });
    res.status(201).json({
      message: "Transaction has been created successfully",
      data: newTransaction,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function updateTransaction(req: Request, res: Response) {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
  try {
    const id = req.params.id as string;
    const { description, amount, type, note } = req.body;
    const updatedTransaction = await TransactionService.update(id, { description, amount, type, note });

    if (!updatedTransaction) return res.status(404).json({ message: "Transaction not found" });

    res.json({
      message: "Transaction has been updated successfully",
      data: updatedTransaction,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function deleteTransaction(req: Request, res: Response) {
  try {
    const id = req.params.id as string;
    const deletedTransaction = await TransactionService.remove(id);
    // console.log(deletedTransaction);
    if (!deletedTransaction) return res.status(404).json({ message: "Transaction not found" });

    res.json({
      message: "Transaction has been deleted successfully",
      data: deletedTransaction,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getTransactionById(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const transaction = await TransactionService.getById(id);
    res.json({
      message: "Transaction has been fetched successfully",
      data: transaction,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export async function getTotalTransaction(req: Request, res: Response) {
  try {
    const userId = req.user;
    const interval = (req.query.interval as "week" | "month") ?? "week";
    const timezone = "Asia/Jakarta";

    const totalTranscation = await TransactionService.getTotalTransactionByPeriods(
      userId as Types.ObjectId,
      interval,
      timezone,
    );
    if (!totalTranscation) return res.status(404).json({ message: "No data found" });
    res.json({
      message: "Total transaction has been fetched successfully",
      data: totalTranscation,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getAllTransactions(req: Request, res: Response) {
  try {
    const userId = req.user;
    const query = req.query as unknown as ITransactionRequestQuery;

    const result = await TransactionService.getTransactions(userId as Types.ObjectId, query);
    res.json({
      message: "Transactions has been fetched successfully",
      data: {
        transactions: result.transactions,
        totalPages: Math.ceil(result.count / Number(query?.limit)),
        currentPage: query?.page,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
