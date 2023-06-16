import React from 'react'
import s from './Container.module.css'

const Container = ({ children } : {children: React.ReactNode}) => {
  return (
<div  aria-hidden="true" className={"  overflow-x-hidden overflow-y-hidden z-50 w-full h-full md:inset-0 justify-center items-center container mx-auto  " + s.container}>
   
                  {children}
            </div>

  )
}

export default Container