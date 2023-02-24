"use client";

import { Transaction, TransactionData } from "@/types/Transaction";
import classNames from "classnames";
import React from "react";
import { FullTransactionItem } from "../TransactionItem";

type Props = {
  data: TransactionData[];
};

const TransactionList = ({ data }: Props) => {
  return (
    <>
      {data.map((transactionData: TransactionData, index: number) => {
        if (transactionData.transactions.length === 0) return;
        return (
          <div key={transactionData._id}>
            <div className="flex items-center">
              <h3 className="pl-4 font-bold text-gray-400">
                {transactionData._id}
              </h3>
              <div
                className={classNames(
                  "divider flex-1 ml-2 h-px bg-slate-300 dark:bg-slate-500",
                  { hidden: index === 0 },
                  { block: index > 0 }
                )}
              ></div>
            </div>
            {transactionData.transactions.map(
              (transaction: Transaction, index: number) => (
                <FullTransactionItem
                  key={transaction._id}
                  transaction={transaction}
                />
              )
            )}
          </div>
        );
      })}
    </>
  );
};

export default TransactionList;
