import { useState } from "react";
import Logo from "./Logo";
import { Link } from "react-scroll";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => {
        setMenuOpen(false);
    };

    const navItems = [
        { label: "FEATURES", to: "features" },
        { label: "HOW IT WORKS", to: "howitworks" },
        { label: "CONTACT", to: "contact" },
    ];

    return (
        <header className="fixed top-0 w-full z-50 bg-[#0d1a18]/90 backdrop-blur-md border-b border-[#1e3833]">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
 
                <div className="flex items-center">
                <Logo />
                <span className="text-white font-bold text-xl">MockSpire</span>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex gap-8 text-sm font-medium text-[#e2e8f0]">
                    {navItems.map((item) => (
                        <Link
                            key={item.to}
                            to={item.to}
                            smooth={true}
                            duration={500}
                            spy={true}
                            offset={-80}
                            activeClass="text-white"
                            className="cursor-pointer hover:text-white transition-colors"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* Desktop Buttons */}
                <div className="hidden md:flex items-center gap-8">

                    <NavLink
                        to="/login"
                        className="text-white hover:text-gray-300 transition-colors"
                    >
                        LOGIN
                    </NavLink>

                    <NavLink
                        to="/signup"
                        className="bg-[#00a372] hover:bg-[#007a55] text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-lg shadow-[#00a372]/20"
                    >
                        START FREE
                    </NavLink>

                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden text-white p-2"
                    aria-label="Toggle menu"
                >
                    {menuOpen ? (
                        <X className="w-6 h-6" />
                    ) : (
                        <Menu className="w-6 h-6" />
                    )}
                </button>

            </div>

            {/* Mobile Navigation */}
            {menuOpen && (
                <div className="md:hidden bg-[#0d1a18] border-t border-[#1e3833]">

                    <nav className="px-4 py-6 flex flex-col items-center gap-6">

                        {navItems.map((item) => (
                            <Link
                                key={item.to}
                                to={item.to}
                                smooth={true}
                                duration={500}
                                offset={-80}
                                onClick={closeMenu}
                                className="cursor-pointer text-[#e2e8f0] hover:text-white transition-colors"
                            >
                                {item.label}
                            </Link>
                        ))}

                        <NavLink
                            to="/login"
                            onClick={closeMenu}
                            className="text-white hover:text-gray-300 transition-colors"
                        >
                            LOGIN
                        </NavLink>

                        <NavLink
                            to="/signup"
                            onClick={closeMenu}
                            className="bg-[#00a372] hover:bg-[#007a55] text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-lg shadow-[#00a372]/20"
                        >
                            START FREE
                        </NavLink>

                    </nav>

                </div>
            )}

        </header>
    );
};

export default Navbar;