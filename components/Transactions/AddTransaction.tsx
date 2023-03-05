import Button from "@/dls/Button/Button";
import LoadingButton from "@/dls/Button/LoadingButton";
import InputWithLabel from "@/dls/Form/InputWithLabel";
import RadioButton from "@/dls/Form/Radio/RadioButton";
import Heading from "@/dls/Heading";
import IconWrapper from "@/dls/IconWrapper";
import LoadingSpinner from "@/dls/Loading/LoadingSpinner";
import { Modal, ModalCloseTringger, ModalContent } from "@/dls/Modal";
import ModalTrigger from "@/dls/Modal/ModalTrigger";

import ArrowIcon from "@/icons/ArrowIcon";
import PlusIcon from "@/icons/PlusIcon";
import XmarkIcon from "@/icons/XmarkIcon";
import { Transaction } from "@/types/Transaction";
import { insertNewTransaction } from "@/api/transaction";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { TransactionInput } from "@/api/types/TransactionAPI";
import { QueryKey } from "@/types/QueryKey";
import { getAllWallets } from "@/api/wallet";
import Select from "@/dls/Select/Select";
import Option from "@/dls/Select/Option";
import { indicatorColor } from "../WalletCard/constants";
import { currencyFormat, removeCurrencyFormat } from "@/utils/currencyFormat";
import CurrencyInput from "@/dls/Form/CurrencyInput";
import TextArea from "@/dls/Form/TextArea";

type Props = {};

const AddTransaction = (props: Props) => {
  const {
    handleSubmit,
    register,
    reset,
    control,
    setError,
    formState: { errors },
  } = useForm();
  const queryClient = useQueryClient();

  const walletQuery = useQuery({
    queryKey: [QueryKey.WALLETS],
    queryFn: getAllWallets,
    onSuccess: (data) => {
      // console.log(data);
    },
  });

  const { isLoading, mutate, isSuccess, isError } = useMutation({
    mutationFn: insertNewTransaction,
    onSuccess: (data) => {
      // push new transaction to recent transaction query cache
      queryClient.setQueryData(
        [QueryKey.RECENT_TRANSACTIONS],
        (oldData: any) => {
          if (!oldData) return;
          return [data, ...oldData];
        }
      );

      // push new transaction to query cache
      queryClient.setQueryData([QueryKey.TRANSACTIONS], (oldData: any) => {
        if (!oldData) return;
        return [data, ...oldData];
      });

      // refetch dashboard data
      queryClient.refetchQueries([QueryKey.TOTAL_TRANSACTIONS]);

      if (data.walletId) {
        queryClient.refetchQueries([QueryKey.WALLETS]);
        queryClient.invalidateQueries([QueryKey.WALLETS, data.walletId]);
      }
      reset();
    },
    onError: (error) => {
      console.log("error", error);
    },
  });

  const onSubmitHandler = (values: any) => {
    const data: TransactionInput = {
      description: values.description,
      amount: removeCurrencyFormat(values.amount),
      type: values["transaction-type"],
      note: values.note,
      walletId: values.wallet ?? null,
    };
    const walletBalance = walletQuery.data?.find(
      (wallet) => wallet._id === values.wallet
    )?.balance;

    if (values["transaction-type"] === "out" && walletBalance! < data.amount) {
      setError(
        "amount",
        {
          type: "manual",
          message: "Saldo tidak mencukupi",
        },
        { shouldFocus: true }
      );
      return;
    }
    mutate(data);
  };

  return (
    <Modal>
      <ModalTrigger className="border border-blue-500 text-blue-500 rounded-2xl lg:bg-transparent dark:lg:bg-transparent dark:bg-slate-700 bg-white lg:shadow-none shadow-xl z-20 overflow-hidden lg:p-0 p-3 lg:rounded-lg font-semibold lg:static fixed bottom-28 right-10">
        <div>
          <span className="lg:block hidden px-3 py-1">Tambah Transaksi</span>
          <div className="w-8 lg:hidden">
            <PlusIcon strokeWidth={2} />
          </div>
        </div>
      </ModalTrigger>
      <form action="" onSubmit={handleSubmit(onSubmitHandler)}>
        <ModalContent className="space-y-6">
          <div className="flex items-center justify-between">
            <Heading level={3}>Tambah Transaksi</Heading>
            <ModalCloseTringger>
              <IconWrapper className="text-blue-500 cursor-pointer rounded hover:bg-blue-100 dark:hover:bg-blue-500/20">
                <XmarkIcon />
              </IconWrapper>
            </ModalCloseTringger>
          </div>
          <InputWithLabel
            id="description"
            type="text"
            placeholder="Top up Diamond"
            label="Deskripsi"
            className="w-full"
            minLength={3}
            required
            {...register("description")}
          />
          <div className="flex gap-5 flex-col lg:flex-row">
            <ul className="flex gap-2">
              <RadioButton
                id="in"
                label="Masuk"
                value="in"
                required
                icon={
                  <ArrowIcon
                    direction="up"
                    strokeWidth={3}
                    className="text-blue-500"
                  />
                }
                {...register("transaction-type")}
              />
              <RadioButton
                id="out"
                label="Keluar"
                value="out"
                required
                icon={
                  <ArrowIcon
                    strokeWidth={3}
                    direction="down"
                    className="text-orange-500"
                  />
                }
                {...register("transaction-type")}
              />
            </ul>
            <Controller
              name="amount"
              control={control}
              render={({ field }) => (
                <CurrencyInput
                  id="amount"
                  placeholder="Rp. 12000"
                  label="Jumlah"
                  className="flex-1"
                  minLength={2}
                  required
                  {...field}
                  error={errors.amount as any}
                />
              )}
            />
          </div>
          <Controller
            name="wallet"
            control={control}
            render={({ field }) => (
              <Select
                optional
                className="w-full"
                required={false}
                placeholder="Pilih Dompet (Opsional)"
                {...field}
              >
                {walletQuery.data?.map((wallet) => (
                  <Option
                    className={classNames(
                      "p-3 rounded-lg mx-2 mb-2 font-bold border-2 border-transparent text-slate-50 hover:border-blue-400 flex justify-between items-center",
                      (indicatorColor as any)[wallet.color]
                    )}
                    key={wallet._id}
                    value={wallet._id}
                  >
                    {wallet.name}
                  </Option>
                ))}
              </Select>
            )}
          />
          <TextArea
            id="note"
            placeholder="Topup diamond untuk beli skin Legend"
            label="Catatan (Opsional)"
            className="w-full"
            {...register("note")}
          />
          <LoadingButton
            isLoading={isLoading}
            onLoadingText="Menambahkan"
            isSuccess={isSuccess}
            onSuccessText="Tambah lagi"
            isError={isError}
            onErrorText="Gagal, coba lagi"
            title="Tambah"
          />
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddTransaction;
