"use client";

import AreaChart from "@/components/Charts/AreaChart/AreaChart";
import { indicatorColor } from "@/components/WalletCard/constants";
import WalletOption from "@/components/WalletCard/WalletOption";
import Heading from "@/dls/Heading";
import IconButton from "@/dls/IconButton";
import ArrowIcon from "@/icons/ArrowIcon";
import ArrowsIcon from "@/icons/ArrowsIcon";
import ElipsisVerticalIcon from "@/icons/ElipsisVerticalIcon";
import PlusIcon from "@/icons/PlusIcon";
import { QueryKey } from "@/types/QueryKey";
import { getOneWallet } from "@/utils/api/wallet";
import { currencyFormat } from "@/utils/currencyFormat";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames";
import {
  usePathname,
  useRouter,
  useSelectedLayoutSegment,
  useSelectedLayoutSegments,
} from "next/navigation";
import React from "react";

type Props = {};

const WalletPage = (props: Props) => {
  const urlPath = usePathname();
  const router = useRouter();
  const id = urlPath!.split("/")[3];
  const { data } = useQuery({
    queryKey: [QueryKey.WALLETS, id],
    queryFn: () => getOneWallet(id),
    onError: (error) => {
      console.log(error);
    },
  });

  if (!data) return <Heading level={3}>Terjadi Kesalahan</Heading>;
  return (
    <div
      className={classNames(
        "p-3 lg:p-5 rounded-2xl w-full absolute h-screen lg:h-auto lg:static  left-0",
        (indicatorColor as any)[data.color]
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
        theme="transparent"
        xAxis={false}
        horizonalLines={false}
        data={data.balanceActivity}
      />
      <div className="text-center text-xl font-bold text-slate-50">
        {data.name} <br />
        {currencyFormat(data.balance as number)}
      </div>
      <WalletOption />
    </div>
  );
};

export default WalletPage;
