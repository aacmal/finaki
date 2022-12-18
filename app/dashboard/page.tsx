import TextWithIcon from '@/dls/TextWithIcon';
import ArrowCircleIcon from '@/icons/ArrowCircleIcon';
import ArrowIcon from '@/icons/ArrowIcon';
import classNames from 'classnames';
import React from 'react'
import AreaChart from '../../components/Charts/AreaChart';
import BarChart from '../../components/Charts/BarChart/BarChart';
import PieChart from '../../components/Charts/PieChart';
import Transactions from '../../components/Transactions/Transactions';

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

const transactions = [
  {name: 'Beli Baju', category: 'Cloth', type: 'out', value: 3000, date: '2 Desember', hour: '18:64'},
  {name: 'Beli Baju', category: 'Cloth', type: 'in', value: 3000, date: '2 Desember', hour: '18:64'},
  {name: 'Beli Baju', category: 'Cloth', type: 'in', value: 3000, date: '2 Desember', hour: '18:64'},
  {name: 'Beli Baju', category: 'Cloth', type: 'out', value: 3000, date: '2 Desember', hour: '18:64'},
]

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
      <BarChart data={data}/>
      <div className='flex gap-4 h-fit flex-col lg:flex-row'>
        <PieChart data={dataCategories}/>
        <Transactions data={transactions}/>
      </div>
    </div>
  )
}

export default Page