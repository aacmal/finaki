"use client";

import TransactionHeader from "@/components/Transactions/AllTransactions/TransactionHeader";
import TransactionList from "@/components/Transactions/AllTransactions/TransactionList";
import Heading from "@/dls/Heading";
import { QueryKey } from "@/types/QueryKey";
import { Transaction } from "@/types/Transaction";
import { groupByDay } from "@/utils/array";
import { useQuery } from "@tanstack/react-query";
import Head from "next/head";

const TransactionsPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: [QueryKey.TRANSACTIONS],
    queryFn: (): Promise<Transaction[]> =>
      new Promise((resolve) => {
        import("@/data/dummy-data/transaction.json").then((data) => {
          resolve(data.data as Transaction[]);
        });
      }),
    onError: (error) => {
      console.log(error);
    },
  });

  if (isLoading || !data) {
    return (
      <Heading className="text-center mt-10 animate-pulse" level={3}>
        Memuat...
      </Heading>
    );
  }

  const transaction = groupByDay(data);

  return (
    <>
      <Head>
        <title>Transaksi</title>
      </Head>
      <table className="w-full" border={0}>
        <TransactionHeader />
        <TransactionList data={transaction} />
      </table>
    </>
  );
};

export default TransactionsPage;
