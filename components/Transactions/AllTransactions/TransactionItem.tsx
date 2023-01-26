"use client";

import Input from "@/dls/Form/Input";
import { Transaction, TransactionData } from "@/types/Transaction";
import {
  deleteTransaction,
  editTransaction,
  TransactionInput,
} from "@/utils/api/transactionApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import TransactionOption from "./TransactionOption";

type Props = {
  transaction: Transaction;
};

const TransactionItem = ({ transaction }: Props) => {
  const [isOnEdit, setIsOnEdit] = useState(false);

  const { handleSubmit, register } = useForm();

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteTransaction,
    onSuccess: (data) => {
      // refetch total transactions
      queryClient.refetchQueries(["total-transactions"]);
      // update transactions data
      queryClient.setQueryData(["transactions"], (oldData: any) => {
        const newData = oldData.map((transactionData: TransactionData) => {
          const newTransactionData: TransactionData = {
            _id: transactionData._id,
            transactions: transactionData.transactions.filter(
              (transaction: Transaction) => transaction._id !== data._id
            ),
          };
          return newTransactionData;
        });
        return newData;
      });
      // update recent transactions data
      queryClient.setQueryData(["recent-transactions"], (oldData: any) => {
        if (!oldData) return;
        const newData = oldData.filter(
          (transaction: Transaction) => transaction._id !== data._id
        );
        return newData;
      });
    },
  });

  const editMutation = useMutation({
    mutationFn: editTransaction,
    onSuccess: (data) => {
      setIsOnEdit(false);
      console.log("edit", data);

      // refetch total transactions
      queryClient.refetchQueries(["total-transactions"]);
      // update transactions data
      queryClient.setQueryData(["transactions"], (oldData: any) => {
        const newData = oldData.map((transactionData: TransactionData) => {
          const newTransactionData: TransactionData = {
            _id: transactionData._id,
            transactions: transactionData.transactions.map(
              (oldTransaction: Transaction) => {
                if (oldTransaction._id === data._id) {
                  return {
                    ...data,
                    time: oldTransaction.time,
                  };
                }
                return oldTransaction;
              }
            ),
          };
          return newTransactionData;
        });

        return newData;
      });
      // update recent transaction data
      queryClient.setQueryData(["recent-transactions"], (oldData: any) => {
        if (!oldData) return;
        const newData: Transaction[] = oldData.map(
          (oldTransaction: Transaction) => {
            if (oldTransaction._id === data._id) {
              return {
                ...oldTransaction,
                description: data.description,
                amount: data.amount,
                type: data.type,
              };
            }
            return oldTransaction;
          }
        );
        return newData;
      });
    },
  });

  const onSaveHandler: SubmitHandler<any> = (values: TransactionInput) => {
    const mutationParams = {
      id: transaction._id,
      transactionInput: values,
    };
    editMutation.mutate(mutationParams);
  };

  const onDeleteHandler = (transactionId: string) => {
    deleteMutation.mutate(transactionId);
  };

  return (
    <>
      {isOnEdit && (
        <div className="w-screen h-screen bg-transparent absolute top-0 right-0 z-40"></div>
      )}
      <form onSubmit={handleSubmit(onSaveHandler)}>
        <div
          className={classNames(
            "flex gap-2 items-center w-full py-3 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-xl px-4 group",
            { "bg-blue-100 dark:bg-blue-900/50": isOnEdit },
            { "z-50 relative": isOnEdit }
          )}
        >
          <div className="w-[14%] hidden lg:block text-gray-500 dark:group-hover:text-slate-200 group-hover:text-slate-900 ">
            {transaction.time}
          </div>
          <div className="w-[40%] lg:w-[30%] flex flex-col">
            {isOnEdit ? (
              <Input
                type="text"
                placeholder="Deskripsi"
                transparent
                defaultValue={transaction.description}
                className="border border-blue-200 -ml-3"
                {...register("description")}
              />
            ) : (
              <span className="font-bold lg:font-medium text-slate-800 dark:text-slate-200">
                {transaction.description}
              </span>
            )}
            <div
              className={classNames(
                "lg:hidden text-gray-500 dark:group-hover:text-slate-200 group-hover:text-slate-900"
              )}
            >
              {transaction.time}
            </div>
          </div>
          <div className="w-[10%] text-center">
            <span className="px-3 text-orange-700 bg-orange-200 text-sm rounded-3xl">
              {transaction.category}
            </span>
          </div>
          <div
            className={classNames(
              "w-[35%] lg:w-[15%] text-right font-medium",
              { "text-blue-500": transaction.type === "in" && !isOnEdit },
              { "text-orange-500": transaction.type === "out" && !isOnEdit },
              { "text-gray-700": isOnEdit },
              { "w-[50%]": isOnEdit }
            )}
          >
            {isOnEdit ? (
              <div className="flex gap-1 ml-4 dark:text-slate-200">
                <select
                  defaultValue={transaction.type}
                  {...register("type")}
                  className="bg-transparent"
                >
                  <option className="text-blue-500" value="in">
                    in
                  </option>
                  <option className="text-orange-500" value="out">
                    out
                  </option>
                </select>
                <Input
                  type="sadd"
                  placeholder="amount"
                  defaultValue={transaction.amount}
                  transparent
                  className="border border-blue-200 text-right"
                  {...register("amount")}
                />
              </div>
            ) : (
              <span>
                {transaction.type === "out" ? "-" : "+"}
                {transaction.amount}
              </span>
            )}
          </div>
          <TransactionOption
            isLoading={deleteMutation.isLoading || editMutation.isLoading}
            onCancel={() => setIsOnEdit(false)}
            isOnEdit={isOnEdit}
            onEdit={() => setIsOnEdit(true)}
            onDelete={() => onDeleteHandler(transaction._id)}
          />
        </div>
      </form>
    </>
  );
};

export default TransactionItem;
