/**
 * Comprehensive WebGL Detection and Fallback System
 * Provides detailed WebGL capability detection and graceful degradation
 */

export interface WebGLCapabilities {
  supported: boolean
  version: 'webgl' | 'webgl2' | null
  maxTextureSize: number
  maxVertexAttributes: number
  maxFragmentUniforms: number
  maxVertexUniforms: number
  extensions: string[]
  renderer: string
  vendor: string
  performanceLevel: 'high' | 'medium' | 'low'
}

export interface FeatureSupport {
  webgl: boolean
  webgl2: boolean
  shaders: boolean
  floatTextures: boolean
  depthTextures: boolean
  instancedArrays: boolean
  vertexArrayObjects: boolean
  multipleRenderTargets: boolean
  anisotropicFiltering: boolean
}

/**
 * Detect WebGL support and capabilities
 */
export function detectWebGLCapabilities(): WebGLCapabilities {
  const defaultCapabilities: WebGLCapabilities = {
    supported: false,
    version: null,
    maxTextureSize: 0,
    maxVertexAttributes: 0,
    maxFragmentUniforms: 0,
    maxVertexUniforms: 0,
    extensions: [],
    renderer: 'unknown',
    vendor: 'unknown',
    performanceLevel: 'low'
  }

  if (typeof window === 'undefined') {
    return defaultCapabilities
  }

  try {
    const canvas = document.createElement('canvas')
    
    // Try WebGL2 first
    let gl: WebGLRenderingContext | WebGL2RenderingContext | null = canvas.getContext('webgl2') as WebGL2RenderingContext | null
    let version: 'webgl' | 'webgl2' | null = null
    
    if (gl) {
      version = 'webgl2'
    } else {
      // Fallback to WebGL1
      const webgl1Context = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      gl = webgl1Context as WebGLRenderingContext | null
      if (gl) {
        version = 'webgl'
      }
    }

    if (!gl) {
      console.warn('WebGL not supported')
      return defaultCapabilities
    }

    // Get basic parameters
    const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE)
    const maxVertexAttributes = gl.getParameter(gl.MAX_VERTEX_ATTRIBS)
    const maxFragmentUniforms = gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS)
    const maxVertexUniforms = gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS)

    // Get extensions
    const extensions = gl.getSupportedExtensions() || []

    // Get renderer info
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
    const renderer = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : 'unknown'
    const vendor = debugInfo ? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) : 'unknown'

    // Determine performance level based on capabilities
    const performanceLevel = determinePerformanceLevel({
      maxTextureSize,
      maxVertexAttributes,
      maxFragmentUniforms,
      renderer,
      extensions
    })

    // Clean up
    canvas.remove()

    return {
      supported: true,
      version,
      maxTextureSize,
      maxVertexAttributes,
      maxFragmentUniforms,
      maxVertexUniforms,
      extensions,
      renderer,
      vendor,
      performanceLevel
    }
  } catch (error) {
    console.warn('Error detecting WebGL capabilities:', error)
    return defaultCapabilities
  }
}

/**
 * Detect specific WebGL features
 */
export function detectFeatureSupport(): FeatureSupport {
  const capabilities = detectWebGLCapabilities()
  
  if (!capabilities.supported) {
    return {
      webgl: false,
      webgl2: false,
      shaders: false,
      floatTextures: false,
      depthTextures: false,
      instancedArrays: false,
      vertexArrayObjects: false,
      multipleRenderTargets: false,
      anisotropicFiltering: false
    }
  }

  const extensions = capabilities.extensions

  return {
    webgl: capabilities.version === 'webgl',
    webgl2: capabilities.version === 'webgl2',
    shaders: true, // Basic shader support is guaranteed with WebGL
    floatTextures: extensions.includes('OES_texture_float') || capabilities.version === 'webgl2',
    depthTextures: extensions.includes('WEBGL_depth_texture') || capabilities.version === 'webgl2',
    instancedArrays: extensions.includes('ANGLE_instanced_arrays') || capabilities.version === 'webgl2',
    vertexArrayObjects: extensions.includes('OES_vertex_array_object') || capabilities.version === 'webgl2',
    multipleRenderTargets: extensions.includes('WEBGL_draw_buffers') || capabilities.version === 'webgl2',
    anisotropicFiltering: extensions.includes('EXT_texture_filter_anisotropic')
  }
}

/**
 * Determine performance level based on WebGL capabilities
 */
function determinePerformanceLevel(params: {
  maxTextureSize: number
  maxVertexAttributes: number
  maxFragmentUniforms: number
  renderer: string
  extensions: string[]
}): 'high' | 'medium' | 'low' {
  const { maxTextureSize, maxVertexAttributes, maxFragmentUniforms, renderer, extensions } = params

  // High-end indicators
  if (
    maxTextureSize >= 8192 &&
    maxVertexAttributes >= 16 &&
    maxFragmentUniforms >= 256 &&
    extensions.length > 20
  ) {
    return 'high'
  }

  // Low-end indicators
  if (
    maxTextureSize < 2048 ||
    maxVertexAttributes < 8 ||
    maxFragmentUniforms < 64 ||
    renderer.toLowerCase().includes('software') ||
    renderer.toLowerCase().includes('mesa')
  ) {
    return 'low'
  }

  return 'medium'
}

/**
 * Test WebGL context creation and basic operations
 */
export function testWebGLFunctionality(): {
  contextCreation: boolean
  shaderCompilation: boolean
  textureCreation: boolean
  rendering: boolean
  error?: string
} {
  const result = {
    contextCreation: false,
    shaderCompilation: false,
    textureCreation: false,
    rendering: false,
    error: undefined as string | undefined
  }

  if (typeof window === 'undefined') {
    result.error = 'Not in browser environment'
    return result
  }

  try {
    const canvas = document.createElement('canvas')
    canvas.width = 64
    canvas.height = 64
    
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    
    if (!gl) {
      result.error = 'Failed to create WebGL context'
      return result
    }
    
    const webglContext = gl as WebGLRenderingContext
    result.contextCreation = true

    // Test shader compilation
    const vertexShader = webglContext.createShader(webglContext.VERTEX_SHADER)
    const fragmentShader = webglContext.createShader(webglContext.FRAGMENT_SHADER)
    
    if (!vertexShader || !fragmentShader) {
      result.error = 'Failed to create shaders'
      return result
    }

    const vertexSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `
    
    const fragmentSource = `
      precision mediump float;
      void main() {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
      }
    `

    webglContext.shaderSource(vertexShader, vertexSource)
    webglContext.compileShader(vertexShader)
    
    webglContext.shaderSource(fragmentShader, fragmentSource)
    webglContext.compileShader(fragmentShader)

    if (!webglContext.getShaderParameter(vertexShader, webglContext.COMPILE_STATUS) ||
        !webglContext.getShaderParameter(fragmentShader, webglContext.COMPILE_STATUS)) {
      result.error = 'Shader compilation failed'
      return result
    }

    result.shaderCompilation = true

    // Test texture creation
    const texture = webglContext.createTexture()
    if (!texture) {
      result.error = 'Failed to create texture'
      return result
    }

    webglContext.bindTexture(webglContext.TEXTURE_2D, texture)
    webglContext.texImage2D(webglContext.TEXTURE_2D, 0, webglContext.RGBA, 1, 1, 0, webglContext.RGBA, webglContext.UNSIGNED_BYTE, new Uint8Array([255, 0, 0, 255]))
    
    result.textureCreation = true

    // Test basic rendering
    const program = webglContext.createProgram()
    if (!program) {
      result.error = 'Failed to create program'
      return result
    }

    webglContext.attachShader(program, vertexShader)
    webglContext.attachShader(program, fragmentShader)
    webglContext.linkProgram(program)

    if (!webglContext.getProgramParameter(program, webglContext.LINK_STATUS)) {
      result.error = 'Program linking failed'
      return result
    }

    webglContext.useProgram(program)
    webglContext.viewport(0, 0, 64, 64)
    webglContext.clearColor(0, 0, 0, 1)
    webglContext.clear(webglContext.COLOR_BUFFER_BIT)

    result.rendering = true

    // Clean up
    webglContext.deleteShader(vertexShader)
    webglContext.deleteShader(fragmentShader)
    webglContext.deleteTexture(texture)
    webglContext.deleteProgram(program)
    canvas.remove()

    return result
  } catch (error) {
    result.error = error instanceof Error ? error.message : 'Unknown error'
    return result
  }
}

/**
 * Get recommended settings based on WebGL capabilities
 */
export function getRecommendedSettings(capabilities: WebGLCapabilities) {
  const { performanceLevel, maxTextureSize } = capabilities

  switch (performanceLevel) {
    case 'high':
      return {
        particleCount: 1000,
        textureSize: Math.min(2048, maxTextureSize),
        enableShaders: true,
        enablePostProcessing: true,
        shadowMapSize: 2048,
        antialias: true,
        pixelRatio: Math.min(window.devicePixelRatio || 1, 2)
      }
    
    case 'medium':
      return {
        particleCount: 500,
        textureSize: Math.min(1024, maxTextureSize),
        enableShaders: true,
        enablePostProcessing: false,
        shadowMapSize: 1024,
        antialias: true,
        pixelRatio: Math.min(window.devicePixelRatio || 1, 1.5)
      }
    
    case 'low':
      return {
        particleCount: 200,
        textureSize: Math.min(512, maxTextureSize),
        enableShaders: false,
        enablePostProcessing: false,
        shadowMapSize: 512,
        antialias: false,
        pixelRatio: 1
      }
    
    default:
      return {
        particleCount: 300,
        textureSize: 512,
        enableShaders: false,
        enablePostProcessing: false,
        shadowMapSize: 512,
        antialias: false,
        pixelRatio: 1
      }
  }
}

/**
 * Browser-specific WebGL issues and workarounds
 */
export function getBrowserSpecificWorkarounds() {
  const userAgent = navigator.userAgent.toLowerCase()
  const workarounds = {
    disableFloatTextures: false,
    disableDepthTextures: false,
    disableInstancedArrays: false,
    forceWebGL1: false,
    reducedPrecision: false
  }

  // Safari-specific issues
  if (userAgent.includes('safari') && !userAgent.includes('chrome')) {
    workarounds.disableFloatTextures = true
    workarounds.reducedPrecision = true
  }

  // Mobile Safari
  if (userAgent.includes('mobile') && userAgent.includes('safari')) {
    workarounds.forceWebGL1 = true
    workarounds.disableDepthTextures = true
  }

  // Firefox on mobile
  if (userAgent.includes('firefox') && userAgent.includes('mobile')) {
    workarounds.disableInstancedArrays = true
  }

  // Internet Explorer / Edge Legacy
  if (userAgent.includes('trident') || userAgent.includes('edge/')) {
    workarounds.forceWebGL1 = true
    workarounds.reducedPrecision = true
  }

  return workarounds
}

/**
 * Cached WebGL detection results
 */
let cachedCapabilities: WebGLCapabilities | null = null
let cachedFeatureSupport: FeatureSupport | null = null

/**
 * Get cached WebGL capabilities (performance optimization)
 */
export function getCachedWebGLCapabilities(): WebGLCapabilities {
  if (!cachedCapabilities) {
    cachedCapabilities = detectWebGLCapabilities()
  }
  return cachedCapabilities
}

/**
 * Get cached feature support (performance optimization)
 */
export function getCachedFeatureSupport(): FeatureSupport {
  if (!cachedFeatureSupport) {
    cachedFeatureSupport = detectFeatureSupport()
  }
  return cachedFeatureSupport
}

/**
 * Reset cached results (useful for testing or when context is lost)
 */
export function resetWebGLCache() {
  cachedCapabilities = null
  cachedFeatureSupport = null
}