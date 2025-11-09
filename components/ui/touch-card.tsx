"use client"

import React, { useRef, forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { useTouchInteractions, useSwipeGesture } from '@/hooks/use-touch-interactions'

interface TouchCardProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean
  swipeable?: boolean
  onSwipe?: (direction: 'up' | 'down' | 'left' | 'right') => void
  onTap?: () => void
  enableHaptic?: boolean
  enableVisualFeedback?: boolean
  variant?: 'default' | 'elevated' | 'outlined' | 'ghost'
  children: React.ReactNode
}

const TouchCard = forwardRef<HTMLDivElement, TouchCardProps>(
  ({
    interactive = false,
    swipeable = false,
    onSwipe,
    onTap,
    enableHaptic = true,
    enableVisualFeedback = true,
    variant = 'default',
    className,
    children,
    ...props
  }, ref) => {
    const internalRef = useRef<HTMLDivElement>(null)
    const cardRef = (ref as React.RefObject<HTMLDivElement>) || internalRef

    // Apply touch optimizations for interactive cards
    useTouchInteractions(cardRef, {
      enableHapticFeedback: enableHaptic && interactive,
      enableVisualFeedback: enableVisualFeedback && interactive,
      enableSoundFeedback: false,
      minimumTouchTarget: interactive ? 44 : 0,
      preventDoubleTouch: interactive,
      touchDelay: 200
    })

    // Apply swipe gestures if enabled
    useSwipeGesture(
      cardRef,
      (direction) => {
        if (onSwipe) {
          onSwipe(direction)
        }
      },
      {
        threshold: 50,
        velocity: 0.3
      }
    )

    const baseClasses = cn(
      // Base styles
      'relative rounded-lg transition-all duration-300 ease-out',
      
      // Interactive styles
      interactive && [
        'cursor-pointer',
        'touch-manipulation',
        'select-none',
        'active:scale-[0.98]',
        'hover:scale-[1.02]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gorilla-yellow focus-visible:ring-offset-2',
      ],
      
      // Swipeable styles
      swipeable && [
        'overflow-hidden',
        'touch-pan-x', // Allow horizontal panning for swipe
      ],
      
      // Variant styles
      {
        // Default
        'bg-white/5 border border-white/10 backdrop-blur-sm': 
          variant === 'default',
        
        // Elevated
        'bg-white/10 border border-white/20 backdrop-blur-md shadow-lg hover:shadow-xl': 
          variant === 'elevated',
        
        // Outlined
        'bg-transparent border-2 border-white/30 hover:border-white/50': 
          variant === 'outlined',
        
        // Ghost
        'bg-transparent hover:bg-white/5': 
          variant === 'ghost',
      },
      
      className
    )

    const handleClick = () => {
      if (interactive && onTap) {
        onTap()
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (interactive && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault()
        onTap?.()
      }
    }

    return (
      <div
        ref={cardRef}
        className={baseClasses}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={interactive ? 0 : undefined}
        role={interactive ? 'button' : undefined}
        {...props}
      >
        {/* Ripple effect for interactive cards */}
        {interactive && (
          <div className="absolute inset-0 overflow-hidden rounded-inherit pointer-events-none">
            <div className="absolute inset-0 bg-white/10 scale-0 rounded-full transition-transform duration-500 group-active:scale-150" />
          </div>
        )}
        
        {/* Swipe indicator */}
        {swipeable && (
          <div className="absolute top-2 right-2 opacity-30 pointer-events-none">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
          </div>
        )}
        
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    )
  }
)

TouchCard.displayName = 'TouchCard'

export { TouchCard }
export default TouchCard