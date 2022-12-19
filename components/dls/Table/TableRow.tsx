import classNames from 'classnames'
import React from 'react'

type TableRowProps = {
  children: React.ReactNode,
  className?: string
}

const TableRow = ({
  children,
  className
}: TableRowProps) => {
  return (
    <div role='rowgroup' className={classNames(
      'flex w-full flex-wrap items-center',
      className
    )}>
      {children}
    </div>
  )
}

export default TableRow