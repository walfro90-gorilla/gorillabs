"use client"

import React from 'react'
import { VisualEffectsFallback, CSSGradientFallback } from '@/components/ui/visual-effects-fallback'
import { ShaderGradient } from './shader-gradient'

interface EnhancedShaderGradientProps {
  colors: string[]
  animationSpeed?: number
  blendMode?: 'normal' | 'multiply' | 'screen'
  className?: string
}

/**
 * Enhanced Shader Gradient with comprehensive WebGL fallbacks
 * Automatically detects WebGL support and provides CSS-based alternatives
 */
export function EnhancedShaderGradient({
  colors,
  animationSpeed = 0.5,
  blendMode = 'normal',
  className = ''
}: EnhancedShaderGradientProps) {
  return (
    <VisualEffectsFallback
      fallback={
        <CSSGradientFallback 
          colors={colors}
          className={className}
        />
      }
      testWebGL={true}
      enableGracefulDegradation={true}
      onFallbackUsed={(reason) => {
        console.log('Shader gradient using CSS fallback:', reason)
      }}
      className={className}
    >
      <ShaderGradient
        colors={colors}
        animationSpeed={animationSpeed}
        blendMode={blendMode}
        className={className}
      />
    </VisualEffectsFallback>
  )
}

/**
 * Advanced CSS gradient with multiple animation layers
 */
export function AdvancedCSSGradient({
  colors,
  animationSpeed = 1,
  className = ''
}: {
  colors: string[]
  animationSpeed?: number
  className?: string
}) {
  const duration = 20 / animationSpeed

  return (
    <div className={`absolute inset-0 ${className}`}>
      {/* Base gradient layer */}
      <div 
        className="absolute inset-0"
        style={{
          background: `linear-gradient(45deg, ${colors.join(', ')})`,
          backgroundSize: '200% 200%',
          animation: `gradient-flow ${duration}s ease infinite`
        }}
      />
      
      {/* Overlay gradient layer for depth */}
      <div 
        className="absolute inset-0 opacity-60"
        style={{
          background: `radial-gradient(circle at 30% 70%, ${colors[0]}40, transparent 50%), 
                       radial-gradient(circle at 70% 30%, ${colors[1] || colors[0]}40, transparent 50%)`,
          animation: `gradient-shift ${duration * 1.5}s ease infinite reverse`
        }}
      />
      
      {/* Shimmer effect layer */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `linear-gradient(90deg, transparent, ${colors[colors.length - 1] || colors[0]}20, transparent)`,
          backgroundSize: '200% 100%',
          animation: `shimmer ${duration * 0.8}s ease infinite`
        }}
      />
      
      <style jsx>{`
        @keyframes gradient-flow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        @keyframes gradient-shift {
          0% {
            transform: translateX(0) translateY(0) scale(1);
          }
          33% {
            transform: translateX(10px) translateY(-10px) scale(1.05);
          }
          66% {
            transform: translateX(-10px) translateY(10px) scale(0.95);
          }
          100% {
            transform: translateX(0) translateY(0) scale(1);
          }
        }
        
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
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
 * Simple CSS gradient fallback for maximum compatibility
 */
export function SimpleCSSGradient({
  colors,
  direction = '135deg',
  className = ''
}: {
  colors: string[]
  direction?: string
  className?: string
}) {
  return (
    <div 
      className={`absolute inset-0 ${className}`}
      style={{
        background: `linear-gradient(${direction}, ${colors.join(', ')})`
      }}
    />
  )
}