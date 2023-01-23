"use client";

import Heading from "@/dls/Heading";
import TextWithIcon from "@/dls/TextWithIcon";
import ArrowIcon from "@/icons/ArrowIcon";
import { TotalTransactionByDay } from "@/utils/api/transactionApi";
import classNames from "classnames";
import React from "react";
import {
  BarChart as BaChart,
  CartesianGrid,
  Tooltip,
  Legend,
  Bar,
  XAxis,
} from "recharts";
import ChartContainer from "../ChartContainer";
import ChartWrapper from "../ChartWrapper";

import BarChartHeader from "./BarChartHeader";

type Props = {
  data: TotalTransactionByDay[] | undefined;
};

const COLOR = {
  INCOME: "#3b82f6",
  OUTCOME: "#f97316",
};

const BarChart = ({ data }: Props) => {
  if (!data) return <></>;

  const totalIncome = data.reduce((acc, curr) => acc + curr.in, 0);
  const totalOutcome = data.reduce((acc, curr) => acc + curr.out, 0);
  const total = totalIncome - totalOutcome;
  // no decimal point
  const currencyFormat = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  return (
    <ChartContainer className="flex gap-4 lg:flex-row flex-col">
      <div className="flex-1">
        <BarChartHeader COLOR={COLOR} />
        <ChartWrapper className=" h-52 lg:h-72 w-full">
          <BaChart data={data}>
            <CartesianGrid
              className="dark:opacity-20"
              opacity={0.5}
              vertical={false}
            />
            <Tooltip cursor={{ fill: "#0088FE", opacity: 0.1 }} />
            <Bar
              isAnimationActive
              radius={[10, 10, 10, 10]}
              barSize={8}
              dataKey="in"
              fill={COLOR["INCOME"]}
            />
            <Bar
              isAnimationActive
              radius={[10, 10, 10, 10]}
              barSize={8}
              dataKey="out"
              fill={COLOR["OUTCOME"]}
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
        </ChartWrapper>
      </div>
      <div className="lg:w-[17rem] w-full h-full bg-transparent py-7 px-3 rounded-xl flex flex-col gap-5">
        <TextWithIcon
          iconPosition="left"
          icon={
            <ArrowIcon direction="up" strokeWidth={3} stroke="currentColor" />
          }
          className={classNames(
            "bg-blue-500 text-white shadow-xl shadow-blue-200 dark:shadow-blue-800"
          )}
        >
          {currencyFormat.format(totalIncome)}
        </TextWithIcon>
        <TextWithIcon
          iconPosition="left"
          icon={
            <ArrowIcon direction="down" strokeWidth={3} stroke="currentColor" />
          }
          className={classNames(
            "bg-orange-500 text-white shadow-xl shadow-orange-200 dark:shadow-orange-800"
          )}
        >
          -{currencyFormat.format(totalOutcome)}
        </TextWithIcon>
        <Heading level={4} fontWeight="medium" className={"mt-6"}>
          Total Profit:{" "}
          <span className={classNames({ "text-red-400": total < 0 })}>
            {currencyFormat.format(total)}
          </span>
        </Heading>
      </div>
    </ChartContainer>
  );
};

export default BarChart;
