import Link from 'next/link'
import React from 'react'
import NavLink from './NavLink'

type Props = {}

const Navbar = (props: Props) => {  
  return (
    <nav className='flex flex-col gap-4'>
      <NavLink href='/dasboard'>Dashboard</NavLink>
      <NavLink href='/transactions'>Transactions</NavLink>
      <NavLink href='/settings'><i className="fi fi-br-layout-fluid"></i> Settings</NavLink>
    </nav>
  )
}

export default Navbar