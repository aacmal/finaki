import Link from 'next/link'
import React from 'react'
import NavLink from './NavLink'

import GridIcon from '@/icons/GridIcon'
import ArrowsIcon from '@/icons/ArrowsIcon'
import GearIcon from '@/icons/GearIcon'
import { defaultIconProps } from '@/types/IconProps'


type Props = {}

const Navbar = (props: Props) => {  
  return (
    <nav className='flex flex-col gap-4'>
      <h1 className='mb-10 font-bold text-3xl'>Finaki.</h1>
      <NavLink 
        icon={<GridIcon {...defaultIconProps}/>} 
        href='/dashboard'
      >Dashboard</NavLink>
      <NavLink 
        icon={<ArrowsIcon {...defaultIconProps}/>} 
        href='/transactions'
      >Transactions</NavLink>
      <NavLink 
        icon={<GearIcon {...defaultIconProps}/>} 
        href='/settings'
      >Settings</NavLink>
    </nav>
  )
}

export default Navbar