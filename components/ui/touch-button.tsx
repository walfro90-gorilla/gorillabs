"use client"

import React, { useRef, forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { useTouchInteractions } from '@/hooks/use-touch-interactions'

interface TouchButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  enableHaptic?: boolean
  enableVisualFeedback?: boolean
  enableSoundFeedback?: boolean
  touchOptimized?: boolean
  children: React.ReactNode
}

const TouchButton = forwardRef<HTMLButtonElement, TouchButtonProps>(
  ({
    variant = 'primary',
    size = 'md',
    enableHaptic = true,
    enableVisualFeedback = true,
    enableSoundFeedback = false,
    touchOptimized = true,
    className,
    children,
    disabled,
    ...props
  }, ref) => {
    const internalRef = useRef<HTMLButtonElement>(null)
    const buttonRef = (ref as React.RefObject<HTMLButtonElement>) || internalRef

    // Apply touch optimizations
    useTouchInteractions(buttonRef, {
      enableHapticFeedback: enableHaptic && !disabled,
      enableVisualFeedback: enableVisualFeedback && !disabled,
      enableSoundFeedback: enableSoundFeedback && !disabled,
      minimumTouchTarget: 44,
      preventDoubleTouch: true,
      touchDelay: 300
    })

    const baseClasses = cn(
      // Base styles
      'relative inline-flex items-center justify-center font-medium transition-all duration-200 ease-out',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
      'disabled:pointer-events-none disabled:opacity-50',
      
      // Touch optimizations
      touchOptimized && [
        'touch-manipulation', // Prevent double-tap zoom
        'select-none', // Prevent text selection
        'min-h-[44px] min-w-[44px]', // Minimum touch target size
        'active:scale-95', // Touch feedback
      ],
      
      // Size variants
      {
        'px-3 py-2 text-sm rounded-md gap-2': size === 'sm',
        'px-4 py-2.5 text-base rounded-lg gap-2': size === 'md',
        'px-6 py-3 text-lg rounded-lg gap-3': size === 'lg',
        'px-8 py-4 text-xl rounded-xl gap-4': size === 'xl',
      },
      
      // Variant styles
      {
        // Primary
        'bg-gorilla-yellow text-gorilla-black hover:bg-yellow-400 focus-visible:ring-gorilla-yellow shadow-lg hover:shadow-xl': 
          variant === 'primary',
        
        // Secondary  
        'bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:border-white/30 focus-visible:ring-white backdrop-blur-sm': 
          variant === 'secondary',
        
        // Ghost
        'text-white hover:bg-white/10 focus-visible:ring-white': 
          variant === 'ghost',
        
        // Outline
        'border-2 border-gorilla-yellow text-gorilla-yellow hover:bg-gorilla-yellow hover:text-gorilla-black focus-visible:ring-gorilla-yellow': 
          variant === 'outline',
      },
      
      className
    )

    return (
      <button
        ref={buttonRef}
        className={baseClasses}
        disabled={disabled}
        {...props}
      >
        {/* Ripple effect container */}
        <span className="absolute inset-0 overflow-hidden rounded-inherit">
          <span className="absolute inset-0 bg-white/20 scale-0 rounded-full transition-transform duration-300 group-active:scale-100" />
        </span>
        
        {/* Content */}
        <span className="relative z-10 flex items-center justify-center gap-inherit">
          {children}
        </span>
      </button>
    )
  }
)

TouchButton.displayName = 'TouchButton'

export { TouchButton }
export default TouchButton