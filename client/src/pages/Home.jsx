import Navbar from '../components/Navbar'
import Hero from '../components/landing/Hero'
import Features from '../components/landing/Features'
import HowItWorks from '../components/landing/HowItWorks'
import FinalCTA from '../components/landing/FinalCTA'
import Contact from '../components/landing/Contact'
import Footer from '../components/landing/Footer'

const Home = () => {
  return (
    <>
        <Navbar/>
        <Hero/>
        <section id='features'>
            <Features/>
        </section>
        <section id='howitworks'>
            <HowItWorks/>
        </section>
        <FinalCTA/>
        <section id='contact'>
            <Contact/>
        </section>
        <Footer/>

    </>
  )
}

export default Home
