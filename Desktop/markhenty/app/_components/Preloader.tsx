'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export default function Preloader() {
  const [progress, setProgress] = useState(0)
  const [complete, setComplete] = useState(false)

  useEffect(() => {
    const duration = 1200 // 1.2s loading simulation
    const intervalTime = 15
    const steps = duration / intervalTime
    const stepValue = 100 / steps

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + stepValue
        if (next >= 100) {
          clearInterval(timer)
          setTimeout(() => setComplete(true), 300)
          return 100
        }
        return next
      })
    }, intervalTime)

    return () => clearInterval(timer)
  }, [])

  return (
    <AnimatePresence>
      {!complete && (
        <motion.div
          className="fixed inset-0 bg-dark z-[10000] flex flex-col items-center justify-center noise-texture"
          initial={{ opacity: 1 }}
          exit={{ 
            y: '-100%', 
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
        >
          <div className="flex flex-col items-center gap-4 max-w-xs w-full px-6 text-center">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="relative w-20 h-20 mb-2"
            >
              <Image
                src="/images/isolated-logo.png"
                alt="Markhenty Logo"
                fill
                sizes="80px"
                className="object-contain filter drop-shadow-[0_0_20px_rgba(201,162,39,0.4)]"
                priority
              />
            </motion.div>

            {/* Brand Title */}
            <h2 className="text-white text-lg tracking-[0.25em] font-extrabold uppercase">
              MARKHENTY
            </h2>
            <p className="text-gold text-[10px] tracking-[0.3em] font-bold uppercase -mt-1 mb-6">
              Consulting
            </p>

            {/* Progress Bar */}
            <div className="w-full h-[1px] bg-white/10 rounded-full overflow-hidden relative">
              <motion.div
                className="h-full bg-gold"
                style={{ width: `${progress}%` }}
                layoutId="loader-bar"
              />
            </div>

            {/* Counter */}
            <div className="text-white/40 text-xs font-mono mt-1">
              {Math.round(progress)}%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
