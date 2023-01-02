"use client";

import Heading from "@/dls/Heading";
import TextWithIcon from "@/dls/TextWithIcon";
import ArrowIcon from "@/icons/ArrowIcon";
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
  data: any[];
};

const COLOR = {
  INCOME: "#3b82f6",
  OUTCOME: "#f97316",
};

const BarChart = ({ data }: Props) => {
  return (
    <ChartContainer className="flex gap-4 lg:flex-row flex-col">
      <div className="flex-1">
        <BarChartHeader COLOR={COLOR} />
        <ChartWrapper className=" h-52 lg:h-72 w-full">
          <BaChart data={data}>
            <CartesianGrid opacity={0.5} vertical={false} />
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
              style={{ fontSize: 13 }}
              tickMargin={10}
              height={30}
              axisLine={false}
              tickLine={false}
              dataKey="name"
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
            "bg-blue-500 text-white shadow-xl shadow-blue-200"
          )}
        >
          Rp. 2.000.000
        </TextWithIcon>
        <TextWithIcon
          iconPosition="left"
          icon={
            <ArrowIcon direction="down" strokeWidth={3} stroke="currentColor" />
          }
          className={classNames(
            "bg-orange-500 text-white shadow-xl shadow-orange-200"
          )}
        >
          -Rp. 2.000.000
        </TextWithIcon>
        <Heading level={4} fontWeight="medium" className="mt-6">
          Total Profit: Rp. 0
        </Heading>
      </div>
    </ChartContainer>
  );
};

export default BarChart;
