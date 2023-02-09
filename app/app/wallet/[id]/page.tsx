"use client";

import AreaChart from "@/components/Charts/AreaChart/AreaChart";
import { indicatorColor } from "@/components/WalletCard/constants";
import Heading from "@/dls/Heading";
import { getOneWallet } from "@/utils/api/wallet";
import { currencyFormat } from "@/utils/currencyFormat";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames";
import {
  usePathname,
  useSelectedLayoutSegment,
  useSelectedLayoutSegments,
} from "next/navigation";
import React from "react";

type Props = {};

const WalletPage = (props: Props) => {
  const urlPath = usePathname();

  const id = urlPath!.split("/")[3];
  const { data } = useQuery({
    queryKey: ["wallets", id],
    queryFn: () => getOneWallet(id),
    onSuccess: (data) => {
      console.log("one wallet", data);
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  if (!data) return <Heading level={3}>Terjadi Kesalahan</Heading>;
  return (
    <div
      className={classNames(
        "p-3 rounded-2xl w-full absolute h-screen lg:h-auto lg:static  left-0",
        (indicatorColor as any)[data.color]
      )}
    >
      <Heading defaultColor="bright" className="text-center" level={2}>
        {data.name} <br />
        {currencyFormat(data.balance as number)}
      </Heading>
    </div>
  );
};

export default WalletPage;
