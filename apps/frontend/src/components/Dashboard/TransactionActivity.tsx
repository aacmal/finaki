import { TotalTransactionByDay } from "@/types/Transaction";
import AreaChart from "../Charts/AreaChart/AreaChart";
import DashboardContentWrapper from "./DashboardContentWrapper";
import DashboardHeader from "./DashboardHeader";
import DropdownMenu from "../dls/Dropdown/DropdownMenu";
import { DropdownItem } from "../dls/Dropdown/DropdownItem";
import { BsClockHistory } from "react-icons/bs";
import { Interval } from "@/api/types/TransactionAPI";
import useTransaction from "../../stores/transactionStore";
import { shallow } from "zustand/shallow";

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
    shallow
  );

  const ButtonTrigger = () => (
    <button
      className="flex gap-3 text-xs md:text-sm items-center rounded-md px-3 py-1 border dark:border-slate-500"
      type="button"
    >
      <BsClockHistory />
      <span className="capitalize font-medium">{interval}</span>
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
