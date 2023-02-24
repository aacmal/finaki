"use client";

import { useQuery } from "@tanstack/react-query";
import { getTransactionsByDate } from "@/api/transaction";
import { QueryKey } from "@/types/QueryKey";
import TransactionHeader from "@/components/Transactions/AllTransactions/TransactionHeader";
import TransactionList from "@/components/Transactions/AllTransactions/TransactionList";

type Props = {};

const TransactionsPage = (props: Props) => {
  const { data, error } = useQuery({
    queryKey: [QueryKey.TRANSACTIONS],
    queryFn: getTransactionsByDate,
    onError: (error) => {
      console.log(error);
    },
  });

  if (!data) return <div>Loading...</div>;
  if (data.length < 1) {
    return (
      <div className="flex flex-col justify-center items-center mt-10 dark:text-slate-300 font-semibold">
        <span>Tidak ada transaksi</span>
        <br />
        <strong className="text-lg font-normal">
          Untuk menambahkan transaksi, klik icon + atau tambah transaksi
        </strong>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      <TransactionHeader />
      <TransactionList data={data} />
    </div>
  );
};

export default TransactionsPage;
