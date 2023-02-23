export interface Transaction {
  _id: string;
  walletId?: string;
  amount: number;
  description: string;
  // category?: string;
  type: string;
  time: string;
  createdAt: string;
}

export interface TransactionData {
  _id: string;
  transactions: Transaction[];
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
