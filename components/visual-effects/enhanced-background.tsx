"use client"

import React from 'react'
import { useVisualEffects } from '@/hooks/use-visual-effects'

interface EnhancedBackgroundProps {
  variant?: 'hero' | 'section' | 'minimal'
  className?: string
}

export function EnhancedBackground({ 
  variant = 'hero',
  className = '' 
}: EnhancedBackgroundProps) {
  const { settings, capabilities } = useVisualEffects()

  // Base background for all variants
  const baseBackground = "bg-gradient-to-br from-gorilla-black via-gray-900 to-gorilla-black"

  if (variant === 'minimal') {
    return (
      <div className={`absolute inset-0 ${baseBackground} ${className}`} />
    )
  }

  if (variant === 'section') {
    return (
      <div className={`absolute inset-0 ${className}`}>
        {/* Base gradient */}
        <div className={`absolute inset-0 ${baseBackground}`} />
        
        {/* Subtle accent overlay */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-gorilla-yellow/5 to-transparent"
          style={{
            animation: settings.enableAnimations && !capabilities.prefersReducedMotion 
              ? 'gentlePulse 8s ease-in-out infinite' 
              : 'none'
          }}
        />
        
        <style jsx>{`
          @keyframes gentlePulse {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 0.8; }
          }
        `}</style>
      </div>
    )
  }

  // Hero variant - most elaborate
  return (
    <div className={`absolute inset-0 ${className}`}>
      {/* Base solid background */}
      <div className="absolute inset-0 bg-gorilla-black" />
      
      {/* Primary gradient layer */}
      <div className={`absolute inset-0 ${baseBackground}`} />
      
      {/* Animated gradient overlays */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-gorilla-yellow/10 via-transparent to-neon-blue/10"
        style={{
          animation: settings.enableAnimations && !capabilities.prefersReducedMotion 
            ? 'slowRotate 30s linear infinite' 
            : 'none'
        }}
      />
      
      <div 
        className="absolute inset-0 bg-gradient-to-tr from-neon-purple/8 via-transparent to-neon-pink/8"
        style={{
          animation: settings.enableAnimations && !capabilities.prefersReducedMotion 
            ? 'slowRotate 45s linear infinite reverse' 
            : 'none'
        }}
      />
      
      {/* Radial gradient for depth */}
      <div 
        className="absolute inset-0 bg-gradient-radial from-transparent via-gorilla-yellow/5 to-transparent"
        style={{
          backgroundImage: 'radial-gradient(circle at 30% 70%, rgba(255, 215, 0, 0.1) 0%, transparent 50%)',
          animation: settings.enableAnimations && !capabilities.prefersReducedMotion 
            ? 'breathe 12s ease-in-out infinite' 
            : 'none'
        }}
      />
      
      {/* Subtle mesh pattern overlay */}
      {settings.enablePatterns && (
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(255, 215, 0, 0.1) 1px, transparent 1px),
              linear-gradient(rgba(255, 215, 0, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            animation: settings.enableAnimations && !capabilities.prefersReducedMotion 
              ? 'meshMove 20s linear infinite' 
              : 'none'
          }}
        />
      )}
      
      <style jsx>{`
        @keyframes slowRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes breathe {
          0%, 100% { 
            opacity: 0.3;
            transform: scale(1);
          }
          50% { 
            opacity: 0.6;
            transform: scale(1.1);
          }
        }
        
        @keyframes meshMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 60px); }
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