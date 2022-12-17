import React from 'react'
import AreaChart from '../../components/Charts/AreaChart';
import BarChart from '../../components/Charts/BarChart';
import PieChart from '../../components/Charts/PieChart';

type Props = {}
export const data = [
  {name: '1 Des', in: 100, out: 350, total: 2400},
  {name: '2 Des', in: 200, out: 500, total: 2420},
  {name: '3 Des', in: 100, out: 100, total: 2200},
  {name: '4 Des', in: 400, out: 350, total: 2350},
  {name: '5 Des', in: 250, out: 250, total: 2150},
  {name: '6 Des', in: 300, out: 350, total: 2200},
  {name: '7 Des', in: 300, out: 400, total: 2600},
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
    <div className='flex flex-col gap-4'>
      <AreaChart data={data}/>
      <div className='flex flex-col lg:flex-row gap-4 justify-between'>
        <BarChart data={data}/>
        <PieChart data={dataCategories}/>
      </div>
    </div>
  )
}

export default Page