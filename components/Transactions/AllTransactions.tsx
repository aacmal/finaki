import IconWrapper from '@/dls/IconWrapper'
import TableCol from '@/dls/Table/TableCol'
import TableContainer from '@/dls/Table/TableContainer'
import TableRow from '@/dls/Table/TableRow'
import ArrowCircleIcon from '@/icons/ArrowCircleIcon'
import ArrowIcon from '@/icons/ArrowIcon'
import ElipsisVerticalIcon from '@/icons/ElipsisVerticalIcon'
import PencilIcon from '@/icons/PencilIcon'
import TrashIcon from '@/icons/TrashIcon'
import { Transaction, TransactionData } from '@/types/Transaction'
import classNames from 'classnames'
import React from 'react'
import { data } from '../../app/dashboard/page'
import TransactionHeader from './TransactionHeader'

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
        {
          data.map((transactionData: TransactionData) => (
            <>
              <h1 className='pl-4 font-bold text-gray-400' key={transactionData.date}>{transactionData.date}</h1>
              {
                transactionData.transactions.map((transaction: Transaction, index: number) => (
                  <div key={index} className='flex gap-2 items-center w-full py-3 hover:bg-blue-100 rounded-xl px-4 group'>
                    <div className='w-[14%] hidden lg:block text-gray-500 group-hover:text-gray-900'>{transaction.time}</div>
                    <div className='w-[40%] lg:w-[30%] flex flex-col'>
                      <span className='font-bold lg:font-medium'>{transaction.description}</span>
                      <span className='lg:hidden text-gray-600'>{transaction.time}</span>
                    </div>
                    <div className='w-[10%] text-center'>
                      <span className='px-3 text-green-700 bg-green-200 text-sm rounded-3xl'>
                        {transaction.category}
                      </span>
                    </div>
                    <div className={classNames(
                      'w-[35%] lg:w-[15%] text-right font-medium',
                      {'text-green-500': transaction.type === 'in'},
                      {'text-red-500': transaction.type === 'out'}
                    )}>
                      {
                        transaction.type === 'out' && '-'
                      }{transaction.amount}
                    </div>
                    <div className='flex-1 text-center lg:invisible lg:group-hover:visible'>
                      <div className='hidden lg:flex gap-3 justify-center'>
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
                      <button className='lg:hidden rounded p-1 -mr-5'>
                          <IconWrapper className=' overflow-hidden h-6'>
                            <ElipsisVerticalIcon strokeWidth={2} stroke='currentColor'/>
                          </IconWrapper>
                      </button>
                    </div>
                  </div>
                ))
              }
            </>
          ))
        }
      </div>
      {/* <TableContainer className='gap-10' tabelDescription='All Transactions'>
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
      </TableContainer> */}
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