'use client'

import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { 
  isWebGLAvailable, 
  FPSMonitor, 
  AdaptiveQualityManager,
  getParticleConfig,
  disposeObject,
  disposeRenderer,
  threeColors
} from '@/lib/three-config'
import { prefersReducedMotion } from '@/lib/dynamic-imports'

interface ParticleBackgroundProps {
  particleCount?: number
  particleSize?: number
  particleColor?: string
  animationSpeed?: number
  enableParallax?: boolean
  className?: string
}

/**
 * Simplified Particle System Component
 * Renders animated 3D particles using Three.js
 */
function Particles({ 
  count, 
  size, 
  color, 
  speed,
  enableParallax 
}: { 
  count: number
  size: number
  color: string
  speed: number
  enableParallax: boolean
}) {
  const meshRef = useRef<THREE.Points>(null)
  const [scrollY, setScrollY] = useState(0)
  
  // Create positions array
  const positions = new Float32Array(count * 3)
  const velocities = new Float32Array(count * 3)
  
  // Initialize positions and velocities
  for (let i = 0; i < count * 3; i += 3) {
    // Position
    positions[i] = (Math.random() - 0.5) * 80
    positions[i + 1] = (Math.random() - 0.5) * 80
    positions[i + 2] = (Math.random() - 0.5) * 40
    
    // Velocity
    velocities[i] = (Math.random() - 0.5) * 0.02
    velocities[i + 1] = (Math.random() - 0.5) * 0.02
    velocities[i + 2] = (Math.random() - 0.5) * 0.02
  }
  
  // Handle scroll for parallax
  useEffect(() => {
    if (!enableParallax) return
    
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [enableParallax])
  
  // Animation loop
  useFrame((state) => {
    if (!meshRef.current) return
    
    const positionAttribute = meshRef.current.geometry.attributes.position
    const positions = positionAttribute.array as Float32Array
    
    // Animate particles
    for (let i = 0; i < positions.length; i += 3) {
      // Update position based on velocity
      positions[i] += velocities[i] * speed
      positions[i + 1] += velocities[i + 1] * speed
      positions[i + 2] += velocities[i + 2] * speed
      
      // Wrap around boundaries
      if (Math.abs(positions[i]) > 40) positions[i] *= -0.9
      if (Math.abs(positions[i + 1]) > 40) positions[i + 1] *= -0.9
      if (Math.abs(positions[i + 2]) > 20) positions[i + 2] *= -0.9
    }
    
    positionAttribute.needsUpdate = true
    
    // Parallax effect
    if (enableParallax) {
      meshRef.current.rotation.y = scrollY * 0.0001
      meshRef.current.position.y = scrollY * 0.01
    }
    
    // Slow rotation
    meshRef.current.rotation.x += 0.0005
    meshRef.current.rotation.z += 0.0003
  })
  
  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation={true}
      />
    </points>
  )
}

/**
 * CSS Fallback Component
 * Subtle alternative when WebGL is not supported or disabled
 */
function CSSParticleFallback({ className }: { className?: string }) {
  const particleCount = 15 // Much fewer particles for better performance
  
  return (
    <div className={`absolute inset-0 overflow-hidden ${className || ''}`} style={{ pointerEvents: 'none' }}>
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-gorilla-yellow/5 to-transparent" />
      
      {/* Minimal CSS particles */}
      {Array.from({ length: particleCount }).map((_, i) => (
        <div
          key={i}
          className="absolute w-0.5 h-0.5 bg-gorilla-yellow rounded-full opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `gentleFloat ${8 + Math.random() * 6}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 8}s`,
          }}
        />
      ))}
      
      <style jsx>{`
        @keyframes gentleFloat {
          0%, 100% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-10px) translateX(5px) scale(1.2);
            opacity: 0.6;
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          div {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  )
}

/**
 * Simplified ParticleBackground Component
 * Optimized for better performance and reduced content interference
 */
export function ParticleBackground({
  particleCount,
  particleSize = 1.5,
  particleColor = '#FFD700',
  animationSpeed = 0.3,
  enableParallax = false, // Disabled by default for better performance
  className = '',
}: ParticleBackgroundProps) {
  const [webGLSupported, setWebGLSupported] = useState(true)
  const [currentParticleCount, setCurrentParticleCount] = useState(200) // Much lower default
  
  // Check WebGL support
  useEffect(() => {
    const supported = isWebGLAvailable()
    setWebGLSupported(supported)
    
    // Use provided particle count or default
    const count = particleCount || 300
    setCurrentParticleCount(count)
    
    console.log('WebGL supported:', supported, 'Particle count:', count)
  }, [particleCount])
  
  // Fallback to CSS if WebGL not supported
  if (!webGLSupported) {
    console.log('Using CSS fallback')
    return <CSSParticleFallback className={className} />
  }
  
  return (
    <div className={`absolute inset-0 ${className}`} style={{ pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 30], fov: 75 }}
        gl={{
          antialias: false, // Disabled for performance
          alpha: true,
          powerPreference: 'default', // Changed from high-performance
        }}
        dpr={1} // Fixed to 1 for better performance
        className="absolute inset-0"
        style={{ background: 'transparent' }}
      >
        <Particles
          count={currentParticleCount}
          size={particleSize}
          color={particleColor}
          speed={animationSpeed}
          enableParallax={enableParallax}
        />
      </Canvas>
    </div>
  )
}
