"use client"

import React from 'react'
import { cn } from '@/lib/utils'

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'dots' | 'pulse' | 'bars'
  color?: 'primary' | 'secondary' | 'white' | 'yellow'
  className?: string
  ariaLabel?: string
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  variant = 'default',
  color = 'primary',
  className = '',
  ariaLabel = 'Loading'
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  }

  const colorClasses = {
    primary: 'text-gorilla-yellow',
    secondary: 'text-gray-400',
    white: 'text-white',
    yellow: 'text-yellow-400'
  }

  const baseClasses = cn(
    'animate-spin',
    sizeClasses[size],
    colorClasses[color],
    className
  )

  if (variant === 'dots') {
    return (
      <div className={cn('flex space-x-1', className)} role="status" aria-label={ariaLabel}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={cn(
              'rounded-full animate-pulse',
              size === 'sm' ? 'w-1 h-1' : size === 'md' ? 'w-2 h-2' : size === 'lg' ? 'w-3 h-3' : 'w-4 h-4',
              colorClasses[color].replace('text-', 'bg-')
            )}
            style={{
              animationDelay: `${i * 0.2}s`,
              animationDuration: '1s'
            }}
          />
        ))}
      </div>
    )
  }

  if (variant === 'pulse') {
    return (
      <div
        className={cn(
          'rounded-full animate-pulse',
          sizeClasses[size],
          colorClasses[color].replace('text-', 'bg-'),
          className
        )}
        role="status"
        aria-label={ariaLabel}
      />
    )
  }

  if (variant === 'bars') {
    return (
      <div className={cn('flex space-x-1', className)} role="status" aria-label={ariaLabel}>
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={cn(
              'animate-pulse',
              size === 'sm' ? 'w-1 h-4' : size === 'md' ? 'w-1 h-6' : size === 'lg' ? 'w-2 h-8' : 'w-2 h-12',
              colorClasses[color].replace('text-', 'bg-')
            )}
            style={{
              animationDelay: `${i * 0.15}s`,
              animationDuration: '1.2s'
            }}
          />
        ))}
      </div>
    )
  }

  // Default spinner
  return (
    <svg
      className={baseClasses}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      role="status"
      aria-label={ariaLabel}
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  )
}

export default Spinner