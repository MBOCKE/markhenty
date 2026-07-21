// app/components/ServiceSection.tsx
'use client'

import { motion } from 'framer-motion'
import ServiceBlock from './ServiceBlock'
import { services } from '../_lib/data'

export default function ServicesSection() {
  return (
    <section
      id="services"
      // CRITICAL: overflow-x-clip hides the infinitely long dotted lines so they don't break the page width, 
      // but allows vertical overflow so the top mask can safely breach the container bounding box.
      className="relative overflow-x-clip py-32 bg-[#e6e6e6]" 
    >
      <div className="max-w-[1400px] w-full mx-auto relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="flex flex-col text-center md:text-left mb-32 px-6 lg:px-20"
        >
          <div className="inline-flex items-center justify-center md:justify-start gap-3 mb-4">
            <span className="h-[2px] w-8" style={{ background: '#1c3572' }} />
            <span
              className="text-sm font-bold uppercase tracking-[0.25em]"
              style={{ color: '#1c3572' }}
            >
              MARKHENTY CONSULTING VOUS ACCOMPAGNE...
            </span>
          </div>
        </motion.div>

        {/* Service Blocks List */}
        <div className="flex flex-col">
          {services.map((service) => (
            <ServiceBlock key={service.id} service={service} />
          ))}
        </div>
        
      </div>
    </section>
  )
}