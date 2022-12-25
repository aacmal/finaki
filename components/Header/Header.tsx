'use client'

import { usePathname } from 'next/navigation'
import React from 'react'
import ProfileInfo from './ProfileInfo'

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
      case '/profile':
        return 'Profile'
      default:
        return 'Dashboard'
    }
  }
  return (
    <header className='flex justify-between my-4 items-center w-full px-2 lg:px-5'>
      <h1 className='text-2xl font-bold'>{getHeaderTitle(pathname)}</h1>
      <ProfileInfo/>
    </header>
  )
}

export default Header