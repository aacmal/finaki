import { Interval } from "@/api/types/TransactionAPI";
import { TotalTransactionByDay } from "@/types/Transaction";
import { BsClockHistory } from "react-icons/bs";
import { shallow } from "zustand/shallow";

import useTransaction from "../../stores/transactionStore";
import AreaChart from "../Charts/AreaChart/AreaChart";
import { DropdownItem } from "../dls/Dropdown/DropdownItem";
import DropdownMenu from "../dls/Dropdown/DropdownMenu";
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

  const { interval, setInterval } = useTransaction(
    (state) => ({
      interval: state.interval,
      setInterval: state.setInterval,
    }),
    shallow,
  );

  const ButtonTrigger = () => (
    <button
      className="flex items-center gap-3 rounded-md border px-3 py-1 text-xs dark:border-slate-500 md:text-sm"
      type="button"
    >
      <BsClockHistory />
      <span className="font-medium capitalize">{interval}</span>
    </button>
  );

  return (
    <DashboardContentWrapper>
      <DashboardHeader title="Aktivitas">
        <DropdownMenu align="start" trigger={<ButtonTrigger />}>
          {Object.values(Interval).map((val) => (
            <DropdownItem
              shouldCloseAfterClick
              onClick={() => setInterval(val as Interval)}
              className="px-3 font-medium capitalize"
              key={val}
            >
              {val}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </DashboardHeader>
      <AreaChart loading={loading} size="large" data={areaChartData!} />
    </DashboardContentWrapper>
  );
};

export default TransactionActivity;
