"use client";

import React from "react";
import { Pie, Tooltip, PieChart as PiChart, Cell, Legend } from "recharts";
import ChartContainer from "../ChartContainer";
import ChartHeader from "../ChartHeader";
import ChartWrapper from "../ChartWrapper";
import renderPieLabel from "./PieLabel";
import renderPieTooltip from "./PieTooltip";
import { PIE_CHART } from "../constant";
import NoData from "../NoData";

type Props = {
  data: {
    name: string;
    value: number;
    color: string;
  }[];
  width?: number;
  height?: number;
  loading?: boolean;
};

const COLORS = ["#FA7070", "#8CC0DE", "#B1BCE6", "#DEB6AB", "#525E75"];

const dummyData = [
  { name: "Tunai", value: 50000 },
  { name: "Gopay", value: 4000 },
  { name: "OVO", value: 25000 },
  { name: "Belum Bayar", value: 10000 },
  { name: "BCA", value: 20000 },
];

const PieChart = ({ data, loading }: Props) => {
  if (loading) return <div>Loading...</div>;

  console.log(data);

  return (
    <ChartContainer className="w-full lg:w-[27rem] overflow-hidden">
      <ChartHeader title="Alokasi" />
      <ChartWrapper className="h-52 lg:h-72 w-full">
        {data?.length > 0 ? (
          <PiChart>
            <Pie
              dataKey="value"
              data={data}
              isAnimationActive={true}
              cx="50%"
              cy="50%"
              outerRadius={80}
              innerRadius={50}
              blendStroke={true}
            >
              {data?.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={(PIE_CHART as any)[entry.color]}
                />
              ))}
            </Pie>
            <Legend
              content={renderPieLabel}
              layout="vertical"
              verticalAlign="middle"
              align="right"
            />
            <Tooltip content={renderPieTooltip} />
          </PiChart>
        ) : (
          <NoData />
        )}
      </ChartWrapper>
    </ChartContainer>
  );
};

export default PieChart;
