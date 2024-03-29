import { instance } from "./api";
import { makeUrl } from "./config";
import {
  AllWalletResponse,
  CreatedWalletResponse,
  DeleteWalletRequest,
  TransferBalance,
  UpdatedWalletColorResponse,
  UpdatedWalletResponse,
  UpdateWalletRequest,
  WalletDetailsResponse,
  WalletInput,
} from "./types/WalletAPI";

import { Transaction } from "@/types/Transaction";
import { TransactionsResponse } from "./types/TransactionAPI";

export const createNewWallet = async (data: WalletInput) => {
  const response = await instance.post<CreatedWalletResponse>("/wallets", data);
  return response.data.data;
};

export const getAllWallets = async () => {
  const response = await instance.get<AllWalletResponse>("/wallets");

  return response.data.data;
};

export const updateWallet = async ({ id, data }: UpdateWalletRequest) => {
  const response = await instance.put<UpdatedWalletResponse>(
    `/wallets/${id}`,
    data
  );
  return response.data.data;
};

export const deleteWallet = async (data: DeleteWalletRequest) => {
  const response = await instance.delete(
    makeUrl(`/wallets/${data.param.id}`, data?.query)
  );
  return response.data.data;
};

export const getOneWallet = async (id: string) => {
  const response = await instance.get<WalletDetailsResponse>(`/wallets/${id}`);
  return response.data.data;
};

export const updateWalletColor = async ({
  id,
  color,
}: Record<string, string>) => {
  const response = await instance.patch<UpdatedWalletColorResponse>(
    `/wallets/${id}/color`,
    { color }
  );
  return response.data.data;
};

export const transferBalance = async (data: TransferBalance) => {
  const response = await instance.post(`/wallets/transfer-balance`, data);
  return response.data.data;
};

export const getWalletTransactions = async (
  id: string
): Promise<Transaction[]> => {
  const response = await instance.get<TransactionsResponse>(
    `/wallets/${id}/transactions`
  );
  return response.data.data;
};

export const reoderWallets = async (params: { walletIds: string[] }) => {
  const data = {
    walletIds: JSON.stringify(params.walletIds),
  };
  const response = await instance.post(`/wallets/reorder`, data);
  return response.data;
};

// export const getWalletBalanceActivity = async (walletId: string) => {
//   const response = await instance.get<WalletBalanceActivityResponse>(
//     `/wallets/${walletId}/balance-activity`
//   );
//   return response.data.data;
// };
