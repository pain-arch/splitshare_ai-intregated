import React from 'react'

const AuthLayout = ({children}) => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      {children}
    </div>
  )
}

export default AuthLayout
