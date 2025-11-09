"use client"

import { useState, useEffect } from 'react'

export type DevicePerformance = 'low' | 'medium' | 'high'

interface DeviceCapabilities {
  performance: DevicePerformance
  isMobile: boolean
  supportsWebGL: boolean
  prefersReducedMotion: boolean
  connectionSpeed: 'slow' | 'fast'
  memoryGB: number
  cores: number
}

export function useDevicePerformance(): DeviceCapabilities {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>({
    performance: 'medium',
    isMobile: false,
    supportsWebGL: true,
    prefersReducedMotion: false,
    connectionSpeed: 'fast',
    memoryGB: 4,
    cores: 4
  })

  useEffect(() => {
    const detectCapabilities = (): DeviceCapabilities => {
      // Mobile detection
      const isMobile = window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      
      // WebGL support
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      const supportsWebGL = !!gl
      
      // Reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      
      // Hardware info
      const cores = navigator.hardwareConcurrency || 4
      const memoryGB = (navigator as any).deviceMemory || 4
      
      // Connection speed
      const connection = (navigator as any).connection
      const connectionSpeed = connection?.effectiveType === '4g' ? 'fast' : 'slow'
      
      // Performance calculation
      let performance: DevicePerformance = 'medium'
      
      if (isMobile) {
        if (cores >= 6 && memoryGB >= 6) {
          performance = 'high'
        } else if (cores >= 4 && memoryGB >= 3) {
          performance = 'medium'
        } else {
          performance = 'low'
        }
      } else {
        if (cores >= 8 && memoryGB >= 8) {
          performance = 'high'
        } else if (cores >= 4 && memoryGB >= 4) {
          performance = 'medium'
        } else {
          performance = 'low'
        }
      }
      
      // Adjust for other factors
      if (!supportsWebGL || prefersReducedMotion || connectionSpeed === 'slow') {
        performance = performance === 'high' ? 'medium' : 'low'
      }
      
      return {
        performance,
        isMobile,
        supportsWebGL,
        prefersReducedMotion,
        connectionSpeed,
        memoryGB,
        cores
      }
    }

    setCapabilities(detectCapabilities())
    
    // Listen for changes
    const handleResize = () => {
      setCapabilities(prev => ({
        ...prev,
        isMobile: window.innerWidth < 768
      }))
    }
    
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setCapabilities(prev => ({
        ...prev,
        prefersReducedMotion: e.matches,
        performance: e.matches ? 'low' : prev.performance
      }))
    }
    
    window.addEventListener('resize', handleResize)
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    motionQuery.addEventListener('change', handleMotionChange)
    
    return () => {
      window.removeEventListener('resize', handleResize)
      motionQuery.removeEventListener('change', handleMotionChange)
    }
  }, [])

  return capabilities
}

// Configuration presets based on performance
export const getVisualConfig = (performance: DevicePerformance, isMobile: boolean) => {
  const configs = {
    low: {
      particles: isMobile ? 20 : 50,
      particleSize: 1,
      animationSpeed: 0.1,
      enableParallax: false,
      enableComplexEffects: false,
      quality: 0.5
    },
    medium: {
      particles: isMobile ? 100 : 200,
      particleSize: 1.5,
      animationSpeed: 0.3,
      enableParallax: false,
      enableComplexEffects: false,
      quality: 0.75
    },
    high: {
      particles: isMobile ? 200 : 400,
      particleSize: 2,
      animationSpeed: 0.5,
      enableParallax: true,
      enableComplexEffects: true,
      quality: 1
    }
  }
  
  return configs[performance]
}