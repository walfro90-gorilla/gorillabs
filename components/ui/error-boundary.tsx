"use client"

import React, { Component, ErrorInfo, ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
  level?: 'page' | 'section' | 'component'
  showDetails?: boolean
  enableRetry?: boolean
  maxRetries?: number
  resetOnPropsChange?: boolean
  resetKeys?: Array<string | number>
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
  retryCount: number
  errorId: string
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  private retryTimeoutId: number | null = null

  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { 
      hasError: false, 
      retryCount: 0,
      errorId: ''
    }
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { 
      hasError: true, 
      error,
      errorId: `error-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    
    this.setState({ errorInfo })
    
    // Log error for monitoring
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }

    // Send to error reporting service in production
    if (process.env.NODE_ENV === 'production') {
      // Example: Sentry, LogRocket, etc.
      console.error('Production error:', {
        error: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        errorId: this.state.errorId
      })
    }
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    const { resetKeys, resetOnPropsChange } = this.props
    const { hasError } = this.state

    if (hasError && prevProps.resetKeys !== resetKeys) {
      if (resetKeys?.some((key, idx) => prevProps.resetKeys?.[idx] !== key)) {
        this.resetErrorBoundary()
      }
    }

    if (hasError && resetOnPropsChange && prevProps.children !== this.props.children) {
      this.resetErrorBoundary()
    }
  }

  componentWillUnmount() {
    if (this.retryTimeoutId) {
      clearTimeout(this.retryTimeoutId)
    }
  }

  resetErrorBoundary = () => {
    if (this.retryTimeoutId) {
      clearTimeout(this.retryTimeoutId)
    }
    this.setState({ 
      hasError: false, 
      error: undefined, 
      errorInfo: undefined,
      retryCount: 0,
      errorId: ''
    })
  }

  handleRetry = () => {
    const { maxRetries = 3 } = this.props
    const { retryCount } = this.state

    if (retryCount < maxRetries) {
      this.setState({ retryCount: retryCount + 1 })
      
      // Add a small delay before retry
      this.retryTimeoutId = window.setTimeout(() => {
        this.resetErrorBoundary()
      }, 1000)
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      const { 
        level = 'section', 
        showDetails = false, 
        enableRetry = true, 
        maxRetries = 3 
      } = this.props
      const { error, errorInfo, retryCount, errorId } = this.state

      const getErrorTitle = () => {
        switch (level) {
          case 'page':
            return 'Page Error'
          case 'section':
            return 'Section Error'
          case 'component':
            return 'Component Error'
          default:
            return 'Something went wrong'
        }
      }

      const getErrorMessage = () => {
        switch (level) {
          case 'page':
            return 'This page encountered an error and cannot be displayed properly.'
          case 'section':
            return 'This section couldn\'t load properly. The rest of the page should work fine.'
          case 'component':
            return 'This component failed to render. Other parts of the page are unaffected.'
          default:
            return 'An unexpected error occurred.'
        }
      }

      const containerClasses = level === 'page' 
        ? 'min-h-screen w-full flex items-center justify-center bg-bg-primary'
        : 'min-h-[300px] w-full flex items-center justify-center bg-bg-secondary rounded-lg border border-gray-700/50'

      return (
        <div className={containerClasses} role="alert">
          <div className="text-center p-8 max-w-lg">
            {/* Error Icon */}
            <div className="text-red-400 mb-6">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>

            {/* Error Title */}
            <h3 className="text-xl font-semibold text-white mb-3">
              {getErrorTitle()}
            </h3>

            {/* Error Message */}
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              {getErrorMessage()}
            </p>

            {/* Error Details (Development only) */}
            {showDetails && error && process.env.NODE_ENV === 'development' && (
              <details className="mb-6 text-left bg-gray-900 rounded-lg p-4">
                <summary className="cursor-pointer text-sm font-medium text-gray-300 mb-2">
                  Error Details
                </summary>
                <div className="text-xs text-gray-400 space-y-2">
                  <div>
                    <strong>Error:</strong> {error.message}
                  </div>
                  <div>
                    <strong>Error ID:</strong> {errorId}
                  </div>
                  {error.stack && (
                    <div>
                      <strong>Stack:</strong>
                      <pre className="mt-1 overflow-x-auto text-xs">{error.stack}</pre>
                    </div>
                  )}
                </div>
              </details>
            )}

            {/* Retry Information */}
            {enableRetry && retryCount > 0 && (
              <p className="text-yellow-400 text-sm mb-4">
                Retry attempt {retryCount} of {maxRetries}
              </p>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {enableRetry && retryCount < maxRetries && (
                <button
                  onClick={this.handleRetry}
                  className="px-6 py-3 bg-gorilla-yellow text-gorilla-black rounded-lg hover:bg-yellow-400 transition-colors font-medium focus-visible"
                  aria-label="Retry loading this content"
                >
                  Try Again
                </button>
              )}
              
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors font-medium focus-visible"
                aria-label="Refresh the entire page"
              >
                Refresh Page
              </button>

              {level === 'page' && (
                <button
                  onClick={() => window.history.back()}
                  className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors font-medium focus-visible"
                  aria-label="Go back to previous page"
                >
                  Go Back
                </button>
              )}
            </div>

            {/* Support Information */}
            <div className="mt-6 space-y-2">
              <p className="text-xs text-gray-500">
                If this keeps happening, please contact support.
              </p>
              {errorId && (
                <p className="text-xs text-gray-600">
                  Error ID: {errorId}
                </p>
              )}
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

// Hook version for functional components
export const useErrorBoundary = () => {
  const [error, setError] = React.useState<Error | null>(null)

  const resetError = React.useCallback(() => {
    setError(null)
  }, [])

  const captureError = React.useCallback((error: Error) => {
    setError(error)
  }, [])

  React.useEffect(() => {
    if (error) {
      throw error
    }
  }, [error])

  return { captureError, resetError }
}

export default ErrorBoundary