import { ArrowIconProps, defaultIconProps, IconProps } from '@/types/IconProps'
import classNames from 'classnames'
import React from 'react'

const ArrowIcon = ({
  direction,
  className,
}: ArrowIconProps) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      {...defaultIconProps}
      className={classNames(
        'transform w-8',
        {'rotate-180': direction === 'up'},
        {'rotate-90': direction === 'left'},
        {'-rotate-90': direction === 'right'},
        {'': direction === 'down'},
        className,
      )}
    >
      <path fillRule="evenodd" d="M12 2.25a.75.75 0 01.75.75v16.19l6.22-6.22a.75.75 0 111.06 1.06l-7.5 7.5a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 111.06-1.06l6.22 6.22V3a.75.75 0 01.75-.75z" clipRule="evenodd" />
    </svg>

  )
}

export default ArrowIcon