'use client'

import React from 'react'
import AreaChart from '../../components/Charts/AreaChart';
import BarChart from '../../components/Charts/BarChart';
import LineChart from '../../components/Charts/LineChart';

type Props = {}
const data = [
  {name: 'Page A', uv: 100, pv: 2400, amt: 2400},
  {name: 'Page B', uv: 200, pv: 2400, amt: 2400},
  {name: 'Page C', uv: 100, pv: 2400, amt: 2400},
  {name: 'Page D', uv: 400, pv: 2400, amt: 2400},
  {name: 'Page E', uv: 250, pv: 2400, amt: 2400},
  {name: 'Page F', uv: 300, pv: 2400, amt: 2400},
  {name: 'Page G', uv: 300, pv: 2400, amt: 2400},
];

const Page = (props: Props) => {


  return (
    <div className='mt-8'>
      <AreaChart data={data}/>
      <div className='w-1/2'>
        <BarChart data={data}/>
      </div>
    </div>
  )
}

export default Page