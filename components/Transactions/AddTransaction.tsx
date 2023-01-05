import Button from "@/dls/Button/Button";
import InputWithLabel from "@/dls/Form/InputWithLabel";
import RadioButton from "@/dls/Form/Radio/RadioButton";
import Heading from "@/dls/Heading";
import IconWrapper from "@/dls/IconWrapper";
import { Modal, ModalCloseTringger, ModalContent } from "@/dls/Modal";
import ModalTrigger from "@/dls/Modal/ModalTrigger";

import ArrowIcon from "@/icons/ArrowIcon";
import XmarkIcon from "@/icons/XmarkIcon";
import React from "react";

type Props = {};

const AddTransaction = (props: Props) => {
  return (
    <Modal>
      <ModalTrigger className="border border-blue-500 text-blue-500 px-3 py-1 rounded-lg font-bold">
        Tambah
      </ModalTrigger>
      <ModalContent className="space-y-6">
        <div className="flex items-center justify-between">
          <Heading level={3}>Tambah Transaksi</Heading>
          <ModalCloseTringger>
            <IconWrapper className="text-blue-500 cursor-pointer">
              <XmarkIcon />
            </IconWrapper>
          </ModalCloseTringger>
        </div>
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
      </ModalContent>
    </Modal>
  );
};

export default AddTransaction;
