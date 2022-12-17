'use client'

import React from 'react'
import { BarChart as BaChart, CartesianGrid, Tooltip, Legend, Bar, XAxis } from 'recharts'
import ChartContainer from './ChartContainer'
import ChartWrapper from './ChartWrapper'

type Props = {
  data: any[]
}

const COLOR = {
  'INCOME': '#0088FE',
  'OUTCOME': '#FF8042'
}

const BarChartHeader = () => (
  <div className='flex justify-between px-4 items-center mb-5'>
    <h3 className='font-bold text-xl'>Perbandingan</h3>
    <div className='flex items-center gap-4'>
      <div className='flex items-center'>
        <div style={{backgroundColor: COLOR['INCOME']}} className='h-2 w-2 rounded-full mr-2'></div>
        <span className='text-sm'>Masuk</span>
      </div>
      <div className='flex items-center'>
        <div style={{backgroundColor: COLOR['OUTCOME']}} className='h-2 w-2 rounded-full mr-2'></div>
        <span className='text-sm'>Keluar</span>
      </div>
    </div>
  </div>
)


const BarChart = ({ data }: Props) => {
  return (
    <ChartContainer className='flex-1'>
      <BarChartHeader/>
      <ChartWrapper className=' h-52 lg:h-72 w-full'>
        <BaChart
          data={data}
        >
          <CartesianGrid vertical={false} />
          <Tooltip cursor={{fill: '#0088FE', opacity: 0.1}}/>
          <Bar isAnimationActive radius={[10, 10, 10, 10]} barSize={8} dataKey="uv" fill="#0088FE" />
          <Bar isAnimationActive radius={[10, 10, 10, 10]} barSize={8} dataKey="pv" fill="#FF8042" />
        </BaChart>
      </ChartWrapper>
    </ChartContainer>
  )
}

export default BarChart