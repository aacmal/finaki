import { Transaction, TransactionData } from "@/types/Transaction";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { refreshAccessToken } from "./authApi";
import { commonApi } from "./commonApi";
import { BASE_URL, makeUrl } from "./config";

interface NewTransactionResponse {
  message: string;
  data: {
    _id: string;
    amount: number;
    type: string;
    category: string;
    description: string;
    createdAt: string;
  };
}

export interface TransactionInput {
  description: string;
  amount: number;
  type: string;
  category?: string;
}

export interface EditTransactionInput {
  id: string;
  transactionInput: TransactionInput;
}

export interface TotalTransactionByDay {
  _id: {
    day: number;
  };
  timestamp: string;
  in: number;
  out: number;
  totalAmount: number;
}

export const transactionApi = axios.create({
  baseURL: `${BASE_URL}/transaction`,
  headers: {
    "Content-Type": "application/json",
  },
});

transactionApi.interceptors.request.use(
  async (config) => {
    let currentToken = window?.localStorage.getItem("access-token");

    if (currentToken === null || currentToken === undefined) {
      const refreshToken = await refreshAccessToken();
      window?.localStorage.setItem(
        "access-token",
        refreshToken.data.access_token
      );
      currentToken = refreshToken.data.access_token;
    } else {
      const decodedToken = jwtDecode(currentToken);
      const currentTime = new Date().getTime();
      if ((decodedToken as any).exp * 1000 < currentTime) {
        const refreshToken = await refreshAccessToken();
        window?.localStorage.setItem(
          "access-token",
          refreshToken.data.access_token
        );
        currentToken = refreshToken.data.access_token;
      }
    }

    config.headers["Authorization"] = `Bearer ${currentToken}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const insertNewTransaction = async (data: TransactionInput) => {
  const response = await transactionApi.post<NewTransactionResponse>(
    "/add",
    data
  );
  return response.data;
};

export const getTransactions = async () => {
  const response = await transactionApi.get<TransactionData[]>("/");
  return response.data;
};

export const editTransaction = async ({
  id,
  transactionInput,
}: EditTransactionInput): Promise<Transaction> => {
  const response = await transactionApi.put(
    makeUrl("/update", { id }),
    transactionInput
  );
  return response.data.data;
};

export const deleteTransaction = async (id: string): Promise<Transaction> => {
  const response = await transactionApi.delete(makeUrl("/delete", { id }));
  return response.data.data;
};

export const getTotalTransactionByPeriod = async (
  interval: "month" | "week"
): Promise<TotalTransactionByDay[]> => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const response = await transactionApi.get(
    makeUrl("/total", { interval, timezone })
  );

  return response.data;
};

export const getRecentTransactions = async (): Promise<Transaction[]> => {
  const limit = 4;
  const response = await transactionApi.get<Transaction[]>(
    makeUrl("/recent", { limit })
  );

  return response.data;
};
