"use client"

import React, { useEffect, useState } from 'react'
import { useVisualEffects } from '@/hooks/use-visual-effects'

interface GeometricParticlesProps {
  className?: string
  count?: number
  shapes?: ('circle' | 'square' | 'triangle' | 'diamond')[]
}

export function GeometricParticles({ 
  className = '',
  count = 20,
  shapes = ['circle', 'square', 'triangle', 'diamond']
}: GeometricParticlesProps) {
  const { settings, capabilities } = useVisualEffects()
  const [particles, setParticles] = useState<Array<{
    id: number
    shape: string
    x: number
    y: number
    size: number
    duration: number
    delay: number
    opacity: number
    color: string
  }>>([])

  const colors = [
    'rgba(255, 215, 0, 0.6)', // Gorilla Yellow
    'rgba(0, 212, 230, 0.4)', // Neon Blue
    'rgba(160, 32, 240, 0.4)', // Neon Purple
    'rgba(255, 26, 140, 0.4)', // Neon Pink
    'rgba(255, 255, 255, 0.3)' // White
  ]

  useEffect(() => {
    if (!settings.enableParticles || capabilities.prefersReducedMotion) {
      setParticles([])
      return
    }

    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: i,
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 4, // 4-12px
      duration: Math.random() * 15 + 10, // 10-25 seconds
      delay: Math.random() * 8,
      opacity: Math.random() * 0.4 + 0.2, // 0.2 to 0.6
      color: colors[Math.floor(Math.random() * colors.length)]
    }))

    setParticles(newParticles)
  }, [settings.enableParticles, capabilities.prefersReducedMotion, count, shapes])

  if (!settings.enableParticles || capabilities.prefersReducedMotion || particles.length === 0) {
    return null
  }

  const getShapeStyles = (particle: typeof particles[0]) => {
    const baseStyles = {
      width: `${particle.size}px`,
      height: `${particle.size}px`,
      backgroundColor: particle.color,
      position: 'absolute' as const,
      left: `${particle.x}%`,
      top: `${particle.y}%`,
      opacity: particle.opacity,
      animation: settings.enableAnimations 
        ? `floatGeometric ${particle.duration}s ease-in-out infinite`
        : 'none',
      animationDelay: `${particle.delay}s`,
      filter: 'blur(0.5px)',
      boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
    }

    switch (particle.shape) {
      case 'circle':
        return { ...baseStyles, borderRadius: '50%' }
      case 'square':
        return { ...baseStyles, borderRadius: '2px' }
      case 'triangle':
        return {
          ...baseStyles,
          backgroundColor: 'transparent',
          width: 0,
          height: 0,
          borderLeft: `${particle.size / 2}px solid transparent`,
          borderRight: `${particle.size / 2}px solid transparent`,
          borderBottom: `${particle.size}px solid ${particle.color}`,
        }
      case 'diamond':
        return { 
          ...baseStyles, 
          borderRadius: '2px',
          transform: 'rotate(45deg)',
        }
      default:
        return baseStyles
    }
  }

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle) => (
        <div
          key={particle.id}
          style={getShapeStyles(particle)}
        />
      ))}
      
      <style jsx>{`
        @keyframes floatGeometric {
          0%, 100% {
            transform: translateY(0px) translateX(0px) rotate(0deg) scale(1);
          }
          25% {
            transform: translateY(-15px) translateX(10px) rotate(90deg) scale(1.1);
          }
          50% {
            transform: translateY(-8px) translateX(-5px) rotate(180deg) scale(0.9);
          }
          75% {
            transform: translateY(-25px) translateX(15px) rotate(270deg) scale(1.05);
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