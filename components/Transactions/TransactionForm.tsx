import Button from "@/dls/Button/Button";
import InputWithLabel from "@/dls/Form/InputWithLabel";
import RadioButton from "@/dls/Form/Radio/RadioButton";
import Heading from "@/dls/Heading";
import ArrowIcon from "@/icons/ArrowIcon";
import React from "react";

type Props = {};

const TransactionForm = (props: Props) => {
  return (
    <div className="absolute left-0 top-0 h-screen w-full bg-transparent grid place-items-center z-50">
      <div className="p-5 bg-white shadow-2xl max-w-lg rounded-lg space-y-6">
        <Heading level={3}>Tambah Transaksi</Heading>
        <InputWithLabel
          id="description"
          type="text"
          placeholder="Bayar SPP"
          label="Deskripsi"
          className="w-full"
          minLength={3}
          required
        />
        <div className="flex gap-3 items-center">
          <ul className="flex gap-2">
            <RadioButton
              name="transaction-type"
              id="in"
              label="Masuk"
              icon={<ArrowIcon direction="up" className="text-blue-500" />}
            />
            <RadioButton
              name="transaction-type"
              id="out"
              label="Keluar"
              icon={<ArrowIcon direction="down" className="text-orange-500" />}
            />
          </ul>
          <InputWithLabel
            id="amount"
            type="number"
            placeholder="12000"
            label="Jumlah"
            className="flex-1"
            minLength={2}
            required
          />
        </div>
        <Button type="submit" width="full">
          Tamabah
        </Button>
      </div>
    </div>
  );
};

export default TransactionForm;
