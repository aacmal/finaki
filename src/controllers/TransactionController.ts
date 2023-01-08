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

export { getAllTransactions, createTransaction };
