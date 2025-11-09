"use client"

import React from 'react'
import { cn } from '@/lib/utils'

interface FallbackContentProps {
  type?: 'hero' | 'section' | 'card' | 'list' | 'image' | 'video' | 'form'
  title?: string
  message?: string
  showRetry?: boolean
  onRetry?: () => void
  className?: string
  icon?: React.ReactNode
}

export const FallbackContent: React.FC<FallbackContentProps> = ({
  type = 'section',
  title,
  message,
  showRetry = true,
  onRetry,
  className = '',
  icon
}) => {
  const getDefaultContent = () => {
    switch (type) {
      case 'hero':
        return {
          title: 'Welcome to Gorilla Labs',
          message: 'We create exceptional digital solutions.',
          icon: (
            <svg className="w-16 h-16 text-gorilla-yellow" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
            </svg>
          )
        }
      case 'image':
        return {
          title: 'Image Unavailable',
          message: 'The image could not be loaded.',
          icon: (
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          )
        }
      case 'video':
        return {
          title: 'Video Unavailable',
          message: 'The video content could not be loaded.',
          icon: (
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          )
        }
      case 'form':
        return {
          title: 'Form Unavailable',
          message: 'The form could not be loaded. Please try refreshing the page.',
          icon: (
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          )
        }
      case 'list':
        return {
          title: 'Content Unavailable',
          message: 'The list content could not be loaded.',
          icon: (
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          )
        }
      case 'card':
        return {
          title: 'Card Content Unavailable',
          message: 'This content could not be displayed.',
          icon: (
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          )
        }
      default:
        return {
          title: 'Content Unavailable',
          message: 'This section could not be loaded.',
          icon: (
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )
        }
    }
  }

  const defaultContent = getDefaultContent()
  const displayTitle = title || defaultContent.title
  const displayMessage = message || defaultContent.message
  const displayIcon = icon || defaultContent.icon

  const containerClasses = cn(
    'flex flex-col items-center justify-center text-center p-8',
    type === 'hero' ? 'min-h-[60vh] bg-bg-primary' : 'min-h-[200px] bg-bg-secondary rounded-lg border border-gray-700/50',
    className
  )

  return (
    <div className={containerClasses} role="img" aria-label={`${displayTitle}: ${displayMessage}`}>
      {/* Icon */}
      <div className="mb-4">
        {displayIcon}
      </div>

      {/* Title */}
      <h3 className={cn(
        'font-semibold mb-2',
        type === 'hero' ? 'text-2xl md:text-3xl text-white' : 'text-lg text-white'
      )}>
        {displayTitle}
      </h3>

      {/* Message */}
      <p className={cn(
        'text-gray-400 mb-6 max-w-md',
        type === 'hero' ? 'text-base md:text-lg' : 'text-sm'
      )}>
        {displayMessage}
      </p>

      {/* Retry Button */}
      {showRetry && onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-3 bg-gorilla-yellow text-gorilla-black rounded-lg hover:bg-yellow-400 transition-colors font-medium focus-visible"
          aria-label="Retry loading content"
        >
          Try Again
        </button>
      )}

      {/* Decorative Elements for Hero */}
      {type === 'hero' && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-gorilla-yellow rounded-full animate-pulse opacity-60"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white rounded-full animate-pulse opacity-40"></div>
          <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-gorilla-yellow rounded-full animate-pulse opacity-30"></div>
        </div>
      )}
    </div>
  )
}

export default FallbackContent