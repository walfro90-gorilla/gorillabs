'use client'

import { ReactNode, HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface GlassmorphicCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  blur?: number
  opacity?: number
  borderGlow?: boolean
  glowColor?: 'yellow' | 'blue' | 'purple' | 'pink'
  variant?: 'default' | 'subtle' | 'strong'
  className?: string
  hover?: boolean
}

/**
 * GlassmorphicCard Component
 * Reusable card with glassmorphism effect
 * 
 * Features:
 * - Backdrop blur effect
 * - Customizable opacity and blur
 * - Animated border glow on hover
 * - Multiple variants
 * - Accessible with proper contrast
 */
export function GlassmorphicCard({
  children,
  blur,
  opacity,
  borderGlow = false,
  glowColor = 'blue',
  variant = 'default',
  className = '',
  hover = true,
  ...props
}: GlassmorphicCardProps) {
  // Get variant styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'subtle':
        return {
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          blur: blur || 8,
          opacity: opacity || 0.5,
        }
      case 'strong':
        return {
          background: 'rgba(255, 255, 255, 0.15)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          blur: blur || 16,
          opacity: opacity || 0.9,
        }
      default:
        return {
          background: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          blur: blur || 12,
          opacity: opacity || 0.8,
        }
    }
  }
  
  const variantStyles = getVariantStyles()
  
  // Get glow color
  const getGlowColor = () => {
    switch (glowColor) {
      case 'yellow':
        return 'rgba(255, 215, 0, 0.5)'
      case 'blue':
        return 'rgba(0, 212, 230, 0.5)'
      case 'purple':
        return 'rgba(160, 32, 240, 0.5)'
      case 'pink':
        return 'rgba(255, 26, 140, 0.5)'
      default:
        return 'rgba(0, 212, 230, 0.5)'
    }
  }
  
  return (
    <div
      className={cn(
        'relative rounded-lg overflow-hidden transition-all duration-300',
        hover && 'hover:scale-[1.02]',
        className
      )}
      style={{
        background: variantStyles.background,
        backdropFilter: `blur(${variantStyles.blur}px)`,
        WebkitBackdropFilter: `blur(${variantStyles.blur}px)`,
        border: variantStyles.border,
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.1)',
      }}
      {...props}
    >
      {/* Border glow effect */}
      {borderGlow && (
        <div
          className="absolute inset-0 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            boxShadow: `0 0 20px ${getGlowColor()}, inset 0 0 20px ${getGlowColor()}`,
          }}
        />
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Shine effect on hover */}
      {hover && (
        <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div
            className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent"
            style={{
              transform: 'translateX(-100%) translateY(-100%) rotate(45deg)',
              transition: 'transform 0.6s ease-out',
            }}
          />
        </div>
      )}
    </div>
  )
}

/**
 * GlassmorphicCardHeader Component
 * Header section for glassmorphic cards
 */
export function GlassmorphicCardHeader({
  children,
  className = '',
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'px-6 py-4 border-b border-white/10',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

/**
 * GlassmorphicCardContent Component
 * Content section for glassmorphic cards
 */
export function GlassmorphicCardContent({
  children,
  className = '',
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('px-6 py-4', className)}
      {...props}
    >
      {children}
    </div>
  )
}

/**
 * GlassmorphicCardFooter Component
 * Footer section for glassmorphic cards
 */
export function GlassmorphicCardFooter({
  children,
  className = '',
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'px-6 py-4 border-t border-white/10',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

/**
 * GlassmorphicCardTitle Component
 * Title for glassmorphic cards
 */
export function GlassmorphicCardTitle({
  children,
  className = '',
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        'text-2xl font-bold text-white',
        className
      )}
      {...props}
    >
      {children}
    </h3>
  )
}

/**
 * GlassmorphicCardDescription Component
 * Description for glassmorphic cards
 */
export function GlassmorphicCardDescription({
  children,
  className = '',
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        'text-sm text-white/70',
        className
      )}
      {...props}
    >
      {children}
    </p>
  )
}
