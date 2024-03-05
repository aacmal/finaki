"use client";

import { QueryKey } from "@/types/QueryKey";
import { TotalTransactionByDay, Transaction } from "@/types/Transaction";
import { WalletData } from "@/types/Wallet";
import { useQuery } from "@tanstack/react-query";

import Ratio from "../../../components/Dashboard/Ratio";
import RecentTransactions from "../../../components/Dashboard/RecentTrasactions";
import TransactionActivity from "../../../components/Dashboard/TransactionActivity";
import WalletPercentage from "../../../components/Dashboard/WalletPercentage";

const Page = () => {
  const totalTransactionQuery = useQuery({
    queryKey: [QueryKey.TOTAL_TRANSACTIONS],
    queryFn: (): Promise<TotalTransactionByDay[]> =>
      new Promise((resolve) => {
        import("@/data/dummy-data/dashboard.json").then((data) => {
          resolve(data.data);
        });
      }),
  });

  const recentTransactionsQuery = useQuery({
    queryKey: [QueryKey.RECENT_TRANSACTIONS],
    queryFn: (): Promise<Transaction[]> =>
      new Promise((resolve) => {
        import("@/data/dummy-data/transaction.json").then((data) => {
          resolve(data.data as unknown as Transaction[]);
        });
      }),
  });

  const walletQuery = useQuery({
    queryKey: [QueryKey.WALLETS],
    queryFn: (): Promise<WalletData[]> =>
      new Promise((resolve) => {
        import("@/data/dummy-data/wallet.json").then((data) => {
          resolve(data.data as WalletData[]);
        });
      }),
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
      <div className="flex h-fit flex-col gap-4 lg:flex-row">
        <WalletPercentage
          data={walletQuery.data}
          loading={walletQuery.isLoading}
        />
        <RecentTransactions
          data={recentTransactionsQuery.data}
          isLoading={recentTransactionsQuery.isLoading}
          isError={recentTransactionsQuery.isError}
        />
      </div>
    </div>
  );
};

export default Page;
