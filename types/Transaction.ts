export interface Transaction{
  id: string;
  amount: number;
  date: string;
  description: string;
  category: string;
  type: string;
  time: string;
}

export interface TransactionData {
  transactions: Transaction[];
  date: string;
}