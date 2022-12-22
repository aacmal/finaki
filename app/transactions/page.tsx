import React, { useEffect } from 'react'
import AreaChart from '../../components/Charts/AreaChart'
import AllTransactions from '../../components/Transactions/AllTransactions'
import { getTransactionsData } from '../../utils/transaction'
import { data } from '../dashboard/page'

type Props = {}

const getData = async () => {
  const data = await getTransactionsData()
  // console.log(json['2 Desember']);
  console.log(data);
  
  return data
}

const Page = async (props: Props) => {
  const data = await getData()
  return (
    <>
      <AllTransactions data={data}/>
    </>
  )
}

export default Page