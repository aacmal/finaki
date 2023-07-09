"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getAllTransactions,
  getTotalTransactionByPeriod,
} from "@/api/transaction";
import { QueryKey } from "@/types/QueryKey";
import TransactionActivity from "@/components/Dashboard/TransactionActivity";
import WalletPercentage from "@/components/Dashboard/WalletPercentage";
import RecentTransactions from "@/components/Dashboard/RecentTrasactions";
import Ratio from "@/components/Dashboard/Ratio";
import { getAllWallets } from "@/api/wallet";

type Props = {};

const DashboardComponent = (props: Props) => {
  const totalTransactionQuery = useQuery({
    queryKey: [QueryKey.TOTAL_TRANSACTIONS],
    queryFn: () => getTotalTransactionByPeriod("week"),
    onError: (error) => {
      console.log(error);
    },
  });

  const recentTransactionsQuery = useQuery({
    queryKey: [QueryKey.RECENT_TRANSACTIONS],
    queryFn: () =>
      getAllTransactions({
        limit: 4,
      }),
    onSuccess: (data) => {},
    onError: (error) => {
      console.log(error);
    },
  });

  const walletQuery = useQuery({
    queryKey: [QueryKey.WALLETS],
    queryFn: getAllWallets,
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <TransactionActivity
        loading={totalTransactionQuery.isLoading}
        data={totalTransactionQuery.data}
      />
      <Ratio
        loading={totalTransactionQuery.isLoading}
        data={totalTransactionQuery.data}
      />
      <div className="flex gap-4 h-fit flex-col lg:flex-row">
        <WalletPercentage
          data={walletQuery.data}
          loading={walletQuery.isLoading}
        />
        <RecentTransactions
          data={recentTransactionsQuery.data?.transactions}
          isLoading={recentTransactionsQuery.isLoading}
          isError={recentTransactionsQuery.isError}
        />
      </div>
    </div>
  );
};

export default DashboardComponent;
