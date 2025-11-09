"use client"

import React, { useState, useEffect } from 'react'
import { SectionSkeleton, HeroSkeleton } from './skeleton'

interface LoadingStateProps {
  height?: string
  showSkeleton?: boolean
  variant?: 'default' | 'hero' | 'section' | 'card' | 'list' | 'grid'
  errorFallback?: React.ReactNode
  retryButton?: boolean
  className?: string
  children?: React.ReactNode
  timeout?: number
  onTimeout?: () => void
  onRetry?: () => void
  ariaLabel?: string
  showProgress?: boolean
  progressValue?: number
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  height = "h-96",
  showSkeleton = false,
  variant = 'default',
  errorFallback,
  retryButton = false,
  className = "",
  children,
  timeout = 30000, // 30 seconds default timeout
  onTimeout,
  onRetry,
  ariaLabel = "Loading content",
  showProgress = false,
  progressValue = 0
}) => {
  const [hasTimedOut, setHasTimedOut] = useState(false)
  const [dots, setDots] = useState('')

  // Timeout handling
  useEffect(() => {
    if (timeout > 0) {
      const timer = setTimeout(() => {
        setHasTimedOut(true)
        onTimeout?.()
      }, timeout)

      return () => clearTimeout(timer)
    }
  }, [timeout, onTimeout])

  // Animated dots for loading text
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.')
    }, 500)

    return () => clearInterval(interval)
  }, [])

  const handleRetry = () => {
    setHasTimedOut(false)
    onRetry?.()
  }
  // Enhanced skeleton loading states
  if (showSkeleton) {
    switch (variant) {
      case 'hero':
        return <HeroSkeleton />
      case 'section':
        return <SectionSkeleton height={height} />
      case 'card':
        return (
          <div className={`${height} w-full ${className}`} role="status" aria-label={ariaLabel}>
            <div className="animate-pulse bg-bg-secondary rounded-lg h-full w-full p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="h-12 w-12 bg-gray-700 rounded-full"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-800 rounded w-1/2"></div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-800 rounded"></div>
                <div className="h-4 bg-gray-800 rounded w-5/6"></div>
                <div className="h-4 bg-gray-800 rounded w-4/6"></div>
              </div>
            </div>
          </div>
        )
      case 'list':
        return (
          <div className={`${height} w-full ${className}`} role="status" aria-label={ariaLabel}>
            <div className="animate-pulse space-y-4 p-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <div className="h-10 w-10 bg-gray-700 rounded-full"></div>
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-800 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      case 'grid':
        return (
          <div className={`${height} w-full ${className}`} role="status" aria-label={ariaLabel}>
            <div className="animate-pulse grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-bg-secondary rounded-lg p-4">
                  <div className="h-32 bg-gray-700 rounded mb-4"></div>
                  <div className="h-4 bg-gray-700 rounded mb-2"></div>
                  <div className="h-3 bg-gray-800 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          </div>
        )
      default:
        return (
          <div className={`${height} w-full ${className}`} role="status" aria-label={ariaLabel}>
            <div className="animate-pulse bg-bg-secondary rounded-lg h-full w-full flex flex-col justify-center items-center space-y-4 p-8">
              <div className="h-8 bg-gray-700 rounded w-3/4 max-w-md"></div>
              <div className="h-4 bg-gray-800 rounded w-1/2 max-w-xs"></div>
              <div className="h-4 bg-gray-800 rounded w-2/3 max-w-sm"></div>
              <div className="flex gap-3 mt-6">
                <div className="h-10 bg-gray-700 rounded w-24"></div>
                <div className="h-10 bg-gray-800 rounded w-20"></div>
              </div>
            </div>
          </div>
        )
    }
  }

  // Show timeout or error state
  if (hasTimedOut || errorFallback) {
    return (
      <div className={`${height} w-full flex items-center justify-center bg-bg-secondary ${className}`} role="alert">
        <div className="flex flex-col items-center space-y-6 p-8 text-center max-w-md">
          {/* Error icon */}
          <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          
          {/* Error message */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-white">
              {hasTimedOut ? 'Loading Timeout' : 'Something went wrong'}
            </h3>
            <p className="text-text-muted-dark text-sm">
              {hasTimedOut 
                ? 'This is taking longer than expected. Please try again.'
                : errorFallback || 'An error occurred while loading this content.'
              }
            </p>
          </div>
          
          {/* Retry button */}
          {(retryButton || hasTimedOut) && (
            <button 
              className="px-6 py-3 bg-gorilla-yellow text-gorilla-black rounded-lg hover:bg-yellow-400 transition-colors font-medium focus-visible"
              onClick={handleRetry}
              aria-label="Retry loading content"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    )
  }

  // Enhanced loading spinner state
  return (
    <div 
      className={`${height} w-full flex items-center justify-center bg-bg-secondary ${className}`}
      role="status"
      aria-label={ariaLabel}
    >
      <div className="flex flex-col items-center space-y-6 p-8">
        {/* Multi-layer loading spinner */}
        <div className="relative">
          {/* Outer ring */}
          <div className="animate-spin rounded-full h-16 w-16 border-2 border-gray-600"></div>
          {/* Inner ring */}
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-gorilla-yellow absolute top-0 left-0" style={{ animationDuration: '0.8s' }}></div>
          {/* Center dot */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gorilla-yellow rounded-full animate-pulse"></div>
        </div>
        
        {/* Progress bar */}
        {showProgress && (
          <div className="w-48 bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gorilla-yellow h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${Math.min(progressValue, 100)}%` }}
            ></div>
          </div>
        )}
        
        {/* Loading text with animated dots */}
        <div className="text-center space-y-2">
          <p className="text-white text-base font-medium">
            {children || `Loading${dots}`}
          </p>
          {showProgress && (
            <p className="text-text-muted-dark text-sm">
              {Math.round(progressValue)}% complete
            </p>
          )}
        </div>
        
        {/* Loading tips or additional info */}
        <p className="text-text-subtle-dark text-xs max-w-xs text-center">
          This may take a few moments...
        </p>
      </div>
    </div>
  )
}

export default LoadingState