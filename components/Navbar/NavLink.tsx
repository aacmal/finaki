import Link from 'next/link'
import React from 'react'

type NavLinkProps = {
  href: string,
  children: React.ReactNode
}

const NavLink = ({ 
  href,
  children
}: NavLinkProps) => {
  return (
    <Link href={href}>
      <div className='flex justify-between gap-3 items-center px-8 py-4 rounded-xl bg-blue-500'>
        <span className='font-bold text-white'>{children}</span>
      </div>
    </Link>
  )
}

export default NavLink