"use client";

import React from "react";
import AreaChart from "@/components/Charts/AreaChart/AreaChart";
import BarChart from "@/components/Charts/BarChart/BarChart";
import PieChart from "@/components/Charts/PieChart/PieChart";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllTransactions,
  getTotalTransactionByPeriod,
} from "@/api/transaction";
import { QueryKey } from "@/types/QueryKey";
import { WalletData } from "@/types/Wallet";
import TransactionActivity from "@/components/Dashboard/TransactionActivity";
import WalletPercentage from "@/components/Dashboard/WalletPercentage";
import RecentTransactions from "@/components/Dashboard/RecentTrasactions";
import Ratio from "@/components/Dashboard/Ratio";

type Props = {};

const Page = (props: Props) => {
  const totalTransactionQuery = useQuery({
    queryKey: [QueryKey.TOTAL_TRANSACTIONS],
    queryFn: () => getTotalTransactionByPeriod("week"),
    onError: (error) => {
      console.log(error);
    },
  });

  const areaChartData = totalTransactionQuery.data?.map((item) => ({
    day: item._id.day as unknown as string,
    timestamp: item.timestamp,
    value: item.totalAmount,
  }));

  return (
    <div className="flex flex-col gap-4">
      <TransactionActivity
        loading={totalTransactionQuery.isLoading}
        data={areaChartData}
      />
      <Ratio
        loading={totalTransactionQuery.isLoading}
        data={totalTransactionQuery.data}
      />
      <div className="flex gap-4 h-fit flex-col lg:flex-row">
        <WalletPercentage />
        <RecentTransactions />
      </div>
    </div>
  );
};

export default Page;
