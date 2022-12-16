'use client'

import React from 'react'
import { Pie, Tooltip, PieChart as PiChart, Cell } from 'recharts'
import ChartWrapper from './ChartWrapper'

type Props = {
  data: any[],
  width?: number,
  height?: number
}


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF0000'];

const PieChart = ({
  data,
  width = 50,
  height = 50
}: Props) => {
  return (
    <ChartWrapper className='w-72'>
      <PiChart width={width} height={height}>
          <Pie
            dataKey="value"
            data={data}
            isAnimationActive={true}
            cx="50%"
            cy="50%"
            outerRadius={100}
            innerRadius={60}
            fill="#8884d8"
            blendStroke={true}
          >
            {
              data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))
            }
          </Pie>
          <Tooltip />
        </PiChart>
    </ChartWrapper>
  )
}

export default PieChart