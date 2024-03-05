"use client";

import { QueryKey } from "@/types/QueryKey";
import { WalletData } from "@/types/Wallet";
import { currencyFormat } from "@/utils/currencyFormat";
import { useQuery } from "@tanstack/react-query";

import Placeholder from "../../../components/Placeholder";
import AddNewWallet from "../../../components/WalletCard/AddNewWallet";
import WalletCard from "../../../components/WalletCard/WalletCard";
import WalletCardSkeleton from "../../../components/WalletCard/WalletCardSkeleton";

const AllWalletsPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: [QueryKey.WALLETS],
    queryFn: (): Promise<WalletData[]> =>
      new Promise((resolve) => {
        import("@/data/dummy-data/wallet.json").then((data) => {
          resolve(data.data as WalletData[]);
        });
      }),
  });

  if (isLoading || !data) {
    return (
      <div className="mt-6 space-y-3">
        <div className="mt-6">
          <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
            <div className="font-semibold text-stone-700 dark:text-slate-200">
              <span className="block w-full text-center md:text-left">
                Total saldo
              </span>
              <Placeholder className="mt-1 h-12 w-44" />
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1  gap-5  md:grid-cols-2 lg:grid-cols-3">
            <WalletCardSkeleton />
            <WalletCardSkeleton />
            <WalletCardSkeleton />
          </div>
        </div>
      </div>
    );
  }

  const totalBalance = data.reduce(
    (acc: number, curr: any) => acc + curr.balance,
    0,
  );

  return (
    <div className="mt-6">
      <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
        <div className="font-semibold text-stone-700 dark:text-slate-200">
          <span className="block w-full text-center md:text-left">
            Total saldo
          </span>
          <span className="text-2xl">{currencyFormat(totalBalance)}</span>
        </div>
        <AddNewWallet />
      </div>
      <div className="mt-6 grid grid-cols-1  gap-5  md:grid-cols-2 lg:grid-cols-3">
        {data.map((wallet: any) => (
          <WalletCard
            key={wallet._id}
            id={wallet._id}
            name={wallet.name}
            initColorKey={wallet.color}
            balance={wallet.balance}
            isCredit={false}
          />
        ))}
      </div>
    </div>
  );
};

export default AllWalletsPage;
