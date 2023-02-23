"use client";

import { Transaction } from "@/types/Transaction";
import ChartContainer from "../../Charts/ChartContainer";
import ChartHeader from "../../Charts/ChartHeader";
import RecentItem from "./RecentItem";

type RecentTransactionsProps = {
  data: Transaction[] | undefined;
};

const RecentTransactions = ({ data }: RecentTransactionsProps) => {
  if (data) {
    const slicedData = data.slice(0, 4);
    const lengthData = slicedData.length;

    return (
      <ChartContainer className="flex-1">
        <ChartHeader title="Transaksi terbaru" />
        <ul>
          {slicedData.map((transaction, index) => {
            return (
              <RecentItem
                key={transaction._id}
                isLastItem={index === lengthData - 1}
                description={transaction.description}
                type={transaction.type}
                createdAt={transaction.createdAt}
                amount={transaction.amount}
              />
            );
          })}
        </ul>
      </ChartContainer>
    );
  }

  return <></>;
};

export default RecentTransactions;
