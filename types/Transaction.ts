export interface Transaction {
  _id: string;
  amount: number;
  description: string;
  category?: string;
  type: string;
  time: string;
}

export interface TransactionData {
  _id: string;
  transactions: Transaction[];
}
