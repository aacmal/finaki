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
          'flex gap-4 items-center px-6 py-4 rounded-2xl transition-all duration-100 border border-transparent',
          {'bg-blue-500 text-white shadow-xl shadow-blue-200': active},
          {'hover:border-blue-500 hover:text-blue-500 text-gray-900': !active}
        )
      }>
        {icon}
        <span className='font-bold'>{children}</span>
      </div>
    </Link>
  )
}

export default NavLink