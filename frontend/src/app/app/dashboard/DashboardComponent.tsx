"use client";

import {
  getAllTransactions,
  getTotalTransactionByPeriod,
} from "@/api/transaction";
import { getAllWallets } from "@/api/wallet";
import Ratio from "../../../components/Dashboard/Ratio";
import RecentTransactions from "../../../components/Dashboard/RecentTrasactions";
import TransactionActivity from "../../../components/Dashboard/TransactionActivity";
import WalletPercentage from "../../../components/Dashboard/WalletPercentage";
import { QueryKey } from "@/types/QueryKey";
import { useQuery } from "@tanstack/react-query";
import useTransaction from "../../../stores/transactionStore";
import { shallow } from "zustand/shallow";

const DashboardComponent = () => {
  const { interval } = useTransaction(
    (state) => ({
      interval: state.interval,
    }),
    shallow
  );

  const totalTransactionQuery = useQuery({
    queryKey: [QueryKey.TOTAL_TRANSACTIONS, interval],
    queryFn: () => getTotalTransactionByPeriod(interval),
  });

  const recentTransactionsQuery = useQuery({
    queryKey: [QueryKey.RECENT_TRANSACTIONS],
    queryFn: () =>
      getAllTransactions({
        limit: 4,
      }),
  });

  const walletQuery = useQuery({
    queryKey: [QueryKey.WALLETS],
    queryFn: getAllWallets,
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
