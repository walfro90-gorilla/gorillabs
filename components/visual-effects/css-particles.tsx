"use client"

import React from 'react'
import { useAnimationPerformance } from '@/hooks/use-animation-performance'

interface CSSParticlesProps {
  count?: number
  className?: string
}

export function CSSParticles({ count = 50, className = '' }: CSSParticlesProps) {
  const { metrics, prefersReducedMotion, getParticleSettings } = useAnimationPerformance()
  const quality = metrics?.quality || 'medium'
  
  // Get performance-optimized settings
  const particleSettings = getParticleSettings()
  const adjustedCount = Math.min(count, particleSettings.count)
  
  // Don't render if reduced motion is preferred
  if (prefersReducedMotion) {
    return (
      <div className={`absolute inset-0 overflow-hidden ${className}`} style={{ pointerEvents: 'none' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-gorilla-yellow/5 to-transparent" />
      </div>
    )
  }

  return (
    <div 
      className={`absolute inset-0 overflow-hidden ${className}`} 
      style={{ 
        pointerEvents: 'none',
        contain: 'strict', // Optimize rendering
        willChange: 'auto' // Only set during animation
      }}
    >
      {/* Optimized gradient background */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-transparent via-gorilla-yellow/8 to-transparent"
        style={{ 
          animation: `gentlePulse ${particleSettings.animationDuration} ease-in-out infinite`,
          // Use CSS transforms for GPU acceleration
          transform: 'translate3d(0, 0, 0)',
          willChange: 'opacity, transform',
          backfaceVisibility: 'hidden'
        }} 
      />
      
      {/* Performance-optimized CSS particles */}
      {Array.from({ length: adjustedCount }).map((_, i) => {
        const size = Math.random() * particleSettings.size + 1
        const duration = 6 + Math.random() * 8
        const delay = Math.random() * 6
        
        return (
          <div
            key={i}
            className="absolute bg-gorilla-yellow rounded-full"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: particleSettings.opacity,
              // Use CSS transforms instead of changing layout properties
              transform: 'translate3d(0, 0, 0)',
              animation: `optimizedFloatParticle ${duration}s ease-in-out infinite`,
              animationDelay: `${delay}s`,
              // Performance optimizations
              willChange: 'transform, opacity',
              backfaceVisibility: 'hidden',
              perspective: '1000px',
              boxShadow: particleSettings.enableBlur ? '0 0 6px rgba(255, 215, 0, 0.5)' : 'none',
            }}
          />
        )
      })}
      
      <style jsx>{`
        @keyframes optimizedFloatParticle {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
            opacity: ${particleSettings.opacity * 0.6};
          }
          25% {
            transform: translate3d(8px, -12px, 0) scale(1.05);
            opacity: ${particleSettings.opacity};
          }
          50% {
            transform: translate3d(-5px, -8px, 0) scale(0.95);
            opacity: ${particleSettings.opacity * 0.8};
          }
          75% {
            transform: translate3d(12px, -15px, 0) scale(1.02);
            opacity: ${particleSettings.opacity};
          }
        }
        
        @keyframes gentlePulse {
          0%, 100% {
            opacity: 0.8;
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            opacity: 0.4;
            transform: translate3d(0, 0, 0) scale(1.02);
          }
        }
        
        /* Respect reduced motion preference */
        @media (prefers-reduced-motion: reduce) {
          div {
            animation: none !important;
            transform: translate3d(0, 0, 0) !important;
            opacity: ${particleSettings.opacity * 0.3} !important;
          }
        }
        
        /* Performance-based adjustments */
        .performance-low div {
          animation-duration: ${particleSettings.animationDuration} !important;
        }
        
        /* Clean up will-change after animation */
        div:not(:hover):not(:focus):not(:active) {
          will-change: auto;
        }
      `}</style>
    </div>
  )
}