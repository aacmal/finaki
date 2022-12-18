'use client'

import Heading from '@/dls/Heading'
import React from 'react'
import { Pie, Tooltip, PieChart as PiChart, Cell, Legend } from 'recharts'
import ChartContainer from './ChartContainer'
import ChartWrapper from './ChartWrapper'

type Props = {
  data: any[],
  width?: number,
  height?: number
}


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF0000'];

const PieChartHeader = () => (
  <div className='flex justify-between px-4 items-center mb-5'>
    <Heading className='font-bold text-xl'>Kategori</Heading>
  </div>
)

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
}: Props) => {
  return (
    <ChartContainer className='w-full lg:w-[27rem] overflow-hidden'>
      <PieChartHeader/>
        <ChartWrapper className='h-52 lg:h-72 w-full lg:-ml-6'>
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
    </ChartContainer>
  )
}

export default PieChart