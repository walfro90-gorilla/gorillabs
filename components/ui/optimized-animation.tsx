"use client"

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { useAnimationPerformance } from '@/hooks/use-animation-performance'

interface OptimizedAnimationProps {
  children: React.ReactNode
  className?: string
  animationType?: 'fade' | 'slide' | 'scale' | 'rotate' | 'bounce'
  duration?: number
  delay?: number
  easing?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear'
  trigger?: 'immediate' | 'scroll' | 'hover' | 'click'
  threshold?: number
  respectReducedMotion?: boolean
  enableGPUAcceleration?: boolean
  onAnimationStart?: () => void
  onAnimationEnd?: () => void
}

/**
 * OptimizedAnimation Component
 * Implements performance-optimized animations with:
 * - CSS transforms instead of layout properties
 * - will-change property management
 * - Frame rate monitoring and quality adjustment
 * - prefers-reduced-motion support
 */
export function OptimizedAnimation({
  children,
  className = '',
  animationType = 'fade',
  duration = 300,
  delay = 0,
  easing = 'ease-out',
  trigger = 'immediate',
  threshold = 0.1,
  respectReducedMotion = true,
  enableGPUAcceleration = true,
  onAnimationStart,
  onAnimationEnd
}: OptimizedAnimationProps) {
  const elementRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(trigger === 'immediate')
  const [isAnimating, setIsAnimating] = useState(false)
  const [shouldAnimate, setShouldAnimate] = useState(true)
  
  const { metrics, prefersReducedMotion, getOptimizedProperties } = useAnimationPerformance()
  const quality = metrics?.quality || 'medium'

  // Check for reduced motion preference
  useEffect(() => {
    if (respectReducedMotion && prefersReducedMotion) {
      setShouldAnimate(false)
    }
  }, [respectReducedMotion, prefersReducedMotion])

  // Intersection Observer for scroll-triggered animations
  useEffect(() => {
    if (trigger !== 'scroll' || !elementRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold }
    )

    observer.observe(elementRef.current)

    return () => observer.disconnect()
  }, [trigger, threshold])

  // Get optimized animation properties based on performance
  const getAnimationStyles = useCallback(() => {
    if (!shouldAnimate) {
      return {
        opacity: 1,
        transform: 'none',
        transition: 'none'
      }
    }

    const optimizedProps = getOptimizedProperties()
    const adjustedDuration = quality === 'low' ? duration * 1.5 : 
                            quality === 'medium' ? duration * 1.2 : duration

    const baseStyles: React.CSSProperties = {
      transition: `all ${adjustedDuration}ms ${easing}`,
      transitionDelay: `${delay}ms`,
      willChange: isAnimating ? optimizedProps.willChange : 'auto',
      backfaceVisibility: optimizedProps.backfaceVisibility as 'hidden' | 'visible',
      perspective: optimizedProps.perspective
    }

    // Use CSS transforms for GPU acceleration
    if (enableGPUAcceleration) {
      baseStyles.transform = 'translate3d(0, 0, 0)' // Force GPU layer
    }

    return baseStyles
  }, [shouldAnimate, quality, duration, easing, delay, isAnimating, getOptimizedProperties, enableGPUAcceleration])

  // Get animation keyframes based on type
  const getAnimationKeyframes = useCallback(() => {
    if (!shouldAnimate) return { from: {}, to: {} }

    const transforms: Record<string, { from: React.CSSProperties; to: React.CSSProperties }> = {
      fade: {
        from: { opacity: 0 },
        to: { opacity: 1 }
      },
      slide: {
        from: { 
          opacity: 0, 
          transform: enableGPUAcceleration ? 'translate3d(0, 20px, 0)' : 'translateY(20px)' 
        },
        to: { 
          opacity: 1, 
          transform: enableGPUAcceleration ? 'translate3d(0, 0, 0)' : 'translateY(0)' 
        }
      },
      scale: {
        from: { 
          opacity: 0, 
          transform: enableGPUAcceleration ? 'translate3d(0, 0, 0) scale(0.9)' : 'scale(0.9)' 
        },
        to: { 
          opacity: 1, 
          transform: enableGPUAcceleration ? 'translate3d(0, 0, 0) scale(1)' : 'scale(1)' 
        }
      },
      rotate: {
        from: { 
          opacity: 0, 
          transform: enableGPUAcceleration ? 'translate3d(0, 0, 0) rotate(-5deg)' : 'rotate(-5deg)' 
        },
        to: { 
          opacity: 1, 
          transform: enableGPUAcceleration ? 'translate3d(0, 0, 0) rotate(0deg)' : 'rotate(0deg)' 
        }
      },
      bounce: {
        from: { 
          opacity: 0, 
          transform: enableGPUAcceleration ? 'translate3d(0, -20px, 0) scale(0.9)' : 'translateY(-20px) scale(0.9)' 
        },
        to: { 
          opacity: 1, 
          transform: enableGPUAcceleration ? 'translate3d(0, 0, 0) scale(1)' : 'translateY(0) scale(1)' 
        }
      }
    }

    return transforms[animationType] || transforms.fade
  }, [shouldAnimate, animationType, enableGPUAcceleration])

  // Handle animation lifecycle
  const handleAnimationStart = useCallback(() => {
    setIsAnimating(true)
    onAnimationStart?.()
  }, [onAnimationStart])

  const handleAnimationEnd = useCallback(() => {
    setIsAnimating(false)
    
    // Clean up will-change property after animation
    if (elementRef.current) {
      elementRef.current.style.willChange = 'auto'
    }
    
    onAnimationEnd?.()
  }, [onAnimationEnd])

  // Apply styles and event listeners
  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const styles = getAnimationStyles()
    const keyframes = getAnimationKeyframes()

    // Apply base styles
    Object.assign(element.style, styles)

    // Apply initial state if not visible yet
    if (!isVisible && shouldAnimate) {
      Object.assign(element.style, keyframes.from)
    } else if (isVisible && shouldAnimate) {
      // Trigger animation
      requestAnimationFrame(() => {
        Object.assign(element.style, keyframes.to)
      })
    }

    // Add event listeners
    element.addEventListener('transitionstart', handleAnimationStart)
    element.addEventListener('transitionend', handleAnimationEnd)

    return () => {
      element.removeEventListener('transitionstart', handleAnimationStart)
      element.removeEventListener('transitionend', handleAnimationEnd)
    }
  }, [isVisible, shouldAnimate, getAnimationStyles, getAnimationKeyframes, handleAnimationStart, handleAnimationEnd])

  // Handle hover trigger
  const handleMouseEnter = useCallback(() => {
    if (trigger === 'hover') {
      setIsVisible(true)
    }
  }, [trigger])

  // Handle click trigger
  const handleClick = useCallback(() => {
    if (trigger === 'click') {
      setIsVisible(true)
    }
  }, [trigger])

  return (
    <div
      ref={elementRef}
      className={`optimized-animation ${className}`}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      style={{
        // Ensure proper stacking context
        position: 'relative',
        // Optimize for animations
        contain: 'layout style paint',
        // Prevent layout shifts
        minHeight: 'fit-content'
      }}
    >
      {children}
    </div>
  )
}

/**
 * Performance-aware particle animation component
 */
interface OptimizedParticleProps {
  count?: number
  size?: number
  speed?: number
  color?: string
  className?: string
}

export function OptimizedParticles({
  count = 50,
  size = 2,
  speed = 1,
  color = '#FFD700',
  className = ''
}: OptimizedParticleProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { metrics, prefersReducedMotion, getParticleSettings } = useAnimationPerformance()
  const quality = metrics?.quality || 'medium'
  
  const particleSettings = getParticleSettings()
  const adjustedCount = Math.min(count, particleSettings.count)
  const adjustedSize = Math.max(size, particleSettings.size)
  const adjustedSpeed = speed * (quality === 'low' ? 0.5 : quality === 'medium' ? 0.8 : 1)

  // Don't render particles if reduced motion is preferred
  if (prefersReducedMotion) {
    return null
  }

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{
        contain: 'strict',
        willChange: 'auto' // Only set during animation
      }}
    >
      {Array.from({ length: adjustedCount }).map((_, i) => {
        const animationDuration = (8 + Math.random() * 4) / adjustedSpeed
        const delay = Math.random() * 2
        const x = Math.random() * 100
        const y = Math.random() * 100
        
        return (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${adjustedSize}px`,
              height: `${adjustedSize}px`,
              backgroundColor: color,
              left: `${x}%`,
              top: `${y}%`,
              opacity: particleSettings.opacity,
              // Use CSS transforms for GPU acceleration
              transform: 'translate3d(0, 0, 0)',
              animation: `optimizedFloat ${animationDuration}s ease-in-out infinite`,
              animationDelay: `${delay}s`,
              // Optimize for performance
              willChange: 'transform, opacity',
              backfaceVisibility: 'hidden',
              perspective: '1000px'
            }}
          />
        )
      })}
      
      <style jsx>{`
        @keyframes optimizedFloat {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
            opacity: ${particleSettings.opacity * 0.5};
          }
          25% {
            transform: translate3d(10px, -15px, 0) scale(1.1);
            opacity: ${particleSettings.opacity};
          }
          50% {
            transform: translate3d(-5px, -8px, 0) scale(0.9);
            opacity: ${particleSettings.opacity * 0.8};
          }
          75% {
            transform: translate3d(15px, -20px, 0) scale(1.05);
            opacity: ${particleSettings.opacity};
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          div {
            animation: none !important;
            transform: translate3d(0, 0, 0) !important;
            opacity: ${particleSettings.opacity * 0.3} !important;
          }
        }
      `}</style>
    </div>
  )
}

/**
 * Frame rate aware animation wrapper
 */
interface FrameRateAwareAnimationProps {
  children: React.ReactNode
  targetFPS?: number
  fallbackContent?: React.ReactNode
  className?: string
}

export function FrameRateAwareAnimation({
  children,
  targetFPS = 30,
  fallbackContent,
  className = ''
}: FrameRateAwareAnimationProps) {
  const [canAnimate, setCanAnimate] = useState(true)
  const { metrics } = useAnimationPerformance()
  const quality = metrics?.quality || 'medium'
  
  useEffect(() => {
    if (metrics && metrics.averageFPS < targetFPS) {
      setCanAnimate(false)
    } else if (metrics && metrics.averageFPS > targetFPS + 10) {
      setCanAnimate(true)
    }
  }, [metrics, targetFPS])

  // Show fallback if performance is too low
  if (!canAnimate && fallbackContent) {
    return <div className={className}>{fallbackContent}</div>
  }

  // Reduce animation complexity based on quality
  const animationClass = quality === 'low' ? 'animation-reduced' : 
                        quality === 'medium' ? 'animation-medium' : 
                        'animation-full'

  return (
    <div className={`${className} ${animationClass}`}>
      {children}
    </div>
  )
}

/**
 * CSS-only optimized animations for maximum compatibility
 */
export function CSSOptimizedAnimation({
  children,
  className = '',
  type = 'fadeIn'
}: {
  children: React.ReactNode
  className?: string
  type?: 'fadeIn' | 'slideUp' | 'scaleIn' | 'rotateIn'
}) {
  return (
    <div className={`css-optimized-animation ${type} ${className}`}>
      {children}
      
      <style jsx>{`
        .css-optimized-animation {
          /* Optimize for performance */
          will-change: transform, opacity;
          backface-visibility: hidden;
          perspective: 1000px;
          transform: translate3d(0, 0, 0);
        }
        
        .fadeIn {
          animation: cssOptimizedFadeIn 0.6s ease-out forwards;
        }
        
        .slideUp {
          animation: cssOptimizedSlideUp 0.6s ease-out forwards;
        }
        
        .scaleIn {
          animation: cssOptimizedScaleIn 0.6s ease-out forwards;
        }
        
        .rotateIn {
          animation: cssOptimizedRotateIn 0.6s ease-out forwards;
        }
        
        @keyframes cssOptimizedFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes cssOptimizedSlideUp {
          from {
            opacity: 0;
            transform: translate3d(0, 20px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        
        @keyframes cssOptimizedScaleIn {
          from {
            opacity: 0;
            transform: translate3d(0, 0, 0) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
          }
        }
        
        @keyframes cssOptimizedRotateIn {
          from {
            opacity: 0;
            transform: translate3d(0, 0, 0) rotate(-5deg);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0) rotate(0deg);
          }
        }
        
        /* Clean up will-change after animation */
        .css-optimized-animation {
          animation-fill-mode: forwards;
        }
        
        .css-optimized-animation:not(:hover):not(:focus):not(:active) {
          will-change: auto;
        }
        
        /* Respect reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .css-optimized-animation {
            animation: none !important;
            opacity: 1 !important;
            transform: translate3d(0, 0, 0) !important;
          }
        }
        
        /* Performance-based adjustments */
        @media (max-width: 768px) and (max-resolution: 150dpi) {
          .css-optimized-animation {
            animation-duration: 0.8s !important;
          }
        }
      `}</style>
    </div>
  )
}