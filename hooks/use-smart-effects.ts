"use client"

import { useState, useEffect } from 'react'

interface SmartEffectsConfig {
  enableWebGL: boolean
  particleCount: number
  particleSize: number
  animationSpeed: number
  enableComplexEffects: boolean
  quality: 'low' | 'medium' | 'high'
}

export function useSmartEffects(): SmartEffectsConfig {
  const [config, setConfig] = useState<SmartEffectsConfig>({
    enableWebGL: true,
    particleCount: 150,
    particleSize: 2.5,
    animationSpeed: 0.4,
    enableComplexEffects: true,
    quality: 'medium'
  })

  useEffect(() => {
    const detectOptimalConfig = (): SmartEffectsConfig => {
      // Device detection
      const isMobile = window.innerWidth < 768
      const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024
      const isDesktop = window.innerWidth >= 1024
      
      // Hardware detection
      const cores = navigator.hardwareConcurrency || 4
      const memory = (navigator as any).deviceMemory || 4
      const connection = (navigator as any).connection
      const isSlowConnection = connection?.effectiveType === '3g' || connection?.effectiveType === '2g'
      
      // WebGL detection
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      const hasWebGL = !!gl
      
      // User preferences
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const prefersBatteryLife = (navigator as any).getBattery ? true : false // Rough battery detection
      
      // Calculate optimal configuration
      let quality: 'low' | 'medium' | 'high' = 'medium'
      let particleCount = 150
      let enableWebGL = hasWebGL
      let enableComplexEffects = true
      
      // Performance-based adjustments
      if (isMobile) {
        if (cores >= 6 && memory >= 4 && !isSlowConnection) {
          quality = 'high'
          particleCount = 100
        } else if (cores >= 4 && memory >= 3) {
          quality = 'medium'
          particleCount = 60
        } else {
          quality = 'low'
          particleCount = 30
          enableWebGL = false
        }
      } else if (isTablet) {
        if (cores >= 6 && memory >= 6) {
          quality = 'high'
          particleCount = 200
        } else {
          quality = 'medium'
          particleCount = 120
        }
      } else if (isDesktop) {
        if (cores >= 8 && memory >= 8 && !isSlowConnection) {
          quality = 'high'
          particleCount = 300
        } else if (cores >= 4 && memory >= 4) {
          quality = 'medium'
          particleCount = 180
        } else {
          quality = 'low'
          particleCount = 80
        }
      }
      
      // Accessibility adjustments
      if (prefersReducedMotion) {
        particleCount = Math.min(particleCount, 20)
        enableComplexEffects = false
        quality = 'low'
      }
      
      // Battery-conscious adjustments
      if (prefersBatteryLife && isMobile) {
        particleCount = Math.floor(particleCount * 0.7)
        enableWebGL = false
      }
      
      return {
        enableWebGL,
        particleCount,
        particleSize: quality === 'high' ? 3 : quality === 'medium' ? 2.5 : 2,
        animationSpeed: quality === 'high' ? 0.5 : quality === 'medium' ? 0.4 : 0.3,
        enableComplexEffects,
        quality
      }
    }

    const optimalConfig = detectOptimalConfig()
    setConfig(optimalConfig)
    
    console.log('Smart Effects Config:', optimalConfig)
  }, [])

  return config
}