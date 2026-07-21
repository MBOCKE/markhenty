'use client'

import { useState, useEffect } from 'react'

interface MousePosition {
  x: number // -1 to 1
  y: number // -1 to 1
  rawX: number // 0 to windowWidth
  rawY: number // 0 to windowHeight
}

/**
 * Tracks mouse position and returns normalized coordinates (-1 to 1)
 * suitable for 3D rotation/parallax calculations.
 */
export function useMouseParallax(): MousePosition {
  const [position, setPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    rawX: 0,
    rawY: 0,
  })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: -(e.clientY / window.innerHeight - 0.5) * 2,
        rawX: e.clientX,
        rawY: e.clientY,
      })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return position
}
