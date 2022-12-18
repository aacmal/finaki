import IconWrapper from '@/dls/IconWrapper'
import ArrowCircleIcon from '@/icons/ArrowCircleIcon'
import classNames from 'classnames'
import React from 'react'

type ListProps = {
  index: number,
  length: number,
  type: 'in' | 'out',
  name: string,
  date: string,
  hour: string,
  value: number,
}

const List = ({
  index,
  length,
  type,
  name,
  date,
  hour,
  value,
}: ListProps) => {
  return (
    <li className={classNames(
      "flex w-full py-3 items-center",
      {"border-b": index !== length - 1}
    )}>
      <span>
        <IconWrapper className='w-7 mr-7'>
          <ArrowCircleIcon
            direction={
              type === 'in' ? 'up' : 'down'
            }
            className={classNames(
              {'text-green-500': type === 'in'},
              {'text-red-500': type === 'out'},
            )}
          />
        </IconWrapper>
      </span>
      <span className='w-[30%] lg:w-[40%] font-medium'>{name}</span>
      <span></span>
      <span className='flex flex-col'>
        <span className='font-medium'>{date}</span>
        <span>{hour}</span>
      </span>
      <span className={classNames(
        'font-medium  ml-auto', 
        {'text-green-500': type === 'in'}, 
        {'text-red-500': type === 'out'}
      )}>{type === 'out' && '-'}Rp. {value}</span>
    </li>
  )
}

export default List