export interface Transaction {
  _id: string;
  walletId?: string;
  amount: number;
  description: string;
  note: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  // category?: string;
}

export interface TransactionByDate {
  date: string;
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
