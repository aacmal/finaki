"use client";

import Input from "@/dls/Form/Input";
import { Transaction } from "@/types/Transaction";
import classNames from "classnames";
import React, { useState } from "react";
import TransactionOption from "./TransactionOption";

type Props = {
  transaction: Transaction;
};

const TransactionItem = ({ transaction }: Props) => {
  const [isOnEdit, setIsOnEdit] = useState(false);
  return (
    <div
      className={classNames(
        "flex gap-2 items-center w-full py-3 hover:bg-blue-100 rounded-xl px-4 group",
        { "bg-blue-100": isOnEdit }
      )}
    >
      <div className="w-[14%] hidden lg:block text-gray-500 group-hover:text-gray-900">
        {transaction.time}
      </div>
      <div className="w-[40%] lg:w-[30%] flex flex-col">
        <span className="font-bold lg:font-medium">
          {isOnEdit ? (
            <Input
              type="text"
              placeholder="Deskripsi"
              transparent
              value={transaction.description}
              className="border border-blue-200"
            />
          ) : (
            transaction.description
          )}
        </span>
        <span className="lg:hidden text-gray-600">{transaction.time}</span>
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
      <TransactionOption onEdit={() => setIsOnEdit(!isOnEdit)} />
    </div>
  );
};

export default TransactionItem;
