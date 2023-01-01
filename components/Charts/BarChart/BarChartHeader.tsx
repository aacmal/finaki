import Heading from "@/dls/Heading";
import React from "react";

type BarChartHeaderProps = {
  COLOR: any;
};

const BarChartHeader = ({ COLOR }: BarChartHeaderProps) => (
  <div className="flex justify-between px-4 items-center mb-5">
    <Heading level={2} fontWeight="medium" className="font-bold text-xl">
      Perbandingan
    </Heading>
    <div className="flex items-center gap-4">
      <div className="flex items-center">
        <div
          style={{ backgroundColor: COLOR["INCOME"] }}
          className="h-2 w-2 rounded-full mr-2"
        ></div>
        <span className="text-sm">Masuk</span>
      </div>
      <div className="flex items-center">
        <div
          style={{ backgroundColor: COLOR["OUTCOME"] }}
          className="h-2 w-2 rounded-full mr-2"
        ></div>
        <span className="text-sm">Keluar</span>
      </div>
    </div>
  </div>
);
export default BarChartHeader;
