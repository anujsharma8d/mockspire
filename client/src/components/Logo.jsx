import React from 'react'
import logo from "../assets/logo.svg";

const Logo = () => {
  return (
    <div className='flex items-center font-bold'>
      <img
        src={logo}
        alt='Mockspire'
        className='w-15'
        />
    </div>
  )
}

export default Logo
