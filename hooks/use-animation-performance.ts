"use client"

import { useState, useEffect, useCallback, useRef } from 'react'

interface PerformanceMetrics {
  fps: number
  averageFPS: number
  frameDrops: number
  isStable: boolean
  quality: 'low' | 'medium' | 'high'
}

interface AnimationSettings {
  duration: number
  particleCount: number
  enableComplexEffects: boolean
  useGPUAcceleration: boolean
}

/**
 * Hook for monitoring animation performance and automatically adjusting quality
 */
export function useAnimationPerformance() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    averageFPS: 60,
    frameDrops: 0,
    isStable: true,
    quality: 'high'
  })
  
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [settings, setSettings] = useState<AnimationSettings>({
    duration: 300,
    particleCount: 50,
    enableComplexEffects: true,
    useGPUAcceleration: true
  })
  
  const frameTimesRef = useRef<number[]>([])
  const lastFrameTimeRef = useRef<number>(0)
  const animationFrameRef = useRef<number | undefined>(undefined)
  const isMonitoringRef = useRef<boolean>(false)

  // Check for reduced motion preference
  useEffect(() => {
    const checkReducedMotion = () => {
      if (typeof window !== 'undefined') {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
        setPrefersReducedMotion(mediaQuery.matches)
        
        const handleChange = (e: MediaQueryListEvent) => {
          setPrefersReducedMotion(e.matches)
        }
        
        mediaQuery.addEventListener('change', handleChange)
        return () => mediaQuery.removeEventListener('change', handleChange)
      }
    }
    
    return checkReducedMotion()
  }, [])

  // Frame rate monitoring function
  const measureFrameRate = useCallback(() => {
    const currentTime = performance.now()
    
    if (lastFrameTimeRef.current > 0) {
      const deltaTime = currentTime - lastFrameTimeRef.current
      const fps = 1000 / deltaTime
      
      frameTimesRef.current.push(fps)
      
      // Keep only last 60 frames for rolling average
      if (frameTimesRef.current.length > 60) {
        frameTimesRef.current.shift()
      }
      
      // Calculate metrics
      const averageFPS = frameTimesRef.current.reduce((sum, fps) => sum + fps, 0) / frameTimesRef.current.length
      const frameDrops = frameTimesRef.current.filter(fps => fps < 30).length
      
      // Check stability (coefficient of variation)
      const variance = frameTimesRef.current.reduce((acc, fps) => acc + Math.pow(fps - averageFPS, 2), 0) / frameTimesRef.current.length
      const stdDev = Math.sqrt(variance)
      const coefficientOfVariation = stdDev / averageFPS
      const isStable = coefficientOfVariation < 0.2
      
      // Determine quality level
      let quality: 'low' | 'medium' | 'high' = 'high'
      if (averageFPS < 30 || !isStable) {
        quality = 'low'
      } else if (averageFPS < 50) {
        quality = 'medium'
      }
      
      setMetrics({
        fps: Math.round(fps),
        averageFPS: Math.round(averageFPS),
        frameDrops,
        isStable,
        quality
      })
    }
    
    lastFrameTimeRef.current = currentTime
    
    if (isMonitoringRef.current) {
      animationFrameRef.current = requestAnimationFrame(measureFrameRate)
    }
  }, [])

  // Start/stop monitoring
  const startMonitoring = useCallback(() => {
    if (!isMonitoringRef.current) {
      isMonitoringRef.current = true
      lastFrameTimeRef.current = performance.now()
      measureFrameRate()
    }
  }, [measureFrameRate])

  const stopMonitoring = useCallback(() => {
    isMonitoringRef.current = false
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [])

  // Auto-adjust settings based on performance
  useEffect(() => {
    const newSettings: AnimationSettings = {
      duration: 300,
      particleCount: 50,
      enableComplexEffects: true,
      useGPUAcceleration: true
    }

    switch (metrics.quality) {
      case 'low':
        newSettings.duration = 600
        newSettings.particleCount = 10
        newSettings.enableComplexEffects = false
        newSettings.useGPUAcceleration = false
        break
      case 'medium':
        newSettings.duration = 450
        newSettings.particleCount = 25
        newSettings.enableComplexEffects = true
        newSettings.useGPUAcceleration = true
        break
      case 'high':
        newSettings.duration = 300
        newSettings.particleCount = 50
        newSettings.enableComplexEffects = true
        newSettings.useGPUAcceleration = true
        break
    }

    // Override settings if reduced motion is preferred
    if (prefersReducedMotion) {
      newSettings.duration = 0
      newSettings.particleCount = 0
      newSettings.enableComplexEffects = false
      newSettings.useGPUAcceleration = false
    }

    setSettings(newSettings)
  }, [metrics.quality, prefersReducedMotion])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopMonitoring()
    }
  }, [stopMonitoring])

  // Get optimized CSS properties based on current quality
  const getOptimizedProperties = useCallback(() => {
    const baseProperties = {
      willChange: 'auto',
      backfaceVisibility: 'hidden' as const,
      perspective: '1000px',
      transform: 'translate3d(0, 0, 0)'
    }

    if (prefersReducedMotion) {
      return {
        ...baseProperties,
        animationDuration: '0.01ms',
        transitionDuration: '0.01ms'
      }
    }

    switch (metrics.quality) {
      case 'low':
        return {
          ...baseProperties,
          willChange: 'auto',
          animationDuration: '2s',
          transitionDuration: '2s',
          animationTimingFunction: 'ease-out'
        }
      case 'medium':
        return {
          ...baseProperties,
          willChange: 'transform, opacity',
          animationDuration: '1s',
          transitionDuration: '1s',
          animationTimingFunction: 'ease-in-out'
        }
      case 'high':
        return {
          ...baseProperties,
          willChange: 'transform, opacity, filter',
          animationDuration: '0.5s',
          transitionDuration: '0.5s',
          animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
        }
    }
  }, [metrics.quality, prefersReducedMotion])

  // Get particle settings based on performance
  const getParticleSettings = useCallback(() => {
    if (prefersReducedMotion) {
      return {
        count: 0,
        size: 0,
        opacity: 0,
        animationDuration: '0s',
        enableBlur: false
      }
    }

    switch (metrics.quality) {
      case 'low':
        return {
          count: 10,
          size: 2,
          opacity: 0.1,
          animationDuration: '8s',
          enableBlur: false
        }
      case 'medium':
        return {
          count: 25,
          size: 3,
          opacity: 0.2,
          animationDuration: '6s',
          enableBlur: false
        }
      case 'high':
        return {
          count: 50,
          size: 4,
          opacity: 0.3,
          animationDuration: '4s',
          enableBlur: true
        }
    }
  }, [metrics.quality, prefersReducedMotion])

  // Apply performance class to document
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove('performance-low', 'performance-medium', 'performance-high')
      document.documentElement.classList.add(`performance-${metrics.quality}`)
      
      if (prefersReducedMotion) {
        document.documentElement.classList.add('reduced-motion')
      } else {
        document.documentElement.classList.remove('reduced-motion')
      }
    }
  }, [metrics.quality, prefersReducedMotion])

  return {
    metrics,
    settings,
    prefersReducedMotion,
    startMonitoring,
    stopMonitoring,
    getOptimizedProperties,
    getParticleSettings,
    // Utility functions
    shouldUseGPUAcceleration: () => settings.useGPUAcceleration && !prefersReducedMotion,
    shouldEnableComplexEffects: () => settings.enableComplexEffects && !prefersReducedMotion,
    getOptimizedDuration: (baseDuration: number) => {
      if (prefersReducedMotion) return 0
      return baseDuration * (metrics.quality === 'low' ? 2 : metrics.quality === 'medium' ? 1.5 : 1)
    }
  }
}

/**
 * Hook for managing will-change property efficiently
 */
export function useWillChange() {
  const [isAnimating, setIsAnimating] = useState(false)
  const elementRef = useRef<HTMLElement | null>(null)

  const startAnimation = useCallback((properties: string[] = ['transform', 'opacity']) => {
    setIsAnimating(true)
    if (elementRef.current) {
      elementRef.current.style.willChange = properties.join(', ')
    }
  }, [])

  const endAnimation = useCallback(() => {
    setIsAnimating(false)
    if (elementRef.current) {
      elementRef.current.style.willChange = 'auto'
    }
  }, [])

  const setElement = useCallback((element: HTMLElement | null) => {
    elementRef.current = element
  }, [])

  return {
    isAnimating,
    startAnimation,
    endAnimation,
    setElement
  }
}

/**
 * Hook for creating performance-aware CSS transforms
 */
export function useOptimizedTransform() {
  const [useGPU, setUseGPU] = useState(true)

  useEffect(() => {
    // Simple GPU detection
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    setUseGPU(!!gl)
  }, [])

  const createTransform = useCallback((
    x: number = 0,
    y: number = 0,
    z: number = 0,
    scale: number = 1,
    rotate: number = 0
  ) => {
    if (useGPU) {
      return `translate3d(${x}px, ${y}px, ${z}px) scale(${scale}) rotate(${rotate}deg)`
    } else {
      return `translate(${x}px, ${y}px) scale(${scale}) rotate(${rotate}deg)`
    }
  }, [useGPU])

  const createMatrix = useCallback((
    scaleX: number = 1,
    skewY: number = 0,
    skewX: number = 0,
    scaleY: number = 1,
    translateX: number = 0,
    translateY: number = 0
  ) => {
    return `matrix(${scaleX}, ${skewY}, ${skewX}, ${scaleY}, ${translateX}, ${translateY})`
  }, [])

  return {
    createTransform,
    createMatrix,
    shouldUseGPUAcceleration: () => useGPU
  }
}