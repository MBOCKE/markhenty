'use client'

import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, useTexture } from '@react-three/drei'
import * as THREE from 'three'

interface ArtifactProps {
  imageSrc: string
  mouse: { x: number; y: number }
}

export default function RotatingArtifact({ imageSrc, mouse }: ArtifactProps) {
  const texture = useTexture(imageSrc)
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const speedRef = useRef(0.2)

  useFrame((state, delta) => {
    if (!meshRef.current) return

    // Auto rotate around Y-axis, accelerating on hover
    const targetSpeed = hovered ? 1.5 : 0.2
    speedRef.current = THREE.MathUtils.lerp(speedRef.current, targetSpeed, 0.05)
    meshRef.current.rotation.y += delta * speedRef.current

    // Subtle tilt based on mouse
    const targetX = mouse.y * 0.15
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetX, 0.08)
  })

  const img = texture.image as any
  const aspect = img && img.width ? img.width / img.height : 1
  const width = 2.8
  const height = width / aspect

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial
          map={texture}
          transparent
          alphaTest={0.005}
          side={THREE.DoubleSide}
          roughness={0.3}
          metalness={0.15}
        />
      </mesh>
    </Float>
  )
}
