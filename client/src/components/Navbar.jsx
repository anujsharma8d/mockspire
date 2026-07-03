import React from 'react'
import Logo from './Logo'
import { Link } from 'react-scroll'
import { NavLink } from 'react-router-dom'
import { Menu, X } from "lucide-react"
import { useState } from 'react'

const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);

    const closeMenu = () => setIsOpen(false);

    return (
        <nav className='sticky top-0 z-999 flex justify-between items-center px-6 py-4 md:px-12 bg-black '>
            <Logo />
            <div className='hidden justify-center items-center gap-8 lg:flex text-gray-400 '>
                <Link
                    to="about"
                    smooth={true}
                    duration={500}
                    className='cursor-pointer'
                    spy={true}
                    activeClass="text-white border-b-2 border-[#AB9D8F]"
                >ABOUT</Link>

                <Link
                    to="features"
                    smooth={true}
                    duration={500}
                    className='cursor-pointer'
                    spy={true}
                    activeClass="text-white border-b-2 border-[#AB9D8F]"
                >FEATURES</Link>

                <Link
                    to="howitworks"
                    smooth={true}
                    duration={500}
                    className='cursor-pointer'
                    spy={true}
                    activeClass="text-white border-b-2 border-[#AB9D8F]"
                >HOW IT WORKS</Link>

                <Link
                    to="faq"
                    smooth={true}
                    duration={500}
                    className='cursor-pointer'
                    spy={true}
                    activeClass="text-white border-b-2 border-[#AB9D8F]"
                >FAQ</Link>

                <Link
                    to="contact"
                    smooth={true}
                    duration={500}
                    className='cursor-pointer'
                    spy={true}
                    activeClass="text-white border-b-2 border-[#AB9D8F]"
                >CONTACT</Link>

            </div>
            <div className='justify-center items-center gap-8 hidden lg:flex text-white'>
                <NavLink to={"/login"}>LOGIN</NavLink>
                <NavLink to={"/signup"}>GET STARTED</NavLink>
            </div>

            {/* Mobile Menu Button */}

            <button
                onClick={() => setIsOpen(!isOpen)}
                className='lg:hidden'
            >
                {isOpen ? <X className='text-white'/> : <Menu className='text-white'/>}
            </button>


            {/* Mobile Menu */}
            <div
                className={`absolute left-0 top-full z-50 w-full bg-black transition-all duration-300 lg:hidden ${isOpen
                        ? "opacity-100 visible"
                        : "opacity-0 invisible"
                    }`}
            >
                <div className="flex flex-col items-center gap-6 py-8 text-white">

                    <Link
                        to="about"
                        smooth
                        duration={500}
                        onClick={closeMenu}
                    >
                        ABOUT
                    </Link>

                    <Link
                        to="features"
                        smooth
                        duration={500}
                        onClick={closeMenu}
                    >
                        FEATURES
                    </Link>

                    <Link
                        to="howitworks"
                        smooth
                        duration={500}
                        onClick={closeMenu}
                    >
                        HOW IT WORKS
                    </Link>

                    <Link
                        to="faq"
                        smooth
                        duration={500}
                        onClick={closeMenu}
                    >
                        FAQ
                    </Link>

                    <Link
                        to="contact"
                        smooth
                        duration={500}
                        onClick={closeMenu}
                    >
                        CONTACT
                    </Link>

                    <NavLink
                        to="/login"
                        onClick={closeMenu}
                    >
                        LOGIN
                    </NavLink>

                    <NavLink
                        to="/signup"
                        onClick={closeMenu}
                        className="rounded-lg bg-white px-5 py-2 text-black font-semibold"
                    >
                        GET STARTED
                    </NavLink>

                </div>
            </div>
        </nav>
    )
}

export default Navbar
