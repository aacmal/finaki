"use client";

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getAllTransactions } from "@/api/transaction";
import { QueryKey } from "@/types/QueryKey";
import TransactionHeader from "@/components/Transactions/AllTransactions/TransactionHeader";
import TransactionList from "@/components/Transactions/AllTransactions/TransactionList";
import Heading from "@/dls/Heading";
import { useEffect, useMemo, useState } from "react";
import { groupByDay } from "@/utils/array";
import Head from "next/head";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import LoadingSpinner from "@/dls/Loading/LoadingSpinner";
import classNames from "classnames";
import { shallow } from "zustand/shallow";
import useTransaction from "../../../stores/transactionStore";
import { toast } from "react-hot-toast";
import { SimpleTSkeleton } from "@/components/Transactions/TransactionItem";
import Button from "@/dls/Button/Button";
import Input from "@/dls/Form/Input";
import InputWithLabel from "@/dls/Form/InputWithLabel";
import ExportPDF from "./ExportPDF";
import { useDebounce } from "../../../hooks/useDebounce";

type Props = {};

const LIMIT = 20;
const AllTransactions = (props: Props) => {
  const { setTransactions, transactions } = useTransaction(
    (state) => ({
      transactions: state.transactions,
      setTransactions: state.setTransactions,
    }),
    shallow
  );
  const { ref, inView } = useInView();
  const [search, setSearch] = useState("");

  const {
    error,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    data,
  } = useInfiniteQuery({
    queryKey: [QueryKey.TRANSACTIONS],
    queryFn: ({ pageParam = 1 }) =>
      getAllTransactions({
        limit: LIMIT,
        page: pageParam,
      }),
    onSuccess: (data) => {
      if (!data.pages) return;
      const transactions = data.pages.flatMap((page) => page.transactions);
      setTransactions(transactions);
    },
    onError: (error) => {
      toast.error("Terjadi kesalahan");
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.totalPages == lastPage.currentPage) {
        return undefined;
      }
      const nextPage = parseInt(lastPage.currentPage as unknown as string) + 1;
      return nextPage;
    },
  });

  const debounceSearch = useDebounce(search, 800);
  const searchQuery = useInfiniteQuery({
    queryKey: [QueryKey.TRANSACTIONS, debounceSearch],
    queryFn: () => getAllTransactions({ search: debounceSearch, limit: LIMIT }),
    getNextPageParam: (lastPage) => {
      if (lastPage.totalPages == lastPage.currentPage) {
        return undefined;
      }
      const nextPage = parseInt(lastPage.currentPage as unknown as string) + 1;
      return nextPage;
    },
    enabled: Boolean(debounceSearch),
  });

  const transactionLists = useMemo(() => {
    if (!data) return [];
    return groupByDay(transactions);
  }, [data, transactions]);

  const filteredTransactionLists = useMemo(() => {
    if (!searchQuery.data) return [];
    const data = searchQuery.data.pages.flatMap((page) => page.transactions);
    return groupByDay(data);
  }, [searchQuery.data]);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  if (isLoading) {
    return (
      <div className="space-y-4 mt-7">
        {Array(6)
          .fill("")
          .map((_, index) => (
            <SimpleTSkeleton key={index} delay={index * 300} />
          ))}
      </div>
    );
  }

  if (!transactionLists || error) {
    return (
      <Heading className="text-center mt-10" level={3}>
        Terjadi Kesalahan
      </Heading>
    );
  }

  if (transactionLists.length < 1) {
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

  const notFound = () => {
    if (
      filteredTransactionLists.length < 1 &&
      search.length > 0 &&
      !searchQuery.isLoading
    ) {
      return (
        <div className="flex flex-col justify-center items-center mt-10 dark:text-slate-300 font-semibold">
          <Image
            src="/images/transaction.png"
            alt="Transaction is empty"
            width={200}
            height={200}
          />
          <Heading level={3}>Transaksi tidak ditemukan</Heading>
          <br />
          <strong className="text-lg font-normal">
            Silahkan coba kata kunci lain
          </strong>
        </div>
      );
    }
  };

  return (
    <>
      <Head>
        <title>Transaksi</title>
      </Head>
      <div className="flex justify-between gap-4">
        <Input
          className="max-w-md ring-0 focus:ring-2 dark:ring-slate-500 ring-slate-300 transition-all focus:!bg-gray-100 dark:!bg-slate-700 !bg-gray-200 font-semibold"
          type="text"
          placeholder="Cari Transaksi"
          onChange={(e) => setSearch(e.target.value)}
        />
        <ExportPDF />
      </div>
      <table className="w-full" border={0}>
        <TransactionHeader />
        <TransactionList
          data={search.length > 0 ? filteredTransactionLists : transactionLists}
        />
      </table>
      {notFound()}
      {searchQuery.isLoading && search.length > 0 && (
        <div className="space-y-4 mt-7">
          {Array(6)
            .fill("")
            .map((_, index) => (
              <SimpleTSkeleton key={index} delay={index * 300} />
            ))}
        </div>
      )}
      <button
        ref={ref}
        disabled={!hasNextPage || isFetchingNextPage}
        className={classNames(
          "px-5 py-2 font-medium mx-auto mt-5 rounded-lg bg-blue-200 text-blue-500 flex gap-2 items-center",
          { hidden: !hasNextPage }
        )}
        onClick={() => fetchNextPage()}
      >
        {isFetchingNextPage ? (
          <>
            <LoadingSpinner className=" stroke-blue-500" /> Loading
          </>
        ) : hasNextPage ? (
          "Load More"
        ) : (
          "No more data"
        )}
      </button>
    </>
  );
};

export default AllTransactions;
