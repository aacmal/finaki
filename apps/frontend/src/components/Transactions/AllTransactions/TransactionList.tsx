"use client";

import { Fragment } from "react";
import { Transaction } from "@/types/Transaction";
import classNames from "classnames";

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
                <h3 className="mt-3 pb-1 font-bold text-gray-400">
                  {transactionData.date}
                </h3>
                <div
                  className={classNames(
                    "mb-1 h-px w-full bg-slate-400 dark:bg-slate-500",
                    { hidden: index === 0 },
                    { block: index > 0 },
                  )}
                ></div>
              </td>
            </tr>
            {transactionData.data?.map((transaction: Transaction) => (
              <FullTransactionItem
                key={transaction._id}
                transaction={transaction}
              />
            ))}
          </Fragment>
        );
      })}
    </tbody>
  );
};

export default TransactionList;
