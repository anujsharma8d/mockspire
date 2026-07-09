import React from 'react'
import logo from "../assets/logo.svg";

const Logo = () => {
  return (
    <div className='flex items-center font-bold'>
      <img
        src={logo}
        alt='RoundZero'
        className='w-5'
        />
    </div>
  )
}

export default Logo
