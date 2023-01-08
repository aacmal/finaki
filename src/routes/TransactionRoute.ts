import express from "express";
import * as TransactionController from "../controllers/TransactionController";
import { transactionValidator } from "../middlewares/validator";

const route = express.Router();

route.post("/add", transactionValidator, TransactionController.createTransaction);
route.get("/", TransactionController.getAllTransactions);

export const TransactionRoute = route;
