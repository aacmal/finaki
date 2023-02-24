import { deleteTransaction, editTransaction } from "@/api/transaction";
import Input from "@/dls/Form/Input";
import TextArea from "@/dls/Form/TextArea";
import Option from "@/dls/Select/Option";
import Select from "@/dls/Select/Select";
import { QueryKey } from "@/types/QueryKey";
import { Transaction, TransactionData } from "@/types/Transaction";
import { currencyFormat } from "@/utils/currencyFormat";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";
import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import TransactionOption from "../AllTransactions/TransactionOption";
import { TransactionInput } from "@/api/types/TransactionAPI";
import IconWrapper from "@/dls/IconWrapper";
import ArrowIcon from "@/icons/ArrowIcon";
import { toast } from "react-hot-toast";

type Props = {
  transaction: Transaction;
};

/**
 * This is a full transaction item component, it will be used in the transactions page to show the full transaction item and it can be editable
 *
 * @param props
 * @returns
 */
const FullTransactionItem = ({ transaction }: Props) => {
  const [isOnEdit, setIsOnEdit] = useState<boolean>(false);
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
    setError,
  } = useForm();

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteTransaction,
    onSuccess: (data) => {
      console.log("data", data);
      // refetch total transactions
      queryClient.refetchQueries([QueryKey.TOTAL_TRANSACTIONS]);

      // update transactions data
      queryClient.setQueryData([QueryKey.TRANSACTIONS], (oldData: any) => {
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
      queryClient.setQueryData(
        [QueryKey.RECENT_TRANSACTIONS],
        (oldData: any) => {
          if (!oldData) return;
          const newData = oldData.filter(
            (transaction: Transaction) => transaction._id !== data._id
          );
          return newData;
        }
      );

      // if deleted transaction has wallet id, update wallet data
      if (data.walletId) {
        queryClient.setQueryData([QueryKey.WALLETS], (oldData: any) => {
          if (!oldData) return;
          const newData = oldData.map((wallet: any) => {
            if (wallet._id === data.walletId) {
              return {
                ...wallet,
                balance:
                  wallet.balance -
                  (data.type === "in" ? data.amount : -data.amount),
              };
            }
            return wallet;
          });

          return newData;
        });
      }

      toast.success("Transaksi berhasil dihapus");
    },
    onError: (error) => {
      toast.error((error as any).response.data.message, {
        duration: 5000,
      });
    },
  });

  const editMutation = useMutation({
    mutationFn: editTransaction,
    onSuccess: (data) => {
      setIsOnEdit(false);
      console.log(data);
      // refetch total transactions
      queryClient.refetchQueries([QueryKey.TOTAL_TRANSACTIONS]);

      // update transactions data
      queryClient.setQueryData([QueryKey.TRANSACTIONS], (oldData: any) => {
        const newData = oldData.map((transactionData: TransactionData) => {
          const newTransactionData = {
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
        console.log(newData);
        return newData;
      });

      // update recent transaction data
      queryClient.setQueryData(
        [QueryKey.RECENT_TRANSACTIONS],
        (oldData: any) => {
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
        }
      );

      // if edited transaction has wallet id, invalidate wallet query
      if (data.walletId) {
        queryClient.invalidateQueries([QueryKey.WALLETS]);
      }

      // send toast
      toast.success("Transaksi berhasil diubah", {
        duration: 2000,
      });
    },

    onError: (error) => {
      toast.error((error as any).response.data.message, {
        duration: 6000,
      });
      setError(
        "amount",
        {
          type: "manual",
          message: "Ada yang salah",
        },
        {
          shouldFocus: true,
        }
      );
    },
  });

  const onSaveHandler: SubmitHandler<any> = (values: TransactionInput) => {
    const editedTransactionData = {
      id: transaction._id,
      transactionInput: values,
    };

    if (values.amount < 0) {
      setError(
        "amount",
        {
          type: "manual",
          message: "Jumlah tidak boleh kurang dari 0",
        },
        {
          shouldFocus: true,
        }
      );
      toast.error("Jumlah tidak boleh kurang dari 0");
      return;
    }

    //  if transaction data not changed, just close the edit mode
    if (
      values.description === transaction.description &&
      values.amount == transaction.amount &&
      values.type === transaction.type
    ) {
      setIsOnEdit(false);
      return;
    }

    // if editMutation is error, and the request data is the same as the previous request, just close the edit mode
    if (
      editMutation.isError &&
      (editMutation.error as any)?.config.data === JSON.stringify(values)
    ) {
      editMutation.reset();
      setIsOnEdit(false);
      toast.error("Tidak ada perubahan");
      return;
    }

    editMutation.mutate(editedTransactionData);
  };

  const onDeleteHandler = (transactionId: string) => {
    deleteMutation.mutate(transactionId);
  };

  return (
    <div
      className={classNames(
        "flex gap-2 items-center w-full py-3 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-xl px-4 group",
        { "bg-blue-100 dark:bg-blue-900/50": isOnEdit },
        { "z-50 relative": isOnEdit }
      )}
    >
      {!isOnEdit ? (
        <>
          <div className="w-[14%] hidden lg:block text-gray-500 dark:group-hover:text-slate-200 group-hover:text-slate-900 ">
            {transaction.time}
          </div>
          <div className="w-[40%] lg:w-[30%] flex flex-col">
            <div className="font-bold lg:font-medium text-slate-800 dark:text-slate-200">
              {transaction.description}
            </div>
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
              {"null"}
            </span>
          </div>
          <div
            className={classNames(
              "w-[35%] lg:w-[15%] text-right font-medium",
              { "text-blue-500": transaction.type === "in" },
              { "text-orange-500": transaction.type === "out" }
            )}
          >
            <span>
              {transaction.type === "out" ? "-" : "+"}
              {currencyFormat(transaction.amount, {})}
            </span>
          </div>
        </>
      ) : (
        <form
          className="flex gap-3 items-center"
          id="edit-transaction-form"
          onSubmit={handleSubmit(onSaveHandler)}
        >
          <TextArea
            required
            spellCheck={false}
            placeholder="Deskripsi"
            transparent
            defaultValue={transaction.description}
            className="border border-blue-200 h-12"
            {...register("description")}
          />
          <div className="flex gap-3 dark:text-slate-200">
            <Controller
              name="type"
              control={control}
              defaultValue={transaction.type}
              render={({ field }) => (
                <Select required className="!p-3" {...field}>
                  <Option selected={transaction.type === "in"} value="in">
                    <div className="flex gap-2 items-center">
                      <IconWrapper className="!w-4 text-blue-500">
                        <ArrowIcon direction="up" />
                      </IconWrapper>
                      Masuk
                    </div>
                  </Option>
                  <Option selected={transaction.type === "out"} value="out">
                    <div className="flex gap-2 items-center">
                      <IconWrapper className="!w-4 text-orange-500">
                        <ArrowIcon direction="down" />
                      </IconWrapper>
                      Keluar
                    </div>
                  </Option>
                </Select>
              )}
            />
            <Input
              required
              type="number"
              placeholder="amount"
              defaultValue={transaction.amount}
              transparent
              className="border border-blue-200 text-right"
              {...register("amount")}
              error={errors.amount}
            />
          </div>
        </form>
      )}
      <TransactionOption
        isLoading={deleteMutation.isLoading || editMutation.isLoading}
        onCancel={() => setIsOnEdit(false)}
        isOnEdit={isOnEdit}
        onEdit={() => setIsOnEdit(true)}
        onDelete={() => onDeleteHandler(transaction._id)}
      />
    </div>
  );
};

export default FullTransactionItem;
