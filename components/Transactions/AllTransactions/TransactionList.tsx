"use client";

import { Transaction } from "@/types/Transaction";
import classNames from "classnames";
import React from "react";
import { FullTransactionItem } from "../TransactionItem";

type Props = {
  data: {
    date: string;
    data: Transaction[];
  }[];
};

const TransactionList = ({ data }: Props) => {
  return (
    <>
      {data.map((transactionData, index) => {
        return (
          <div key={transactionData.date}>
            <div className="flex items-center">
              <h3 className="pl-4 font-bold text-gray-400">
                {transactionData.date}
              </h3>
              <div
                className={classNames(
                  "divider flex-1 ml-2 h-px bg-slate-300 dark:bg-slate-500",
                  { hidden: index === 0 },
                  { block: index > 0 }
                )}
              ></div>
            </div>
            {transactionData.data?.map(
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
