"use client";

import { Transaction, TransactionData } from "@/types/Transaction";
import classNames from "classnames";
import React from "react";
import TransactionItem from "./TransactionItem";

type Props = {
  data: TransactionData[];
};

const TransactionList = ({ data }: Props) => {
  return (
    <>
      {data.map((transactionData: TransactionData, index: number) => (
        <>
          <div className="flex items-center">
            <h3
              className="pl-4 font-bold text-gray-400"
              key={transactionData.date}
            >
              {transactionData.date}
            </h3>
            <div
              className={classNames(
                "divider flex-1 ml-2 h-px bg-slate-300",
                { hidden: index === 0 },
                { block: index > 0 }
              )}
            ></div>
          </div>
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
