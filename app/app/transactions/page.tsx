"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllTransactions, getTransactionsByDate } from "@/api/transaction";
import { QueryKey } from "@/types/QueryKey";
import TransactionHeader from "@/components/Transactions/AllTransactions/TransactionHeader";
import TransactionList from "@/components/Transactions/AllTransactions/TransactionList";
import Heading from "@/dls/Heading";
import { useEffect, useState } from "react";
import { groupByDay } from "@/utils/array";
import Head from "next/head";
import Image from "next/image";

type Props = {};

const TransactionsPage = (props: Props) => {
  const [transaction, setTransaction] = useState<any[]>();

  const { data, error, isLoading } = useQuery({
    queryKey: [QueryKey.TRANSACTIONS],
    queryFn: () => getAllTransactions(1000),
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    if (data) {
      setTransaction(groupByDay(data));
    }
  }, [data]);

  if (isLoading || !transaction) {
    return (
      <Heading className="text-center mt-10 animate-pulse" level={3}>
        Memuat...
      </Heading>
    );
  }

  if (!transaction || error) {
    return (
      <Heading className="text-center mt-10" level={3}>
        Terjadi Kesalahan
      </Heading>
    );
  }

  if (transaction.length < 1) {
    return (
      <div className="flex flex-col justify-center items-center mt-10 dark:text-slate-300 font-semibold">
        <Image
          src="/images/transaction.png"
          alt="Transaction is empty"
          width={200}
          height={200}
        />
        <Heading level={3}>Belum ada transaksi</Heading>
        <br />
        <strong className="text-lg font-normal">
          Untuk menambahkan transaksi, klik icon + atau tambah transaksi
        </strong>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Transaksi</title>
      </Head>
      <div className="flex flex-col w-full">
        <TransactionHeader />
        <TransactionList data={transaction} />
      </div>
    </>
  );
};

export default TransactionsPage;
