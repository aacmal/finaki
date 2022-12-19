import React from 'react'
import AreaChart from '../../components/Charts/AreaChart'
import AllTransactions from '../../components/Transactions/AllTransactions'
import { data } from '../dashboard/page'

type Props = {}

const transactions = [
  {description: 'Beli Baju', category: 'lainnya', type: 'out', amount: 3000, date: '12 Desember', hour: '18:64'},
  {description: 'Beli Baju', category: 'lainnya', type: 'in', amount: 3000, date: '12 Desember', hour: '18:64'},
  {description: 'Beli Baju', category: 'lainnya', type: 'in', amount: 3000, date: '12 Desember', hour: '18:64'},
  {description: 'Beli Baju', category: 'lainnya', type: 'out', amount: 3000000, date: '12 Desember', hour: '18:64'},
  {description: 'Beli Baju', category: 'lainnya', type: 'out', amount: 3000, date: '12 Desember', hour: '18:64'},
  {description: 'Beli Baju buat kaka ', category: 'lainnya', type: 'out', amount: 3000, date: '12 Desember', hour: '18:64'},
]

const Page = (props: Props) => {
  return (
    <>
      <AllTransactions transactionsData={transactions}/>
    </>
  )
}

export default Page