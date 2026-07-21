'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, useTexture } from '@react-three/drei'
import * as THREE from 'three'

interface ArtifactProps {
  imageSrc: string
  mouse: { x: number; y: number }
}

export default function FloatingArtifact({ imageSrc, mouse }: ArtifactProps) {
  const texture = useTexture(imageSrc)
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (!meshRef.current) return

    // Smoothly tilt mesh towards the mouse position
    const targetX = mouse.y * 0.25
    const targetY = mouse.x * 0.25

    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetX, 0.08)
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetY, 0.08)
  })

  // Set aspect ratio from the loaded texture image metadata
  const img = texture.image as any
  const aspect = img && img.width ? img.width / img.height : 1
  const width = 2.8
  const height = width / aspect

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.8} floatingRange={[-0.15, 0.15]}>
      <mesh ref={meshRef}>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial
          map={texture}
          transparent
          alphaTest={0.005}
          side={THREE.DoubleSide}
          roughness={0.25}
          metalness={0.1}
        />
      </mesh>
    </Float>
  )
}
