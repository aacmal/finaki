"use client";

import {TotalTransactionByDay} from "@/types/Transaction";
import classNames from "classnames";
import {Bar, BarChart as BaChart, CartesianGrid, Tooltip, XAxis,} from "recharts";
import {ChartError, ChartLoading} from "../ChartPlaceholder";
import ChartWrapper from "../ChartWrapper";

import renderBarTooltip from "./BarTooltip";
import useTransaction from "../../../stores/transactionStore";
import {shallow} from "zustand/shallow";
import {Interval} from "@/api/types/TransactionAPI";

type Props = {
  data: TotalTransactionByDay[];
  className?: string;
  color: any;
  size?: "medium" | "large";
  loading?: boolean;
};

const BarChart = ({ data, color, loading, className }: Props) => {
  const interval = useTransaction(state => state.interval, shallow)
  const barSize = interval === Interval.Weekly ? 8 :4

  return (
    <ChartWrapper className={classNames("w-full h-48 lg:72", className)}>
      {loading ? (
        <ChartLoading />
      ) : data ? (
        <BaChart data={data}>
          <CartesianGrid
            className="dark:opacity-20"
            opacity={0.5}
            vertical={false}
          />
          <Tooltip
            cursor={{ fill: "#0088FE", opacity: 0.1 }}
            content={renderBarTooltip}
          />
          <Bar
            isAnimationActive
            radius={[10, 10, 10, 10]}
            barSize={barSize}
            dataKey="in"
            fill={color[0]}
          />
          <Bar
            isAnimationActive
            radius={[10, 10, 10, 10]}
            barSize={barSize}
            dataKey="out"
            fill={color[1]}
          />
          <XAxis
            style={{ fontSize: 13, fill: "currentcolor" }}
            tickMargin={10}
            height={30}
            axisLine={false}
            tickLine={false}
            dataKey="_id.day"
          />
        </BaChart>
      ) : (
        <ChartError />
      )}
    </ChartWrapper>
  );
};

export default BarChart;
