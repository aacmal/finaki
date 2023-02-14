"use client";

import AllTransactions from "@/components/Transactions/AllTransactions/AllTransactions";
import { useQuery } from "@tanstack/react-query";
import { getTransactionsByDate } from "@/api/transaction";
import { QueryKey } from "@/types/QueryKey";

type Props = {};

const TransactionsPage = (props: Props) => {
  const { data, error } = useQuery({
    queryKey: [QueryKey.TRANSACTIONS],
    queryFn: getTransactionsByDate,
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <>
      <AllTransactions data={data} />
    </>
  );
};

export default TransactionsPage;
