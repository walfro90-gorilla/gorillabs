/**
 * Dynamic Import Utilities for Heavy Components
 * Optimizes loading of Three.js, GSAP, Monaco Editor, and Sandpack
 */

import dynamic from 'next/dynamic'

import React from 'react'

/**
 * Loading component for visual effects
 */
const VisualEffectsLoader = () => {
  return React.createElement('div', { className: 'h-screen w-full bg-gorilla-black animate-pulse' })
}

/**
 * Loading component for code editor
 */
const CodeEditorLoader = () => {
  return React.createElement('div', 
    { className: 'h-96 w-full bg-gray-900 rounded-lg animate-pulse flex items-center justify-center' },
    React.createElement('p', { className: 'text-gray-400' }, 'Loading editor...')
  )
}

/**
 * Loading component for general sections
 */
const SectionLoader = () => {
  return React.createElement('div',
    { className: 'h-96 w-full flex items-center justify-center' },
    React.createElement('div', { className: 'animate-spin rounded-full h-12 w-12 border-b-2 border-gorilla-yellow' })
  )
}

/**
 * Dynamically import Enhanced ParticleBackground component with fallbacks
 * Disabled SSR for Three.js compatibility
 */
export const DynamicParticleBackground = dynamic(
  () => import('@/components/visual-effects/enhanced-particle-background').then(mod => mod.EnhancedParticleBackground),
  {
    ssr: false,
    loading: VisualEffectsLoader,
  }
)

/**
 * Dynamically import Enhanced ShaderGradient component with fallbacks
 * Disabled SSR for WebGL compatibility
 */
export const DynamicShaderGradient = dynamic(
  () => import('@/components/visual-effects/enhanced-shader-gradient').then(mod => mod.EnhancedShaderGradient),
  {
    ssr: false,
    loading: VisualEffectsLoader,
  }
)

/**
 * Dynamically import Lightweight ParticleBackground for guaranteed compatibility
 * Can use SSR since it's CSS-only
 */
export const DynamicLightweightParticles = dynamic(
  () => import('@/components/visual-effects/enhanced-particle-background').then(mod => mod.LightweightParticleBackground),
  {
    loading: VisualEffectsLoader,
  }
)

/**
 * Dynamically import CodeEditor component
 * Disabled SSR for Monaco Editor compatibility
 */
export const DynamicCodeEditor = dynamic(
  () => import('@/components/tech-showcase/code-editor').then(mod => mod.CodeEditor),
  {
    ssr: false,
    loading: CodeEditorLoader,
  }
)

/**
 * Dynamically import InteractiveDemo component
 * Disabled SSR for Sandpack compatibility
 */
export const DynamicInteractiveDemo = dynamic(
  () => import('@/components/tech-showcase/interactive-demo').then(mod => mod.InteractiveDemo),
  {
    ssr: false,
    loading: SectionLoader,
  }
)

/**
 * Dynamically import TechStackGrid component
 * Can use SSR but with loading state
 */
export const DynamicTechStackGrid = dynamic(
  () => import('@/components/tech-showcase/tech-stack-grid').then(mod => mod.TechStackGrid),
  {
    loading: SectionLoader,
  }
)

/**
 * Dynamically import CaseStudyCard component
 * TODO: Uncomment when component is created
 */
// export const DynamicCaseStudyCard = dynamic(
//   () => import('@/components/case-studies/case-study-card').then(mod => mod.CaseStudyCard),
//   {
//     loading: SectionLoader,
//   }
// )

/**
 * Dynamically import AnimatedCounter component
 * TODO: Uncomment when component is created
 */
// export const DynamicAnimatedCounter = dynamic(
//   () => import('@/components/animations/animated-counter').then(mod => mod.AnimatedCounter),
//   {
//     loading: () => React.createElement('span', { className: 'text-2xl' }, '0'),
//   }
// )

/**
 * Dynamically import DataVisualization component
 * TODO: Uncomment when component is created
 */
// export const DynamicDataVisualization = dynamic(
//   () => import('@/components/case-studies/data-visualization').then(mod => mod.DataVisualization),
//   {
//     loading: SectionLoader,
//   }
// )

/**
 * Dynamically import ProjectEstimator component
 * TODO: Uncomment when component is created
 */
// export const DynamicProjectEstimator = dynamic(
//   () => import('@/components/ai-estimator/project-estimator').then(mod => mod.ProjectEstimator),
//   {
//     loading: SectionLoader,
//   }
// )

/**
 * Dynamically import ScrollAnimationWrapper component
 * TODO: Uncomment when component is created
 */
// export const DynamicScrollAnimationWrapper = dynamic(
//   () => import('@/components/animations/scroll-animation-wrapper').then(mod => mod.ScrollAnimationWrapper),
//   {
//     loading: () => null,
//   }
// )

/**
 * Utility function to check if WebGL is supported
 */
export const isWebGLSupported = (): boolean => {
  if (typeof window === 'undefined') return false
  
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    return !!gl
  } catch (e) {
    return false
  }
}

/**
 * Utility function to detect device performance
 * Returns 'high', 'medium', or 'low'
 */
export const detectDevicePerformance = (): 'high' | 'medium' | 'low' => {
  if (typeof window === 'undefined') return 'medium'
  
  // Check for hardware concurrency (CPU cores)
  const cores = navigator.hardwareConcurrency || 4
  
  // Check for device memory (if available)
  const memory = (navigator as any).deviceMemory || 4
  
  // Check for connection speed
  const connection = (navigator as any).connection
  const effectiveType = connection?.effectiveType || '4g'
  
  // Determine performance level
  if (cores >= 8 && memory >= 8 && effectiveType === '4g') {
    return 'high'
  } else if (cores >= 4 && memory >= 4) {
    return 'medium'
  } else {
    return 'low'
  }
}

/**
 * Utility function to get optimal particle count based on device
 */
export const getOptimalParticleCount = (): number => {
  const performance = detectDevicePerformance()
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  
  if (isMobile) {
    return performance === 'high' ? 300 : 200
  }
  
  switch (performance) {
    case 'high':
      return 1000
    case 'medium':
      return 600
    case 'low':
      return 300
    default:
      return 600
  }
}

/**
 * Utility function to check if user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false
  
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
