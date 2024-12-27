import React, { ReactNode } from 'react'
import Navbar from './Navbar'

interface LayoutProps {
  children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className='d-flex flex-column' >
      <div className='p-2'>
        <Navbar />
      </div>
      <main>
        {children}
      </main>
    </div>
  )
}

export default Layout