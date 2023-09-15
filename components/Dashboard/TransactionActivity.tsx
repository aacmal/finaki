import { TotalTransactionByDay } from "@/types/Transaction";
import AreaChart from "../Charts/AreaChart/AreaChart";
import DashboardContentWrapper from "./DashboardContentWrapper";
import DashboardHeader from "./DashboardHeader";

type Props = {
  data: TotalTransactionByDay[] | undefined;
  loading?: boolean;
};

const TransactionActivity = ({ data, loading }: Props) => {
  const areaChartData = data?.map((item) => ({
    day: item._id.day as unknown as string,
    timestamp: item.timestamp,
    value: item.totalAmount,
  }));

  return (
    <DashboardContentWrapper>
      <DashboardHeader title="Aktivitas">
        <span className="text-sm">7 Hari</span>
      </DashboardHeader>
      <AreaChart loading={loading} size="large" data={areaChartData!} />
    </DashboardContentWrapper>
  );
};

export default TransactionActivity;
