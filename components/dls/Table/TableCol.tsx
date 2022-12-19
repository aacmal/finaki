import React from 'react'

type TableColProps = {
  children: React.ReactNode,
  className?: string
}

const TableCol = ({
  children,
  className
}: TableColProps) => {
  return (
    <div role='cell' className={className}>
      {children}
    </div>
  )
}

export default TableCol