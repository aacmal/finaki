import { Routes } from "@/types/Routes";
import { Transaction } from "@/types/Transaction";
import Link from "next/link";
import { ChartError } from "../Charts/ChartPlaceholder";
import {
  SimpleTransactionItem,
  SimpleTSkeleton,
} from "../Transactions/TransactionItem";
import DashboardContentWrapper from "./DashboardContentWrapper";
import DashboardHeader from "./DashboardHeader";

type Props = {
  data: Transaction[] | undefined;
  isLoading: boolean;
  isError: boolean;
};

const RecentTransactions = ({ data, isLoading, isError }: Props) => {
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
    <DashboardContentWrapper className="min-h-[20rem] w-full lg:max-w-[40rem]">
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
                isLastItem={index === lengthData - 1}
                transaction={transaction}
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
