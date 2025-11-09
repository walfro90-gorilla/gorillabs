"use client"

import React from 'react'
import { VisualEffectsFallback, CSSParticlesFallback } from '@/components/ui/visual-effects-fallback'
import { ParticleBackground } from './particle-background'
import { useAnimationPerformance } from '@/hooks/use-animation-performance'

interface EnhancedParticleBackgroundProps {
  count?: number
  enableParallax?: boolean
  className?: string
}

/**
 * Enhanced Particle Background with comprehensive WebGL fallbacks
 * Automatically detects WebGL support and provides CSS-based alternatives
 */
export function EnhancedParticleBackground({
  count = 200,
  enableParallax = true,
  className = ''
}: EnhancedParticleBackgroundProps) {
  return (
    <VisualEffectsFallback
      fallback={
        <CSSParticlesFallback 
          count={Math.min(count, 50)} // Reduce count for CSS version
          className={className}
        />
      }
      testWebGL={true}
      enableGracefulDegradation={true}
      onFallbackUsed={(reason) => {
        console.log('Particle background using CSS fallback:', reason)
      }}
      className={className}
    >
      <ParticleBackground
        particleCount={count}
        enableParallax={enableParallax}
        className={className}
      />
    </VisualEffectsFallback>
  )
}

/**
 * Performance-optimized lightweight particle background
 */
export function LightweightParticleBackground({
  count = 30,
  className = ''
}: {
  count?: number
  className?: string
}) {
  const { metrics, prefersReducedMotion, getParticleSettings } = useAnimationPerformance()
  const quality = metrics?.quality || 'medium'
  
  const particleSettings = getParticleSettings()
  const adjustedCount = Math.min(count, particleSettings.count)
  
  // Don't render if reduced motion is preferred
  if (prefersReducedMotion) {
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
        <div className="absolute inset-0 bg-gradient-radial from-gorilla-yellow/5 via-transparent to-transparent" />
      </div>
    )
  }

  return (
    <div 
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{
        contain: 'strict', // Optimize rendering performance
        willChange: 'auto'
      }}
    >
      {/* Performance-optimized gradient background */}
      <div 
        className="absolute inset-0 bg-gradient-radial from-gorilla-yellow/10 via-transparent to-transparent"
        style={{
          animation: `optimizedRadialPulse ${particleSettings.animationDuration} ease-in-out infinite`,
          // Use CSS transforms for GPU acceleration
          transform: 'translate3d(0, 0, 0)',
          willChange: 'opacity, transform',
          backfaceVisibility: 'hidden'
        }}
      />
      
      {/* Optimized floating particles */}
      {Array.from({ length: adjustedCount }).map((_, i) => {
        const size = Math.random() * particleSettings.size + 1
        const duration = 10 + Math.random() * 15
        const delay = Math.random() * 10
        
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
              animation: `optimizedGentleFloat ${duration}s ease-in-out infinite`,
              animationDelay: `${delay}s`,
              // Performance optimizations
              willChange: 'transform, opacity',
              backfaceVisibility: 'hidden',
              perspective: '1000px',
              boxShadow: particleSettings.enableBlur ? `0 0 ${size * 3}px rgba(255, 215, 0, 0.2)` : 'none',
            }}
          />
        )
      })}
      
      <style jsx>{`
        @keyframes optimizedGentleFloat {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
            opacity: ${particleSettings.opacity * 0.5};
          }
          25% {
            transform: translate3d(8px, -15px, 0) scale(1.1);
            opacity: ${particleSettings.opacity};
          }
          50% {
            transform: translate3d(-5px, -8px, 0) scale(0.9);
            opacity: ${particleSettings.opacity * 0.8};
          }
          75% {
            transform: translate3d(12px, -20px, 0) scale(1.05);
            opacity: ${particleSettings.opacity};
          }
        }
        
        @keyframes optimizedRadialPulse {
          0%, 100% {
            opacity: 0.6;
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            opacity: 0.9;
            transform: translate3d(0, 0, 0) scale(1.05);
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
        
        /* Clean up will-change after animation */
        div:not(:hover):not(:focus):not(:active) {
          will-change: auto;
        }
      `}</style>
    </div>
  )
}