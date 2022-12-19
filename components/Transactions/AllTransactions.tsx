import IconWrapper from '@/dls/IconWrapper'
import TableCol from '@/dls/Table/TableCol'
import TableContainer from '@/dls/Table/TableContainer'
import TableRow from '@/dls/Table/TableRow'
import ArrowCircleIcon from '@/icons/ArrowCircleIcon'
import ArrowIcon from '@/icons/ArrowIcon'
import PencilIcon from '@/icons/PencilIcon'
import TrashIcon from '@/icons/TrashIcon'
import { Transaction } from '@/types/Transaction'
import classNames from 'classnames'
import React from 'react'
import TransactionHeader from './TransactionHeader'

type Props = {
  transactionsData: any[]
}

const AllTransactions = ({
  transactionsData
}: Props) => {
  return (
    <>
      <TableContainer className='gap-10' tabelDescription='All Transactions'>
        <TransactionHeader/>
        {
          transactionsData.map((transaction: Transaction, index) => (
            <TableRow className='py-2 gap-2 px-2 sm:px-4 hover:bg-blue-200' key={index}>
              <TableCol className='w-14 sm:w-[10%]'>{transaction.hour}</TableCol>
              <TableCol className='w-24 sm:w-[40%]'>{transaction.description}</TableCol>
              <TableCol className='w-16 sm:w-[10%]'>
                <span className='py-0 px-2 bg-blue-200 rounded-xl text-sm'>{transaction.category}</span>
              </TableCol>
              <TableCol className='w-32 flex justify-between items-center sm:w-[13%]'>
                <IconWrapper className='w-4 mr-2'>
                  <ArrowIcon className={transaction.type === 'out' ? 'text-red-500' : 'text-green-500'} strokeWidth={2} stroke='currentColor'  direction={transaction.type === 'in' ? 'up' : 'down'}/>
                </IconWrapper>
                <span>{transaction.type === 'out' && '-'}Rp. {transaction.amount}</span> 
              </TableCol>
            </TableRow>
          ))
        }
      </TableContainer>
      {/* <ul>
        <TransactionHeader/>
        {
          transactionsData.map((transaction: Transaction, index) => (
            <li key={index} className={classNames('flex w- gap-2 items-center py-4', {'border-b border-gray-300': transactionsData.length > index+1})}>
              <span className='w-[10%]'>{transaction.date}</span>
              <span className='w-[30%]'>{transaction.description}</span>
              <span className='w-[10%]'>{transaction.category}</span>
              <span className='w-[10%]'>
                <IconWrapper className='w-6'>
                  <ArrowCircleIcon 
                    direction={transaction.type === 'in' ? 'up' : 'down'} 
                    className={classNames(
                      'w-full', {
                    'text-green-500': transaction.type === 'in',
                    'text-red-500': transaction.type === 'out'
                    })}
                  />
                </IconWrapper>
              </span>
              <span className='w-[20%]'>Rp. {transaction.amount}</span>
              <div className='flex gap-3'>
                <button className='text-blue-500 hover:bg-blue-500 hover:text-white rounded p-1'>
                  <IconWrapper className='w-5'>
                    <PencilIcon/>
                  </IconWrapper>
                </button>
                <button className='text-red-500 hover:bg-red-500 hover:text-white rounded p-1'>
                  <IconWrapper className='w-5'>
                    <TrashIcon/>
                  </IconWrapper>
                </button>
              </div>
            </li>
          ))
        }

      </ul> */}
    </>
  )
}

export default AllTransactions