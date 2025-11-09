/**
 * Three.js Configuration and Utilities
 * Centralized configuration for 3D graphics and WebGL
 */

import * as THREE from 'three'

/**
 * Check if WebGL is supported (legacy function - use webgl-detection.ts for comprehensive checks)
 * @deprecated Use detectWebGLCapabilities from webgl-detection.ts instead
 */
export const isWebGLAvailable = (): boolean => {
  if (typeof window === 'undefined') return false
  
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    return !!gl
  } catch (e) {
    console.warn('WebGL not supported:', e)
    return false
  }
}

/**
 * Get WebGL capabilities
 */
export const getWebGLCapabilities = () => {
  if (!isWebGLAvailable()) {
    return null
  }
  
  const canvas = document.createElement('canvas')
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
  
  if (!gl) return null
  
  return {
    maxTextureSize: (gl as WebGLRenderingContext).getParameter((gl as WebGLRenderingContext).MAX_TEXTURE_SIZE),
    maxVertexAttributes: (gl as WebGLRenderingContext).getParameter((gl as WebGLRenderingContext).MAX_VERTEX_ATTRIBS),
    maxVaryingVectors: (gl as WebGLRenderingContext).getParameter((gl as WebGLRenderingContext).MAX_VARYING_VECTORS),
    maxFragmentUniforms: (gl as WebGLRenderingContext).getParameter((gl as WebGLRenderingContext).MAX_FRAGMENT_UNIFORM_VECTORS),
    maxVertexUniforms: (gl as WebGLRenderingContext).getParameter((gl as WebGLRenderingContext).MAX_VERTEX_UNIFORM_VECTORS),
  }
}

/**
 * Default renderer settings
 */
export const defaultRendererSettings = {
  antialias: true,
  alpha: true,
  powerPreference: 'high-performance' as WebGLPowerPreference,
  stencil: false,
  depth: true,
}

/**
 * Performance settings based on device
 */
export const getPerformanceSettings = (devicePerformance: 'high' | 'medium' | 'low') => {
  switch (devicePerformance) {
    case 'high':
      return {
        pixelRatio: Math.min(window.devicePixelRatio, 2),
        shadowMapEnabled: true,
        shadowMapType: THREE.PCFSoftShadowMap,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1,
      }
    case 'medium':
      return {
        pixelRatio: Math.min(window.devicePixelRatio, 1.5),
        shadowMapEnabled: true,
        shadowMapType: THREE.BasicShadowMap,
        toneMapping: THREE.LinearToneMapping,
        toneMappingExposure: 1,
      }
    case 'low':
      return {
        pixelRatio: 1,
        shadowMapEnabled: false,
        shadowMapType: THREE.BasicShadowMap,
        toneMapping: THREE.NoToneMapping,
        toneMappingExposure: 1,
      }
    default:
      return {
        pixelRatio: Math.min(window.devicePixelRatio, 1.5),
        shadowMapEnabled: true,
        shadowMapType: THREE.BasicShadowMap,
        toneMapping: THREE.LinearToneMapping,
        toneMappingExposure: 1,
      }
  }
}

/**
 * FPS Monitor class
 */
export class FPSMonitor {
  private frames: number = 0
  private lastTime: number = performance.now()
  private fps: number = 60
  private callback?: (fps: number) => void
  
  constructor(callback?: (fps: number) => void) {
    this.callback = callback
  }
  
  update() {
    this.frames++
    const currentTime = performance.now()
    
    if (currentTime >= this.lastTime + 1000) {
      this.fps = Math.round((this.frames * 1000) / (currentTime - this.lastTime))
      this.frames = 0
      this.lastTime = currentTime
      
      if (this.callback) {
        this.callback(this.fps)
      }
    }
  }
  
  getFPS(): number {
    return this.fps
  }
}

/**
 * Adaptive quality manager
 * Automatically adjusts quality based on FPS
 */
export class AdaptiveQualityManager {
  private fpsMonitor: FPSMonitor
  private targetFPS: number = 55
  private currentQuality: 'high' | 'medium' | 'low' = 'high'
  private onQualityChange?: (quality: 'high' | 'medium' | 'low') => void
  
  constructor(onQualityChange?: (quality: 'high' | 'medium' | 'low') => void) {
    this.onQualityChange = onQualityChange
    this.fpsMonitor = new FPSMonitor((fps) => this.handleFPSUpdate(fps))
  }
  
  private handleFPSUpdate(fps: number) {
    if (fps < this.targetFPS && this.currentQuality !== 'low') {
      // Reduce quality
      if (this.currentQuality === 'high') {
        this.currentQuality = 'medium'
      } else {
        this.currentQuality = 'low'
      }
      
      if (this.onQualityChange) {
        this.onQualityChange(this.currentQuality)
      }
    }
  }
  
  update() {
    this.fpsMonitor.update()
  }
  
  getQuality(): 'high' | 'medium' | 'low' {
    return this.currentQuality
  }
  
  getFPS(): number {
    return this.fpsMonitor.getFPS()
  }
}

/**
 * Particle system configuration
 */
export const particleConfig = {
  high: {
    count: 1000,
    size: 2,
    speed: 0.5,
  },
  medium: {
    count: 600,
    size: 2,
    speed: 0.5,
  },
  low: {
    count: 300,
    size: 2,
    speed: 0.5,
  },
  mobile: {
    count: 200,
    size: 2,
    speed: 0.5,
  },
}

/**
 * Get particle configuration based on device
 */
export const getParticleConfig = (isMobile: boolean, performance: 'high' | 'medium' | 'low') => {
  if (isMobile) {
    return particleConfig.mobile
  }
  return particleConfig[performance]
}

/**
 * Common colors for Three.js
 */
export const threeColors = {
  gorillaBlack: new THREE.Color(0x000000),
  gorillaYellow: new THREE.Color(0xFFD700),
  neonBlue: new THREE.Color(0x00D4E6),
  neonPurple: new THREE.Color(0xA020F0),
  neonPink: new THREE.Color(0xFF1A8C),
  white: new THREE.Color(0xFFFFFF),
}

/**
 * Dispose of Three.js objects properly
 */
export const disposeObject = (object: THREE.Object3D) => {
  if (object instanceof THREE.Mesh) {
    if (object.geometry) {
      object.geometry.dispose()
    }
    
    if (object.material) {
      if (Array.isArray(object.material)) {
        object.material.forEach(material => material.dispose())
      } else {
        object.material.dispose()
      }
    }
  }
  
  object.children.forEach(child => disposeObject(child))
}

/**
 * Dispose of renderer
 */
export const disposeRenderer = (renderer: THREE.WebGLRenderer) => {
  renderer.dispose()
  renderer.forceContextLoss()
}

export { THREE }
