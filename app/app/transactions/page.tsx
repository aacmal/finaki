"use client";

import AllTransactions from "@/components/Transactions/AllTransactions";
import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "@/utils/api/transactionApi";

type Props = {};

const TransactionsPage = (props: Props) => {
  const { data, error } = useQuery(["transactions"], getTransactions, {
    onSuccess: (data) => {
      console.log("data", data);
    },
    onError: (error) => {
      console.log("error", error);
    },
  });

  return (
    <>
      <AllTransactions data={data} />
    </>
  );
};

export default TransactionsPage;
