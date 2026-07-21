'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ParticleFieldProps {
  count?: number
}

interface ParticleData {
  x: number
  y: number
  z: number
  speed: number
  size: number
}

export default function ParticleField({ count = 60 }: ParticleFieldProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null)

  // Generate stable particle random data
  const particles = useMemo(() => {
    const temp: ParticleData[] = []
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 8
      const y = (Math.random() - 0.5) * 8
      const z = (Math.random() - 0.5) * 4
      const speed = 0.05 + Math.random() * 0.15
      const size = 0.01 + Math.random() * 0.02
      temp.push({ x, y, z, speed, size })
    }
    return temp
  }, [count])

  const dummy = useMemo(() => new THREE.Object3D(), [])

  useFrame((state, delta) => {
    if (!meshRef.current) return

    const elapsed = state.clock.elapsedTime

    particles.forEach((p, i) => {
      // Drift upward
      p.y += delta * p.speed
      // Wrap around screen boundaries
      if (p.y > 4) p.y = -4

      // Subtle sway
      const sway = Math.sin(elapsed * p.speed + i) * 0.005
      p.x += sway

      dummy.position.set(p.x, p.y, p.z)
      dummy.scale.set(p.size, p.size, p.size)
      dummy.updateMatrix()
      meshRef.current!.setMatrixAt(i, dummy.matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[null as any, null as any, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color="#c9a227" transparent opacity={0.25} />
    </instancedMesh>
  )
}
