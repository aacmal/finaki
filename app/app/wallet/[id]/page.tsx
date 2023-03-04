"use client";

import AreaChart from "@/components/Charts/AreaChart/AreaChart";
import { SimpleTransactionItem } from "@/components/Transactions/TransactionItem";
import { indicatorColor } from "@/components/WalletCard/constants";
import WalletOption from "@/components/WalletCard/WalletOption";
import Heading from "@/dls/Heading";
import IconButton from "@/dls/IconButton";
import IconWrapper from "@/dls/IconWrapper";
import ArrowIcon from "@/icons/ArrowIcon";
import { QueryKey } from "@/types/QueryKey";
import { getOneWallet, getWalletTransactions } from "@/utils/api/wallet";
import { currencyFormat } from "@/utils/currencyFormat";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames";
import { usePathname, useRouter } from "next/navigation";

type Props = {};

const WalletPage = (props: Props) => {
  const urlPath = usePathname();
  const router = useRouter();
  const id = urlPath!.split("/")[3];

  const walletDataQuery = useQuery({
    queryKey: [QueryKey.WALLETS, id],
    queryFn: () => getOneWallet(id),
    onError: (error) => {
      console.log(error);
    },
  });

  const walletTransactionsQuery = useQuery({
    queryKey: [QueryKey.WALLETS, id, QueryKey.TRANSACTIONS],
    queryFn: () => getWalletTransactions(id),
  });

  if (walletDataQuery.isLoading) {
    return (
      <Heading className="text-center mt-10 animate-pulse" level={3}>
        Memuat...
      </Heading>
    );
  }

  if (!walletDataQuery.data) {
    return <Heading level={3}>Terjadi Kesalahan</Heading>;
  }

  return (
    <div
      className={classNames(
        "p-3 lg:p-5 rounded-2xl w-full absolute min-h-screen lg:min-h-fit lg:h-auto lg:static left-0 lg:pb-5 pb-32",
        (indicatorColor as any)[walletDataQuery.data.color]
      )}
    >
      <div className="flex gap-3 items-center mb-5">
        <IconButton onClick={() => router.back()} className="text-slate-50">
          <ArrowIcon direction="left" strokeWidth={2} />
        </IconButton>
        <Heading fontWeight="medium" level={3} defaultColor="bright">
          Rincian Dompet
        </Heading>
      </div>
      <AreaChart
        size="medium"
        xAxis={false}
        horizonalLines={false}
        theme="transparent"
        data={walletDataQuery.data.balanceHistory}
      />
      <div className="text-center text-xl font-bold text-slate-50">
        {walletDataQuery.data.name} <br />
        {currencyFormat(walletDataQuery.data.balance as number)}
      </div>
      <WalletOption walletData={walletDataQuery.data} />
      <div className="mt-5">
        <Heading level={3} fontWeight="medium" defaultColor="bright">
          Riwayat Transaksi
        </Heading>
        <div className="py-1 px-3 bg-white/20 flex flex-col rounded-xl mt-2 text-white">
          {walletTransactionsQuery.data?.map((transaction, index) => {
            return (
              <SimpleTransactionItem
                key={transaction._id}
                id={transaction._id}
                isLastItem={index === walletTransactionsQuery.data?.length - 1}
                description={transaction.description}
                amount={transaction.amount}
                type={transaction.type}
                createdAt={transaction.createdAt}
                theme="light"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
