import { deleteTransaction, editTransaction } from "@/api/transaction";
import Input from "@/dls/Form/Input";
import TextArea from "@/dls/Form/TextArea";
import Option from "@/dls/Select/Option";
import Select from "@/dls/Select/Select";
import { QueryKey } from "@/types/QueryKey";
import { Transaction } from "@/types/Transaction";
import { currencyFormat, removeCurrencyFormat } from "@/utils/currencyFormat";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";
import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import TransactionOption from "../AllTransactions/TransactionOption";
import { TransactionInput } from "@/api/types/TransactionAPI";
import IconWrapper from "@/dls/IconWrapper";
import ArrowIcon from "@/icons/ArrowIcon";
import { toast } from "react-hot-toast";
import { WalletData } from "@/types/Wallet";
import Link from "next/link";
import { Routes } from "@/types/Routes";
import { walletLabelColor } from "@/components/WalletCard/constants";
import InputWithLabel from "@/dls/Form/InputWithLabel";
import Control from "react-select/dist/declarations/src/components/Control";
import CurrencyInput from "@/dls/Form/CurrencyInput";
import useStore from "../../../stores/store";

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
  const setTransactionId = useStore(
    (state) => state.transactionDetailState.setTransactionId
  );

  const [isOnEdit, setIsOnEdit] = useState<boolean>(false);
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
    setError,
  } = useForm();

  const queryClient = useQueryClient();

  const wallets = queryClient.getQueryData([QueryKey.WALLETS]) as WalletData[];

  const currentWallet = wallets?.find(
    (wallet: any) => wallet._id === transaction.walletId
  );

  const deleteMutation = useMutation({
    mutationFn: deleteTransaction,
    onSuccess: (data) => {
      // refetch dashboard data
      queryClient.refetchQueries([QueryKey.TOTAL_TRANSACTIONS]);

      // update transactions data
      queryClient.setQueryData([QueryKey.TRANSACTIONS], (oldData: any) =>
        oldData.filter(
          (transaction: Transaction) => transaction._id !== data._id
        )
      );

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
      // refetch total transactions
      queryClient.refetchQueries([QueryKey.TOTAL_TRANSACTIONS]);

      // update transactions data
      queryClient.setQueryData([QueryKey.TRANSACTIONS], (oldData: any) => {
        return oldData.map((transaction: Transaction) => {
          if (transaction._id === data._id) {
            return {
              ...data,
            };
          }
          return transaction;
        });
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

      // if edited transaction has wallet id and transaction amount is changed, invalidate wallet query
      if (data.walletId && data.amount !== transaction.amount) {
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

  const onSaveHandler: SubmitHandler<any> = (values: any) => {
    const editedTransactionData = {
      id: transaction._id,
      transactionInput: {
        ...values,
        amount: removeCurrencyFormat(values.amount),
      },
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

  const date = new Date(transaction.createdAt).toTimeString().slice(0, 5);

  return (
    <>
      {isOnEdit && (
        <div className="w-screen h-screen bg-transparent absolute top-0 right-0 z-40"></div>
      )}
      <tr
        className={classNames("dark:hover:bg-blue-900/50 lg:pr-4 pr-0 group", {
          "z-50 relative": isOnEdit,
        })}
      >
        {!isOnEdit ? (
          <>
            <td className="hidden rounded-l-xl group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 h-14 pl-3 lg:table-cell text-gray-500 dark:group-hover:text-slate-200 group-hover:text-slate-900 ">
              {date}
            </td>
            <td className="rounded-l-xl lg:rounded-none group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 py-3 lg:pl-0 pl-2">
              <div
                onClick={() => setTransactionId(transaction._id)}
                className="font-semibold lg:font-medium text-slate-800  dark:text-slate-200 cursor-pointer block w-36 md:w-72 lg:w-96 truncate"
              >
                {transaction.description}
              </div>
              <div
                className={classNames(
                  "lg:hidden text-gray-500 dark:group-hover:text-slate-200 group-hover:text-slate-900"
                )}
              >
                {date}
              </div>
            </td>
            <td
              align="center"
              className="group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50"
            >
              <Link
                href={
                  currentWallet
                    ? `${Routes.Wallet}/${currentWallet._id}`
                    : Routes.Transactions
                }
                className={classNames(
                  "px-3 py-1 w-fit block text-center text-sm rounded-xl font-medium",
                  `${
                    currentWallet &&
                    (walletLabelColor as any)[currentWallet.color]
                  }`,
                  {
                    "cursor-pointer": currentWallet,
                  },
                  {
                    "text-slate-600 dark:text-slate-200 !cursor-default":
                      !currentWallet,
                  }
                )}
              >
                {currentWallet ? currentWallet.name.split(" ")[0] : " - "}
              </Link>
            </td>
            <td
              className={classNames(
                "text-right font-medium group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50",
                { "text-blue-500": transaction.type === "in" },
                { "text-orange-500": transaction.type === "out" }
              )}
            >
              <span>
                {transaction.type === "out" ? "-" : "+"}
                {currencyFormat(transaction.amount, {})}
              </span>
            </td>
          </>
        ) : (
          <td
            colSpan={4}
            className="py-2 pl-3 bg-blue-100 dark:bg-blue-900/50 rounded-l-xl pr-2"
          >
            <form
              className="flex gap-3 items-center w-full"
              id="edit-transaction-form"
              onSubmit={handleSubmit(onSaveHandler)}
            >
              <TextArea
                id="Deskripsi"
                required
                spellCheck={false}
                placeholder="Deskripsi"
                transparent
                defaultValue={transaction.description}
                className="w-[50%] h-auto"
                padding="p-2 h-12"
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
                <Controller
                  name="amount"
                  control={control}
                  defaultValue={String(transaction.amount)}
                  render={({ field }) => (
                    <CurrencyInput
                      prefixSymbol=""
                      inputStyle="!p-2 h-12"
                      placeholder="Jumlah"
                      id="amount"
                      {...field}
                    />
                  )}
                />
              </div>
            </form>
          </td>
        )}
        <td
          className={classNames(
            "group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 rounded-r-xl",
            {
              "bg-blue-100 dark:bg-blue-900/50": isOnEdit,
            }
          )}
        >
          <TransactionOption
            isLoading={deleteMutation.isLoading || editMutation.isLoading}
            onCancel={() => setIsOnEdit(false)}
            isOnEdit={isOnEdit}
            onEdit={() => setIsOnEdit(true)}
            onDelete={() => onDeleteHandler(transaction._id)}
          />
        </td>
      </tr>
    </>
  );
};

export default FullTransactionItem;
