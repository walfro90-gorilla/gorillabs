/**
 * Fallback Testing Utilities
 * Comprehensive testing for visual effects fallback behavior
 */

import { 
  detectWebGLCapabilities, 
  testWebGLFunctionality, 
  getBrowserSpecificWorkarounds,
  type WebGLCapabilities 
} from './webgl-detection'
import { 
  detectBrowserCapabilities, 
  testVisualEffectsPerformance,
  type BrowserCapabilities 
} from './browser-compatibility'

export interface FallbackTestResult {
  testName: string
  passed: boolean
  reason?: string
  recommendation: 'webgl' | 'css' | 'disabled'
  performance?: {
    fps: number
    stable: boolean
  }
}

export interface ComprehensiveTestSuite {
  webglSupport: FallbackTestResult
  shaderCompilation: FallbackTestResult
  textureSupport: FallbackTestResult
  performanceTest: FallbackTestResult
  browserCompatibility: FallbackTestResult
  accessibilityCompliance: FallbackTestResult
  overallRecommendation: 'webgl' | 'css' | 'disabled'
  fallbackReason?: string
}

/**
 * Test WebGL support comprehensively
 */
export async function testWebGLSupport(): Promise<FallbackTestResult> {
  try {
    const capabilities = detectWebGLCapabilities()
    
    if (!capabilities.supported) {
      return {
        testName: 'WebGL Support',
        passed: false,
        reason: 'WebGL not supported by browser',
        recommendation: 'css'
      }
    }

    const functionality = testWebGLFunctionality()
    
    if (!functionality.contextCreation) {
      return {
        testName: 'WebGL Support',
        passed: false,
        reason: `WebGL context creation failed: ${functionality.error}`,
        recommendation: 'css'
      }
    }

    if (!functionality.shaderCompilation) {
      return {
        testName: 'WebGL Support',
        passed: false,
        reason: `Shader compilation failed: ${functionality.error}`,
        recommendation: 'css'
      }
    }

    if (!functionality.rendering) {
      return {
        testName: 'WebGL Support',
        passed: false,
        reason: `WebGL rendering failed: ${functionality.error}`,
        recommendation: 'css'
      }
    }

    return {
      testName: 'WebGL Support',
      passed: true,
      recommendation: capabilities.performanceLevel === 'low' ? 'css' : 'webgl'
    }
  } catch (error) {
    return {
      testName: 'WebGL Support',
      passed: false,
      reason: error instanceof Error ? error.message : 'Unknown WebGL error',
      recommendation: 'css'
    }
  }
}

/**
 * Test shader compilation with various complexity levels
 */
export async function testShaderCompilation(): Promise<FallbackTestResult> {
  if (typeof window === 'undefined') {
    return {
      testName: 'Shader Compilation',
      passed: false,
      reason: 'Not in browser environment',
      recommendation: 'css'
    }
  }

  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    
    if (!gl) {
      return {
        testName: 'Shader Compilation',
        passed: false,
        reason: 'WebGL context not available',
        recommendation: 'css'
      }
    }

    const webglContext = gl as WebGLRenderingContext

    // Test basic vertex shader
    const vertexShader = webglContext.createShader(webglContext.VERTEX_SHADER)
    if (!vertexShader) {
      return {
        testName: 'Shader Compilation',
        passed: false,
        reason: 'Failed to create vertex shader',
        recommendation: 'css'
      }
    }

    const basicVertexSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `

    webglContext.shaderSource(vertexShader, basicVertexSource)
    webglContext.compileShader(vertexShader)

    if (!webglContext.getShaderParameter(vertexShader, webglContext.COMPILE_STATUS)) {
      return {
        testName: 'Shader Compilation',
        passed: false,
        reason: 'Basic vertex shader compilation failed',
        recommendation: 'css'
      }
    }

    // Test complex fragment shader
    const fragmentShader = webglContext.createShader(webglContext.FRAGMENT_SHADER)
    if (!fragmentShader) {
      return {
        testName: 'Shader Compilation',
        passed: false,
        reason: 'Failed to create fragment shader',
        recommendation: 'css'
      }
    }

    const complexFragmentSource = `
      precision mediump float;
      uniform float time;
      uniform vec2 resolution;
      
      float noise(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
      }
      
      void main() {
        vec2 st = gl_FragCoord.xy / resolution.xy;
        float n = noise(st + time);
        gl_FragColor = vec4(vec3(n), 1.0);
      }
    `

    webglContext.shaderSource(fragmentShader, complexFragmentSource)
    webglContext.compileShader(fragmentShader)

    const complexShaderWorks = webglContext.getShaderParameter(fragmentShader, webglContext.COMPILE_STATUS)

    // Clean up
    webglContext.deleteShader(vertexShader)
    webglContext.deleteShader(fragmentShader)
    canvas.remove()

    return {
      testName: 'Shader Compilation',
      passed: true,
      recommendation: complexShaderWorks ? 'webgl' : 'css',
      reason: complexShaderWorks ? undefined : 'Complex shaders not supported, use simple effects'
    }
  } catch (error) {
    return {
      testName: 'Shader Compilation',
      passed: false,
      reason: error instanceof Error ? error.message : 'Shader compilation test failed',
      recommendation: 'css'
    }
  }
}

/**
 * Test texture support and capabilities
 */
export async function testTextureSupport(): Promise<FallbackTestResult> {
  if (typeof window === 'undefined') {
    return {
      testName: 'Texture Support',
      passed: false,
      reason: 'Not in browser environment',
      recommendation: 'css'
    }
  }

  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    
    if (!gl) {
      return {
        testName: 'Texture Support',
        passed: false,
        reason: 'WebGL context not available',
        recommendation: 'css'
      }
    }

    const webglContext = gl as WebGLRenderingContext

    // Test basic texture creation
    const texture = webglContext.createTexture()
    if (!texture) {
      return {
        testName: 'Texture Support',
        passed: false,
        reason: 'Failed to create texture',
        recommendation: 'css'
      }
    }

    webglContext.bindTexture(webglContext.TEXTURE_2D, texture)
    
    // Test different texture formats
    const formats = [
      { format: webglContext.RGBA, type: webglContext.UNSIGNED_BYTE, name: 'RGBA' },
      { format: webglContext.RGB, type: webglContext.UNSIGNED_BYTE, name: 'RGB' }
    ]

    let supportedFormats = 0
    
    for (const fmt of formats) {
      try {
        webglContext.texImage2D(webglContext.TEXTURE_2D, 0, fmt.format, 1, 1, 0, fmt.format, fmt.type, new Uint8Array([255, 0, 0, 255]))
        supportedFormats++
      } catch (e) {
        console.warn(`Texture format ${fmt.name} not supported`)
      }
    }

    // Test texture size limits
    const maxTextureSize = webglContext.getParameter(webglContext.MAX_TEXTURE_SIZE)
    
    // Clean up
    webglContext.deleteTexture(texture)
    canvas.remove()

    if (supportedFormats === 0) {
      return {
        testName: 'Texture Support',
        passed: false,
        reason: 'No supported texture formats',
        recommendation: 'css'
      }
    }

    return {
      testName: 'Texture Support',
      passed: true,
      recommendation: maxTextureSize >= 1024 ? 'webgl' : 'css',
      reason: maxTextureSize < 1024 ? 'Limited texture size support' : undefined
    }
  } catch (error) {
    return {
      testName: 'Texture Support',
      passed: false,
      reason: error instanceof Error ? error.message : 'Texture support test failed',
      recommendation: 'css'
    }
  }
}

/**
 * Test visual effects performance
 */
export async function testPerformance(): Promise<FallbackTestResult> {
  try {
    const performanceResult = await testVisualEffectsPerformance()
    
    return {
      testName: 'Performance Test',
      passed: performanceResult.fps >= 30,
      recommendation: performanceResult.recommendation === 'high' ? 'webgl' : 
                     performanceResult.recommendation === 'medium' ? 'css' : 'disabled',
      performance: {
        fps: performanceResult.fps,
        stable: performanceResult.stable
      },
      reason: performanceResult.fps < 30 ? `Low FPS: ${performanceResult.fps}` : undefined
    }
  } catch (error) {
    return {
      testName: 'Performance Test',
      passed: false,
      reason: error instanceof Error ? error.message : 'Performance test failed',
      recommendation: 'css'
    }
  }
}

/**
 * Test browser compatibility
 */
export async function testBrowserCompatibility(): Promise<FallbackTestResult> {
  try {
    const capabilities = detectBrowserCapabilities()
    const workarounds = getBrowserSpecificWorkarounds()
    
    // Check for known problematic configurations
    const issues = []
    
    if (!capabilities.webgl) {
      issues.push('WebGL not supported')
    }
    
    if (!capabilities.cssAnimations) {
      issues.push('CSS animations not supported')
    }
    
    if (workarounds.forceWebGL1) {
      issues.push('Browser requires WebGL1 fallback')
    }
    
    if (workarounds.reducedPrecision) {
      issues.push('Browser has precision limitations')
    }

    const hasSerious = issues.some(issue => 
      issue.includes('WebGL not supported') || 
      issue.includes('CSS animations not supported')
    )

    return {
      testName: 'Browser Compatibility',
      passed: !hasSerious,
      recommendation: hasSerious ? 'disabled' : 
                     issues.length > 0 ? 'css' : 'webgl',
      reason: issues.length > 0 ? issues.join(', ') : undefined
    }
  } catch (error) {
    return {
      testName: 'Browser Compatibility',
      passed: false,
      reason: error instanceof Error ? error.message : 'Browser compatibility test failed',
      recommendation: 'css'
    }
  }
}

/**
 * Test accessibility compliance
 */
export async function testAccessibilityCompliance(): Promise<FallbackTestResult> {
  try {
    const capabilities = detectBrowserCapabilities()
    
    // Check accessibility preferences
    const issues = []
    
    if (capabilities.reducedMotion) {
      issues.push('User prefers reduced motion')
    }
    
    if (capabilities.highContrast) {
      issues.push('User prefers high contrast')
    }

    // Check if we can respect these preferences
    const canRespectPreferences = capabilities.cssAnimations && capabilities.cssTransforms

    return {
      testName: 'Accessibility Compliance',
      passed: canRespectPreferences,
      recommendation: capabilities.reducedMotion ? 'disabled' : 
                     capabilities.highContrast ? 'css' : 'webgl',
      reason: !canRespectPreferences ? 'Cannot respect accessibility preferences' : 
              issues.length > 0 ? issues.join(', ') : undefined
    }
  } catch (error) {
    return {
      testName: 'Accessibility Compliance',
      passed: false,
      reason: error instanceof Error ? error.message : 'Accessibility test failed',
      recommendation: 'disabled'
    }
  }
}

/**
 * Run comprehensive fallback test suite
 */
export async function runComprehensiveTestSuite(): Promise<ComprehensiveTestSuite> {
  const tests = await Promise.all([
    testWebGLSupport(),
    testShaderCompilation(),
    testTextureSupport(),
    testPerformance(),
    testBrowserCompatibility(),
    testAccessibilityCompliance()
  ])

  const [
    webglSupport,
    shaderCompilation,
    textureSupport,
    performanceTest,
    browserCompatibility,
    accessibilityCompliance
  ] = tests

  // Determine overall recommendation
  let overallRecommendation: 'webgl' | 'css' | 'disabled' = 'webgl'
  let fallbackReason: string | undefined

  // If accessibility requires disabled effects, respect that
  if (accessibilityCompliance.recommendation === 'disabled') {
    overallRecommendation = 'disabled'
    fallbackReason = accessibilityCompliance.reason
  }
  // If browser compatibility is poor, disable effects
  else if (browserCompatibility.recommendation === 'disabled') {
    overallRecommendation = 'disabled'
    fallbackReason = browserCompatibility.reason
  }
  // If WebGL is not supported, use CSS
  else if (!webglSupport.passed) {
    overallRecommendation = 'css'
    fallbackReason = webglSupport.reason
  }
  // If performance is poor, use CSS or disable
  else if (performanceTest.recommendation === 'disabled') {
    overallRecommendation = 'disabled'
    fallbackReason = performanceTest.reason
  }
  else if (performanceTest.recommendation === 'css') {
    overallRecommendation = 'css'
    fallbackReason = performanceTest.reason
  }
  // If shaders don't work, use CSS
  else if (shaderCompilation.recommendation === 'css') {
    overallRecommendation = 'css'
    fallbackReason = shaderCompilation.reason
  }

  return {
    webglSupport,
    shaderCompilation,
    textureSupport,
    performanceTest,
    browserCompatibility,
    accessibilityCompliance,
    overallRecommendation,
    fallbackReason
  }
}

/**
 * Test specific fallback scenarios
 */
export async function testFallbackScenarios() {
  const scenarios = [
    {
      name: 'WebGL Disabled',
      test: async () => {
        // Simulate WebGL being disabled
        const originalGetContext = HTMLCanvasElement.prototype.getContext
        HTMLCanvasElement.prototype.getContext = function(contextType: any, options?: any): any {
          if (contextType === 'webgl' || contextType === 'experimental-webgl' || contextType === 'webgl2') {
            return null
          }
          return originalGetContext.call(this, contextType, options)
        }
        
        const result = await testWebGLSupport()
        
        // Restore original method
        HTMLCanvasElement.prototype.getContext = originalGetContext
        
        return result
      }
    },
    {
      name: 'Low Performance Device',
      test: async () => {
        // Simulate low performance by overriding navigator properties
        const originalHardwareConcurrency = navigator.hardwareConcurrency
        Object.defineProperty(navigator, 'hardwareConcurrency', {
          value: 2,
          configurable: true
        })
        
        const result = await testPerformance()
        
        // Restore original value
        if (originalHardwareConcurrency !== undefined) {
          Object.defineProperty(navigator, 'hardwareConcurrency', {
            value: originalHardwareConcurrency,
            configurable: true
          })
        }
        
        return result
      }
    },
    {
      name: 'Reduced Motion Preference',
      test: async () => {
        // Mock reduced motion preference
        const originalMatchMedia = window.matchMedia
        window.matchMedia = (query: string) => {
          if (query === '(prefers-reduced-motion: reduce)') {
            return { matches: true } as MediaQueryList
          }
          return originalMatchMedia(query)
        }
        
        const result = await testAccessibilityCompliance()
        
        // Restore original method
        window.matchMedia = originalMatchMedia
        
        return result
      }
    }
  ]

  const results = []
  for (const scenario of scenarios) {
    try {
      const result = await scenario.test()
      results.push({
        scenario: scenario.name,
        result
      })
    } catch (error) {
      results.push({
        scenario: scenario.name,
        result: {
          testName: scenario.name,
          passed: false,
          reason: error instanceof Error ? error.message : 'Test failed',
          recommendation: 'css' as const
        }
      })
    }
  }

  return results
}

/**
 * Generate fallback test report
 */
export async function generateFallbackTestReport() {
  const comprehensiveTests = await runComprehensiveTestSuite()
  const scenarioTests = await testFallbackScenarios()
  
  return {
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    comprehensiveTests,
    scenarioTests,
    summary: {
      recommendation: comprehensiveTests.overallRecommendation,
      reason: comprehensiveTests.fallbackReason,
      testsRun: Object.keys(comprehensiveTests).length - 2, // Exclude recommendation and reason
      testsPassed: Object.values(comprehensiveTests)
        .filter(test => typeof test === 'object' && 'passed' in test)
        .filter(test => test.passed).length
    }
  }
}