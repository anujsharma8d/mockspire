import Navbar from '../components/Navbar'
import Hero from '../components/landing/Hero'
import Features from '../components/landing/Features'
import HowItWorks from '../components/landing/HowItWorks'

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
    </>
  )
}

export default Home
