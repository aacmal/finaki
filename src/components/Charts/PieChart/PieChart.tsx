"use client";

import { Cell, Legend, Pie, PieChart as PiChart, Tooltip } from "recharts";
import { ChartLoading } from "../ChartPlaceholder";
import ChartWrapper from "../ChartWrapper";
import { PIE_CHART } from "../constant";
import renderPieLabel from "./PieLabel";
import renderPieTooltip from "./PieTooltip";

export type PieChartData = {
  name: string;
  value: number;
  color: string;
};

type Props = {
  data: PieChartData[];
  legend?: boolean;
  loading?: boolean;
};

const PieChart = ({ data, legend = true, loading }: Props) => {
  return (
    <ChartWrapper className="h-52 lg:h-72 w-full">
      {loading ? (
        <ChartLoading />
      ) : data.length > 0 ? (
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
                fill={
                  entry.color.includes("#")
                    ? entry.color
                    : (PIE_CHART as any)[entry.color]
                }
              />
            ))}
          </Pie>
          <Legend
            content={renderPieLabel}
            layout="vertical"
            verticalAlign="middle"
            align="right"
            display={legend ? "flex" : "none"}
          />
          <Tooltip content={renderPieTooltip} />
        </PiChart>
      ) : (
        <div className="min-h-[20rem] w-full grid place-items-center dark:text-slate-200">
          Belum ada Dompet yang ditambahkan
        </div>
      )}
    </ChartWrapper>
  );
};

export default PieChart;
