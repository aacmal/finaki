import { Transaction, TransactionData } from "@/types/Transaction";
import { instance } from "./api";
import { makeUrl } from "./config";
import {
  EditTransactionInput,
  TotalTransactionByDayResponse,
  TransactionInput,
  TransactionResponse,
  TransactionsResponse,
} from "./types/TransactionAPI";

export const insertNewTransaction = async (data: TransactionInput) => {
  const response = await instance.post<TransactionResponse>(
    "/transactions",
    data
  );
  return response.data.data;
};

export const getTransactionsByDate = async () => {
  const response = await instance.get<TransactionData[]>(
    "/transactions/by-date"
  );
  return response.data;
};

export const editTransaction = async ({
  id,
  transactionInput,
}: EditTransactionInput): Promise<Transaction> => {
  const response = await instance.put(`/transactions/${id}`, transactionInput);
  return response.data.data;
};

export const deleteTransaction = async (id: string) => {
  const response = await instance.delete<TransactionResponse>(
    `/transactions/${id}`
  );
  return response.data.data;
};

export const getTotalTransactionByPeriod = async (
  interval: "month" | "week"
) => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const response = await instance.get<TotalTransactionByDayResponse>(
    makeUrl("/transactions/total", { interval, timezone })
  );

  return response.data.data;
};

export const getAllTransactions = async (limit: number) => {
  const response = await instance.get<TransactionsResponse>(
    makeUrl("/transactions", { limit })
  );

  return response.data.data;
};
