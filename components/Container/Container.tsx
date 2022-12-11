import React from 'react'

type ContainerProps = {
  children: React.ReactNode
}

const Container = ({ children }: ContainerProps) => {
  return (
    <div className='max-w-7xl max-w mx-auto bg-red-100 flex'>
      {children}
    </div>
  )
}

export default Container