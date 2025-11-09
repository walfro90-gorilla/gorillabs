"use client"

import React from 'react'
import { useVisualEffects } from '@/hooks/use-visual-effects'
import { EnhancedBackground } from './enhanced-background'
import { FloatingEmojis } from './floating-emojis'
import { GeometricParticles } from './geometric-particles'

interface SectionEffectsProps {
  variant?: 'hero' | 'tech' | 'services' | 'testimonials' | 'contact' | 'minimal'
  className?: string
}

export function SectionEffects({ 
  variant = 'minimal',
  className = '' 
}: SectionEffectsProps) {
  const { settings, capabilities } = useVisualEffects()

  // Don't render effects if disabled or user prefers reduced motion
  if (!settings.enableAnimations && !settings.enableParticles) {
    return (
      <div className={`absolute inset-0 bg-gorilla-black ${className}`} />
    )
  }

  const getEffectsConfig = () => {
    switch (variant) {
      case 'hero':
        return {
          background: 'hero' as const,
          emojis: { theme: 'tech' as const, density: 'high' as const },
          particles: { count: 20, shapes: ['circle', 'square', 'diamond'] as ('circle' | 'square' | 'diamond')[] }
        }
      
      case 'tech':
        return {
          background: 'section' as const,
          emojis: { theme: 'tech' as const, density: 'medium' as const },
          particles: { count: 12, shapes: ['circle', 'triangle'] as ('circle' | 'triangle')[] }
        }
      
      case 'services':
        return {
          background: 'section' as const,
          emojis: { theme: 'business' as const, density: 'low' as const },
          particles: { count: 8, shapes: ['circle', 'square'] as ('circle' | 'square')[] }
        }
      
      case 'testimonials':
        return {
          background: 'section' as const,
          emojis: { theme: 'creative' as const, density: 'low' as const },
          particles: { count: 6, shapes: ['circle'] as ('circle')[] }
        }
      
      case 'contact':
        return {
          background: 'section' as const,
          emojis: { theme: 'business' as const, density: 'medium' as const },
          particles: { count: 10, shapes: ['circle', 'diamond'] as ('circle' | 'diamond')[] }
        }
      
      default:
        return {
          background: 'minimal' as const,
          emojis: null,
          particles: null
        }
    }
  }

  const config = getEffectsConfig()

  return (
    <div className={`absolute inset-0 ${className}`}>
      {/* Background */}
      <EnhancedBackground variant={config.background} />
      
      {/* Emojis */}
      {config.emojis && settings.enableEmojis && (
        <FloatingEmojis
          theme={config.emojis.theme}
          density={config.emojis.density}
          className="z-5"
        />
      )}
      
      {/* Particles */}
      {config.particles && settings.enableParticles && (
        <GeometricParticles
          count={config.particles.count}
          shapes={config.particles.shapes}
          className="z-10"
        />
      )}
    </div>
  )
}