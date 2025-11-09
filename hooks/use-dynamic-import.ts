"use client"

import { useState, useEffect, useCallback } from 'react'

interface DynamicImportOptions {
  timeout?: number
  retries?: number
  fallback?: () => Promise<any>
  featureDetection?: () => boolean
  onError?: (error: Error) => void
  onSuccess?: () => void
}

interface DynamicImportState<T> {
  component: T | null
  loading: boolean
  error: Error | null
  retryCount: number
}

export function useDynamicImport<T>(
  importFn: () => Promise<{ default: T }>,
  options: DynamicImportOptions = {}
) {
  const {
    timeout = 30000,
    retries = 2,
    fallback,
    featureDetection,
    onError,
    onSuccess
  } = options

  const [state, setState] = useState<DynamicImportState<T>>({
    component: null,
    loading: false,
    error: null,
    retryCount: 0
  })

  const loadComponent = useCallback(async () => {
    // Feature detection check
    if (featureDetection && !featureDetection()) {
      if (fallback) {
        try {
          const fallbackModule = await fallback()
          setState(prev => ({
            ...prev,
            component: fallbackModule.default,
            loading: false,
            error: null
          }))
          return
        } catch (fallbackError) {
          setState(prev => ({
            ...prev,
            loading: false,
            error: fallbackError as Error
          }))
          return
        }
      } else {
        setState(prev => ({
          ...prev,
          loading: false,
          error: new Error('Feature not supported')
        }))
        return
      }
    }

    setState(prev => ({ ...prev, loading: true, error: null }))

    try {
      // Create timeout promise
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Import timeout')), timeout)
      })

      // Race between import and timeout
      const module = await Promise.race([importFn(), timeoutPromise])
      
      setState(prev => ({
        ...prev,
        component: module.default,
        loading: false,
        error: null
      }))
      
      onSuccess?.()
    } catch (error) {
      const err = error as Error
      
      // Try fallback if available
      if (fallback && state.retryCount === 0) {
        try {
          const fallbackModule = await fallback()
          setState(prev => ({
            ...prev,
            component: fallbackModule.default,
            loading: false,
            error: null
          }))
          return
        } catch (fallbackError) {
          // Continue with original error handling
        }
      }

      setState(prev => ({
        ...prev,
        loading: false,
        error: err,
        retryCount: prev.retryCount + 1
      }))
      
      onError?.(err)
    }
  }, [importFn, timeout, fallback, featureDetection, onError, onSuccess, state.retryCount])

  const retry = useCallback(() => {
    if (state.retryCount < retries) {
      loadComponent()
    }
  }, [loadComponent, state.retryCount, retries])

  const reset = useCallback(() => {
    setState({
      component: null,
      loading: false,
      error: null,
      retryCount: 0
    })
  }, [])

  useEffect(() => {
    loadComponent()
  }, [loadComponent])

  return {
    ...state,
    retry,
    reset,
    canRetry: state.retryCount < retries
  }
}

// Feature detection utilities
export const featureDetectors = {
  webGL: () => {
    try {
      const canvas = document.createElement('canvas')
      return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    } catch {
      return false
    }
  },
  
  geolocation: () => {
    return 'geolocation' in navigator
  },
  
  intersectionObserver: () => {
    return 'IntersectionObserver' in window
  },
  
  webWorkers: () => {
    return typeof Worker !== 'undefined'
  },
  
  localStorage: () => {
    try {
      const test = 'test'
      localStorage.setItem(test, test)
      localStorage.removeItem(test)
      return true
    } catch {
      return false
    }
  },
  
  touchSupport: () => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0
  },
  
  highPerformance: () => {
    const cores = navigator.hardwareConcurrency || 4
    const memory = (navigator as any).deviceMemory || 4
    return cores >= 4 && memory >= 4
  }
}

export default useDynamicImport