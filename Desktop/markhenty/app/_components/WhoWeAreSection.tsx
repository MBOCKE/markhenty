'use client'

import { useRef } from 'react'
import { useScroll, useTransform, motion } from 'framer-motion'
import Image from 'next/image'

export default function WhoWeAreSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Scroll tracking for parallax scale/translation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const yPeople = useTransform(scrollYProgress, [0, 1], [30, -30])
  const scalePeople = useTransform(scrollYProgress, [0, 0.5, 1], [0.98, 1, 0.98])

  return (
    <motion.section
      id="qui-sommes-nous"
      ref={containerRef}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.25 }}
      className="relative section-padding bg-white overflow-hidden noise-texture"
    >
      {/* Background Graphic - Dark Masks watermark covering the section */}
      <div className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none select-none">
        <Image
          src="/images/masks-footer.png"
          alt="Masks Watermark"
          fill
          sizes="100vw"
          className="object-cover object-center filter grayscale"
          priority
        />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center z-10 relative">
        {/* Left column: Company Description */}
        <div className="lg:col-span-7 flex flex-col text-left">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="h-[1px] w-6 bg-gold" />
            <span className="text-gold text-xs font-bold uppercase tracking-[0.25em]">
              QUI SOMMES-NOUS ?
            </span>
          </div>

          <h2 className="text-[#1a3a8f] text-section-title mb-6 uppercase font-black tracking-wide leading-tight">
            L'Alliance de la <span className="text-gold">Sagesse Culturelle</span> et de la Rigueur Stratégique.
          </h2>

          <div className="space-y-6 text-slate-600 text-base leading-relaxed font-medium">
            <p>
              Né d’une vision consistant à repenser le conseil stratégique traditionnel, <strong>MARKHENTY CONSULTING</strong> est un cabinet de conseil en marketing et stratégie qui puise son inspiration dans les valeurs cardinales de l'Afrique pour guider les organisations vers un impact durable.
            </p>
            <p>
              Nous croyons fermement que les plus grandes réussites naissent d'un ancrage identitaire fort. C'est pourquoi nous allions des frameworks marketing modernes et l'analyse rigoureuse des données à une fine compréhension humaine et culturelle pour concevoir des trajectoires de croissance uniques.
            </p>
          </div>

          {/* Highlights */}
          <div className="grid grid-cols-2 gap-6 mt-10">
            <div className="flex flex-col border-l-2 border-gold pl-4 py-3">
              <span className="text-3xl font-black text-[#1a3a8f] tracking-tight">  100%</span>
              <span className="text-xs text-slate-500 uppercase font-extrabold tracking-wider mt-2">
                  Sur Mesure
              </span>
            </div>
            <div className="flex flex-col border-l-2 border-primary-light pl-4 py-3">
              <span className="text-3xl font-black text-[#1a3a8f] tracking-tight">  Héritage</span>
              <span className="text-xs text-slate-500 uppercase font-extrabold tracking-wider mt-2">
                  Inspiré & Analytique
              </span>
            </div>
          </div>
        </div>

        {/* Right column: Group photo of women (people.png) */}
        <div className="lg:col-span-5 flex h-full items-stretch">
          <motion.div
            className="w-full max-w-[420px] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-gray-100 relative bg-gray-50 h-full"
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Image
              src="/images/people.png"
              alt="Notre Héritage Humain"
              fill
              className="object-cover"
              sizes="(max-width: 420px) 100vw, 420px"
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}