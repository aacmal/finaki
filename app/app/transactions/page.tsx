"use client";

import AllTransactions from "@/components/Transactions/AllTransactions";
import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "@/utils/api/transactionApi";

type Props = {};

const TransactionsPage = (props: Props) => {
  const { data, error } = useQuery(["transactions"], getTransactions, {
    onSuccess: (data) => {},
    onError: (error) => {
      console.log("error", error);
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return (
    <>
      <AllTransactions data={data} />
    </>
  );
};

export default TransactionsPage;
