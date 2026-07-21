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
  const ART_H = 220 
  const BLUE_CARD_SIZE = 'clamp(240px, 28vw, 320px)'
  const DARK_CARD_WIDTH = 'clamp(400px, 50vw, 650px)'

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
      className="relative flex-shrink-0 z-30 flex flex-col items-center justify-center p-6"
      style={{
        width: BLUE_CARD_SIZE,
        height: BLUE_CARD_SIZE,
        background: '#1c3572', // Exact brand blue from design
        boxShadow: '0 8px 40px rgba(28, 53, 114, 0.3)',
      }}
    >
      {/* ── 3D Artifact ── */}
      <motion.div
        initial={{ opacity: 0, y: 22, scale: 0.84 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{
          duration: 0.85,
          ease: 'easeOut',
          delay: 0.15,
          ...artifactFloatTransition,
        }}
        animate={artifactFloatAnim}
        className="absolute pointer-events-none select-none"
        style={{
          top: 0,
          left: '50%',
          transform: 'translate(-50%, -50%)', // Centers exactly on the top edge
          width: 180,
          height: ART_H,
          zIndex: 40,
        }}
      >
        <Image
          src={service.imageSrc}
          alt={service.title}
          fill
          sizes="180px"
          className="object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.6)]"
        />
      </motion.div>

      {/* ── Dotted Line ── */}
      <div 
        className="absolute top-1/2 -translate-y-1/2 h-[2px] w-[100vw] pointer-events-none"
        style={{
          borderTop: '2px dotted #1c3572',
          ...(isLeft ? { right: '100%' } : { left: '100%' })
        }}
      />

      {/* Title */}
      <div className="relative z-10 w-full text-center mt-8">
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
        height: BLUE_CARD_SIZE,
        // Overlap magic: pulls the dark card under the blue card slightly
        ...(isLeft ? { marginLeft: '-12%' } : { marginRight: '-12%' })
      }}
    >
      <Image
        src={service.bgImageSrc}
        alt="Service background"
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover object-center"
      />
      {/* Dark overlay specifically calibrated for legibility */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(30, 30, 30, 0.85)' }}
      />

      {/* Text Container - Padded on the side away from the blue block */}
      <div 
        className="relative z-10 h-full flex flex-col justify-center items-center px-10 py-6 text-center"
        style={{
          ...(isLeft ? { paddingLeft: '16%' } : { paddingRight: '16%' })
        }}
      >
        <p className="text-xs md:text-sm leading-relaxed font-light tracking-wide text-white/90">
          {service.description}
        </p>
      </div>
    </motion.div>
  )

  return (
    <div id={service.id} className="relative w-full pb-32">
      
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
        <div className="relative z-20 overflow-hidden shadow-lg" style={{ minHeight: 220 }}>
          <Image
            src={service.bgImageSrc}
            alt="Service background"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/80" />
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