"use client"

import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface MobileLayoutProps {
  children: React.ReactNode
  enableStickyHeader?: boolean
  enableStickyFooter?: boolean
  enableSafeArea?: boolean
  enablePullToRefresh?: boolean
  onPullToRefresh?: () => Promise<void>
  className?: string
}

interface MobileContainerProps {
  children: React.ReactNode
  variant?: 'full' | 'contained' | 'padded'
  spacing?: 'none' | 'sm' | 'md' | 'lg'
  className?: string
}

interface MobileStackProps {
  children: React.ReactNode
  direction?: 'vertical' | 'horizontal'
  spacing?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  align?: 'start' | 'center' | 'end' | 'stretch'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  wrap?: boolean
  className?: string
}

interface MobileGridProps {
  children: React.ReactNode
  columns?: 1 | 2 | 3 | 4
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

// Main mobile layout wrapper
export const MobileLayout: React.FC<MobileLayoutProps> = ({
  children,
  enableStickyHeader = false,
  enableStickyFooter = false,
  enableSafeArea = true,
  enablePullToRefresh = false,
  onPullToRefresh,
  className
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [pullDistance, setPullDistance] = useState(0)

  useEffect(() => {
    if (!enablePullToRefresh || !onPullToRefresh) return

    let startY = 0
    let currentY = 0
    let isPulling = false

    const handleTouchStart = (e: TouchEvent) => {
      if (window.scrollY === 0) {
        startY = e.touches[0].clientY
        isPulling = true
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!isPulling) return

      currentY = e.touches[0].clientY
      const distance = Math.max(0, currentY - startY)
      
      if (distance > 0 && window.scrollY === 0) {
        e.preventDefault()
        setPullDistance(Math.min(distance, 100))
      }
    }

    const handleTouchEnd = async () => {
      if (!isPulling) return

      isPulling = false
      
      if (pullDistance > 60) {
        setIsRefreshing(true)
        try {
          await onPullToRefresh()
        } finally {
          setIsRefreshing(false)
        }
      }
      
      setPullDistance(0)
    }

    document.addEventListener('touchstart', handleTouchStart, { passive: false })
    document.addEventListener('touchmove', handleTouchMove, { passive: false })
    document.addEventListener('touchend', handleTouchEnd)

    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, [enablePullToRefresh, onPullToRefresh, pullDistance])

  const layoutClasses = cn(
    'min-h-screen flex flex-col',
    enableSafeArea && 'safe-area-inset',
    className
  )

  return (
    <div className={layoutClasses}>
      {/* Pull to refresh indicator */}
      {enablePullToRefresh && (pullDistance > 0 || isRefreshing) && (
        <div 
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center bg-gorilla-black/90 backdrop-blur-sm transition-all duration-300"
          style={{ 
            height: `${Math.max(pullDistance, isRefreshing ? 60 : 0)}px`,
            transform: `translateY(${enableSafeArea ? 'env(safe-area-inset-top)' : '0'})` 
          }}
        >
          <div className="flex items-center gap-2 text-white">
            <div className={cn(
              'w-5 h-5 border-2 border-gorilla-yellow border-t-transparent rounded-full',
              (isRefreshing || pullDistance > 60) && 'animate-spin'
            )} />
            <span className="text-sm font-medium">
              {isRefreshing ? 'Refreshing...' : pullDistance > 60 ? 'Release to refresh' : 'Pull to refresh'}
            </span>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        {children}
      </main>
    </div>
  )
}

// Mobile container component
export const MobileContainer: React.FC<MobileContainerProps> = ({
  children,
  variant = 'contained',
  spacing = 'md',
  className
}) => {
  const containerClasses = cn(
    'w-full mx-auto',
    {
      // Variant styles
      'max-w-none': variant === 'full',
      'max-w-screen-sm': variant === 'contained',
      'max-w-screen-sm': variant === 'padded',
      
      // Spacing styles
      'p-0': spacing === 'none',
      'p-2': spacing === 'sm',
      'p-4': spacing === 'md',
      'p-6': spacing === 'lg',
    },
    variant === 'padded' && 'px-4',
    className
  )

  return (
    <div className={containerClasses}>
      {children}
    </div>
  )
}

// Mobile stack component for vertical/horizontal layouts
export const MobileStack: React.FC<MobileStackProps> = ({
  children,
  direction = 'vertical',
  spacing = 'md',
  align = 'stretch',
  justify = 'start',
  wrap = false,
  className
}) => {
  const stackClasses = cn(
    'flex',
    {
      // Direction
      'flex-col': direction === 'vertical',
      'flex-row': direction === 'horizontal',
      
      // Spacing
      'gap-0': spacing === 'none',
      'gap-1': spacing === 'xs',
      'gap-2': spacing === 'sm',
      'gap-4': spacing === 'md',
      'gap-6': spacing === 'lg',
      'gap-8': spacing === 'xl',
      
      // Alignment
      'items-start': align === 'start',
      'items-center': align === 'center',
      'items-end': align === 'end',
      'items-stretch': align === 'stretch',
      
      // Justify
      'justify-start': justify === 'start',
      'justify-center': justify === 'center',
      'justify-end': justify === 'end',
      'justify-between': justify === 'between',
      'justify-around': justify === 'around',
      'justify-evenly': justify === 'evenly',
      
      // Wrap
      'flex-wrap': wrap,
    },
    className
  )

  return (
    <div className={stackClasses}>
      {children}
    </div>
  )
}

// Mobile grid component
export const MobileGrid: React.FC<MobileGridProps> = ({
  children,
  columns = 2,
  gap = 'md',
  className
}) => {
  const gridClasses = cn(
    'grid w-full',
    {
      // Columns
      'grid-cols-1': columns === 1,
      'grid-cols-2': columns === 2,
      'grid-cols-3': columns === 3,
      'grid-cols-4': columns === 4,
      
      // Gap
      'gap-0': gap === 'none',
      'gap-1': gap === 'xs',
      'gap-2': gap === 'sm',
      'gap-4': gap === 'md',
      'gap-6': gap === 'lg',
      'gap-8': gap === 'xl',
    },
    className
  )

  return (
    <div className={gridClasses}>
      {children}
    </div>
  )
}

// Mobile section component
interface MobileSectionProps {
  children: React.ReactNode
  title?: string
  subtitle?: string
  headerAction?: React.ReactNode
  variant?: 'default' | 'card' | 'hero'
  spacing?: 'none' | 'sm' | 'md' | 'lg'
  className?: string
}

export const MobileSection: React.FC<MobileSectionProps> = ({
  children,
  title,
  subtitle,
  headerAction,
  variant = 'default',
  spacing = 'md',
  className
}) => {
  const sectionClasses = cn(
    'w-full',
    {
      // Variant styles
      'bg-transparent': variant === 'default',
      'bg-white/5 rounded-lg border border-white/10 backdrop-blur-sm': variant === 'card',
      'bg-gradient-to-br from-gorilla-black via-gray-900 to-gorilla-black min-h-screen flex flex-col justify-center': variant === 'hero',
      
      // Spacing
      'p-0': spacing === 'none',
      'p-3': spacing === 'sm',
      'p-4': spacing === 'md',
      'p-6': spacing === 'lg',
    },
    className
  )

  return (
    <section className={sectionClasses}>
      {/* Section header */}
      {(title || subtitle || headerAction) && (
        <div className="mb-6">
          <div className="flex items-start justify-between mb-2">
            {title && (
              <h2 className="text-2xl font-bold text-white leading-tight">
                {title}
              </h2>
            )}
            {headerAction && (
              <div className="ml-4 flex-shrink-0">
                {headerAction}
              </div>
            )}
          </div>
          {subtitle && (
            <p className="text-white/70 text-base leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      )}
      
      {/* Section content */}
      <div className="flex-1">
        {children}
      </div>
    </section>
  )
}

// Mobile sticky element
interface MobileStickyProps {
  children: React.ReactNode
  position?: 'top' | 'bottom'
  offset?: number
  zIndex?: number
  className?: string
}

export const MobileSticky: React.FC<MobileStickyProps> = ({
  children,
  position = 'top',
  offset = 0,
  zIndex = 40,
  className
}) => {
  const stickyClasses = cn(
    'sticky w-full',
    {
      'top-0': position === 'top',
      'bottom-0': position === 'bottom',
    },
    className
  )

  return (
    <div 
      className={stickyClasses}
      style={{ 
        [position]: `${offset}px`,
        zIndex 
      }}
    >
      {children}
    </div>
  )
}

export default MobileLayout