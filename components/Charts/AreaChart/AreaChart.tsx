"use client";

import {
  AreaChart as ArChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
} from "recharts";
import ChartContainer from "../ChartContainer";
import ChartHeader from "../ChartHeader";
import ChartWrapper from "../ChartWrapper";
import renderAreaTooltip from "./AreaTooltip";

type Props = {
  data:
    | {
        day: string;
        timestamp: string;
        value: number;
      }[]
    | undefined;
};

const AreaChart = ({ data }: Props) => {
  if (!data) return <></>;
  console.log(data);
  return (
    <ChartContainer>
      <ChartHeader title="Aktivitas">
        <span className="text-sm">7 Hari</span>
      </ChartHeader>
      <ChartWrapper className="w-full h-52">
        <ArChart data={data}>
          <defs>
            <linearGradient id="colorBl" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.07} />
            </linearGradient>
          </defs>
          <XAxis
            style={{ fontSize: 13, fill: "currentcolor" }}
            height={20}
            axisLine={false}
            tickLine={false}
            interval="preserveStartEnd"
            dataKey="day"
          />
          <CartesianGrid
            opacity={0.5}
            vertical={false}
            className="dark:opacity-20"
            horizontal={true}
          />
          <Tooltip content={renderAreaTooltip} />
          <Area
            isAnimationActive
            strokeWidth={2}
            type="monotone"
            dataKey="value"
            stroke="#3b82f6"
            fillOpacity={1}
            fill="url(#colorBl)"
          />
        </ArChart>
      </ChartWrapper>
    </ChartContainer>
  );
};

export default AreaChart;
