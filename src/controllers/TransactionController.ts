import { Request, Response } from "express";
import Transaction from "../models/Transaction";
import { validationResult } from "express-validator";

async function getAllTransactions(req: Request, res: Response) {
  try {
    const transactions = await Transaction.find();
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
    const transaction = new Transaction({
      description,
      amount,
      type,
      category,
    });
    const newTransaction = await transaction.save();
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
    const transaction = await Transaction.findById(req.query.id);
    if (transaction) {
      const updatedTransaction = await Transaction.updateOne({ _id: req.query.id }, { $set: req.body });
      res.json(updatedTransaction);
    } else {
      res.status(404).json({ message: "Transaction not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteTransaction(req: Request, res: Response) {
  try {
    const transaction = await Transaction.findById(req.query.id);
    if (transaction) {
      await transaction.remove();
      res.json({ message: "Transaction removed" });
    } else {
      res.status(404).json({ message: "Transaction not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getTransactionById(req: Request, res: Response) {
  try {
    const transaction = Transaction.findById(req.params.id);
    res.json(transaction);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export { getAllTransactions, createTransaction, updateTransaction, deleteTransaction, getTransactionById };
