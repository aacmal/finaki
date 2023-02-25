"use client";

import { Transaction } from "@/types/Transaction";
import ChartContainer from "../../Charts/ChartContainer";
import ChartHeader from "../../Charts/ChartHeader";
import { SimpleTransactionItem } from "../TransactionItem";
import NoData from "@/components/Charts/NoData";

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
        {slicedData?.length > 0 ? (
          <ul>
            {slicedData.map((transaction, index) => {
              return (
                <SimpleTransactionItem
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
        ) : (
          <div className="h-52 lg:h-72">
            <NoData />
          </div>
        )}
      </ChartContainer>
    );
  }

  return <></>;
};

export default RecentTransactions;
