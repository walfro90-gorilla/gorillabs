"use client"

import React, { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface ProgressIndicatorProps {
  steps: string[]
  currentStep: number
  className?: string
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  steps,
  currentStep,
  className = ''
}) => {
  return (
    <div className={cn('w-full max-w-md mx-auto', className)}>
      <div className="flex items-center justify-between mb-4">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors duration-300',
                index <= currentStep
                  ? 'bg-gorilla-yellow text-gorilla-black'
                  : 'bg-gray-700 text-gray-400'
              )}
            >
              {index + 1}
            </div>
            <span className="text-xs text-gray-400 mt-2 text-center max-w-[80px]">
              {step}
            </span>
          </div>
        ))}
      </div>
      
      {/* Progress bar */}
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div
          className="bg-gorilla-yellow h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
        />
      </div>
    </div>
  )
}

interface LoadingProgressProps {
  message?: string
  progress?: number
  className?: string
}

export const LoadingProgress: React.FC<LoadingProgressProps> = ({
  message = 'Loading...',
  progress = 0,
  className = ''
}) => {
  const [displayProgress, setDisplayProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayProgress(progress)
    }, 100)

    return () => clearTimeout(timer)
  }, [progress])

  return (
    <div className={cn('w-full max-w-md mx-auto text-center', className)}>
      <div className="mb-4">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-600 border-t-gorilla-yellow mx-auto mb-3" />
        <p className="text-white text-sm font-medium">{message}</p>
      </div>
      
      {progress > 0 && (
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-gorilla-yellow h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${displayProgress}%` }}
          />
        </div>
      )}
    </div>
  )
}

interface StatusIndicatorProps {
  status: 'loading' | 'success' | 'error' | 'warning'
  message: string
  className?: string
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  message,
  className = ''
}) => {
  const statusConfig = {
    loading: {
      icon: (
        <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-400 border-t-blue-400" />
      ),
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10'
    },
    success: {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ),
      color: 'text-green-400',
      bgColor: 'bg-green-400/10'
    },
    error: {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      ),
      color: 'text-red-400',
      bgColor: 'bg-red-400/10'
    },
    warning: {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      ),
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400/10'
    }
  }

  const config = statusConfig[status]

  return (
    <div className={cn(
      'flex items-center gap-3 p-3 rounded-lg border',
      config.bgColor,
      config.color,
      'border-current/20',
      className
    )}>
      {config.icon}
      <span className="text-sm font-medium">{message}</span>
    </div>
  )
}

export default ProgressIndicator