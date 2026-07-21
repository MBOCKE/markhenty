'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, useTexture } from '@react-three/drei'
import * as THREE from 'three'

interface ArtifactProps {
  imageSrc: string
  mouse: { x: number; y: number }
  scrollProgress: number
}

export default function RisingArtifact({ imageSrc, mouse, scrollProgress }: ArtifactProps) {
  const texture = useTexture(imageSrc)
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (!meshRef.current) return

    // Position Y offset based on scroll progress (rises up to 1.8 units)
    const targetY = (scrollProgress - 0.5) * 1.5
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.08)

    // Tilt based on mouse
    const targetRotX = mouse.y * 0.15
    const targetRotY = mouse.x * 0.15
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotX, 0.08)
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotY, 0.08)
  })

  const img = texture.image as any
  const aspect = img && img.width ? img.width / img.height : 1
  const width = 2.8
  const height = width / aspect

  return (
    <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.4}>
      <mesh ref={meshRef}>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial
          map={texture}
          transparent
          alphaTest={0.005}
          side={THREE.DoubleSide}
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>
    </Float>
  )
}
