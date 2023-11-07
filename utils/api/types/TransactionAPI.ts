import { TotalTransactionByDay, Transaction } from "@/types/Transaction";
import { GenericResponse } from "./Api";

export enum Interval {
  // Daily = "daily",
  Weekly = "weekly",
  Monthly = "monthly"
}

export interface TransactionResponse extends GenericResponse {
  data: Transaction;
}

export interface TransactionsResponse extends GenericResponse {
  data: Transaction[];
}

export interface InfiniteTransactionResponse extends GenericResponse {
  data: {
    transactions: Transaction[];
    totalPages: number;
    currentPage: number;
  };
}

export interface TotalTransactionByDayResponse extends GenericResponse {
  data: TotalTransactionByDay[];
}

export interface TransactionInput {
  walletId?: string;
  description: string;
  amount: number;
  type: string;
  note: string;
}

export interface EditTransactionInput {
  id: string;
  transactionInput: TransactionInput;
}
