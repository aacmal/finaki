'use client'

import React from 'react'
import { BarChart as BaChart, CartesianGrid, Tooltip, Legend, Bar, XAxis } from 'recharts'
import ChartWrapper from './ChartWrapper'

type Props = {
  data: any[]
}

const BarChartHeader = () => (
  <div className='flex justify-between px-4 items-center mb-5'>
    <h3 className='font-bold text-xl'>Pengeluaran</h3>
    <div className='flex items-center'>
      <div>7 Hari</div>
    </div>
  </div>
)


const BarChart = ({ data }: Props) => {
  return (
    <ChartWrapper
      chartHeader={<BarChartHeader />}
    >
      <BaChart
        width={500}
        height={300}
        data={data}
      >
        <CartesianGrid vertical={false} />
        <Tooltip />
        <Bar radius={[10, 10, 0, 0]} barSize={8} dataKey="pv" fill="#8884d8" />
        <Bar radius={[10, 10, 0, 0]} barSize={8} dataKey="uv" fill="#82ca9d" />
      </BaChart>
    </ChartWrapper>
  )
}

export default BarChart