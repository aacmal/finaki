export interface ITransaction {
  id?: string;
  description: string;
  type: "in" | "out";
  amount: number;
  category?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
