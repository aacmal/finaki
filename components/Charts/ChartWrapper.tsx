import React, { ReactElement } from 'react'

import { ResponsiveContainer } from 'recharts';


type Props = {
  children: ReactElement,
  chartHeader?: ReactElement,
  width?: string,
  height?: number
}

const ChartWrapper = ({
  children,
  width = '100%',
  height = 300,
  chartHeader
}: Props) => {
  return (
    <div className='p-5 rounded-3xl border-2 border-gray-200'>
      {chartHeader}
      <ResponsiveContainer width={width} height={height}>
        {children}
      </ResponsiveContainer>
    </div>
  )
}

export default ChartWrapper;