import React from "react";
import DashboardContentWrapper from "./DashboardContentWrapper";
import DashboardHeader from "./DashboardHeader";
import {
  SimpleTransactionItem,
  SimpleTSkeleton,
} from "../Transactions/TransactionItem";
import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "@/types/QueryKey";
import { getAllTransactions } from "@/api/transaction";
import { ChartError } from "../Charts/ChartPlaceholder";
import Link from "next/link";
import { Routes } from "@/types/Routes";

type Props = {};

const RecentTransactions = (props: Props) => {
  const { isLoading, data, isError } = useQuery({
    queryKey: [QueryKey.RECENT_TRANSACTIONS],
    queryFn: () => getAllTransactions(4),
    onError: (error) => {
      console.log(error);
    },
  });

  if (isLoading || isError) {
    return (
      <DashboardContentWrapper className="flex-1">
        <DashboardHeader title="Transaksi terbaru" />
        <div className="h-[20rem] space-y-4">
          {isLoading &&
            Array(4)
              .fill("")
              .map((_, index) => (
                <SimpleTSkeleton key={index} delay={index * 300} />
              ))}

          {isError && <ChartError />}
        </div>
      </DashboardContentWrapper>
    );
  }

  const slicedData = data!.slice(0, 4);
  const lengthData = slicedData.length;

  return (
    <DashboardContentWrapper className="flex-1 min-h-[20rem]">
      <DashboardHeader title="Transaksi terbaru">
        {slicedData?.length > 0 && (
          <Link
            href={Routes.Transactions}
            className="text-sm font-medium text-slate-500 dark:text-slate-200 hover:text-slate-600 dark:hover:text-slate-100"
          >
            Lihat semua
          </Link>
        )}
      </DashboardHeader>
      {slicedData?.length > 0 ? (
        <ul>
          {slicedData.map((transaction, index) => {
            return (
              <SimpleTransactionItem
                key={transaction._id}
                id={transaction._id}
                isLastItem={index === lengthData - 1}
                description={transaction.description}
                type={transaction.type}
                createdAt={transaction.createdAt}
                amount={transaction.amount}
              />
            );
          })}
        </ul>
      ) : (
        <div className="min-h-[20rem] w-full grid place-items-center dark:text-slate-200">
          Belum ada transaksi
        </div>
      )}
    </DashboardContentWrapper>
  );
};

export default RecentTransactions;
