"use client"

import React from 'react'
import { useVisualEffects } from '@/hooks/use-visual-effects'

interface EnergyWavesProps {
  className?: string
  intensity?: 'low' | 'medium' | 'high'
  color?: 'yellow' | 'blue' | 'purple' | 'multi'
}

export function EnergyWaves({ 
  className = '',
  intensity = 'medium',
  color = 'yellow'
}: EnergyWavesProps) {
  const { settings, capabilities } = useVisualEffects()

  // Don't render if animations are disabled
  if (!settings.enableAnimations || capabilities.prefersReducedMotion) {
    return null
  }

  const getColorClasses = () => {
    switch (color) {
      case 'yellow':
        return 'from-gorilla-yellow/20 via-gorilla-yellow/10 to-transparent'
      case 'blue':
        return 'from-neon-blue/20 via-neon-blue/10 to-transparent'
      case 'purple':
        return 'from-neon-purple/20 via-neon-purple/10 to-transparent'
      case 'multi':
        return 'from-gorilla-yellow/15 via-neon-blue/10 to-neon-purple/15'
      default:
        return 'from-gorilla-yellow/20 via-gorilla-yellow/10 to-transparent'
    }
  }

  const getIntensitySettings = () => {
    switch (intensity) {
      case 'low':
        return { count: 2, maxSize: 300, opacity: 0.3 }
      case 'medium':
        return { count: 3, maxSize: 500, opacity: 0.4 }
      case 'high':
        return { count: 4, maxSize: 700, opacity: 0.5 }
      default:
        return { count: 3, maxSize: 500, opacity: 0.4 }
    }
  }

  const { count, maxSize, opacity } = getIntensitySettings()
  const colorClasses = getColorClasses()

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`absolute rounded-full bg-gradient-radial ${colorClasses}`}
          style={{
            width: `${maxSize + i * 100}px`,
            height: `${maxSize + i * 100}px`,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: opacity - i * 0.1,
            animation: `energyPulse ${8 + i * 2}s ease-in-out infinite`,
            animationDelay: `${i * 1.5}s`,
          }}
        />
      ))}
      
      <style jsx>{`
        @keyframes energyPulse {
          0%, 100% {
            transform: translate(-50%, -50%) scale(0.8);
            opacity: 0;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.2);
            opacity: ${opacity};
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