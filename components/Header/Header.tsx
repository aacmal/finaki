'use client'

import { usePathname } from 'next/navigation'
import React from 'react'

type Props = {}

const Header = (props: Props) => {
  const pathname = usePathname()

  const getHeaderTitle = (pathname: string | null) => {
    switch (pathname) {
      case '/dashboard':
        return 'Dashboard'
      case '/transactions':
        return 'Transactions'
      case '/settings':
        return 'Settings'
      default:
        return 'Dashboard'
    }
  }
  return (
    <header className='flex justify-between mt-3 items-center w-full px-5'>
      <h1 className='text-2xl font-bold'>{getHeaderTitle(pathname)}</h1>
      <div className='flex gap-2 items-center'>
        <div className='h-10 w-10 rounded-full bg-gray-300'></div>
        <span className='font-medium'>Aca M</span>
      </div>
    </header>
  )
}

export default Header