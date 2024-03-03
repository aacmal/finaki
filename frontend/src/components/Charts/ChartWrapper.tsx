import React, { ReactElement } from "react";
import { ResponsiveContainer } from "recharts";

type Props = {
  children: ReactElement;
  className?: string;
};

/**
 *
 * @param children use this to set type of chart
 * @param className use this to set the width and height of the chart with tailwind class
 * @returns
 *
 */

const ChartWrapper = ({ children, className }: Props) => {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  );
};

export default ChartWrapper;
