'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { metierIcons } from '../_lib/data'

export default function HeroSection() {
  const handleArrowClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const el = document.querySelector('#qui-sommes-nous')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen bg-white overflow-hidden flex flex-col">

      {/* ── Background: Warrior image, grayscale, right-aligned ───── */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <Image
          src="/images/background-warrior.png"
          alt="Warrior Background"
          fill
          sizes="100vw"
          className="object-cover object-right-bottom filter grayscale contrast-110 brightness-95"
          priority
        />
        {/* White gradient: opaque left → transparent at 70% width */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              'linear-gradient(to right, #ffffff 0%, rgba(255,255,255,0.97) 30%, rgba(255,255,255,0.70) 55%, rgba(255,255,255,0.10) 72%, rgba(255,255,255,0) 80%)',
          }}
        />
      </div>

      {/* ── Main content grid ─────────────────────────────────────── */}
      <div className="relative z-10 flex-1 flex flex-col justify-center pt-28 pb-6 px-6 md:px-10">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-12 gap-6 items-center">


          {/* Left column: floating main-mask artifact */}
          <motion.div
            initial={{ opacity: 0, x: -40, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
            className="col-span-12 md:col-span-4 lg:col-span-3 flex items-center justify-center"
          >
              <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-full max-w-[130px] md:max-w-[150px] aspect-[2/3]"
            >
              <Image
                src="/images/main-mask.png"
                alt="Masque Sacré"
                fill
                className="object-contain drop-shadow-[0_24px_48px_rgba(0,0,0,0.35)]"
                priority
                sizes="(max-width: 768px) 260px, 300px"
              />
            </motion.div>
          </motion.div>

          {/* Right column: title + scroll indicator */}
          <div className="col-span-12 md:col-span-8 lg:col-span-9 flex flex-col items-center justify-center text-center gap-8">


            {/* Main tagline — single line on desktop */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.55 }}
              className="text-[#1a3a8f] font-black uppercase md:whitespace-nowrap leading-tight"
              style={{
                fontSize: 'clamp(1.1rem, 2.4vw, 2.4rem)',
                letterSpacing: '0.06em',
              }}
            >
              Markhenty Consulting vous accompagne...
            </motion.h1>

            {/* Scroll-down indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              <button
                onClick={handleArrowClick}
                className="flex flex-col items-center gap-2 group text-[#1a3a8f] hover:text-[#2563eb] transition-colors cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full border-2 border-[#1a3a8f] flex items-center justify-center transition-all duration-300 group-hover:bg-[#1a3a8f] group-hover:text-white">
                  {/* Chevron down arrow */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="w-5 h-5 transition-transform group-hover:translate-y-0.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 8.25l7.5 7.5 7.5-7.5" />
                  </svg>
                </div>
                <span className="text-[10px] uppercase font-black tracking-[0.3em]">
                  Nos métiers
                </span>
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Nos Métiers strip — white with pattern tile ───────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="relative z-10 w-full py-8 px-4"
        style={{
          backgroundColor: '#ffffff',
          backgroundImage: "url('/images/pattern.png')",
backgroundRepeat: 'repeat-x',
          backgroundPosition: 'center top',
          backgroundSize: '120px 80px',
          borderTop: '1px solid rgba(26,58,143,0.08)',
        }}
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-6 items-start justify-items-center relative overflow-visible">
          {metierIcons.map((metier, i) => (
            <motion.div
              key={metier.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 + i * 0.09 }}
              className="relative flex flex-col items-center gap-3 text-center group cursor-pointer pt-6"
            >
              {/* Icon (half overflows above the strip) */}
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-12 h-12 flex items-center justify-center">

                <Image
                  src={metier.icon}
                  alt={metier.label}
                  width={40}
                  height={40}
                  className="w-10 h-10 object-contain"
                  priority={i === 0}
                />
              </div>

              {/* Spacer so label doesn't overlap the icon */}
              <div className="h-10" />


              <span className="text-[10px] md:text-[11px] text-[#1a3a8f] font-bold tracking-wide uppercase max-w-[130px] leading-tight">
                {metier.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Copyright line */}
        <div className="text-center mt-6">
          <span className="text-[9px] uppercase font-bold tracking-[0.35em] text-[#1a3a8f]/35">
            copyright markhenty consulting 2019
          </span>
        </div>
      </motion.div>
    </section>
  )
}
