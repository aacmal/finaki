import Button from "@/dls/Button/Button";
import InputWithLabel from "@/dls/Form/InputWithLabel";
import RadioButton from "@/dls/Form/Radio/RadioButton";
import Heading from "@/dls/Heading";
import IconWrapper from "@/dls/IconWrapper";
import LoadingSpinner from "@/dls/Loading/LoadingSpinner";
import { Modal, ModalCloseTringger, ModalContent } from "@/dls/Modal";
import ModalTrigger from "@/dls/Modal/ModalTrigger";

import ArrowIcon from "@/icons/ArrowIcon";
import XmarkIcon from "@/icons/XmarkIcon";
import {
  insertNewTransaction,
  TransactionInput,
} from "@/utils/api/transactionApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";
import React from "react";
import { useForm } from "react-hook-form";

type Props = {};

const AddTransaction = (props: Props) => {
  const { handleSubmit, register, reset } = useForm();
  const queryCleint = useQueryClient();

  const { isLoading, mutate, isSuccess } = useMutation({
    mutationFn: insertNewTransaction,
    onSuccess: (data) => {
      queryCleint.invalidateQueries(["transactions"]);
      reset();
    },
    onError: () => {
      console.log("error");
    },
  });

  const onSubmitHandler = (values: any) => {
    const data: TransactionInput = {
      description: values.description,
      amount: values.amount,
      type: values["transaction-type"],
    };
    console.log(data);
    mutate(data);
  };

  return (
    <Modal>
      <ModalTrigger className="border border-blue-500 text-blue-500 px-3 py-1 rounded-lg font-bold">
        Tambah
      </ModalTrigger>
      <form action="" onSubmit={handleSubmit(onSubmitHandler)}>
        <ModalContent className="space-y-6 dark:bg-slate-600">
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
          <div className="flex gap-3 items-center">
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
            <InputWithLabel
              id="amount"
              type="number"
              placeholder="Rp. 12000"
              label="Jumlah"
              className="flex-1"
              minLength={2}
              required
              {...register("amount")}
            />
          </div>
          <Button type="submit" disabled={isLoading} width="full">
            <div className="flex items-center justify-center">
              <LoadingSpinner
                className={classNames(
                  "transition-all duration-500 stroke-white",
                  {
                    "max-w-0 mr-0": !isLoading,
                    "max-w-xs mr-3": isLoading,
                  }
                )}
              />
              <span>
                {isLoading ? "Menambahkan" : !isSuccess ? "Tambah" : "Ulangi"}
              </span>
            </div>
          </Button>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddTransaction;
