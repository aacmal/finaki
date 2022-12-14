'use client'

import React from 'react'

import { LineChart as LChart, ResponsiveContainer, Tooltip, Line } from 'recharts';


type LineChartProps = {
  data: any[]
}

const LineChart = ({
  data
}: LineChartProps) => {
  return (
    <div className='p-5 rounded-3xl border-2 border-gray-200'>
      <ResponsiveContainer width='100%' height={500}>
        <LChart data={data}>
          <Line type="monotone" dataKey="uv" stroke="#8884d8" />
          <Tooltip />
        </LChart>
      </ResponsiveContainer>
    </div>
  )
}

export default LineChart