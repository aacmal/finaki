import classNames from 'classnames'
import React from 'react'
import IconWrapper from '../IconWrapper'

type Props = {
  children: React.ReactNode,
  className?: string,
  onClick?: () => void,
}

const IconButton = ({
  children,
  className,
  onClick
}: Props) => {
  return (
    <button
      onClick={onClick}
      className={classNames("rounded p-1" ,className)}
    >
      <IconWrapper className="w-5 h-5">
        {children}
      </IconWrapper>
    </button>
  )
}

export default IconButton