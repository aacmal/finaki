'use client'

import { Transaction, TransactionData } from "@/types/Transaction";
import React from "react";
import TransactionItem from "./TransactionItem";

type Props = {
  data: TransactionData[];
};

const TransactionList = ({ data }: Props) => {
  return (
    <>
      {data.map((transactionData: TransactionData) => (
        <>
          <h1
            className="pl-4 font-bold text-gray-400"
            key={transactionData.date}
          >
            {transactionData.date}
          </h1>
          {transactionData.transactions.map(
            (transaction: Transaction, index: number) => (
              <TransactionItem key={index} transaction={transaction} />
            )
          )}
        </>
      ))}
    </>
  );
};

export default TransactionList;
