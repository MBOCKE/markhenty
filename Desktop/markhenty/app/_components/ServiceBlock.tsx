// app/components/ServiceBlock.tsx
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Service } from '../_lib/data'

interface ServiceBlockProps {
  service: Service
}

export default function ServiceBlock({ service }: ServiceBlockProps) {
  const isLeft = service.imagePosition === 'left'

  // Dimensions
  const ART_H = 160
  const BLUE_CARD_WIDTH = 'clamp(240px, 22vw, 280px)'
  const BLUE_CARD_HEIGHT = '250px'
  const DARK_CARD_WIDTH = 'clamp(400px, 45vw, 620px)'
  const DARK_CARD_HEIGHT = '280px'

  const artifactFloatAnim = {
    y: [0, -10, 0],
    scale: [1, 1.02, 1],
  }

  const artifactFloatTransition = {
    duration: 2.8,
    ease: 'easeInOut' as const,
    repeat: Infinity,
    repeatType: 'loop' as const,
  }

  // ── Blue title card ────────────────────────────────────────────
  const blueCard = (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="relative flex-shrink-0 z-30"
      style={{
        width: BLUE_CARD_WIDTH,
        height: BLUE_CARD_HEIGHT,
        background: '#1c3572', // Exact brand blue from design
        boxShadow: '0 12px 40px rgba(28, 53, 114, 0.35)',
      }}
    >
      {/* ── 3D Artifact (50% outside top edge, 50% inside, horizontally centered) ── */}
      <div
        className="absolute pointer-events-none select-none z-40"
        style={{
          top: '-80px', // Exactly 50% of 160px height above the top edge
          left: 'calc(50% - 70px)', // Exactly centered horizontally (half of 140px width)
          width: 140,
          height: 160,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 22, scale: 0.84 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{
            ...artifactFloatTransition,
            delay: 0.15,
          }}
          animate={artifactFloatAnim}
          className="relative w-full h-full"
        >
          <Image
            src={service.imageSrc}
            alt={service.title}
            fill
            sizes="140px"
            className="object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.6)]"
          />
        </motion.div>
      </div>

      {/* ── Dotted Line ── */}
      <div 
        className="absolute top-1/2 -translate-y-1/2 h-[2px] w-[100vw] pointer-events-none"
        style={{
          borderTop: '2px dotted #1c3572',
          ...(isLeft ? { right: '100%' } : { left: '100%' })
        }}
      />

      {/* Title - Centered evenly in the space below the top artifact */}
      <div className="absolute inset-x-0 bottom-2 top-[50px] flex flex-col items-center justify-center px-4 text-center z-10">
        <h3 className="text-white font-bold uppercase tracking-[0.15em] text-sm md:text-base leading-snug">
          {service.title}
        </h3>
        {service.subtitle && (
          <span className="block mt-2 text-white/80 font-semibold uppercase tracking-[0.15em] text-xs md:text-sm">
            {service.subtitle}
          </span>
        )}
      </div>
    </motion.div>
  )

  // ── Dark description card ──────────────────────────────────────
  const darkCard = (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? 50 : -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
      className="relative flex-shrink-0 overflow-hidden z-20"
      style={{ 
        width: DARK_CARD_WIDTH, 
        height: DARK_CARD_HEIGHT,
        background: '#2b2b2b', // Solid dark background per user request
        // Pull dark card under blue card by fixed 50px overlap
        ...(isLeft ? { marginLeft: '-50px' } : { marginRight: '-50px' })
      }}
    >
      {/* Background Image commented out per user request */}
      {/* <Image
        src={service.bgImageSrc}
        alt="Service background"
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover object-center"
      /> */}

      {/* Text Container - Padded so text stays completely clear of the blue block */}
      <div 
        className="relative z-10 h-full flex flex-col justify-center items-center py-6 text-center"
        style={{
          paddingLeft: isLeft ? '80px' : '30px',
          paddingRight: isLeft ? '30px' : '80px',
        }}
      >
        <p className="text-xs md:text-sm leading-relaxed font-light tracking-wide text-white/90">
          {service.description}
        </p>
      </div>
    </motion.div>
  )

  return (
    <div id={service.id} className="relative w-full pt-24 pb-0">
      
      {/* ── Desktop layout (md and up) ──────────────────────────── */}
      <div className="hidden md:flex justify-center items-center w-full relative">
        {isLeft ? (
          <>
            {blueCard}
            {darkCard}
          </>
        ) : (
          <>
            {darkCard}
            {blueCard}
          </>
        )}
      </div>

      {/* ── Mobile layout (stacked) ─────────────────────────────── */}
      <div className="flex flex-col md:hidden w-full px-4 pt-16">
        {/* Artifact */}
        <div className="flex justify-center relative z-40 -mb-12">
          <div className="relative" style={{ width: 140, height: 160 }}>
            <Image
              src={service.imageSrc}
              alt={service.title}
              fill
              sizes="140px"
              className="object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.5)]"
            />
          </div>
        </div>
        
        {/* Blue title card */}
        <div
          className="relative z-30 flex flex-col items-center justify-center pt-16 pb-8 px-6 shadow-lg"
          style={{ background: '#1c3572' }}
        >
          <h3 className="text-white text-center font-bold uppercase tracking-widest text-sm leading-snug">
            {service.title}
          </h3>
          {service.subtitle && (
            <span className="block mt-1 text-white/80 font-semibold uppercase tracking-widest text-xs text-center">
              {service.subtitle}
            </span>
          )}
        </div>
        
        {/* Dark description card */}
        <div className="relative z-20 overflow-hidden shadow-lg" style={{ minHeight: 220, background: '#2b2b2b' }}>
          {/* Background Image commented out per user request */}
          {/* <Image
            src={service.bgImageSrc}
            alt="Service background"
            fill
            sizes="100vw"
            className="object-cover"
          /> */}
          <div className="relative z-10 p-8 text-center flex items-center justify-center h-full">
            <p className="text-sm leading-relaxed font-light tracking-wide text-white/90">
              {service.description}
            </p>
          </div>
        </div>
      </div>

    </div>
  )
}