"use client";

import Heading from "@/dls/Heading";
import TextWithIcon from "@/dls/TextWithIcon";
import ArrowIcon from "@/icons/ArrowIcon";
import { TotalTransactionByDay } from "@/types/Transaction";
import classNames from "classnames";
import React from "react";
import {
  BarChart as BaChart,
  CartesianGrid,
  Tooltip,
  Bar,
  XAxis,
} from "recharts";
import { ChartError, ChartLoading } from "../ChartPlaceholder";
import ChartWrapper from "../ChartWrapper";

import renderBarTooltip from "./BarTooltip";

type Props = {
  data: TotalTransactionByDay[];
  className?: string;
  color: any;
  size?: "medium" | "large";
  loading?: boolean;
};

const BarChart = ({ data, color, loading, className }: Props) => {
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
            barSize={8}
            dataKey="in"
            fill={color[0]}
          />
          <Bar
            isAnimationActive
            radius={[10, 10, 10, 10]}
            barSize={8}
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
