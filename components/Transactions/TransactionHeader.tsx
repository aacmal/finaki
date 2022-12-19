import IconWrapper from '@/dls/IconWrapper'
import TableCol from '@/dls/Table/TableCol'
import TableRow from '@/dls/Table/TableRow'
import ArrowCircleIcon from '@/icons/ArrowCircleIcon'
import React from 'react'

type Props = {}

const TransactionHeader = (props: Props) => {
  return (
    <TableRow className='font-bold gap-2 border-b px-2 sm:px-4 border-gray-500 pb-2'>
      <TableCol className='w-14 sm:w-[10%]'>Waktu</TableCol>
      <TableCol className='w-24 sm:w-[40%]'>Deskripsi</TableCol>
      <TableCol className='w-16 sm:w-[10%]'>Kategori</TableCol>
      <TableCol className='w-32 text-center sm:w-[15%]'>Jumlah</TableCol>
    </TableRow>
    // <li className='flex font-bold w-full border-b border-gray-500 gap-2 pb-2 mb-5'>
    //   <span className=''>Waktu</span>
    //   <span className=''>Deskripsi</span>
    //   <span className=''>Kategori</span>
    //   <span className=''>Jenis</span>
    //   <span className=''>Jumlah</span>
    //   <span>Pilihan</span>
    // </li>
  )
}

export default TransactionHeader