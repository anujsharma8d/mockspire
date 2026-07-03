import React, { useEffect, useState } from "react";
import herobg from "../../assets/herobg.png";
import logo3d from "../../assets/3dlogo.png";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";


const Hero = () => {
    const navigate = useNavigate();
    
    const text = "Master every interview with intelligent mock sessions, instant AI feedback, and personalized performance analytics.";

    const [typedText, setTypedText] = useState("");

    useEffect(() => {
        const delay = setTimeout(() => {
            let index = 0;

            const interval = setInterval(() => {
                setTypedText(text.slice(0, index + 1));
                index++;

                if (index === text.length) {
                    clearInterval(interval);
                }
            }, 36);
        }, 1800);

        return () => clearTimeout(delay);
    }, []);

    return (
        <section className="relative overflow-hidden flex justify-center py-42 xl:py-0 lg:px-20 lg:block">
            <img
                src={herobg}
                alt=""
                className="
                absolute
                -top-20
                left-0
                w-full
                h-[115%]
                object-cover
                md:top-0
                md:h-full
                object-[58%_10%]
                lg:object-[55%_center]
                "
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/45 xl:bg-black/20" />

            {/* Gradient */}
            <div
                className="absolute inset-0 
                bg-gradient-to-b
                from-black
                via-black/80
                to-transparent"
            />
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">

                <div className='relative z-10 flex flex-col gap-5 text-center lg:text-start'>
                    <h1 className='text-7xl md:text-8xl flex flex-col justify-center text-white uppercase font-bold font-science '>
                        ROUND
                        <span className='text-[#AB9D8F]'>ZERO</span>
                    </h1>
                    <div>
                        <motion.p
                            initial={{ y: -2000, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{
                                duration: 0.8,
                                ease: "easeOut",
                            }}
                            className="text-3xl md:text-5xl text-white uppercase font-science font-semibold"
                        >
                            ACE YOUR NEXT
                        </motion.p>
                        <motion.p
                            initial={{ x: -2500, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{
                                duration: 1.2,
                                ease: "easeOut",
                            }}
                            className="text-3xl md:text-5xl text-white uppercase font-science font-semibold"
                        >
                            INTERVIEW
                        </motion.p>
                    </div>
                    <p className='text-xl text-[#AB9D8F] max-w-sm md:max-w-xl lg:max-w-[400px] font-science min-h-[90px]'> {typedText} </p>
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                            delay: 6.5,
                            dutation: 0.6
                        }}
                        className="flex items-center gap-8 justify-center lg:justify-start"
                    >
                        <button className="bg-[#AB9D8F] text-black px-8 py-3 rounded-lg font-science font-semibold hover:scale-105 transition-all cursor-pointer"
                        onClick={()=>navigate("/signup")} 
                        >
                            Get Started
                        </button>

                        <button className="border border-[#AB9D8F] text-[#AB9D8F] font-science px-8 py-3 rounded-lg hover:bg-[#AB9D8F] hover:text-black transition-all cursor-pointer">
                            Watch Demo
                        </button>

                    </motion.div>
                </div>

                <div className="z-10 flex justify-center flex-1 shrink-0">
                    <motion.img
                        animate={{ y: [0, -8, 0] }}
                        transition={{
                            repeat: Infinity,
                            duration: 4,
                            ease: "easeInOut",
                        }}
                        className="hidden lg:block
                    w-full
                    h-auto
                    object-contain
                    max-w-[550px]
                    xl:max-w-[650px]
                    2xl:max-w-[750px]"
                        src={logo3d} alt="Round Zero" />
                </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-b from-transparent via-black/60 to-black pointer-events-none" />
        </section>

    )
}

export default Hero
