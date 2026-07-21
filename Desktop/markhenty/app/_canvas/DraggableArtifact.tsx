'use client'

import { PresentationControls, useTexture } from '@react-three/drei'
import * as THREE from 'three'

interface ArtifactProps {
  imageSrc: string
}

export default function DraggableArtifact({ imageSrc }: ArtifactProps) {
  const texture = useTexture(imageSrc)

  const img = texture.image as any
  const aspect = img && img.width ? img.width / img.height : 1
  const width = 2.8
  const height = width / aspect

  return (
    <PresentationControls
      global
      snap
      rotation={[0, 0, 0]}
      polar={[-Math.PI / 4, Math.PI / 4]}
      azimuth={[-Math.PI / 2, Math.PI / 2]}
    >
      <mesh>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial
          map={texture}
          transparent
          alphaTest={0.005}
          side={THREE.DoubleSide}
          roughness={0.2}
          metalness={0.2}
        />
      </mesh>
    </PresentationControls>
  )
}
