import { Transaction, TransactionData } from "@/types/Transaction";
import classNames from "classnames";
import React from "react";
import TransactionOption from "./TransactionOption";

type Props = {
  data: TransactionData[];
};

const TransactionItem = ({ data }: Props) => {
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
              <div
                key={index}
                className="flex gap-2 items-center w-full py-3 hover:bg-blue-100 rounded-xl px-4 group"
              >
                <div className="w-[14%] hidden lg:block text-gray-500 group-hover:text-gray-900">
                  {transaction.time}
                </div>
                <div className="w-[40%] lg:w-[30%] flex flex-col">
                  <span className="font-bold lg:font-medium">
                    {transaction.description}
                  </span>
                  <span className="lg:hidden text-gray-600">
                    {transaction.time}
                  </span>
                </div>
                <div className="w-[10%] text-center">
                  <span className="px-3 text-green-700 bg-green-200 text-sm rounded-3xl">
                    {transaction.category}
                  </span>
                </div>
                <div
                  className={classNames(
                    "w-[35%] lg:w-[15%] text-right font-medium",
                    { "text-green-500": transaction.type === "in" },
                    { "text-red-500": transaction.type === "out" }
                  )}
                >
                  {transaction.type === "out" && "-"}
                  {transaction.amount}
                </div>
                <TransactionOption/>
              </div>
            )
          )}
        </>
      ))}
    </>
  );
};

export default TransactionItem;
