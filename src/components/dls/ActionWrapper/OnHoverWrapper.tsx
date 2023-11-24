import classNames from 'classnames'
import React from 'react'

type OnHoverWrapper = {
  children: React.ReactNode
  className?: string
}

const OnHoverWrapper = ({
  children,
  className
}: OnHoverWrapper) => {
  return (
    <div className={classNames("absolute py-1 shadow-xl rounded-lg top-0 right-0 bg-white z-30 w-fit invisible opacity-0 transition-all delay-200 group-hover:top-8 group-hover:opacity-100 group-hover:visible",className)}>
      {children}
    </div>
  )
}

export default OnHoverWrapper