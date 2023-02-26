import React from "react";
import DashboardContentWrapper from "./DashboardContentWrapper";
import DashboardHeader from "./DashboardHeader";
import AreaChart, { AreaChartData } from "../Charts/AreaChart/AreaChart";
import ChartWrapper from "../Charts/ChartWrapper";
import classNames from "classnames";
import ChartPlaceholder from "../Charts/ChartPlaceholder";

type Props = {
  data: AreaChartData[] | undefined;
  loading?: boolean;
};

const TransactionActivity = ({ data, loading }: Props) => {
  return (
    <DashboardContentWrapper>
      <DashboardHeader title="Aktivitas">
        <span className="text-sm">7 Hari</span>
      </DashboardHeader>
      <AreaChart loading={loading} size="large" data={data!} />
    </DashboardContentWrapper>
  );
};

export default TransactionActivity;
