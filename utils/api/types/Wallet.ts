import { GenericResponse } from "./Api";

export interface WalletInput {
  name: string;
  balance?: number;
  color: string;
}

export interface WalletData {
  _id: string;
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
