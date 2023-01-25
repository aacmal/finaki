"use client";

import Heading from "@/dls/Heading";
import { TotalTransactionByDay } from "@/utils/api/transactionApi";
import React from "react";

import {
  AreaChart as ArChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
} from "recharts";
import ChartContainer from "./ChartContainer";
import ChartWrapper from "./ChartWrapper";

type Props = {
  data: TotalTransactionByDay[] | undefined;
};

const ChartHeader = () => (
  <div className="flex justify-between items-center px-2 lg:px-0 mb-5">
    <Heading fontWeight="medium" level={3}>
      Aktivitas
    </Heading>
    <span className="text-sm dark:text-slate-300">7 Hari</span>
  </div>
);

const renderCustomizedTooltip = ({ active, payload, label }: any) => {
  if (active) {
    return (
      <div className="bg-white p-4 rounded-xl shadow-lg">
        <p className="text-gray-500 font-medium">{`Rp. ${payload[0].value}`}</p>
      </div>
    );
  }
};

const AreaChart = ({ data }: Props) => {
  if (!data) return <></>;

  return (
    <ChartContainer className="lg:px-10">
      <ChartHeader />
      <ChartWrapper className="w-full h-52">
        <ArChart data={data}>
          <defs>
            <linearGradient id="colorBl" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            style={{ fontSize: 13, fill: "currentcolor" }}
            height={20}
            axisLine={false}
            tickLine={false}
            interval="preserveStartEnd"
            dataKey="_id.day"
          />
          <CartesianGrid
            opacity={0.5}
            vertical={false}
            className="dark:opacity-20"
            horizontal={true}
          />
          <Tooltip content={renderCustomizedTooltip} />
          <Area
            isAnimationActive
            strokeWidth={3}
            type="monotone"
            dataKey="totalAmount"
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
