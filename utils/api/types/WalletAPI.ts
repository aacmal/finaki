import { BalanceHistory, WalletData } from "@/types/Wallet";
import { GenericRequest, GenericResponse } from "./Api";

export interface WalletInput {
  name: string;
  balance?: number;
  color: string;
}

export interface CreatedWalletResponse extends GenericResponse {
  data: WalletData;
}

export interface UpdatedWalletResponse extends GenericResponse {
  data: WalletData;
}

export interface AllWalletResponse {
  data: WalletData[];
}

export interface WalletResponse extends GenericResponse {
  data: WalletData;
}

export interface UpdatedWalletColorResponse extends GenericResponse {
  data: {
    _id: string;
    color: string;
  };
}

export interface DeleteWalletRequest extends GenericRequest {
  param: {
    id: string;
  };
  query: {
    deleteTransactions: boolean;
  };
}

export interface WalletBalanceActivityResponse extends GenericResponse {
  data: BalanceHistory[];
}

export interface WalletDetailsResponse extends GenericResponse {
  data: WalletData & {
    balanceHistory: BalanceHistory[];
  };
}
