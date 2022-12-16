'use client'

import React from 'react'
import AreaChart from '../../components/Charts/AreaChart';
import BarChart from '../../components/Charts/BarChart';
import LineChart from '../../components/Charts/LineChart';
import PieChart from '../../components/Charts/PieChart';

type Props = {}
const data = [
  {name: 'Senin', uv: 100, pv: 2400, amt: 2400},
  {name: 'Selasa', uv: 200, pv: 2400, amt: 2400},
  {name: 'Rabu', uv: 100, pv: 2400, amt: 2400},
  {name: 'Kamis', uv: 400, pv: 2400, amt: 2400},
  {name: 'Jumat', uv: 250, pv: 2400, amt: 2400},
  {name: 'Sabtu', uv: 300, pv: 2400, amt: 2400},
  {name: 'Minggu', uv: 300, pv: 2400, amt: 2400},
];

const dataCategories = [
  {name: 'Food', value: 400},
  {name: 'Transport', value: 300},
  {name: 'Clothes', value: 300},
  {name: 'Entertainment', value: 200},
  {name: 'Others', value: 278},
]

const Page = (props: Props) => {


  return (
    <div className='mt-8 flex flex-col gap-4'>
      <AreaChart data={data}/>
      <div className='flex gap-4 justify-between'>
        <BarChart data={data}/>
        <PieChart data={dataCategories}/>
      </div>
    </div>
  )
}

export default Page