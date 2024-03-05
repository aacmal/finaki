import React from "react";

import ChartHeader from "../ChartHeader";

type BarChartHeaderProps = {
  COLOR: any;
};

const BarChartHeader = ({ COLOR }: BarChartHeaderProps) => (
  <ChartHeader title="Perbandingan">
    <div className="flex items-center gap-4 dark:text-slate-300">
      <div className="flex items-center">
        <div
          style={{ backgroundColor: COLOR["INCOME"] }}
          className="mr-2 h-2 w-2 rounded-full"
        ></div>
        <span className="text-sm">Masuk</span>
      </div>
      <div className="flex items-center">
        <div
          style={{ backgroundColor: COLOR["OUTCOME"] }}
          className="mr-2 h-2 w-2 rounded-full"
        ></div>
        <span className="text-sm">Keluar</span>
      </div>
    </div>
  </ChartHeader>
);
export default BarChartHeader;
