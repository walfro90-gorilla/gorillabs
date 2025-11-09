"use client"

import React, { useEffect, useState, useCallback } from 'react'
import { 
  detectWebGLCapabilities, 
  testWebGLFunctionality, 
  getCachedWebGLCapabilities,
  getBrowserSpecificWorkarounds,
  type WebGLCapabilities 
} from '@/lib/webgl-detection'

interface VisualEffectsFallbackProps {
  children: React.ReactNode
  fallback: React.ReactNode
  testWebGL?: boolean
  enableGracefulDegradation?: boolean
  onFallbackUsed?: (reason: string) => void
  className?: string
}

interface FallbackState {
  useWebGL: boolean
  reason: string
  capabilities: WebGLCapabilities | null
  tested: boolean
}

/**
 * Visual Effects Fallback Component
 * Automatically detects WebGL support and provides appropriate fallbacks
 */
export function VisualEffectsFallback({
  children,
  fallback,
  testWebGL = true,
  enableGracefulDegradation = true,
  onFallbackUsed,
  className = ''
}: VisualEffectsFallbackProps) {
  const [fallbackState, setFallbackState] = useState<FallbackState>({
    useWebGL: true,
    reason: '',
    capabilities: null,
    tested: false
  })

  const [isLoading, setIsLoading] = useState(true)

  const performWebGLTest = useCallback(async () => {
    try {
      // Get basic capabilities first
      const capabilities = getCachedWebGLCapabilities()
      
      if (!capabilities.supported) {
        setFallbackState({
          useWebGL: false,
          reason: 'WebGL not supported',
          capabilities,
          tested: true
        })
        onFallbackUsed?.('WebGL not supported')
        return
      }

      // Check browser-specific workarounds
      const workarounds = getBrowserSpecificWorkarounds()
      if (workarounds.forceWebGL1 && capabilities.version === 'webgl2') {
        console.warn('Forcing WebGL1 due to browser compatibility')
      }

      // Perform functional test if requested
      if (testWebGL) {
        const functionality = testWebGLFunctionality()
        
        if (!functionality.contextCreation) {
          setFallbackState({
            useWebGL: false,
            reason: `WebGL context creation failed: ${functionality.error}`,
            capabilities,
            tested: true
          })
          onFallbackUsed?.(`WebGL context creation failed: ${functionality.error}`)
          return
        }

        if (!functionality.shaderCompilation) {
          setFallbackState({
            useWebGL: false,
            reason: `Shader compilation failed: ${functionality.error}`,
            capabilities,
            tested: true
          })
          onFallbackUsed?.(`Shader compilation failed: ${functionality.error}`)
          return
        }

        if (!functionality.rendering) {
          setFallbackState({
            useWebGL: false,
            reason: `WebGL rendering test failed: ${functionality.error}`,
            capabilities,
            tested: true
          })
          onFallbackUsed?.(`WebGL rendering test failed: ${functionality.error}`)
          return
        }
      }

      // Check performance level for graceful degradation
      if (enableGracefulDegradation && capabilities.performanceLevel === 'low') {
        console.warn('Low WebGL performance detected, consider using fallback')
        // Don't automatically fallback for low performance, just warn
      }

      setFallbackState({
        useWebGL: true,
        reason: '',
        capabilities,
        tested: true
      })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown WebGL error'
      setFallbackState({
        useWebGL: false,
        reason: `WebGL test error: ${errorMessage}`,
        capabilities: null,
        tested: true
      })
      onFallbackUsed?.(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [testWebGL, enableGracefulDegradation, onFallbackUsed])

  useEffect(() => {
    // Delay test slightly to avoid blocking initial render
    const timer = setTimeout(performWebGLTest, 100)
    return () => clearTimeout(timer)
  }, [performWebGLTest])

  // Handle WebGL context lost events
  useEffect(() => {
    const handleContextLost = (event: Event) => {
      event.preventDefault()
      console.warn('WebGL context lost, switching to fallback')
      setFallbackState(prev => ({
        ...prev,
        useWebGL: false,
        reason: 'WebGL context lost'
      }))
      onFallbackUsed?.('WebGL context lost')
    }

    const handleContextRestored = () => {
      console.log('WebGL context restored, retesting...')
      performWebGLTest()
    }

    // Listen for context lost events on any canvas
    const canvases = document.querySelectorAll('canvas')
    canvases.forEach(canvas => {
      canvas.addEventListener('webglcontextlost', handleContextLost)
      canvas.addEventListener('webglcontextrestored', handleContextRestored)
    })

    return () => {
      canvases.forEach(canvas => {
        canvas.removeEventListener('webglcontextlost', handleContextLost)
        canvas.removeEventListener('webglcontextrestored', handleContextRestored)
      })
    }
  }, [performWebGLTest, onFallbackUsed])

  // Show loading state while testing
  if (isLoading || !fallbackState.tested) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gorilla-yellow"></div>
      </div>
    )
  }

  // Use fallback if WebGL is not supported or failed tests
  if (!fallbackState.useWebGL) {
    console.log(`Using fallback: ${fallbackState.reason}`)
    return <div className={className}>{fallback}</div>
  }

  // Use WebGL version
  return <div className={className}>{children}</div>
}

/**
 * Hook for accessing WebGL fallback state
 */
export function useWebGLFallback() {
  const [capabilities, setCapabilities] = useState<WebGLCapabilities | null>(null)
  const [isSupported, setIsSupported] = useState(true)
  const [reason, setReason] = useState('')

  useEffect(() => {
    const caps = getCachedWebGLCapabilities()
    setCapabilities(caps)
    setIsSupported(caps.supported)
    
    if (!caps.supported) {
      setReason('WebGL not supported')
    }
  }, [])

  const testSupport = useCallback(async () => {
    const functionality = testWebGLFunctionality()
    
    if (!functionality.contextCreation || !functionality.shaderCompilation || !functionality.rendering) {
      setIsSupported(false)
      setReason(functionality.error || 'WebGL functionality test failed')
      return false
    }
    
    setIsSupported(true)
    setReason('')
    return true
  }, [])

  return {
    capabilities,
    isSupported,
    reason,
    testSupport,
    performanceLevel: capabilities?.performanceLevel || 'low'
  }
}

/**
 * Higher-order component for WebGL fallbacks
 */
export function withWebGLFallback<P extends object>(
  WebGLComponent: React.ComponentType<P>,
  FallbackComponent: React.ComponentType<P>
) {
  return function WrappedComponent(props: P) {
    return (
      <VisualEffectsFallback
        fallback={<FallbackComponent {...props} />}
        onFallbackUsed={(reason) => console.warn('WebGL fallback used:', reason)}
      >
        <WebGLComponent {...props} />
      </VisualEffectsFallback>
    )
  }
}

/**
 * CSS-based particle fallback component
 */
export function CSSParticlesFallback({ 
  count = 30, 
  className = '' 
}: { 
  count?: number
  className?: string 
}) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Subtle gradient background */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-gorilla-yellow/5 via-transparent to-gorilla-yellow/10"
        style={{
          animation: 'gentle-pulse 8s ease-in-out infinite'
        }}
      />
      
      {/* CSS particles */}
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="absolute bg-gorilla-yellow rounded-full opacity-20"
          style={{
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float-particle ${8 + Math.random() * 12}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 8}s`,
            boxShadow: '0 0 4px rgba(255, 215, 0, 0.3)',
          }}
        />
      ))}
      
      <style jsx>{`
        @keyframes float-particle {
          0%, 100% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: 0.1;
          }
          50% {
            transform: translateY(-20px) translateX(10px) scale(1.2);
            opacity: 0.3;
          }
        }
        
        @keyframes gentle-pulse {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.8;
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          div {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  )
}

/**
 * CSS-based gradient fallback component
 */
export function CSSGradientFallback({ 
  colors = ['#000000', '#FFD700', '#00D4E6'], 
  className = '' 
}: { 
  colors?: string[]
  className?: string 
}) {
  return (
    <div 
      className={`absolute inset-0 ${className}`}
      style={{
        background: `linear-gradient(135deg, ${colors.join(', ')})`,
        backgroundSize: '200% 200%',
        animation: 'gradient-shift 15s ease infinite'
      }}
    >
      <style jsx>{`
        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          div {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  )
}

/**
 * Simple loading fallback for heavy 3D components
 */
export function LoadingFallback({ 
  message = 'Loading visual effects...', 
  className = '' 
}: { 
  message?: string
  className?: string 
}) {
  return (
    <div className={`absolute inset-0 flex items-center justify-center bg-gorilla-black/50 ${className}`}>
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gorilla-yellow mx-auto mb-4"></div>
        <p className="text-gorilla-yellow text-sm">{message}</p>
      </div>
    </div>
  )
}