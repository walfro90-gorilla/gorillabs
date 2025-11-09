/**
 * Browser Compatibility Testing for Visual Effects
 * Tests various browser features and provides compatibility information
 */

export interface BrowserCapabilities {
  webgl: boolean
  webgl2: boolean
  canvas: boolean
  cssTransforms: boolean
  cssAnimations: boolean
  cssFilters: boolean
  backdropFilter: boolean
  intersectionObserver: boolean
  requestAnimationFrame: boolean
  devicePixelRatio: number
  touchSupport: boolean
  reducedMotion: boolean
  darkMode: boolean
  highContrast: boolean
}

export interface PerformanceMetrics {
  deviceMemory?: number
  hardwareConcurrency: number
  connectionType?: string
  effectiveType?: string
  downlink?: number
  rtt?: number
  saveData?: boolean
}

/**
 * Detect comprehensive browser capabilities
 */
export function detectBrowserCapabilities(): BrowserCapabilities {
  // Default capabilities for server-side rendering
  const defaultCapabilities: BrowserCapabilities = {
    webgl: false,
    webgl2: false,
    canvas: false,
    cssTransforms: false,
    cssAnimations: false,
    cssFilters: false,
    backdropFilter: false,
    intersectionObserver: false,
    requestAnimationFrame: false,
    devicePixelRatio: 1,
    touchSupport: false,
    reducedMotion: false,
    darkMode: false,
    highContrast: false
  }

  if (typeof window === 'undefined') {
    return defaultCapabilities
  }

  try {
    // WebGL detection
    const canvas = document.createElement('canvas')
    const webglContext = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    const webgl2Context = canvas.getContext('webgl2')
    
    // CSS feature detection
    const testElement = document.createElement('div')
    const style = testElement.style
    
    return {
      webgl: !!webglContext,
      webgl2: !!webgl2Context,
      canvas: !!canvas.getContext,
      cssTransforms: 'transform' in style || 'webkitTransform' in style,
      cssAnimations: 'animation' in style || 'webkitAnimation' in style,
      cssFilters: 'filter' in style || 'webkitFilter' in style,
      backdropFilter: CSS.supports('backdrop-filter', 'blur(1px)') || CSS.supports('-webkit-backdrop-filter', 'blur(1px)'),
      intersectionObserver: 'IntersectionObserver' in window,
      requestAnimationFrame: 'requestAnimationFrame' in window,
      devicePixelRatio: window.devicePixelRatio || 1,
      touchSupport: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
      reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
      highContrast: window.matchMedia('(prefers-contrast: high)').matches
    }
  } catch (error) {
    console.warn('Error detecting browser capabilities:', error)
    return defaultCapabilities
  }
}

/**
 * Get performance metrics
 */
export function getPerformanceMetrics(): PerformanceMetrics {
  const metrics: PerformanceMetrics = {
    hardwareConcurrency: navigator.hardwareConcurrency || 4
  }

  // Device memory (Chrome only)
  if ('deviceMemory' in navigator) {
    metrics.deviceMemory = (navigator as any).deviceMemory
  }

  // Network information
  const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection
  if (connection) {
    metrics.connectionType = connection.type
    metrics.effectiveType = connection.effectiveType
    metrics.downlink = connection.downlink
    metrics.rtt = connection.rtt
    metrics.saveData = connection.saveData
  }

  return metrics
}

/**
 * Test specific browser features
 */
export function testBrowserFeatures() {
  const results = {
    webglExtensions: [] as string[],
    cssSupport: {} as Record<string, boolean>,
    jsFeatures: {} as Record<string, boolean>,
    performanceAPI: false,
    webWorkers: false,
    serviceWorkers: false
  }

  if (typeof window === 'undefined') {
    return results
  }

  try {
    // WebGL extensions
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    if (gl) {
      const webglContext = gl as WebGLRenderingContext
      results.webglExtensions = webglContext.getSupportedExtensions() || []
    }

    // CSS feature support
    const cssFeatures = [
      'display: grid',
      'display: flex',
      'backdrop-filter: blur(1px)',
      'filter: blur(1px)',
      'transform: translateZ(0)',
      'will-change: transform',
      'contain: layout',
      'scroll-behavior: smooth'
    ]

    cssFeatures.forEach(feature => {
      const [property, value] = feature.split(': ')
      results.cssSupport[feature] = CSS.supports(property, value)
    })

    // JavaScript features
    results.jsFeatures = {
      asyncAwait: typeof (async () => {}) === 'function',
      promises: typeof Promise !== 'undefined',
      fetch: typeof fetch !== 'undefined',
      intersectionObserver: typeof IntersectionObserver !== 'undefined',
      resizeObserver: typeof ResizeObserver !== 'undefined',
      mutationObserver: typeof MutationObserver !== 'undefined',
      webGL: !!gl,
      canvas2D: !!canvas.getContext('2d'),
      audioContext: typeof AudioContext !== 'undefined' || typeof (window as any).webkitAudioContext !== 'undefined'
    }

    // Performance API
    results.performanceAPI = typeof performance !== 'undefined' && typeof performance.now === 'function'

    // Web Workers
    results.webWorkers = typeof Worker !== 'undefined'

    // Service Workers
    results.serviceWorkers = 'serviceWorker' in navigator

  } catch (error) {
    console.warn('Error testing browser features:', error)
  }

  return results
}

/**
 * Get browser-specific recommendations
 */
export function getBrowserRecommendations(capabilities: BrowserCapabilities, metrics: PerformanceMetrics) {
  const recommendations = {
    useWebGL: capabilities.webgl,
    useCSS3D: capabilities.cssTransforms,
    useAnimations: capabilities.cssAnimations && !capabilities.reducedMotion,
    useFilters: capabilities.cssFilters,
    useBackdropFilter: capabilities.backdropFilter,
    particleCount: 100,
    animationComplexity: 'medium' as 'low' | 'medium' | 'high',
    enableParallax: true,
    enableBlur: capabilities.backdropFilter,
    pixelRatio: Math.min(capabilities.devicePixelRatio, 2)
  }

  // Adjust based on performance metrics
  if (metrics.deviceMemory && metrics.deviceMemory < 4) {
    recommendations.particleCount = 50
    recommendations.animationComplexity = 'low'
    recommendations.enableParallax = false
    recommendations.pixelRatio = 1
  }

  if (metrics.hardwareConcurrency < 4) {
    recommendations.particleCount = Math.min(recommendations.particleCount, 75)
    recommendations.animationComplexity = 'low'
  }

  // Network-based adjustments
  if (metrics.effectiveType === 'slow-2g' || metrics.effectiveType === '2g') {
    recommendations.useWebGL = false
    recommendations.particleCount = 20
    recommendations.animationComplexity = 'low'
    recommendations.enableBlur = false
  }

  if (metrics.saveData) {
    recommendations.useWebGL = false
    recommendations.useAnimations = false
    recommendations.particleCount = 0
    recommendations.enableParallax = false
    recommendations.enableBlur = false
  }

  // Accessibility adjustments
  if (capabilities.reducedMotion) {
    recommendations.useAnimations = false
    recommendations.enableParallax = false
    recommendations.animationComplexity = 'low'
  }

  if (capabilities.highContrast) {
    recommendations.enableBlur = false
    recommendations.useFilters = false
  }

  return recommendations
}

/**
 * Test visual effects performance
 */
export function testVisualEffectsPerformance(): Promise<{
  fps: number
  frameTime: number
  stable: boolean
  recommendation: 'high' | 'medium' | 'low'
}> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve({ fps: 0, frameTime: 0, stable: false, recommendation: 'low' })
      return
    }

    const canvas = document.createElement('canvas')
    canvas.width = 200
    canvas.height = 200
    canvas.style.position = 'fixed'
    canvas.style.top = '-1000px'
    canvas.style.left = '-1000px'
    document.body.appendChild(canvas)

    const ctx = canvas.getContext('2d')
    if (!ctx) {
      resolve({ fps: 0, frameTime: 0, stable: false, recommendation: 'low' })
      return
    }

    const context = ctx as CanvasRenderingContext2D
    let frameCount = 0
    let startTime = performance.now()
    let lastFrameTime = startTime
    const frameTimes: number[] = []
    const testDuration = 2000 // 2 seconds

    function animate() {
      const currentTime = performance.now()
      const frameTime = currentTime - lastFrameTime
      frameTimes.push(frameTime)
      lastFrameTime = currentTime

      // Simple animation test
      context.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw some animated shapes
      for (let i = 0; i < 50; i++) {
        const x = (Math.sin(currentTime * 0.001 + i) * 50) + 100
        const y = (Math.cos(currentTime * 0.001 + i) * 50) + 100
        
        context.beginPath()
        context.arc(x, y, 3, 0, Math.PI * 2)
        context.fillStyle = `hsl(${(currentTime * 0.1 + i * 10) % 360}, 70%, 50%)`
        context.fill()
      }

      frameCount++

      if (currentTime - startTime < testDuration) {
        requestAnimationFrame(animate)
      } else {
        // Calculate results
        const totalTime = currentTime - startTime
        const fps = (frameCount * 1000) / totalTime
        const avgFrameTime = frameTimes.reduce((a, b) => a + b, 0) / frameTimes.length
        
        // Check stability (coefficient of variation)
        const variance = frameTimes.reduce((acc, time) => acc + Math.pow(time - avgFrameTime, 2), 0) / frameTimes.length
        const stdDev = Math.sqrt(variance)
        const coefficientOfVariation = stdDev / avgFrameTime
        const stable = coefficientOfVariation < 0.3 // Less than 30% variation

        let recommendation: 'high' | 'medium' | 'low' = 'low'
        if (fps >= 55 && stable) {
          recommendation = 'high'
        } else if (fps >= 30) {
          recommendation = 'medium'
        }

        // Clean up
        document.body.removeChild(canvas)

        resolve({
          fps: Math.round(fps),
          frameTime: Math.round(avgFrameTime * 100) / 100,
          stable,
          recommendation
        })
      }
    }

    requestAnimationFrame(animate)
  })
}

/**
 * Generate compatibility report
 */
export async function generateCompatibilityReport() {
  const capabilities = detectBrowserCapabilities()
  const metrics = getPerformanceMetrics()
  const features = testBrowserFeatures()
  const recommendations = getBrowserRecommendations(capabilities, metrics)
  
  let performanceTest
  try {
    performanceTest = await testVisualEffectsPerformance()
  } catch (error) {
    performanceTest = { fps: 0, frameTime: 0, stable: false, recommendation: 'low' as const }
  }

  return {
    capabilities,
    metrics,
    features,
    recommendations,
    performanceTest,
    userAgent: navigator.userAgent,
    timestamp: new Date().toISOString()
  }
}

/**
 * Cached compatibility results
 */
let cachedReport: Awaited<ReturnType<typeof generateCompatibilityReport>> | null = null

/**
 * Get cached compatibility report
 */
export async function getCachedCompatibilityReport() {
  if (!cachedReport) {
    cachedReport = await generateCompatibilityReport()
  }
  return cachedReport
}

/**
 * Reset cached compatibility report
 */
export function resetCompatibilityCache() {
  cachedReport = null
}