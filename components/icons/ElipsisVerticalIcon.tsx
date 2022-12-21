import { defaultIconProps, IconProps } from '@/types/IconProps'
import React from 'react'

const ElipsisVerticalIcon = (props: IconProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" {...defaultIconProps} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
    </svg>

  )
}

export default ElipsisVerticalIcon