import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/landing/Hero'
import About from '../components/landing/About'
import Features from '../components/landing/Features'
import HowItWorks from '../components/landing/HowItWorks'

const Home = () => {
  return (
    <>
        <Navbar/>
        <Hero/>
        <section id='about'>
            <About/>
        </section>
        <section id='features'>
            <Features/>
        </section>
        <section id='howitworks'>
            <HowItWorks/>
        </section>
    </>
  )
}

export default Home
