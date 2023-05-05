"use client";

import { Transaction } from "@/types/Transaction";
import classNames from "classnames";
import React, { Fragment } from "react";
import { FullTransactionItem } from "../TransactionItem";

type Props = {
  data: {
    date: string;
    data: Transaction[];
  }[];
};

const TransactionList = ({ data }: Props) => {
  return (
    <tbody>
      {data.map((transactionData, index) => {
        return (
          <Fragment key={index}>
            <tr>
              <td align="left" colSpan={5}>
                <h3 className="font-bold text-gray-400 mt-3 pb-1">
                  {transactionData.date}
                </h3>
                <div
                  className={classNames(
                    "w-full h-px bg-slate-400 dark:bg-slate-500 mb-1",
                    { hidden: index === 0 },
                    { block: index > 0 }
                  )}
                ></div>
              </td>
            </tr>
            {transactionData.data?.map(
              (transaction: Transaction, index: number) => (
                <FullTransactionItem
                  key={transaction._id}
                  transaction={transaction}
                />
              )
            )}
          </Fragment>
        );
      })}
    </tbody>
  );
};

export default TransactionList;
