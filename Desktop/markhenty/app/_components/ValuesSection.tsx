'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { values } from '../_lib/data'

export default function ValuesSection() {
  return (
    <section
      id="valeurs"
      className="relative section-padding bg-white overflow-hidden noise-texture"
    >
      <div className="max-w-7xl mx-auto z-10 relative">
        {/* Section Header */}
        <div className="flex flex-col text-left mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="h-[1px] w-6 bg-[#1a3a8f]" />
            <span className="text-[#1a3a8f] text-xs font-bold uppercase tracking-[0.25em]">
              NOS VALEURS
            </span>
          </div>
          <h2 className="text-[#1a3a8f] text-section-title uppercase font-black tracking-wide">
            Les Piliers de Notre Engagement.
          </h2>
        </div>

        {/* Values Horizontal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {values.map((val, idx) => (
            <motion.div
              key={val.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              className="flex flex-col items-center text-center group bg-white border border-gray-100 p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="w-16 h-16 mb-6 shadow-md overflow-hidden transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[360deg]">
                <Image
                  src={val.icon}
                  alt={val.label}
                  width={64}
                  height={64}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Title & Description */}
              <h3 className="text-[#1a3a8f] text-lg font-black uppercase tracking-wider mb-4 group-hover:text-[#2563eb] transition-colors">
                {val.label}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed font-medium">
                {val.id === 'integrite' &&
                  'La droiture absolue et la transparence guident chacune de nos collaborations. Nous tenons nos engagements envers nos clients.'}
                {val.id === 'audace' &&
                  'Oser sortir des sentiers battus, imaginer des solutions inédites et surmonter les obstacles avec force et détermination.'}
                {val.id === 'impact' &&
                  'Créer une valeur concrète et mesurable pour votre entreprise, tout en contribuant positivement à votre écosystème.'}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
