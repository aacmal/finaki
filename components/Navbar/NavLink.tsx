import classNames from 'classnames'
import Link from 'next/link'
import React from 'react'

type NavLinkProps = {
  href: string,
  children: React.ReactNode,
  icon: React.ReactNode
  active?: boolean
}

const NavLink = ({ 
  href,
  children,
  icon,
  active = false
}: NavLinkProps) => {
  return (
    <Link href={href}>
      <div className={
        classNames(
          'flex gap-4 items-center px-6 py-4 rounded-2xl transition-all duration-100',
          {'bg-blue-500 text-white shadow-xl shadow-blue-200': active},
          {'hover:bg-blue-400 hover:text-white text-gray-900': !active}
        )
      }>
        {icon}
        <span className='font-bold'>{children}</span>
      </div>
    </Link>
  )
}

export default NavLink