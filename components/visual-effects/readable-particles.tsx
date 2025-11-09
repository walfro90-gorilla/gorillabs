"use client"

import React from 'react'
import { useVisualEffects } from '@/hooks/use-visual-effects'

interface ReadableParticlesProps {
  count?: number
  className?: string
  size?: 'small' | 'medium' | 'large'
}

export function ReadableParticles({ 
  count = 20, 
  className = '',
  size = 'small'
}: ReadableParticlesProps) {
  const { settings, capabilities } = useVisualEffects()

  // Don't render particles if disabled or user prefers reduced motion
  if (!settings.enableParticles || capabilities.prefersReducedMotion) {
    return null
  }

  // Adjust count based on performance
  const effectiveCount = Math.min(count, settings.particleCount)
  
  // Size mapping for better readability
  const sizeMap = {
    small: { min: 1, max: 2 },
    medium: { min: 2, max: 3 },
    large: { min: 3, max: 4 }
  }
  
  const particleSize = sizeMap[size]
  
  // Very low opacity to not interfere with text
  const baseOpacity = settings.effectsQuality === 'low' ? 0.1 : 0.2

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {Array.from({ length: effectiveCount }).map((_, i) => {
        const particleWidth = Math.random() * (particleSize.max - particleSize.min) + particleSize.min
        const left = Math.random() * 100
        const top = Math.random() * 100
        const animationDuration = 8 + Math.random() * 12 // Slower, more subtle
        const animationDelay = Math.random() * 8
        const opacity = baseOpacity + Math.random() * 0.1 // Very subtle opacity range
        
        return (
          <div
            key={i}
            className="absolute bg-gorilla-yellow rounded-full"
            style={{
              width: `${particleWidth}px`,
              height: `${particleWidth}px`,
              left: `${left}%`,
              top: `${top}%`,
              opacity,
              animation: settings.enableAnimations 
                ? `gentleFloat ${animationDuration}s ease-in-out infinite`
                : 'none',
              animationDelay: `${animationDelay}s`,
              // Very subtle glow that won't interfere with text
              boxShadow: `0 0 ${particleWidth * 2}px rgba(255, 215, 0, ${opacity * 0.5})`,
            }}
          />
        )
      })}
      
      <style jsx>{`
        @keyframes gentleFloat {
          0%, 100% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: ${baseOpacity};
          }
          25% {
            transform: translateY(-8px) translateX(4px) scale(1.05);
            opacity: ${baseOpacity * 1.5};
          }
          50% {
            transform: translateY(-4px) translateX(-2px) scale(0.95);
            opacity: ${baseOpacity * 1.2};
          }
          75% {
            transform: translateY(-12px) translateX(6px) scale(1.02);
            opacity: ${baseOpacity * 1.3};
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