'use client'

import Preloader from './_components/Preloader'
import CustomCursor from './_components/CustomCursor'
import ScrollProgress from './_components/ScrollProgress'
import SmoothScrollProvider from './_components/SmoothScrollProvider'
import Navbar from './_components/Navbar'
import HeroSection from './_components/HeroSection'
import WhoWeAreSection from './_components/WhoWeAreSection'
import ValuesSection from './_components/ValuesSection'
import ServicesSection from './_components/ServicesSection'
import Footer from './_components/Footer'

export default function Home() {
  return (
    <SmoothScrollProvider>
      {/* Intro Preloader screen */}
      <Preloader />

      {/* Micro-interaction overlays */}
      <CustomCursor />
      <ScrollProgress />

      {/* Main Layout and Sections */}
      <Navbar />
      <main className="flex flex-col flex-1">
        <HeroSection />
        <WhoWeAreSection />
        <ValuesSection />
        <ServicesSection />
      </main>
      <Footer />
    </SmoothScrollProvider>
  )
}
