'use client'

import Heading from '@/dls/Heading'
import React from 'react'

import {
  AreaChart as ArChart, 
  Area, 
  CartesianGrid, 
  Tooltip,
  XAxis,
} from 'recharts'
import ChartContainer from './ChartContainer'
import ChartWrapper from './ChartWrapper'

type Props = {
  data: any[]
}

const ChartHeader = () => (
  <div className='flex justify-between items-center px-2 lg:px-0 mb-5'>
    <Heading className='font-bold text-xl'>Aktivitas</Heading>
    <div className='flex items-center'>
      <div>7 Hari</div>
    </div>
  </div>
)

const renderCustomizedTooltip = ({ active, payload, label }: any) => {
  
  if (active) {
    return (
      <div className='bg-white p-4 rounded-xl shadow-lg'>
        <p className='text-gray-500 font-medium'>{`Rp. ${payload[0].value}`}</p>
      </div>
    );
  }
};

const AreaChart = ({ data }: Props) => {
  return (
    <ChartContainer className='lg:px-10'>
      <ChartHeader />
      <ChartWrapper className='w-full h-52'>
        <ArChart data={data}>
          <defs>
            <linearGradient id="colorBl" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3c84fa" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#3c84fa" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis style={{ fontSize: 13 }} height={20} axisLine={false} tickLine={false} interval='preserveStartEnd' dataKey="name"/>
          <CartesianGrid opacity={0.5} vertical={false} horizontal={true}/>
          <Tooltip content={renderCustomizedTooltip}/>
          <Area isAnimationActive strokeWidth={3} type="monotone" dataKey="total" stroke="#3c84fa" fillOpacity={1} fill="url(#colorBl)" />
        </ArChart>
      </ChartWrapper>
    </ChartContainer>
  )
}

export default AreaChart