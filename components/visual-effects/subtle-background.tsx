"use client"

import React from 'react'
import { useVisualEffects } from '@/hooks/use-visual-effects'

interface SubtleBackgroundProps {
  variant?: 'gradient' | 'pattern' | 'solid'
  intensity?: 'low' | 'medium'
  respectsMotion?: boolean
  className?: string
}

export function SubtleBackground({ 
  variant = 'gradient', 
  intensity = 'low',
  respectsMotion = true,
  className = '' 
}: SubtleBackgroundProps) {
  const { settings, capabilities } = useVisualEffects()

  // Don't render if effects are disabled or user prefers reduced motion
  if (!settings.enableGradients || (respectsMotion && capabilities.prefersReducedMotion)) {
    return (
      <div className={`absolute inset-0 bg-gorilla-black ${className}`} />
    )
  }

  // Adjust intensity based on performance and settings
  const effectiveIntensity = settings.effectsQuality === 'low' ? 'low' : intensity
  const opacityLevel = effectiveIntensity === 'low' ? '3' : '5'

  if (variant === 'solid') {
    return (
      <div className={`absolute inset-0 bg-gorilla-black ${className}`} />
    )
  }

  if (variant === 'pattern') {
    return (
      <div className={`absolute inset-0 ${className}`}>
        {/* Base solid background */}
        <div className="absolute inset-0 bg-gorilla-black" />
        
        {/* Subtle dot pattern */}
        <div 
          className={`absolute inset-0 opacity-${opacityLevel}`}
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 215, 0, 0.15) 1px, transparent 0)`,
            backgroundSize: '20px 20px'
          }}
        />
      </div>
    )
  }

  // Default gradient variant
  return (
    <div className={`absolute inset-0 ${className}`}>
      {/* Base solid background for contrast */}
      <div className="absolute inset-0 bg-gorilla-black" />
      
      {/* Primary subtle gradient */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br from-gorilla-black via-gray-900 to-gorilla-black opacity-90`}
      />
      
      {/* Secondary accent gradient - very subtle */}
      <div 
        className={`absolute inset-0 bg-gradient-to-r from-transparent via-gorilla-yellow/${opacityLevel} to-transparent`}
        style={{
          animation: settings.enableAnimations && !capabilities.prefersReducedMotion 
            ? 'subtlePulse 8s ease-in-out infinite' 
            : 'none'
        }}
      />
      
      {/* Tertiary gradient for depth - extremely subtle */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br from-gorilla-yellow/2 via-transparent to-neon-blue/2`}
        style={{
          animation: settings.enableAnimations && !capabilities.prefersReducedMotion 
            ? 'subtlePulse 12s ease-in-out infinite reverse' 
            : 'none'
        }}
      />

      <style jsx>{`
        @keyframes subtlePulse {
          0%, 100% {
            opacity: 0.8;
          }
          50% {
            opacity: 0.4;
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