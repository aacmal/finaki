export interface WalletData {
  _id: string;
  name: string;
  balance: number;
  color: string;
  creadtedAt?: string;
}

export interface BalanceActivity {
  timestamp: string;
  value: number;
}
