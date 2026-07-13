import React from 'react'
import { Bot, MessageSquare, ChartColumn, Target, BriefcaseBusiness, Clock, ChevronLeft, ChevronRight } from 'lucide-react'
import useEmblaCarousel from "embla-carousel-react"


const cards = [
  {
    icon: Bot,
    heading: "AI-Powered Interviews",
    subheading: "AI-driven interviews that closely simulate real hiring experiences."
  },
  {
    icon: MessageSquare,
    heading: "Instant Feedback",
    subheading: "Understand your strengths, identify weaknesses, and improve with every session."
  },
  {
    icon: ChartColumn,
    heading: "Performance Analytics",
    subheading: "Monitor your performance through smart analytics and detailed reports."
  },
  {
    icon: Target,
    heading: "Personalised Guidance",
    subheading: "Receive recommendations tailored to your interview style and goals."
  },
  {
    icon: BriefcaseBusiness,
    heading: "Role-Based Practice",
    subheading: "Practice role-specific questions designed for your dream career."
  },
  {
    icon: Clock,
    heading: "Practice Anytime",
    subheading: "Practice at your own pace with unlimited AI-powered interview sessions."
  },
]

const About = () => {

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true
  });
  const scrollNext = () => emblaApi?.scrollNext();
  const scrollPrev = () => emblaApi?.scrollPrev();

  return (
    <section className='min-h-screen bg-black flex justify-center items-center text-white'>
      <div className='flex flex-col justify-center items-center gap-8 sm:gap-20 w-full'>

        <div className='flex flex-col justify-center items-center gap-4'>
          <h3 className='text-xl sm:text-2xl uppercase text-purple-500 text-center font-heading font-bold'>About MockSpire</h3>
          <h2 className='text-4xl sm:text-6xl font-body font-bold text-center'>
            Built for your<span className='bg-gradient-to-b from-[#F3E8FF] via-[#C084FC] via-[#9333EA] to-[#312E81] bg-clip-text text-transparent'> Interview Success</span>
          </h2>
          <p className='text-[15px] sm:text-xl font-body font-light text-center max-w-3xl'>Most people walk into interviews underprepared — not because they lack skill, but because they lack practice with real, adaptive feedback. Mockspire was built to close that gap using AI that responds like a real interviewer would.</p>
        </div>
        <div className='overflow-hidden w-full'>
          <div
            className='gap-10 w-max marquee hidden sm:flex'
          >
            {[...cards, ...cards].map(({ icon: Icon, heading, subheading }, i) => (
              <div key={i}
                className='flex flex-col justify-center items-center border-2 border-purple-500/40 bg-gradient-to-b from-[#121018] to-[#09090b] py-5 sm:py-10 w-80 gap-5 rounded-3xl transition-all duration-300 hover:border-purple-400 hover:shadow-[0_0_35px_rgba(168,85,247,0.25)]'
              >
                <Icon className='text-purple-500 w-12 h-12 sm:w-16 sm:h-16' />
                <h3 className='font-heading font-bold text-2xl sm:text-3xl text-center max-w-[200px]'>{heading}</h3>
                <p className='text-[15px] sm:text-xl font-body max-w-[200px] text-center font-light'>{subheading}</p>
              </div>
            ))}
          </div>
        </div>


        <div className='relative w-full px-12'>
          <button onClick={() => emblaApi?.scrollPrev()} className="absolute left-0 top-1/2 z-10">
            <ChevronLeft />
          </button>
          <div className='overflow-hidden w-full' ref={emblaRef}>
            <div className='flex sm:hidden'>
              {cards.map(({ icon: Icon, heading, subheading }, i) => (
                <div key={i}
                  style={{ paddingLeft: '1.25rem', flex: '0 0 100%' }}
                  className='min-w-0 flex flex-col justify-center items-center border-2 border-purple-500/40 bg-gradient-to-b from-[#121018] to-[#09090b] py-10 mr-6 rounded-3xl transition-all duration-300 hover:border-purple-400 hover:shadow-[0_0_35px_rgba(168,85,247,0.25)]'
                >
                  <Icon className='text-purple-500 w-12 h-12 sm:w-16 sm:h-16' />
                  <h3 className='font-heading font-bold text-2xl sm:text-3xl text-center max-w-[200px]'>{heading}</h3>
                  <p className='text-[15px] sm:text-xl font-body max-w-[200px] text-center font-light'>{subheading}</p>
                </div>
              ))}
            </div>
          </div>
          <button onClick={() => emblaApi?.scrollNext()} className="absolute right-0 top-1/2 z-10">
            <ChevronRight />
          </button>
        </div>



      </div>
    </section>
  )
}

export default About
