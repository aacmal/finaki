"use client";

import Input from "@/dls/Form/Input";
import IconButton from "@/dls/IconButton";
import ArrowIcon from "@/icons/ArrowIcon";
import { Transaction } from "@/types/Transaction";
import classNames from "classnames";
import React, { useState } from "react";
import TransactionOption from "./TransactionOption";

type Props = {
  transaction: Transaction;
};

const TransactionItem = ({ transaction }: Props) => {
  const [isOnEdit, setIsOnEdit] = useState(false);

  const onSaveHandle = () => {
    setIsOnEdit(false);
    alert("Save");
  };

  return (
    <>
      {isOnEdit && (
        <div className="w-screen h-screen bg-transparent absolute top-0 right-0 z-40"></div>
      )}
      <div
        className={classNames(
          "flex gap-2 items-center w-full py-3 hover:bg-blue-100 rounded-xl px-4 group",
          { "bg-blue-100": isOnEdit },
          { "z-50": isOnEdit }
        )}
      >
        <div className="w-[14%] hidden lg:block text-gray-500 group-hover:text-gray-900">
          {transaction.time}
        </div>
        <div className="w-[40%] lg:w-[30%] flex flex-col">
          {isOnEdit ? (
            <Input
              type="text"
              placeholder="Deskripsi"
              transparent
              value={transaction.description}
              className="border border-blue-200 -ml-3"
            />
          ) : (
            <span className="font-bold lg:font-medium">
              {transaction.description}
            </span>
          )}
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
            { "text-green-500": transaction.type === "in" && !isOnEdit },
            { "text-red-500": transaction.type === "out" && !isOnEdit },
            { "text-gray-700": isOnEdit},
            {"w-[50%]": isOnEdit}
          )}
        >
          {isOnEdit ? (
            <div className="flex gap-1 ml-4">
              <select className="bg-transparent">
                <option className="text-green-500" value="in">in</option>
                <option className="text-red-500" value="out">out</option>
              </select>
              <Input
                type="number"
                placeholder="amount"
                value={transaction.amount}
                transparent
                className="border border-blue-200 text-right"
              />
            </div>
          ) : (
            <span>
              {transaction.type === "out" && "-"}
              {transaction.amount}
            </span>
          )}
        </div>
        <TransactionOption
          onCancel={() => setIsOnEdit(false)}
          onSave={onSaveHandle}
          isOnEdit={isOnEdit}
          onEdit={() => setIsOnEdit(!isOnEdit)}
        />
      </div>
    </>
  );
};

export default TransactionItem;