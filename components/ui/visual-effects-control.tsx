"use client"

import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import { useVisualEffects } from '@/hooks/use-visual-effects'
import { Button } from './button'
import { Sparkles } from 'lucide-react'

interface VisualEffectsControlProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  className?: string
}

export const VisualEffectsControl: React.FC<VisualEffectsControlProps> = ({
  position = 'bottom-right',
  className
}) => {
  const {
    settings,
    capabilities,
    userPreferences,
    toggleEffects,
    setQuality,
    resetToOptimal
  } = useVisualEffects()

  const [isExpanded, setIsExpanded] = useState(false)

  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4'
  }

  return (
    <div className={cn('fixed z-50', positionClasses[position], className)}>
      {/* Main Toggle Button */}
      <Button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          'rounded-full p-3 shadow-lg transition-all duration-300',
          'bg-gorilla-yellow text-gorilla-black hover:bg-yellow-400',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gorilla-yellow focus-visible:ring-offset-2',
          isExpanded && 'scale-110'
        )}
        aria-label="Toggle visual effects controls"
        aria-expanded={isExpanded}
      >
        <Sparkles className="h-5 w-5" />
      </Button>

      {/* Expanded Controls */}
      {isExpanded && (
        <div className="absolute bottom-16 right-0 mb-2 w-80 bg-black/90 backdrop-blur-md border border-gorilla-yellow/20 rounded-lg shadow-xl p-4">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-white font-semibold flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-gorilla-yellow" />
                Visual Effects
              </h3>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-gray-400 hover:text-white"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Effects Toggle */}
            <div className="flex items-center justify-between">
              <span className="text-gray-300 text-sm">Enable Effects</span>
              <button
                onClick={() => toggleEffects(!userPreferences.effectsEnabled)}
                className={cn(
                  'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                  userPreferences.effectsEnabled ? 'bg-gorilla-yellow' : 'bg-gray-600'
                )}
              >
                <span
                  className={cn(
                    'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                    userPreferences.effectsEnabled ? 'translate-x-6' : 'translate-x-1'
                  )}
                />
              </button>
            </div>

            {/* Quality Settings */}
            {userPreferences.effectsEnabled && (
              <div className="space-y-2">
                <span className="text-gray-300 text-sm">Quality Level</span>
                <div className="grid grid-cols-3 gap-2">
                  {(['low', 'medium', 'high'] as const).map((quality) => (
                    <Button
                      key={quality}
                      variant={settings.effectsQuality === quality ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setQuality(quality)}
                      className="capitalize text-xs"
                    >
                      {quality}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Device Info */}
            <div className="pt-2 border-t border-gray-700">
              <div className="text-xs text-gray-400 space-y-1">
                <p>Device: {capabilities.isHighPerformance ? 'High Performance' : 'Standard'}</p>
                <p>Connection: {capabilities.connectionSpeed}</p>
                {capabilities.prefersReducedMotion && (
                  <p className="text-orange-400">Reduced motion detected</p>
                )}
              </div>
            </div>

            {/* Reset Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={resetToOptimal}
              className="w-full text-xs"
            >
              Reset to Optimal
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default VisualEffectsControl