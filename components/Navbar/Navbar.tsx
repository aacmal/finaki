'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'
import NavLink from './NavLink'

import GridIcon from '@/icons/GridIcon'
import ArrowsIcon from '@/icons/ArrowsIcon'
import GearIcon from '@/icons/GearIcon'
import { defaultIconProps } from '@/types/IconProps'


type Props = {}

const Navbar = (props: Props) => {  
  const pathname = usePathname();
  

  return (
    <nav className='flex justify-between lg:justify-start lg:flex-col gap-4 h-fit fixed lg:static bottom-0 p-3 lg:p-0 shadow-2xl lg:shadow-none shadow-gray-700 bg-white z-50 left-0 w-screen lg:w-fit lg:mt-20 lg:bg-transparent'>
      {/* <h1 className='mb-10 font-bold text-3xl ml-3 mt-3 hidden lg:block'>Finaki.</h1> */}
      <NavLink 
        icon={<GridIcon {...defaultIconProps}/>} 
        href='/app/dashboard'
        active={pathname === '/dashboard'}
      >Dashboard</NavLink>
      <NavLink 
        icon={<ArrowsIcon {...defaultIconProps}/>} 
        href='/app/transactions'
        active={pathname === '/transactions'}
      >Transactions</NavLink>
      <NavLink 
        icon={<GearIcon {...defaultIconProps}/>} 
        href='/app/settings'
        active={pathname === '/settings'}
      >Settings</NavLink>
    </nav>
  )
}

export default Navbar