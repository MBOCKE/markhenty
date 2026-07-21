'use client'

import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, useTexture } from '@react-three/drei'
import * as THREE from 'three'

interface ArtifactProps {
  imageSrc: string
  mouse: { x: number; y: number }
}

export default function WobblingArtifact({ imageSrc, mouse }: ArtifactProps) {
  const texture = useTexture(imageSrc)
  const meshRef = useRef<THREE.Mesh>(null)
  const [spinning, setSpinning] = useState(false)
  const spinAngleRef = useRef(0)

  useFrame((state, delta) => {
    if (!meshRef.current) return

    // Wobble animation using time
    const time = state.clock.elapsedTime
    const wobbleX = Math.sin(time * 3) * 0.04
    const wobbleZ = Math.cos(time * 2.5) * 0.04

    // 360 degree spin on click
    if (spinning) {
      spinAngleRef.current += delta * 6
      if (spinAngleRef.current >= Math.PI * 2) {
        spinAngleRef.current = 0
        setSpinning(false)
      }
    }

    // Blend rotation from mouse-tilt, wobble, and click-spin
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, mouse.y * 0.2 + wobbleX, 0.08)
    meshRef.current.rotation.y = spinAngleRef.current + THREE.MathUtils.lerp(0, mouse.x * 0.2, 0.08)
    meshRef.current.rotation.z = wobbleZ
  })

  const img = texture.image as any
  const aspect = img && img.width ? img.width / img.height : 1
  const width = 2.8
  const height = width / aspect

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
      <mesh
        ref={meshRef}
        onClick={() => setSpinning(true)}
      >
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial
          map={texture}
          transparent
          alphaTest={0.005}
          side={THREE.DoubleSide}
          roughness={0.35}
          metalness={0.1}
        />
      </mesh>
    </Float>
  )
}
