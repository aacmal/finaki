import React from "react";
import DashboardContentWrapper from "./DashboardContentWrapper";
import DashboardHeader from "./DashboardHeader";
import PieChart, { PieChartData } from "../Charts/PieChart/PieChart";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { QueryKey } from "@/types/QueryKey";
import { WalletData } from "@/types/Wallet";

type Props = {};

const WalletPercentage = (props: Props) => {
  const queryClient = useQueryClient();

  const wallets = queryClient.getQueryData([QueryKey.WALLETS]) as WalletData[];
  const pieChartData = wallets?.map((wallets: any) => ({
    name: wallets.name,
    value: wallets.balance,
    color: wallets.color,
  }));

  return (
    <DashboardContentWrapper className="w-full flex-1 overflow-hidden">
      <DashboardHeader title="Dompet" />
      <PieChart
        loading={!pieChartData as unknown as boolean}
        data={pieChartData}
      />
    </DashboardContentWrapper>
  );
};

export default WalletPercentage;
