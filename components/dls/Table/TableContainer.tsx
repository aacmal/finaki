import classNames from 'classnames'
import React from 'react'

type Props = {
  tabelDescription: string,
  children: React.ReactNode,
  className?: string
}

const TableContainer = ({
  tabelDescription,
  children,
  className
}: Props) => {
  return (
    <div 
      role='table' 
      aria-label={tabelDescription}
      className={classNames(
        'w-full',
        className
      )}
    >
      {children}
    </div>
  )
}

export default TableContainer