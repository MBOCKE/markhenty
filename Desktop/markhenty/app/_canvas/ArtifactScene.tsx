'use client'

import { Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { ContactShadows } from '@react-three/drei'
import Image from 'next/image'

import { useMouseParallax } from '../_hooks/useMouseParallax'
import FloatingArtifact from './FloatingArtifact'
import RotatingArtifact from './RotatingArtifact'
import WobblingArtifact from './WobblingArtifact'
import DraggableArtifact from './DraggableArtifact'
import RisingArtifact from './RisingArtifact'
import ParticleField from './ParticleField'

interface ArtifactSceneProps {
  imageSrc: string
  effect: 'float' | 'rotate' | 'drag' | 'wobble' | 'rise'
  scrollProgress?: number
  className?: string
  altText?: string
  compact?: boolean
}

export default function ArtifactScene({
  imageSrc,
  effect,
  scrollProgress = 0,
  className = '',
  altText = 'Artifact',
  compact = false,
}: ArtifactSceneProps) {
  // In compact mode the parent dictates size — use h-full.
  // In normal mode keep the generous min-heights for the hero/section scenes.
  const sizeClass = compact ? 'h-full w-full' : 'min-h-[300px] md:min-h-[450px] w-full'
  const mouse = useMouseParallax()
  const [useWebGL, setUseWebGL] = useState(false)
  const [hasCheckedWebGL, setHasCheckedWebGL] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    // Check for WebGL support and reduced motion preferences
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      setUseWebGL(!!gl && !prefersReducedMotion)
    } catch (e) {
      setUseWebGL(false)
    }
    setHasCheckedWebGL(true)
  }, [])

  if (!isMounted || !hasCheckedWebGL) {
    // Return loading placeholder during SSR and initial hydration
    return (
      <div className={`relative flex items-center justify-center ${sizeClass} ${className}`}>
        <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  // Fallback to static Next.js Image with CSS animations
  if (!useWebGL) {
    let animationClass = 'animate-float'
    if (effect === 'rotate') animationClass = 'hover:rotate-6 transition-transform duration-500'
    if (effect === 'wobble') animationClass = 'hover:scale-105 transition-transform duration-300'

    return (
      <div className={`relative flex items-center justify-center ${sizeClass} ${className}`}>
        <div className={`relative w-4/5 aspect-square ${compact ? 'max-w-[180px]' : 'max-w-[320px]'} ${animationClass}`}>
          <Image
            src={imageSrc}
            alt={altText}
            fill
            sizes="(max-width: 768px) 100vw, 320px"
            className="object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.15)]"
            priority={effect === 'float'}
          />
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${sizeClass} ${className}`}>
      <Canvas
        shadows
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ pointerEvents: 'auto' }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow />
        <pointLight position={[-4, 5, 2]} intensity={1.5} color="#c9a227" />

        {/* Particles only for the hero float section to give atmospheric depth */}
        {effect === 'float' && <ParticleField count={40} />}

        <Suspense fallback={null}>
          {effect === 'float' && <FloatingArtifact imageSrc={imageSrc} mouse={mouse} />}
          {effect === 'rotate' && <RotatingArtifact imageSrc={imageSrc} mouse={mouse} />}
          {effect === 'wobble' && <WobblingArtifact imageSrc={imageSrc} mouse={mouse} />}
          {effect === 'drag' && <DraggableArtifact imageSrc={imageSrc} />}
          {effect === 'rise' && <RisingArtifact imageSrc={imageSrc} mouse={mouse} scrollProgress={scrollProgress} />}

          {/* Premium soft ground contact shadow */}
          <ContactShadows
            position={[0, -2.0, 0]}
            opacity={0.3}
            scale={4}
            blur={1.8}
            far={3}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
