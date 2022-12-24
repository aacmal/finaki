import { TransactionData } from '@/types/Transaction'
import React from 'react'
import TransactionList from './TransactionList'

type Props = {
  data: TransactionData[]
}

// TODO: Refactor this component

const AllTransactions = ({
  data
}: Props) => {
  return (
    <>
      <div className='flex flex-col w-full'>
        <div className='flex gap-2 w-full mb-5 px-4 py-3 border-b border-gray-400 font-medium text-sm'>
          <div className='w-[14%] hidden lg:block'>Waktu</div>
          <div className='w-[40%] lg:w-[30%]'>Deskripsi</div>
          <div className='w-[10%] text-center'>Kategori</div>
          <div className='w-[35%] lg:w-[15%] text-right'>Jumlah (Rp.)</div>
        </div>
        <TransactionList data={data}/>
      </div>
    </>
  )
}

export default AllTransactions