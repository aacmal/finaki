import classNames from 'classnames';
import React, { ReactElement } from 'react'

import { ResponsiveContainer } from 'recharts';


type Props = {
  children: ReactElement,
  chartHeader?: ReactElement,
  width?: string,
  height?: number,
  className?: string
}

const ChartWrapper = ({
  children,
  height = 300,
  chartHeader,
  className
}: Props) => {
  return (
    <div className={classNames('p-5 rounded-3xl border-2 border-gray-200', className)}>
      {chartHeader}
      <ResponsiveContainer width='100%' height={height}>
        {children}
      </ResponsiveContainer>
    </div>
  )
}

export default ChartWrapper;