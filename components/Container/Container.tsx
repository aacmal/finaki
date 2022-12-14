import React from 'react'

type ContainerProps = {
  children: React.ReactNode
}

const Container = ({ children }: ContainerProps) => {
  return (
    <div className='max-w-7xl max-w mx-auto flex gap-5'>
      {children}
    </div>
  )
}

export default Container