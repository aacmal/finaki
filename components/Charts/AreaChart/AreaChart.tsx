"use client";

import classNames from "classnames";
import {
  AreaChart as ArChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
} from "recharts";
import { ChartError, ChartLoading } from "../ChartPlaceholder";
import ChartWrapper from "../ChartWrapper";
import renderAreaTooltip from "./AreaTooltip";
import { stopColor } from "./constants";

export type AreaChartData = {
  day?: string;
  timestamp: string;
  value: number;
};

type Props = {
  chartName?: string;
  data: AreaChartData[];
  size?: "medium" | "large";
  theme?: "default" | "transparent";
  xAxis?: boolean;
  horizonalLines?: boolean;
  loading?: boolean;
};

const AreaChart = ({
  data,
  size = "large",
  theme = "default",
  xAxis = true,
  horizonalLines = true,
  loading,
}: Props) => {
  return (
    <ChartWrapper
      className={classNames("w-full", {
        "h-44 md:h-52 lg:h-72": size === "large",
        "h-40 md:h-44": size === "medium",
      })}
    >
      {loading ? (
        <ChartLoading />
      ) : data ? (
        <ArChart data={data}>
          <defs>
            <linearGradient id="colorBl" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor={(stopColor as any)[theme]}
                stopOpacity={0.8}
              />
              <stop
                offset="100%"
                stopColor={(stopColor as any)[theme]}
                stopOpacity={0.05}
              />
            </linearGradient>
          </defs>
          <XAxis
            style={{ fontSize: 13, fill: "currentcolor" }}
            height={20}
            axisLine={false}
            tickLine={false}
            interval="preserveStartEnd"
            dataKey="day"
            visibility={xAxis ? "visible" : "hidden"}
          />
          <CartesianGrid
            opacity={0.5}
            vertical={false}
            className="dark:opacity-20"
            horizontal={true}
            visibility={horizonalLines ? "visible" : "hidden"}
          />
          <Tooltip content={renderAreaTooltip} />
          <Area
            isAnimationActive
            strokeWidth={2}
            type="monotone"
            dataKey="value"
            stroke={(stopColor as any)[theme]}
            fillOpacity={1}
            fill="url(#colorBl)"
          />
        </ArChart>
      ) : (
        <ChartError />
      )}
    </ChartWrapper>
  );
};

export default AreaChart;
