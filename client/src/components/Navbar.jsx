import React from 'react'
import Logo from './Logo'
import { Link } from 'react-scroll'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='flex justify-around items-center'>
        <Logo/>
        <div className='flex justify-center items-center gap-8'>
            <Link 
            to="about"
            smooth={true}
            duration={500}
            className='cursor-pointer'
            >ABOUT</Link>

            <Link
            to="features"
            smooth={true}
            duration={500}
            className='cursor-pointer'
            >FEATURES</Link>

            <Link
            to="howitworks"
            smooth={true}
            duration={500}
            className='cursor-pointer'
            >HOW IT WORKS</Link>

            <Link
            to="faq"
            smooth={true}
            duration={500}
            className='cursor-pointer'
            >FAQ</Link>

            <Link
            to="contact"
            smooth={true}
            duration={500}
            className='cursor-pointer'
            >CONTACT</Link>
        </div>
        <div className='flex justify-center items-center gap-8'>
            <NavLink to={"/login"}>LOGIN</NavLink>
            <NavLink to={"/signup"}>GET STARTED</NavLink>
        </div>
    </nav>
  )
}

export default Navbar
