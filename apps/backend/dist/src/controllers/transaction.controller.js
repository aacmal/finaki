import { validationResult } from "express-validator";
import { Interval } from "../interfaces/Transaction";
import * as TransactionService from "../services/transaction.service";
export async function getAllTransactionsByDate(req, res) {
    try {
        // const transactions = await Transaction.getAll();
        const userId = req.user;
        const transactions = await TransactionService.getTransactionByDate(userId);
        res.json(transactions);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export async function createTransaction(req, res) {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }
    try {
        const userId = req.user;
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
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
export async function updateTransaction(req, res) {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }
    try {
        const id = req.params.id;
        const { description, amount, type, note } = req.body;
        const updatedTransaction = await TransactionService.update(id, {
            description,
            amount,
            type,
            note,
        });
        if (!updatedTransaction)
            return res.status(404).json({ message: "Transaction not found" });
        res.json({
            message: "Transaction has been updated successfully",
            data: updatedTransaction,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export async function deleteTransaction(req, res) {
    try {
        const id = req.params.id;
        const deletedTransaction = await TransactionService.remove(id);
        // console.log(deletedTransaction);
        if (!deletedTransaction)
            return res.status(404).json({ message: "Transaction not found" });
        res.json({
            message: "Transaction has been deleted successfully",
            data: deletedTransaction,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export async function getTransactionById(req, res) {
    try {
        const id = req.params.id;
        const transaction = await TransactionService.getById(String(id));
        res.json({
            message: "Transaction has been fetched successfully",
            data: transaction,
        });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}
export async function getTotalTransaction(req, res) {
    try {
        const userId = req.user;
        const interval = req.query.interval ?? Interval.Weekly;
        const timezone = "Asia/Jakarta";
        const totalTranscation = await TransactionService.getTotalTransactionByPeriods(userId, interval, timezone);
        if (!totalTranscation)
            return res.status(404).json({ message: "No data found" });
        res.json({
            message: "Total transaction has been fetched successfully",
            data: totalTranscation,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export async function getAllTransactions(req, res) {
    try {
        const userId = req.user;
        const query = req.query;
        const result = await TransactionService.getTransactions(userId, query);
        res.json({
            message: "Transactions has been fetched successfully",
            data: {
                transactions: result.transactions,
                totalPages: Math.ceil(result.count / Number(query?.limit)),
                currentPage: query?.page,
            },
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export async function getAllTransactionsByMonth(req, res) {
    try {
        const { month, year } = req.params;
        if (!month || !year) {
            return res.status(400).json({ message: "Month and year is required" });
        }
        const userId = req.user;
        const transactions = await TransactionService.getTransactionByMonth(userId, { month, year });
        if (!transactions || transactions.length === 0)
            return res.status(404).json({ message: "No data found" });
        res.json({
            message: "Transactions has been fetched successfully",
            data: transactions,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
