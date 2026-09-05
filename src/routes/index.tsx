import { createFileRoute } from '@tanstack/react-router'
import Hero from '../components/Hero'
import LogoMarquee from '../components/LogoMarquee'
import Stats from '../components/Stats'
import Services from '../components/Services'
import Work from '../components/Work'
import About from '../components/About'
import Process from '../components/Process'
import Testimonials from '../components/Testimonials'
import Pricing from '../components/Pricing'
import Contact from '../components/Contact'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <>
      <Hero />

      <LogoMarquee />
      <Stats />
      <Services />
      <Work />
      <Process />
      <About />
      <Testimonials />
      <Pricing />
      <Contact />
    </>
  )
}