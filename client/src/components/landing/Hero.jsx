import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";

const Hero = () => {
    const navigate = useNavigate();

    const heading = "font-heading font-black leading-none text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl";

    const [start, setStart] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setStart(true);
        }, 800);

        return () => clearTimeout(timer);
    }, []);

    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 1024);
        };

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <section className="relative min-h-screen overflow-hidden bg-black text-white flex items-center justify-center px-10">

            <div className="relative w-full max-w-7xl min-h-screen flex flex-col justify-center px-6 lg:px-10">

                <div className="relative w-full flex items-center text-center lg:text-start">

                    {/* LOGO */}

                    <motion.div
                        initial={{
                            x: 0,
                            y: 0,
                            scale: 1.2,
                        }}
                        animate={{
                            x: (isDesktop) ? (start ? -300 : 0) : 0,
                            y: !isDesktop ? (start ? -100 : 0) : 0,
                            scale: 1,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 65,
                            damping: 18,
                        }}
                        className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center"
                    >
                        {/* Glow */}

                        <motion.div
                            animate={{
                                scale: [1, 1.1, 1],
                                opacity: [0.3, 0.5, 0.3],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="absolute w-64 h-64 rounded-full bg-white/15 blur-3xl"
                        />
                        <div className="flex flex-col items-center gap-5">
                            <img
                                src={logo}
                                alt="MockSpire"
                                className="relative w-24 sm:w-32 lg:w-46 xl:w-55"
                            />
                            
                            <motion.div
                                initial={{ opacity: 1 }}
                                animate={{ opacity: 0 }}
                                transition={{ duration: 1 }}
                            >
                                <h2 className="text-3xl sm:text-5xl font-heading font-bold">
                                    MOCKSPIRE
                                </h2>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* RIGHT */}
                    <div className="flex justify-center items-center w-full">
                        <motion.div
                            initial={{
                                x: isDesktop ? "10vw" : 0,
                                y: isDesktop ? -20 : 50,
                                opacity: 0,
                            }}

                            animate={{
                                x: isDesktop ? "12vw" : 0,
                                y: isDesktop ? -20 : 0,
                                opacity: 1,
                            }}

                            transition={{
                                delay: 1.3,
                                duration: 0.7,
                            }}

                            className="relative z-10 text-center lg:text-left"
                        >
                            <h1 className={heading}>
                                Ace your next
                            </h1>

                            <h1
                                className={`${heading} mt-2 bg-gradient-to-b from-[#F3E8FF] via-[#C084FC] via-[#9333EA] to-[#312E81] bg-clip-text text-transparent`}
                            >
                                Interview
                            </h1>
                        </motion.div>
                    </div>
                </div>
                <div className="w-full flex flex-col justify-center items-center mt-10 font-body">
                    <motion.p
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 2, duration: 0.7 }}
                        className="relative z-10 text-[15px] sm:text-2xl lg:text-3xl font-body font-extralight text-center max-w-3xl"
                    >
                        Master every interview with intelligent mock sessions, instant AI feedback, and personalized performance analytics.
                    </motion.p>
                    <motion.div
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 2.2, duration: 0.7 }}
                        className="flex flex-col justify-center items-center gap-5 mt-10 sm:gap-20 sm:flex-row"
                    >
                        <button className="px-5 py-3 sm:px-8 sm:py-4 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold shadow-[0_0_30px_rgba(168,85,247,0.25)] hover:shadow-[0_0_40px_rgba(168,85,247,0.45)] hover:scale-105 active:scale-95 transition-all duration-300">Get Started</button>
                        <button className="px-5 py-3 sm:px-8 sm:py-4 rounded-xl border border-white/15 bg-white/5 backdrop-blur-xl text-white font-semibold hover:bg-white/10 hover:border-violet-400/50 hover:scale-105 active:scale-95 transition-all duration-300">▶ Watch Demo</button>
                    </motion.div>
                </div>
            </div>

        </section>
    );
};

export default Hero;