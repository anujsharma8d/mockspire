import Navbar from '../components/Navbar'
import Hero from '../components/landing/Hero'
import Features from '../components/landing/Features'
import HowItWorks from '../components/landing/HowItWorks'
import FinalCTA from '../components/landing/FinalCTA'
import Contact from '../components/landing/Contact'
import Footer from '../components/landing/Footer'
import SEO from '../components/SEO'

const Home = () => {
  return (
    <>
        <SEO
        title="Mockspire – AI Mock Interview Simulator"
        description="Practice technical, behavioral, HR, and system design interviews with Mockspire. Get AI-powered feedback and improve your interview skills."
      />
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
