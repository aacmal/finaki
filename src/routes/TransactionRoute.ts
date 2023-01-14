import express from "express";
import * as TransactionController from "../controllers/transaction.controller";
import { transactionValidator } from "../middlewares/validator";

const route = express.Router();

route.get("/", TransactionController.getAllTransactions);
route.get("/:id", TransactionController.getTransactionById);
route.post("/add", transactionValidator, TransactionController.createTransaction);
route.put("/update", transactionValidator, TransactionController.updateTransaction);
route.delete("/delete", TransactionController.deleteTransaction);

export const TransactionRoute = route;
