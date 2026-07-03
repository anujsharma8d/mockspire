import React from 'react'
import logo from "../assets/roundzero-logo.svg";

const Logo = () => {
  return (
    <div className='flex items-center font-bold'>
      <img
        src={logo}
        alt='RoundZero'
        className='h-12 w-12'
        />
        <span className='font-science text-white'>ROUND ZERO</span>
    </div>
  )
}

export default Logo
