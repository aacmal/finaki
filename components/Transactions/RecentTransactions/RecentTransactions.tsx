"use client";

import { Transaction } from "@/types/Transaction";
import ChartContainer from "../../Charts/ChartContainer";
import ChartHeader from "../../Charts/ChartHeader";
import RecentItem from "./RecentItem";

type RecentTransactionsProps = {
  data: Transaction[] | undefined;
};

const RecentTransactions = ({ data }: RecentTransactionsProps) => {
  if (!data) return <></>;

  return (
    <ChartContainer className="flex-1">
      <ChartHeader title="Transaksi terbaru" />
      <ul>
        {data.map((transaction, index) => {
          return (
            <RecentItem
              key={transaction._id}
              index={index}
              description={transaction.description}
              type={transaction.type}
              createdAt={transaction.createdAt}
              amount={transaction.amount}
              length={4}
            />
          );
        })}
      </ul>
    </ChartContainer>
  );
};

export default RecentTransactions;
