import { TransactionData } from "@/types/Transaction";
import React from "react";
import TransactionHeader from "./TransactionHeader";
import TransactionList from "./TransactionList";

type Props = {
  data: TransactionData[];
};

const AllTransactions = ({ data }: Props) => {
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
