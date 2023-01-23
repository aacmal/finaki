"use client";

import TextWithIcon from "@/dls/TextWithIcon";
import ArrowCircleIcon from "@/icons/ArrowCircleIcon";
import ArrowIcon from "@/icons/ArrowIcon";
import classNames from "classnames";
import React from "react";
import AreaChart from "@/components/Charts/AreaChart";
import BarChart from "@/components/Charts/BarChart/BarChart";
import PieChart from "@/components/Charts/PieChart";
import RecentTransactions from "@/components/Transactions/RecentTransactions";
import { useQuery } from "@tanstack/react-query";
import {
  getRecentTransactions,
  getTotalTransactionByPeriod,
} from "@/utils/api/transactionApi";
import { TransactionData } from "@/types/Transaction";

type Props = {};

const transactions = [
  {
    name: "Beli Baju",
    category: "Cloth",
    type: "out",
    value: 3000,
    date: "2 Desember",
    hour: "18:64",
  },
  {
    name: "Beli Baju",
    category: "Cloth",
    type: "in",
    value: 3000,
    date: "2 Desember",
    hour: "18:64",
  },
  {
    name: "Beli Baju",
    category: "Cloth",
    type: "in",
    value: 3000,
    date: "2 Desember",
    hour: "18:64",
  },
  {
    name: "Beli Baju",
    category: "Cloth",
    type: "out",
    value: 3000,
    date: "2 Desember",
    hour: "18:64",
  },
];

const dataCategories = [
  { name: "Food", value: 400 },
  { name: "Transport", value: 300 },
  { name: "Clothes", value: 300 },
  { name: "Entertainment", value: 200 },
  { name: "Others", value: 278 },
];

const Page = (props: Props) => {
  const { data: datax, isLoading } = useQuery(
    ["total-transactions"],
    () => getTotalTransactionByPeriod("week"),
    {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error) => {
        console.log(error);
      },
      staleTime: 1000 * 60 * 5, // 5 minutes
    }
  );

  const { data: recent } = useQuery(
    ["recent-transactions"],
    getRecentTransactions,
    {
      onSuccess: (data) => {
        console.log(data);
      },
      staleTime: 1000 * 60 * 5, // 5 minutes
    }
  );

  return (
    <div className="flex flex-col gap-4">
      <AreaChart data={datax} />
      <BarChart data={datax} />
      <div className="flex gap-4 h-fit flex-col lg:flex-row">
        <PieChart data={dataCategories} />
        <RecentTransactions data={recent} />
      </div>
    </div>
  );
};

export default Page;
