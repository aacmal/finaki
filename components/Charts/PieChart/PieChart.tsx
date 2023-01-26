"use client";

import React from "react";
import { Pie, Tooltip, PieChart as PiChart, Cell, Legend } from "recharts";
import ChartContainer from "../ChartContainer";
import ChartHeader from "../ChartHeader";
import ChartWrapper from "../ChartWrapper";
import renderPieLabel from "./PieLabel";
import renderPieTooltip from "./PieTooltip";

type Props = {
  data: any;
  width?: number;
  height?: number;
};

const COLORS = ["#FA7070", "#8CC0DE", "#B1BCE6", "#DEB6AB", "#525E75"];

const dummyData = [
  { name: "Tunai", value: 50000 },
  { name: "Gopay", value: 4000 },
  { name: "OVO", value: 25000 },
  { name: "Belum Bayar", value: 10000 },
  { name: "BCA", value: 20000 },
];

const PieChart = ({ data }: Props) => {
  return (
    <ChartContainer className="w-full lg:w-[27rem] overflow-hidden">
      <ChartHeader title="Alokasi" />
      <ChartWrapper className="h-52 lg:h-72 w-full">
        <PiChart>
          <Pie
            dataKey="value"
            data={dummyData}
            isAnimationActive={true}
            cx="50%"
            cy="50%"
            outerRadius={80}
            innerRadius={50}
            blendStroke={true}
          >
            {dummyData.map((entry: any, index: number) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
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
      </ChartWrapper>
    </ChartContainer>
  );
};

export default PieChart;
