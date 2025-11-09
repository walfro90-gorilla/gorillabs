"use client"

import { useState, useEffect, useCallback } from 'react'

interface VisualEffectsSettings {
  enableParticles: boolean
  enableAnimations: boolean
  enableBlur: boolean
  enableGradients: boolean
  enablePatterns: boolean
  enableEmojis: boolean
  particleCount: number
  animationSpeed: number
  effectsQuality: 'low' | 'medium' | 'high'
  respectReducedMotion: boolean
}

interface DeviceCapabilities {
  isHighPerformance: boolean
  isMobile: boolean
  supportsWebGL: boolean
  supportsBackdropFilter: boolean
  prefersReducedMotion: boolean
  batteryLevel?: number
  isLowPowerMode?: boolean
  connectionSpeed: 'slow' | 'medium' | 'fast'
}

export function useVisualEffects() {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>({
    isHighPerformance: true,
    isMobile: false,
    supportsWebGL: true,
    supportsBackdropFilter: true,
    prefersReducedMotion: false,
    connectionSpeed: 'fast'
  })

  const [settings, setSettings] = useState<VisualEffectsSettings>({
    enableParticles: true,
    enableAnimations: true,
    enableBlur: true,
    enableGradients: true,
    enablePatterns: true,
    enableEmojis: true,
    particleCount: 100,
    animationSpeed: 1,
    effectsQuality: 'high',
    respectReducedMotion: true
  })

  const [userPreferences, setUserPreferences] = useState({
    effectsEnabled: true,
    qualityOverride: null as 'low' | 'medium' | 'high' | null
  })

  // Detect device capabilities
  const detectCapabilities = useCallback((): DeviceCapabilities => {
    // Mobile detection
    const isMobile = window.innerWidth < 768 || 
      /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

    // Performance detection
    const cores = navigator.hardwareConcurrency || 4
    const memory = (navigator as any).deviceMemory || 4
    const isHighPerformance = cores >= 4 && memory >= 4 && !isMobile

    // WebGL support
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    const supportsWebGL = !!gl

    // Backdrop filter support
    const supportsBackdropFilter = CSS.supports('backdrop-filter', 'blur(1px)') || 
      CSS.supports('-webkit-backdrop-filter', 'blur(1px)')

    // Reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Connection speed estimation
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection
    let connectionSpeed: 'slow' | 'medium' | 'fast' = 'fast'
    
    if (connection) {
      const effectiveType = connection.effectiveType
      if (effectiveType === 'slow-2g' || effectiveType === '2g') {
        connectionSpeed = 'slow'
      } else if (effectiveType === '3g') {
        connectionSpeed = 'medium'
      }
    }

    // Battery API (experimental)
    let batteryLevel: number | undefined
    let isLowPowerMode: boolean | undefined

    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        batteryLevel = battery.level
        isLowPowerMode = battery.level < 0.2
      }).catch(() => {
        // Battery API not supported or blocked
      })
    }

    return {
      isHighPerformance,
      isMobile,
      supportsWebGL,
      supportsBackdropFilter,
      prefersReducedMotion,
      batteryLevel,
      isLowPowerMode,
      connectionSpeed
    }
  }, [])

  // Calculate optimal settings based on capabilities
  const calculateOptimalSettings = useCallback((caps: DeviceCapabilities): VisualEffectsSettings => {
    let quality: 'low' | 'medium' | 'high' = 'high'
    let particleCount = 100
    let animationSpeed = 1
    let enableParticles = true
    let enableAnimations = true
    let enableBlur = caps.supportsBackdropFilter
    let enableGradients = true
    let enablePatterns = true
    let enableEmojis = true

    // Adjust based on performance
    if (!caps.isHighPerformance || caps.isMobile) {
      quality = caps.isMobile ? 'low' : 'medium'
      particleCount = caps.isMobile ? 30 : 60
      animationSpeed = 0.7
    }

    // Adjust based on connection speed
    if (caps.connectionSpeed === 'slow') {
      quality = 'low'
      particleCount = 20
      enableParticles = false
      enableBlur = false
      enablePatterns = false
      enableEmojis = false
    } else if (caps.connectionSpeed === 'medium') {
      quality = 'medium'
      particleCount = Math.min(particleCount, 50)
      enablePatterns = false
    }

    // Respect reduced motion
    if (caps.prefersReducedMotion) {
      enableParticles = false
      enableAnimations = false
      enableEmojis = false
      animationSpeed = 0
    }

    // Adjust for low battery
    if (caps.isLowPowerMode) {
      quality = 'low'
      particleCount = 10
      enableParticles = false
      enableBlur = false
      animationSpeed = 0.5
    }

    // WebGL fallback
    if (!caps.supportsWebGL) {
      particleCount = Math.min(particleCount, 30)
      quality = quality === 'high' ? 'medium' : quality
    }

    return {
      enableParticles,
      enableAnimations,
      enableBlur,
      enableGradients,
      enablePatterns,
      enableEmojis,
      particleCount,
      animationSpeed,
      effectsQuality: quality,
      respectReducedMotion: caps.prefersReducedMotion
    }
  }, [])

  // Load user preferences from localStorage
  const loadUserPreferences = useCallback(() => {
    try {
      const saved = localStorage.getItem('visual-effects-preferences')
      if (saved) {
        const prefs = JSON.parse(saved)
        setUserPreferences(prefs)
        return prefs
      }
    } catch (error) {
      console.warn('Failed to load visual effects preferences:', error)
    }
    return userPreferences
  }, [userPreferences])

  // Save user preferences to localStorage
  const saveUserPreferences = useCallback((prefs: typeof userPreferences) => {
    try {
      localStorage.setItem('visual-effects-preferences', JSON.stringify(prefs))
      setUserPreferences(prefs)
    } catch (error) {
      console.warn('Failed to save visual effects preferences:', error)
    }
  }, [])

  // Initialize and detect capabilities
  useEffect(() => {
    const caps = detectCapabilities()
    setCapabilities(caps)

    const prefs = loadUserPreferences()
    let optimalSettings = calculateOptimalSettings(caps)

    // Apply user overrides
    if (!prefs.effectsEnabled) {
      optimalSettings = {
        ...optimalSettings,
        enableParticles: false,
        enableAnimations: false,
        enableBlur: false,
        particleCount: 0,
        animationSpeed: 0
      }
    }

    if (prefs.qualityOverride) {
      optimalSettings.effectsQuality = prefs.qualityOverride
      
      // Adjust settings based on quality override
      switch (prefs.qualityOverride) {
        case 'low':
          optimalSettings.particleCount = Math.min(optimalSettings.particleCount, 20)
          optimalSettings.enableBlur = false
          break
        case 'medium':
          optimalSettings.particleCount = Math.min(optimalSettings.particleCount, 60)
          break
        case 'high':
          optimalSettings.particleCount = Math.max(optimalSettings.particleCount, 100)
          optimalSettings.enableBlur = caps.supportsBackdropFilter
          break
      }
    }

    setSettings(optimalSettings)

    // Listen for changes in reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleChange = () => {
      const newCaps = { ...caps, prefersReducedMotion: mediaQuery.matches }
      setCapabilities(newCaps)
      setSettings(calculateOptimalSettings(newCaps))
    }

    mediaQuery.addEventListener('change', handleChange)

    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [detectCapabilities, calculateOptimalSettings, loadUserPreferences])

  // Public API for controlling effects
  const toggleEffects = useCallback((enabled: boolean) => {
    const newPrefs = { ...userPreferences, effectsEnabled: enabled }
    saveUserPreferences(newPrefs)
    
    if (!enabled) {
      setSettings(prev => ({
        ...prev,
        enableParticles: false,
        enableAnimations: false,
        enableBlur: false,
        particleCount: 0,
        animationSpeed: 0
      }))
    } else {
      setSettings(calculateOptimalSettings(capabilities))
    }
  }, [userPreferences, saveUserPreferences, calculateOptimalSettings, capabilities])

  const setQuality = useCallback((quality: 'low' | 'medium' | 'high') => {
    const newPrefs = { ...userPreferences, qualityOverride: quality }
    saveUserPreferences(newPrefs)
    
    const newSettings = { ...settings, effectsQuality: quality }
    
    switch (quality) {
      case 'low':
        newSettings.particleCount = Math.min(settings.particleCount, 20)
        newSettings.enableBlur = false
        newSettings.animationSpeed = 0.5
        break
      case 'medium':
        newSettings.particleCount = Math.min(settings.particleCount, 60)
        newSettings.enableBlur = capabilities.supportsBackdropFilter
        newSettings.animationSpeed = 0.7
        break
      case 'high':
        newSettings.particleCount = Math.max(settings.particleCount, 100)
        newSettings.enableBlur = capabilities.supportsBackdropFilter
        newSettings.animationSpeed = 1
        break
    }
    
    setSettings(newSettings)
  }, [userPreferences, saveUserPreferences, settings, capabilities])

  const resetToOptimal = useCallback(() => {
    const newPrefs = { effectsEnabled: true, qualityOverride: null }
    saveUserPreferences(newPrefs)
    setSettings(calculateOptimalSettings(capabilities))
  }, [saveUserPreferences, calculateOptimalSettings, capabilities])

  return {
    settings,
    capabilities,
    userPreferences,
    toggleEffects,
    setQuality,
    resetToOptimal,
    isOptimizedForReadability: settings.effectsQuality === 'low' || !settings.enableParticles
  }
}

export default useVisualEffects