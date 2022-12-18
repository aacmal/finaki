import { ArrowIconProps, defaultIconProps } from '@/types/IconProps'
import classNames from 'classnames'
import React from 'react'

const ArrowCircleIcon = ({
  fill = 'currentColor',
  direction,
  className,
}: ArrowIconProps) => {
  return (
    <svg 
      {...defaultIconProps} 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill={fill}
      className={classNames(
        'transform w-8',
        {'rotate-180': direction === 'up'},
        {'rotate-90': direction === 'left'},
        {'-rotate-90': direction === 'right'},
        {'': direction === 'down'},
        className,
      )}
    >
      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-.53 14.03a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V8.25a.75.75 0 00-1.5 0v5.69l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3z" clipRule="evenodd" />
    </svg>

  )
}

export default ArrowCircleIcon