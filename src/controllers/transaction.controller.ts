import { Request, Response } from "express";
// import Transaction from "../models/Transaction";
import { validationResult } from "express-validator";
import * as Transaction from "../services/transaction.service";

async function getAllTransactions(req: Request, res: Response) {
  try {
    const transactions = await Transaction.getAll();
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
    const { description, amount, type, category } = req.body;
    const newTransaction = Transaction.create({ description, amount, type, category });
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
    const { id } = req.query;
    const { description, amount, type, category } = req.body;
    const updatedTransaction = await Transaction.update(id, { description, amount, type, category });
    res.json(updatedTransaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteTransaction(req: Request, res: Response) {
  try {
    const { id } = req.query;
    const deletedTransaction = await Transaction.remove(id);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getTransactionById(req: Request, res: Response) {
  try {
    const transaction = Transaction.getById(req.params.id);
    res.json(transaction);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export { getAllTransactions, createTransaction, updateTransaction, deleteTransaction, getTransactionById };
