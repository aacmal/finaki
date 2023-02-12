import { instance } from "./api";
import {
  UpdatedWalletResponse,
  WalletInput,
  AllWalletResponse,
  WalletResponse,
  UpdatedWalletColorResponse,
} from "./types/WalletAPI";

export const createNewWallet = async (data: WalletInput) => {
  const response = await instance.post("/wallets", data);
  return response.data.data;
};

export const getAllWallets = async () => {
  const response = await instance.get<AllWalletResponse>("/wallets");

  return response.data.data;
};

export const updateWallet = async (id: string, data: WalletInput) => {
  const response = await instance.put<UpdatedWalletResponse>(
    `/wallets/${id}`,
    data
  );
  return response.data.data;
};

export const deleteWallet = async (id: string) => {
  const response = await instance.delete(`/wallets/${id}`);
  return response.data.data;
};

export const getOneWallet = async (id: string) => {
  const response = await instance.get<WalletResponse>(`/wallets/${id}`);
  return response.data.data;
};

export const updateWalletColor = async ({ id, color }: any) => {
  const response = await instance.patch<UpdatedWalletColorResponse>(
    `/wallets/${id}/color`,
    { color }
  );
  return response.data.data;
};
