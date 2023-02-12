"use client";

import React from "react";
import AreaChart from "@/components/Charts/AreaChart/AreaChart";
import BarChart from "@/components/Charts/BarChart/BarChart";
import PieChart from "@/components/Charts/PieChart/PieChart";
import RecentTransactions from "@/components/Transactions/RecentTransactions/RecentTransactions";
import { useQuery } from "@tanstack/react-query";
import {
  getAllTransactions,
  getTotalTransactionByPeriod,
} from "@/api/transaction";

type Props = {};

const Page = (props: Props) => {
  const totalTransactionQuery = useQuery(
    ["total-transactions"],
    () => getTotalTransactionByPeriod("week"),
    {
      onSuccess: (data) => {
        // console.log(data);
      },
      onError: (error) => {
        console.log(error);
      },
      staleTime: 1000 * 60 * 5, // 5 minutes
    }
  );

  const recentTransactionsQuery = useQuery(
    ["recent-transactions"],
    () => getAllTransactions(4),
    {
      onSuccess: (data) => {
        console.log(data);
      },
      staleTime: 1000 * 60 * 5, // 5 minutes
    }
  );

  const areaChartData = totalTransactionQuery.data?.map((item) => ({
    day: item._id.day as unknown as string,
    timestamp: item.timestamp,
    value: item.totalAmount,
  }));

  return (
    <div className="flex flex-col gap-4">
      <AreaChart chartName="Aktivitas" data={areaChartData} />
      <BarChart data={totalTransactionQuery.data} />
      <div className="flex gap-4 h-fit flex-col lg:flex-row">
        <PieChart data={null} />
        <RecentTransactions data={recentTransactionsQuery.data} />
      </div>
    </div>
  );
};

export default Page;
