import { TransactionData } from "@/types/Transaction";
import React from "react";
import TransactionHeader from "./TransactionHeader";
import TransactionList from "./TransactionList";

type Props = {
  data: TransactionData[] | undefined;
};

const AllTransactions = ({ data }: Props) => {
  if (!data) {
    return <div>Error</div>;
  }

  if (data.length === 0)
    return (
      <div className="flex flex-col justify-center items-center mt-10 dark:text-slate-300 font-semibold">
        <span>Tidak ada transaksi</span>
        <br />
        <strong className="text-lg font-normal">
          Untuk menambahkan transaksi, klik icon +
        </strong>
      </div>
    );

  return (
    <>
      <div className="flex flex-col w-full">
        <TransactionHeader />
        <TransactionList data={data} />
      </div>
    </>
  );
};

export default AllTransactions;
