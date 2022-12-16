'use client'

import React from 'react'
import { Pie, Tooltip, PieChart as PiChart, Cell, Legend } from 'recharts'
import { Payload } from 'recharts/types/component/DefaultLegendContent'
import ChartWrapper from './ChartWrapper'

type Props = {
  data: any[],
  width?: number,
  height?: number
}


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF0000'];

const renderCustomizedLabel = (props: any) => {
  const { payload } = props;
  return (
    <ul>
      {
        payload.map((entry: any, index: number) => {
          const percent = (entry.payload.percent * 100).toFixed(1)
          return (
            <li key={`item-${index}`} className='flex items-center gap-2'>
              <span style={{color: entry.color}} className='font-semibold'>{percent}%</span>
              <span>{entry.value}</span>
            </li>
          )
        })
      }
    </ul>
  )
}

const PieChart = ({
  data,
  width = 50,
  height = 50
}: Props) => {
  return (
    <ChartWrapper className='flex-1'>
      <PiChart width={width} height={height}>
          <Pie
            dataKey="value"
            data={data}
            isAnimationActive={true}
            cx="50%"
            cy="50%"
            outerRadius={100}
            innerRadius={60}
            blendStroke={true}
          >
            {
              data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))
            }
          </Pie>
          <Legend content={renderCustomizedLabel} layout="vertical" verticalAlign="middle" align="right" />
          <Tooltip />
        </PiChart>
    </ChartWrapper>
  )
}

export default PieChart