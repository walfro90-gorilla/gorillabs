"use client"

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface SimpleParticlesProps {
  count?: number
  size?: number
  color?: string
  speed?: number
  className?: string
}

function ParticleSystem({ count = 300, size = 2, color = '#FFD700', speed = 0.5 }) {
  const meshRef = useRef<THREE.Points>(null)
  
  // Create geometry and material
  const [geometry, material] = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50     // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50 // y  
      positions[i * 3 + 2] = (Math.random() - 0.5) * 25 // z
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    
    const material = new THREE.PointsMaterial({
      size,
      color: new THREE.Color(color),
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    })
    
    return [geometry, material]
  }, [count, size, color])
  
  // Animation loop
  useFrame((state) => {
    if (!meshRef.current) return
    
    const time = state.clock.getElapsedTime()
    
    // Rotate the entire particle system
    meshRef.current.rotation.x = time * 0.1 * speed
    meshRef.current.rotation.y = time * 0.05 * speed
    
    // Update individual particle positions
    const positionAttribute = meshRef.current.geometry.attributes.position
    const positions = positionAttribute.array as Float32Array
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      
      // Add some floating motion
      positions[i3 + 1] += Math.sin(time + i * 0.1) * 0.01 * speed
      
      // Wrap particles that go too far
      if (positions[i3 + 1] > 25) positions[i3 + 1] = -25
      if (positions[i3 + 1] < -25) positions[i3 + 1] = 25
    }
    
    positionAttribute.needsUpdate = true
  })
  
  return <points ref={meshRef} geometry={geometry} material={material} />
}

export function SimpleParticles({
  count = 300,
  size = 2,
  color = '#FFD700',
  speed = 0.5,
  className = ''
}: SimpleParticlesProps) {
  return (
    <div className={`absolute inset-0 ${className}`} style={{ pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 30], fov: 75 }}
        gl={{ alpha: true, antialias: false }}
        dpr={1}
        className="absolute inset-0"
      >
        <ParticleSystem count={count} size={size} color={color} speed={speed} />
      </Canvas>
    </div>
  )
}