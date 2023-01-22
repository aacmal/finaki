import { Transaction, TransactionData } from "@/types/Transaction";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { refreshAccessToken } from "./authApi";
import { commonApi } from "./commonApi";
import { BASE_URL } from "./config";

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

interface TransactionInput {
  description: string;
  amount: number;
  type: string;
  category?: string;
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

export const createNewTransaction = async (data: TransactionInput) => {
  const response = await transactionApi.post<NewTransactionResponse>(
    "/create",
    data
  );
  return response.data;
};

export const getTransactions = async () => {
  const response = await transactionApi.get<TransactionData[]>("/");
  return response.data;
};
