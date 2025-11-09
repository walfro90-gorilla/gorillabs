/**
 * Animation Performance Optimization System
 * Monitors frame rates and automatically adjusts animation quality
 */

export interface AnimationPerformanceSettings {
  targetFPS: number
  minFPS: number
  maxFPS: number
  qualityLevel: 'low' | 'medium' | 'high'
  enableGPUAcceleration: boolean
  respectReducedMotion: boolean
  enableFrameRateMonitoring: boolean
}

export interface PerformanceMetrics {
  currentFPS: number
  averageFPS: number
  frameDrops: number
  lastFrameTime: number
  isStable: boolean
  qualityRecommendation: 'low' | 'medium' | 'high'
}

/**
 * Frame Rate Monitor
 * Tracks animation performance and provides optimization recommendations
 */
export class FrameRateMonitor {
  private frames: number[] = []
  private lastFrameTime: number = 0
  private frameDrops: number = 0
  private isRunning: boolean = false
  private animationId: number | null = null
  private callbacks: ((metrics: PerformanceMetrics) => void)[] = []
  private settings: AnimationPerformanceSettings

  constructor(settings: Partial<AnimationPerformanceSettings> = {}) {
    this.settings = {
      targetFPS: 60,
      minFPS: 30,
      maxFPS: 120,
      qualityLevel: 'high',
      enableGPUAcceleration: true,
      respectReducedMotion: true,
      enableFrameRateMonitoring: true,
      ...settings
    }
  }

  start() {
    if (this.isRunning) return
    
    this.isRunning = true
    this.lastFrameTime = performance.now()
    this.tick()
  }

  stop() {
    this.isRunning = false
    if (this.animationId) {
      cancelAnimationFrame(this.animationId)
      this.animationId = null
    }
  }

  private tick = () => {
    if (!this.isRunning) return

    const currentTime = performance.now()
    const deltaTime = currentTime - this.lastFrameTime
    const fps = 1000 / deltaTime

    // Track frame data
    this.frames.push(fps)
    
    // Keep only last 60 frames for rolling average
    if (this.frames.length > 60) {
      this.frames.shift()
    }

    // Detect frame drops
    if (fps < this.settings.minFPS) {
      this.frameDrops++
    }

    // Calculate metrics
    const metrics = this.calculateMetrics()
    
    // Notify callbacks
    this.callbacks.forEach(callback => callback(metrics))

    this.lastFrameTime = currentTime
    this.animationId = requestAnimationFrame(this.tick)
  }

  private calculateMetrics(): PerformanceMetrics {
    const currentFPS = this.frames[this.frames.length - 1] || 0
    const averageFPS = this.frames.reduce((sum, fps) => sum + fps, 0) / this.frames.length
    
    // Check stability (coefficient of variation)
    const variance = this.frames.reduce((acc, fps) => acc + Math.pow(fps - averageFPS, 2), 0) / this.frames.length
    const stdDev = Math.sqrt(variance)
    const coefficientOfVariation = stdDev / averageFPS
    const isStable = coefficientOfVariation < 0.2 // Less than 20% variation

    // Quality recommendation
    let qualityRecommendation: 'low' | 'medium' | 'high' = 'high'
    if (averageFPS < 30 || !isStable) {
      qualityRecommendation = 'low'
    } else if (averageFPS < 50) {
      qualityRecommendation = 'medium'
    }

    return {
      currentFPS: Math.round(currentFPS),
      averageFPS: Math.round(averageFPS),
      frameDrops: this.frameDrops,
      lastFrameTime: this.lastFrameTime,
      isStable,
      qualityRecommendation
    }
  }

  onMetricsUpdate(callback: (metrics: PerformanceMetrics) => void) {
    this.callbacks.push(callback)
    return () => {
      const index = this.callbacks.indexOf(callback)
      if (index > -1) {
        this.callbacks.splice(index, 1)
      }
    }
  }

  getMetrics(): PerformanceMetrics {
    return this.calculateMetrics()
  }

  reset() {
    this.frames = []
    this.frameDrops = 0
    this.lastFrameTime = performance.now()
  }
}

/**
 * Animation Quality Manager
 * Automatically adjusts animation settings based on performance
 */
export class AnimationQualityManager {
  private monitor: FrameRateMonitor
  private currentQuality: 'low' | 'medium' | 'high' = 'high'
  private qualityChangeCallbacks: ((quality: 'low' | 'medium' | 'high') => void)[] = []
  private autoAdjustEnabled: boolean = true
  private adjustmentThreshold: number = 5 // seconds before adjustment

  constructor(settings?: Partial<AnimationPerformanceSettings>) {
    this.monitor = new FrameRateMonitor(settings)
    
    // Monitor performance and auto-adjust
    this.monitor.onMetricsUpdate((metrics) => {
      if (this.autoAdjustEnabled) {
        this.handlePerformanceUpdate(metrics)
      }
    })
  }

  start() {
    this.monitor.start()
  }

  stop() {
    this.monitor.stop()
  }

  private handlePerformanceUpdate(metrics: PerformanceMetrics) {
    // Only adjust after collecting enough data
    if (this.monitor.getMetrics().lastFrameTime < this.adjustmentThreshold * 1000) {
      return
    }

    const recommendedQuality = metrics.qualityRecommendation
    
    if (recommendedQuality !== this.currentQuality) {
      this.setQuality(recommendedQuality)
    }
  }

  setQuality(quality: 'low' | 'medium' | 'high') {
    if (this.currentQuality === quality) return

    this.currentQuality = quality
    this.qualityChangeCallbacks.forEach(callback => callback(quality))
  }

  getQuality(): 'low' | 'medium' | 'high' {
    return this.currentQuality
  }

  onQualityChange(callback: (quality: 'low' | 'medium' | 'high') => void) {
    this.qualityChangeCallbacks.push(callback)
    return () => {
      const index = this.qualityChangeCallbacks.indexOf(callback)
      if (index > -1) {
        this.qualityChangeCallbacks.splice(index, 1)
      }
    }
  }

  enableAutoAdjust(enabled: boolean) {
    this.autoAdjustEnabled = enabled
  }

  getMetrics(): PerformanceMetrics {
    return this.monitor.getMetrics()
  }
}

/**
 * CSS Animation Optimizer
 * Provides optimized CSS properties and values based on performance level
 */
export class CSSAnimationOptimizer {
  static getOptimizedProperties(quality: 'low' | 'medium' | 'high') {
    switch (quality) {
      case 'low':
        return {
          willChange: 'auto',
          transform: 'translateZ(0)', // Force GPU layer
          animationDuration: '2s', // Slower animations
          animationTimingFunction: 'ease-out',
          animationFillMode: 'both',
          backfaceVisibility: 'hidden',
          perspective: '1000px'
        }
      
      case 'medium':
        return {
          willChange: 'transform, opacity',
          transform: 'translate3d(0, 0, 0)', // GPU acceleration
          animationDuration: '1s',
          animationTimingFunction: 'ease-in-out',
          animationFillMode: 'both',
          backfaceVisibility: 'hidden',
          perspective: '1000px'
        }
      
      case 'high':
        return {
          willChange: 'transform, opacity, filter',
          transform: 'translate3d(0, 0, 0)',
          animationDuration: '0.5s',
          animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          animationFillMode: 'both',
          backfaceVisibility: 'hidden',
          perspective: '1000px'
        }
    }
  }

  static getParticleSettings(quality: 'low' | 'medium' | 'high') {
    switch (quality) {
      case 'low':
        return {
          count: 10,
          animationDuration: '8s',
          opacity: 0.1,
          size: 2,
          enableBlur: false
        }
      
      case 'medium':
        return {
          count: 30,
          animationDuration: '6s',
          opacity: 0.2,
          size: 3,
          enableBlur: false
        }
      
      case 'high':
        return {
          count: 60,
          animationDuration: '4s',
          opacity: 0.3,
          size: 4,
          enableBlur: true
        }
    }
  }

  static generateOptimizedKeyframes(
    name: string,
    keyframes: Record<string, Record<string, string>>,
    quality: 'low' | 'medium' | 'high'
  ): string {
    const optimizedProps = this.getOptimizedProperties(quality)
    
    let css = `@keyframes ${name} {\n`
    
    Object.entries(keyframes).forEach(([percentage, properties]) => {
      css += `  ${percentage} {\n`
      
      // Add optimized properties
      Object.entries(properties).forEach(([prop, value]) => {
        css += `    ${prop}: ${value};\n`
      })
      
      // Add performance optimizations
      if (percentage === '0%' || percentage === 'from') {
        css += `    will-change: ${optimizedProps.willChange};\n`
        css += `    backface-visibility: ${optimizedProps.backfaceVisibility};\n`
      }
      
      css += `  }\n`
    })
    
    css += `}\n`
    
    return css
  }
}

/**
 * Reduced Motion Handler
 * Manages animations based on user preferences
 */
export class ReducedMotionHandler {
  private prefersReducedMotion: boolean = false
  private callbacks: ((reduced: boolean) => void)[] = []

  constructor() {
    this.checkReducedMotionPreference()
    this.setupMediaQueryListener()
  }

  private checkReducedMotionPreference() {
    if (typeof window === 'undefined') return

    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }

  private setupMediaQueryListener() {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    
    const handleChange = (e: MediaQueryListEvent) => {
      this.prefersReducedMotion = e.matches
      this.callbacks.forEach(callback => callback(this.prefersReducedMotion))
    }

    mediaQuery.addEventListener('change', handleChange)
  }

  getPrefersReducedMotion(): boolean {
    return this.prefersReducedMotion
  }

  onPreferenceChange(callback: (reduced: boolean) => void) {
    this.callbacks.push(callback)
    return () => {
      const index = this.callbacks.indexOf(callback)
      if (index > -1) {
        this.callbacks.splice(index, 1)
      }
    }
  }

  getAnimationSettings() {
    if (this.prefersReducedMotion) {
      return {
        duration: '0.01ms',
        iterationCount: '1',
        playState: 'paused'
      }
    }

    return {
      duration: 'normal',
      iterationCount: 'normal',
      playState: 'running'
    }
  }
}

/**
 * Global Animation Performance Manager
 * Singleton instance for managing animation performance across the app
 */
class GlobalAnimationManager {
  private qualityManager: AnimationQualityManager | null = null
  private reducedMotionHandler: ReducedMotionHandler | null = null
  private isInitialized: boolean = false

  initialize(settings?: Partial<AnimationPerformanceSettings>) {
    if (this.isInitialized) return

    this.qualityManager = new AnimationQualityManager(settings)
    this.reducedMotionHandler = new ReducedMotionHandler()
    
    // Start monitoring if not in reduced motion mode
    if (!this.reducedMotionHandler.getPrefersReducedMotion()) {
      this.qualityManager.start()
    }

    // Handle reduced motion changes
    this.reducedMotionHandler.onPreferenceChange((reduced) => {
      if (reduced) {
        this.qualityManager?.stop()
      } else {
        this.qualityManager?.start()
      }
    })

    this.isInitialized = true
  }

  getQualityManager(): AnimationQualityManager | null {
    return this.qualityManager
  }

  getReducedMotionHandler(): ReducedMotionHandler | null {
    return this.reducedMotionHandler
  }

  cleanup() {
    this.qualityManager?.stop()
    this.isInitialized = false
  }
}

export const globalAnimationManager = new GlobalAnimationManager()

/**
 * Utility functions for optimized animations
 */
export const AnimationUtils = {
  /**
   * Create GPU-accelerated transform string
   */
  createTransform(x: number = 0, y: number = 0, z: number = 0, scale: number = 1, rotate: number = 0): string {
    return `translate3d(${x}px, ${y}px, ${z}px) scale(${scale}) rotate(${rotate}deg)`
  },

  /**
   * Get optimized animation duration based on quality
   */
  getOptimizedDuration(baseDuration: number, quality: 'low' | 'medium' | 'high'): number {
    const multipliers = { low: 2, medium: 1.5, high: 1 }
    return baseDuration * multipliers[quality]
  },

  /**
   * Check if element should use GPU acceleration
   */
  shouldUseGPUAcceleration(element: HTMLElement): boolean {
    // Check if element is likely to benefit from GPU acceleration
    const rect = element.getBoundingClientRect()
    const area = rect.width * rect.height
    
    // Use GPU acceleration for larger elements or those with transforms
    return area > 10000 || element.style.transform !== ''
  },

  /**
   * Apply performance optimizations to element
   */
  optimizeElement(element: HTMLElement, quality: 'low' | 'medium' | 'high') {
    const props = CSSAnimationOptimizer.getOptimizedProperties(quality)
    
    Object.entries(props).forEach(([prop, value]) => {
      const cssProperty = prop.replace(/([A-Z])/g, '-$1').toLowerCase()
      element.style.setProperty(cssProperty, value)
    })
  }
}

// React import for the hook
import React from 'react'

/**
 * Performance-aware animation hook for React components
 */
export function useAnimationPerformance() {
  const [quality, setQuality] = React.useState<'low' | 'medium' | 'high'>('high')
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false)
  const [metrics, setMetrics] = React.useState<PerformanceMetrics | null>(null)

  React.useEffect(() => {
    // Initialize global manager
    globalAnimationManager.initialize()

    const qualityManager = globalAnimationManager.getQualityManager()
    const reducedMotionHandler = globalAnimationManager.getReducedMotionHandler()

    if (!qualityManager || !reducedMotionHandler) return

    // Set initial values
    setQuality(qualityManager.getQuality())
    setPrefersReducedMotion(reducedMotionHandler.getPrefersReducedMotion())

    // Subscribe to changes
    const unsubscribeQuality = qualityManager.onQualityChange(setQuality)
    const unsubscribeMotion = reducedMotionHandler.onPreferenceChange(setPrefersReducedMotion)
    const unsubscribeMetrics = qualityManager.onMetricsUpdate(setMetrics)

    return () => {
      unsubscribeQuality()
      unsubscribeMotion()
      unsubscribeMetrics()
    }
  }, [])

  return {
    quality,
    prefersReducedMotion,
    metrics,
    setQuality: (newQuality: 'low' | 'medium' | 'high') => {
      globalAnimationManager.getQualityManager()?.setQuality(newQuality)
    },
    getOptimizedProperties: () => CSSAnimationOptimizer.getOptimizedProperties(quality),
    getParticleSettings: () => CSSAnimationOptimizer.getParticleSettings(quality)
  }
}