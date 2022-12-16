'use client'

import React from 'react'

import {
  AreaChart as ArChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  CartesianAxis,
  Tooltip
} from 'recharts'
import ChartWrapper from './ChartWrapper'

type Props = {
  data: any[]
}

const ChartHeader = () => (
  <div className='flex justify-between px-4 items-center mb-5'>
    <h3 className='font-bold text-xl'>Pengeluaran</h3>
    <div className='flex items-center'>
      <div>7 Hari</div>
    </div>
  </div>
)

const AreaChart = ({data}: Props) => {
  return (
    <ChartWrapper
      chartHeader={<ChartHeader />}
    >
      <ArChart data={data}>
        <defs>
          <linearGradient id="colorBl" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3c84fa" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#3c84fa" stopOpacity={0}/>
          </linearGradient>
        </defs>
        {/* Create line in x axis */} 
        <CartesianGrid vertical={false} horizontal={false}/>
        <Tooltip/>
        <Area isAnimationActive strokeWidth={5} type="monotone" dataKey="uv" stroke="#3c84fa" fillOpacity={1} fill="url(#colorBl)" />
      </ArChart>
    </ChartWrapper>
  )
}

export default AreaChart