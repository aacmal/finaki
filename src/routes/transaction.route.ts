import { Router } from "express";
import * as TransactionController from "../controllers/transaction.controller";
import { transactionValidator } from "../middlewares/validator";

const route = Router();

route.post("/", transactionValidator, TransactionController.createTransaction);
route.put("/:id", transactionValidator, TransactionController.updateTransaction);
route.get("/", TransactionController.getAllTransactions);
route.delete("/:id", TransactionController.deleteTransaction);
route.get("/by-date", TransactionController.getAllTransactionsByDate);
route.get("/total", TransactionController.getTotalTransaction);
route.get("/:id", TransactionController.getTransactionById);

export default route;
