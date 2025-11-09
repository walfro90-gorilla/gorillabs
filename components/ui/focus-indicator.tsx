"use client"

import React, { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface FocusIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  variant?: 'default' | 'strong' | 'subtle' | 'custom'
  color?: 'yellow' | 'blue' | 'white' | 'custom'
  thickness?: 'thin' | 'medium' | 'thick'
  offset?: 'none' | 'small' | 'medium' | 'large'
  rounded?: boolean
  animated?: boolean
  highContrast?: boolean
}

const FocusIndicator = forwardRef<HTMLDivElement, FocusIndicatorProps>(({
  children,
  className,
  variant = 'default',
  color = 'yellow',
  thickness = 'medium',
  offset = 'small',
  rounded = true,
  animated = true,
  highContrast = false,
  ...props
}, ref) => {
  const focusClasses = cn(
    // Base focus styles
    'focus-within:outline-none',
    'focus-visible:outline-none',
    
    // Focus indicator variants
    {
      // Default variant - standard focus ring
      'focus-within:ring-2 focus-visible:ring-2': variant === 'default',
      
      // Strong variant - thick, high contrast ring
      'focus-within:ring-4 focus-visible:ring-4 focus-within:ring-offset-2 focus-visible:ring-offset-2': variant === 'strong',
      
      // Subtle variant - thin, low contrast ring
      'focus-within:ring-1 focus-visible:ring-1': variant === 'subtle',
      
      // Custom variant - no default styles, use custom classes
      '': variant === 'custom'
    },
    
    // Color variants
    {
      'focus-within:ring-gorilla-yellow focus-visible:ring-gorilla-yellow': color === 'yellow' && variant !== 'custom',
      'focus-within:ring-blue-500 focus-visible:ring-blue-500': color === 'blue' && variant !== 'custom',
      'focus-within:ring-white focus-visible:ring-white': color === 'white' && variant !== 'custom'
    },
    
    // Thickness adjustments
    {
      'focus-within:ring-1 focus-visible:ring-1': thickness === 'thin' && variant === 'default',
      'focus-within:ring-2 focus-visible:ring-2': thickness === 'medium' && variant === 'default',
      'focus-within:ring-4 focus-visible:ring-4': thickness === 'thick' && variant === 'default'
    },
    
    // Offset adjustments
    {
      'focus-within:ring-offset-0 focus-visible:ring-offset-0': offset === 'none',
      'focus-within:ring-offset-1 focus-visible:ring-offset-1': offset === 'small',
      'focus-within:ring-offset-2 focus-visible:ring-offset-2': offset === 'medium',
      'focus-within:ring-offset-4 focus-visible:ring-offset-4': offset === 'large'
    },
    
    // Rounded corners
    {
      'focus-within:rounded-md focus-visible:rounded-md': rounded
    },
    
    // Animation
    {
      'transition-all duration-200 ease-out': animated
    },
    
    // High contrast mode
    {
      'focus-within:ring-yellow-400 focus-visible:ring-yellow-400 focus-within:ring-4 focus-visible:ring-4': 
        highContrast && color === 'yellow',
      'focus-within:ring-blue-400 focus-visible:ring-blue-400 focus-within:ring-4 focus-visible:ring-4': 
        highContrast && color === 'blue',
      'focus-within:ring-white focus-visible:ring-white focus-within:ring-4 focus-visible:ring-4': 
        highContrast && color === 'white'
    },
    
    className
  )

  return (
    <div
      ref={ref}
      className={focusClasses}
      {...props}
    >
      {children}
    </div>
  )
})

FocusIndicator.displayName = 'FocusIndicator'

// Utility component for wrapping interactive elements
interface FocusableProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  as?: keyof React.JSX.IntrinsicElements
  focusable?: boolean
  tabIndex?: number
}

export const Focusable = forwardRef<HTMLElement, FocusableProps>(({
  children,
  className,
  as: Component = 'div',
  focusable = true,
  tabIndex,
  ...props
}, ref) => {
  const focusableProps = focusable ? {
    tabIndex: tabIndex ?? 0,
    className: cn(
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gorilla-yellow focus-visible:ring-offset-2',
      'transition-all duration-200 ease-out',
      className
    )
  } : {
    className
  }

  return React.createElement(
    Component as string,
    {
      ref,
      ...focusableProps,
      ...props
    },
    children
  )
})

Focusable.displayName = 'Focusable'

// Hook for managing focus states
export const useFocusIndicator = () => {
  const [isFocused, setIsFocused] = React.useState(false)
  const [isFocusVisible, setIsFocusVisible] = React.useState(false)

  const focusProps = {
    onFocus: () => setIsFocused(true),
    onBlur: () => {
      setIsFocused(false)
      setIsFocusVisible(false)
    },
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === 'Tab' || e.key === 'Enter' || e.key === ' ') {
        setIsFocusVisible(true)
      }
    },
    onMouseDown: () => setIsFocusVisible(false)
  }

  return {
    isFocused,
    isFocusVisible,
    focusProps
  }
}

export { FocusIndicator }
export default FocusIndicator