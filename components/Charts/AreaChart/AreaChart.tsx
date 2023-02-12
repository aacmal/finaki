"use client";

import classNames from "classnames";
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
import { stopColor } from "./constants";

type Props = {
  chartName?: string;
  data:
    | {
        day: string;
        timestamp: string;
        value: number;
      }[]
    | undefined;
  size?: "medium" | "large";
  theme?: "default" | "transparent";
  xAxis?: boolean;
  horizonalLines?: boolean;
};

const AreaChart = ({
  data,
  size = "large",
  theme = "default",
  xAxis = true,
  horizonalLines = true,
  chartName,
}: Props) => {
  if (!data) return <></>;
  console.log(data);
  return (
    <ChartContainer theme={theme}>
      {chartName && (
        <ChartHeader title="Aktivitas">
          <span className="text-sm">7 Hari</span>
        </ChartHeader>
      )}
      <ChartWrapper
        className={classNames("w-full", {
          "h-44 md:h-52": size === "large",
          "h-40 md:h-44": size === "medium",
        })}
      >
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
      </ChartWrapper>
    </ChartContainer>
  );
};

export default AreaChart;
