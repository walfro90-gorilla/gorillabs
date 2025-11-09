"use client"

import React from 'react'
import { LoadingState } from './loading-state'
import { ErrorBoundary } from './error-boundary'
import { FallbackContent } from './fallback-content'
import { useDynamicImport, featureDetectors } from '@/hooks/use-dynamic-import'

interface DynamicComponentProps {
  importFn: () => Promise<{ default: React.ComponentType<any> }>
  fallbackImport?: () => Promise<{ default: React.ComponentType<any> }>
  loadingComponent?: React.ComponentType
  errorComponent?: React.ComponentType<{ error: Error; retry: () => void }>
  featureCheck?: keyof typeof featureDetectors
  timeout?: number
  retries?: number
  priority?: 'high' | 'medium' | 'low'
  ssr?: boolean
  componentProps?: any
  loadingProps?: any
  errorBoundaryProps?: any
}

export const DynamicComponent: React.FC<DynamicComponentProps> = ({
  importFn,
  fallbackImport,
  loadingComponent: LoadingComponent,
  errorComponent: ErrorComponent,
  featureCheck,
  timeout = 30000,
  retries = 2,
  priority = 'medium',
  componentProps = {},
  loadingProps = {},
  errorBoundaryProps = {}
}) => {
  const {
    component: Component,
    loading,
    error,
    retry,
    canRetry
  } = useDynamicImport(importFn, {
    timeout,
    retries,
    fallback: fallbackImport,
    featureDetection: featureCheck ? featureDetectors[featureCheck] : undefined,
    onError: (err) => {
      console.warn(`Dynamic import failed for component:`, err)
    }
  })

  // Show loading state
  if (loading) {
    if (LoadingComponent) {
      return <LoadingComponent {...loadingProps} />
    }
    
    const variant = priority === 'high' ? 'hero' : 'section'
    return (
      <LoadingState 
        variant={variant} 
        showSkeleton 
        timeout={timeout}
        {...loadingProps}
      />
    )
  }

  // Show error state
  if (error && !Component) {
    if (ErrorComponent) {
      return <ErrorComponent error={error} retry={retry} />
    }

    return (
      <ErrorBoundary
        level="component"
        enableRetry={canRetry}
        onRetry={retry}
        {...errorBoundaryProps}
      >
        <FallbackContent
          type="section"
          title="Component Error"
          message={error.message}
          showRetry={canRetry}
          onRetry={retry}
        />
      </ErrorBoundary>
    )
  }

  // Render component
  if (Component) {
    return (
      <ErrorBoundary
        level="component"
        resetKeys={[Component]}
        {...errorBoundaryProps}
      >
        <Component {...componentProps} />
      </ErrorBoundary>
    )
  }

  // Fallback if nothing else works
  return (
    <FallbackContent
      type="section"
      title="Component Unavailable"
      message="This component could not be loaded."
      showRetry={canRetry}
      onRetry={retry}
    />
  )
}

// Preset configurations for common use cases
export const DynamicHero = (props: Omit<DynamicComponentProps, 'priority' | 'timeout'>) => (
  <DynamicComponent {...props} priority="high" timeout={10000} />
)

export const DynamicSection = (props: Omit<DynamicComponentProps, 'priority' | 'timeout'>) => (
  <DynamicComponent {...props} priority="medium" timeout={20000} />
)

export const DynamicInteractive = (props: Omit<DynamicComponentProps, 'priority' | 'timeout'>) => (
  <DynamicComponent {...props} priority="low" timeout={30000} />
)

export default DynamicComponent