"use client"

import React, { useEffect, useState } from 'react'

interface MobileOptimizationsProps {
  enableViewportFix?: boolean
  enableTouchOptimizations?: boolean
  enableScrollOptimizations?: boolean
  enableLayoutStability?: boolean
}

/**
 * Enhanced Mobile Optimizations Component
 * Comprehensive mobile-specific optimizations and touch interactions
 */
export const MobileOptimizations: React.FC<MobileOptimizationsProps> = ({
  enableViewportFix = true,
  enableTouchOptimizations = true,
  enableScrollOptimizations = true,
  enableLayoutStability = true
}) => {
  const [isMobile, setIsMobile] = useState(false)
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait')

  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth < 768 || 
        /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      setIsMobile(isMobileDevice)
    }

    // Detect orientation
    const checkOrientation = () => {
      setOrientation(window.innerHeight > window.innerWidth ? 'portrait' : 'landscape')
    }

    checkMobile()
    checkOrientation()

    window.addEventListener('resize', checkMobile)
    window.addEventListener('orientationchange', checkOrientation)

    return () => {
      window.removeEventListener('resize', checkMobile)
      window.removeEventListener('orientationchange', checkOrientation)
    }
  }, [])

  useEffect(() => {
    if (!isMobile) return

    // Viewport and zoom fixes
    if (enableViewportFix) {
      const preventZoomOnInputs = () => {
        const inputs = document.querySelectorAll('input, select, textarea')
        inputs.forEach((input) => {
          const element = input as HTMLInputElement
          // Ensure minimum 16px font size to prevent zoom
          if (!element.style.fontSize || parseFloat(element.style.fontSize) < 16) {
            element.style.fontSize = '16px'
          }
        })
      }

      const preventHorizontalScroll = () => {
        document.body.style.overflowX = 'hidden'
        document.documentElement.style.overflowX = 'hidden'
        document.body.style.maxWidth = '100vw'
        
        // Fix for iOS Safari viewport units
        const setVhProperty = () => {
          const vh = window.innerHeight * 0.01
          document.documentElement.style.setProperty('--vh', `${vh}px`)
        }
        
        setVhProperty()
        window.addEventListener('resize', setVhProperty)
        window.addEventListener('orientationchange', () => {
          setTimeout(setVhProperty, 100) // Delay for orientation change
        })
      }

      preventZoomOnInputs()
      preventHorizontalScroll()
    }

    // Touch interaction optimizations
    if (enableTouchOptimizations) {
      const optimizeTouchInteractions = () => {
        // Prevent unwanted touch behaviors
        document.body.style.touchAction = 'pan-y'
        ;(document.body.style as any).webkitTouchCallout = 'none'
        document.body.style.webkitUserSelect = 'none'
        document.body.style.userSelect = 'none'
        
        // Optimize interactive elements
        const interactiveElements = document.querySelectorAll('button, a, [role="button"], [tabindex]')
        interactiveElements.forEach((element) => {
          const el = element as HTMLElement
          el.style.touchAction = 'manipulation'
          
          // Ensure minimum touch target size
          const computedStyle = window.getComputedStyle(el)
          const minSize = 44 // iOS HIG minimum
          
          if (parseFloat(computedStyle.height) < minSize) {
            el.style.minHeight = `${minSize}px`
          }
          if (parseFloat(computedStyle.width) < minSize) {
            el.style.minWidth = `${minSize}px`
          }
        })

        // Add touch feedback
        const addTouchFeedback = (element: HTMLElement) => {
          element.addEventListener('touchstart', () => {
            element.style.opacity = '0.7'
          }, { passive: true })
          
          element.addEventListener('touchend', () => {
            setTimeout(() => {
              element.style.opacity = ''
            }, 150)
          }, { passive: true })
        }

        document.querySelectorAll('button, [role="button"]').forEach((el) => {
          addTouchFeedback(el as HTMLElement)
        })
      }

      optimizeTouchInteractions()
    }

    // Scroll performance optimizations
    if (enableScrollOptimizations) {
      const optimizeScrolling = () => {
        // Enable momentum scrolling on iOS
        ;(document.body.style as any).webkitOverflowScrolling = 'touch'
        
        // Prevent bounce scrolling
        document.body.style.overscrollBehavior = 'none'
        
        // Optimize scroll containers
        const scrollContainers = document.querySelectorAll('[data-scroll], .overflow-auto, .overflow-y-auto')
        scrollContainers.forEach((container) => {
          const el = container as HTMLElement
          ;(el.style as any).webkitOverflowScrolling = 'touch'
          el.style.overscrollBehavior = 'contain'
        })

        // Add passive scroll listeners for better performance
        let ticking = false
        const handleScroll = () => {
          if (!ticking) {
            requestAnimationFrame(() => {
              // Scroll-based optimizations can go here
              ticking = false
            })
            ticking = true
          }
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
      }

      optimizeScrolling()
    }

    // Layout stability optimizations
    if (enableLayoutStability) {
      const stabilizeLayout = () => {
        // Add CSS containment to prevent layout thrashing
        const sections = document.querySelectorAll('section, main, article')
        sections.forEach((section) => {
          const el = section as HTMLElement
          el.style.contain = 'layout style'
        })

        // Prevent layout shift from images
        const images = document.querySelectorAll('img')
        images.forEach((img) => {
          if (!img.style.aspectRatio && !img.width && !img.height) {
            img.style.aspectRatio = '16/9' // Default aspect ratio
          }
        })

        // Stabilize video elements
        const videos = document.querySelectorAll('video')
        videos.forEach((video) => {
          video.style.maxWidth = '100%'
          video.style.height = 'auto'
        })
      }

      stabilizeLayout()
    }

    // Handle orientation changes
    const handleOrientationChange = () => {
      // Force layout recalculation after orientation change
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'))
      }, 100)
    }

    window.addEventListener('orientationchange', handleOrientationChange)

    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange)
    }
  }, [isMobile, enableViewportFix, enableTouchOptimizations, enableScrollOptimizations, enableLayoutStability])

  // Add CSS custom properties for mobile
  useEffect(() => {
    if (isMobile) {
      document.documentElement.style.setProperty('--is-mobile', '1')
      document.documentElement.style.setProperty('--orientation', orientation)
    } else {
      document.documentElement.style.setProperty('--is-mobile', '0')
    }
  }, [isMobile, orientation])

  return (
    <>
      {/* CSS for mobile optimizations */}
      <style jsx global>{`
        /* Mobile-specific CSS optimizations */
        @media (max-width: 767px) {
          /* Prevent text size adjustment */
          html {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
            text-size-adjust: 100%;
          }

          /* Optimize font rendering */
          body {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }

          /* Improve tap targets */
          button, a, [role="button"] {
            min-height: 44px;
            min-width: 44px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
          }

          /* Prevent horizontal scroll */
          * {
            max-width: 100%;
            box-sizing: border-box;
          }

          /* Optimize images */
          img {
            max-width: 100%;
            height: auto;
          }

          /* Better form controls */
          input, select, textarea {
            font-size: 16px !important;
            border-radius: 0;
            -webkit-appearance: none;
          }
        }

        /* Orientation-specific styles */
        @media (orientation: landscape) and (max-height: 500px) {
          /* Optimize for landscape mobile */
          .hero-section {
            min-height: 100vh;
          }
        }

        /* High DPI displays */
        @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
          /* Optimize for retina displays */
          img {
            image-rendering: -webkit-optimize-contrast;
          }
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </>
  )
  return null // This component doesn't render anything
}

/**
 * Touch-friendly Button Component
 * Ensures proper touch targets and feedback
 */
interface TouchButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export const TouchButton: React.FC<TouchButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'bg-transparent text-white border border-white/20 hover:bg-white/10'
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm min-h-[40px]',
    md: 'px-6 py-3 text-base min-h-[48px]',
    lg: 'px-8 py-4 text-lg min-h-[56px]'
  }

  return (
    <button
      className={`
        ${variants[variant]}
        ${sizes[size]}
        ${className}
        touch-manipulation
        active:scale-95
        transition-transform
        duration-150
        focus-visible
      `}
      style={{ touchAction: 'manipulation' }}
      {...props}
    >
      {children}
    </button>
  )
}

/**
 * Mobile-friendly Card Component
 * Optimized spacing and touch interactions
 */
interface MobileCardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  interactive?: boolean
}

export const MobileCard: React.FC<MobileCardProps> = ({
  children,
  className = '',
  onClick,
  interactive = false
}) => {
  return (
    <div
      className={`
        bg-bg-card
        rounded-lg
        p-4 md:p-6
        border border-gray-700/50
        ${interactive ? 'cursor-pointer hover:bg-bg-card/80 active:scale-[0.98] transition-all duration-200' : ''}
        ${className}
      `}
      onClick={onClick}
      style={interactive ? { touchAction: 'manipulation' } : undefined}
    >
      {children}
    </div>
  )
}

/**
 * Responsive Container Component
 * Handles proper spacing on mobile
 */
interface ResponsiveContainerProps {
  children: React.ReactNode
  className?: string
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  className = '',
  maxWidth = 'lg'
}) => {
  const maxWidths = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full'
  }

  return (
    <div className={`
      container mx-auto
      px-4 sm:px-6 lg:px-8
      ${maxWidths[maxWidth]}
      ${className}
    `}>
      {children}
    </div>
  )
}

export default MobileOptimizations