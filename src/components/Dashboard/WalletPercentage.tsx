import React from "react";
import DashboardContentWrapper from "./DashboardContentWrapper";
import DashboardHeader from "./DashboardHeader";
import PieChart from "../Charts/PieChart/PieChart";
import { WalletData } from "@/types/Wallet";

type Props = {
  data: WalletData[] | undefined;
  loading?: boolean;
};

const WalletPercentage = ({ data, loading }: Props) => {
  const pieChartData = data?.map((wallets: WalletData) => ({
    name: wallets.name,
    value: wallets.balance,
    color: wallets.color,
  }));

  return (
    <DashboardContentWrapper className="w-full flex-1 overflow-hidden">
      <DashboardHeader title="Dompet" />
      <PieChart loading={loading} data={pieChartData!} />
    </DashboardContentWrapper>
  );
};

export default WalletPercentage;
