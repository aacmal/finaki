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
    <nav className='flex flex-col gap-4'>
      <h1 className='mb-10 font-bold text-3xl ml-3 mt-3'>Finaki.</h1>
      <NavLink 
        icon={<GridIcon {...defaultIconProps}/>} 
        href='/dashboard'
        active={pathname === '/dashboard'}
      >Dashboard</NavLink>
      <NavLink 
        icon={<ArrowsIcon {...defaultIconProps}/>} 
        href='/transactions'
        active={pathname === '/transactions'}
      >Transactions</NavLink>
      <NavLink 
        icon={<GearIcon {...defaultIconProps}/>} 
        href='/settings'
        active={pathname === '/settings'}
      >Settings</NavLink>
    </nav>
  )
}

export default Navbar