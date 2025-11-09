"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Settings, Eye, Zap, Volume2, VolumeX, Contrast, Palette } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/context/language-context'

interface AccessibilityPreferences {
  reducedMotion: boolean
  highContrast: boolean
  largeText: boolean
  soundEnabled: boolean
  focusIndicators: 'standard' | 'enhanced' | 'maximum'
  colorScheme: 'auto' | 'light' | 'dark' | 'high-contrast'
}

const DEFAULT_PREFERENCES: AccessibilityPreferences = {
  reducedMotion: false,
  highContrast: false,
  largeText: false,
  soundEnabled: true,
  focusIndicators: 'standard',
  colorScheme: 'auto'
}

// Hook for managing accessibility preferences
export const useAccessibilityPreferences = () => {
  const [preferences, setPreferences] = useState<AccessibilityPreferences>(DEFAULT_PREFERENCES)
  const [systemPreferences, setSystemPreferences] = useState({
    prefersReducedMotion: false,
    prefersHighContrast: false,
    prefersDarkMode: false
  })

  // Detect system preferences
  useEffect(() => {
    const detectSystemPreferences = () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const prefersHighContrast = window.matchMedia('(prefers-contrast: high)').matches
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches

      setSystemPreferences({
        prefersReducedMotion,
        prefersHighContrast,
        prefersDarkMode
      })

      // Auto-apply system preferences if user hasn't set manual preferences
      const savedPrefs = localStorage.getItem('accessibility-preferences')
      if (!savedPrefs) {
        setPreferences(prev => ({
          ...prev,
          reducedMotion: prefersReducedMotion,
          highContrast: prefersHighContrast
        }))
      }
    }

    detectSystemPreferences()

    // Listen for system preference changes
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const contrastQuery = window.matchMedia('(prefers-contrast: high)')
    const colorQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setSystemPreferences(prev => ({ ...prev, prefersReducedMotion: e.matches }))
    }

    const handleContrastChange = (e: MediaQueryListEvent) => {
      setSystemPreferences(prev => ({ ...prev, prefersHighContrast: e.matches }))
    }

    const handleColorChange = (e: MediaQueryListEvent) => {
      setSystemPreferences(prev => ({ ...prev, prefersDarkMode: e.matches }))
    }

    motionQuery.addEventListener('change', handleMotionChange)
    contrastQuery.addEventListener('change', handleContrastChange)
    colorQuery.addEventListener('change', handleColorChange)

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange)
      contrastQuery.removeEventListener('change', handleContrastChange)
      colorQuery.removeEventListener('change', handleColorChange)
    }
  }, [])

  // Load saved preferences
  useEffect(() => {
    const savedPrefs = localStorage.getItem('accessibility-preferences')
    if (savedPrefs) {
      try {
        const parsed = JSON.parse(savedPrefs)
        setPreferences({ ...DEFAULT_PREFERENCES, ...parsed })
      } catch (error) {
        console.warn('Failed to parse saved accessibility preferences:', error)
      }
    }
  }, [])

  // Apply preferences to document
  useEffect(() => {
    const root = document.documentElement
    const body = document.body

    // Apply reduced motion
    if (preferences.reducedMotion || systemPreferences.prefersReducedMotion) {
      root.style.setProperty('--animation-duration', '0.01ms')
      root.style.setProperty('--transition-duration', '0.01ms')
      body.classList.add('reduce-motion')
    } else {
      root.style.removeProperty('--animation-duration')
      root.style.removeProperty('--transition-duration')
      body.classList.remove('reduce-motion')
    }

    // Apply high contrast
    if (preferences.highContrast || systemPreferences.prefersHighContrast) {
      body.classList.add('high-contrast')
      root.style.setProperty('--focus-ring-width', '4px')
      root.style.setProperty('--focus-ring-offset', '3px')
    } else {
      body.classList.remove('high-contrast')
      root.style.setProperty('--focus-ring-width', '3px')
      root.style.setProperty('--focus-ring-offset', '2px')
    }

    // Apply large text
    if (preferences.largeText) {
      body.classList.add('large-text')
      root.style.setProperty('--text-scale', '1.2')
    } else {
      body.classList.remove('large-text')
      root.style.setProperty('--text-scale', '1')
    }

    // Apply focus indicators
    body.classList.remove('focus-standard', 'focus-enhanced', 'focus-maximum')
    body.classList.add(`focus-${preferences.focusIndicators}`)

    // Apply color scheme
    if (preferences.colorScheme !== 'auto') {
      body.classList.remove('theme-auto', 'theme-light', 'theme-dark', 'theme-high-contrast')
      body.classList.add(`theme-${preferences.colorScheme}`)
    }

  }, [preferences, systemPreferences])

  const updatePreference = useCallback(<K extends keyof AccessibilityPreferences>(
    key: K,
    value: AccessibilityPreferences[K]
  ) => {
    setPreferences(prev => {
      const newPrefs = { ...prev, [key]: value }
      localStorage.setItem('accessibility-preferences', JSON.stringify(newPrefs))
      return newPrefs
    })
  }, [])

  const resetToDefaults = useCallback(() => {
    setPreferences(DEFAULT_PREFERENCES)
    localStorage.removeItem('accessibility-preferences')
  }, [])

  const resetToSystem = useCallback(() => {
    const systemBasedPrefs = {
      ...DEFAULT_PREFERENCES,
      reducedMotion: systemPreferences.prefersReducedMotion,
      highContrast: systemPreferences.prefersHighContrast
    }
    setPreferences(systemBasedPrefs)
    localStorage.setItem('accessibility-preferences', JSON.stringify(systemBasedPrefs))
  }, [systemPreferences])

  return {
    preferences,
    systemPreferences,
    updatePreference,
    resetToDefaults,
    resetToSystem
  }
}

// Accessibility Preferences Panel Component
interface AccessibilityPreferencesPanelProps {
  className?: string
  onClose?: () => void
}

export const AccessibilityPreferencesPanel: React.FC<AccessibilityPreferencesPanelProps> = ({
  className,
  onClose
}) => {
  const { language } = useLanguage()
  const {
    preferences,
    systemPreferences,
    updatePreference,
    resetToDefaults,
    resetToSystem
  } = useAccessibilityPreferences()

  const [isOpen, setIsOpen] = useState(false)

  const handleClose = () => {
    setIsOpen(false)
    onClose?.()
  }

  return (
    <Card className={cn('w-full max-w-2xl', className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          {language === 'es' ? 'Preferencias de Accesibilidad' : 'Accessibility Preferences'}
        </CardTitle>
        <CardDescription>
          {language === 'es' 
            ? 'Personaliza la experiencia para tus necesidades de accesibilidad'
            : 'Customize the experience for your accessibility needs'
          }
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* System Detection Status */}
        <div className="p-4 bg-muted rounded-lg">
          <h3 className="font-medium mb-2">
            {language === 'es' ? 'Detección del Sistema' : 'System Detection'}
          </h3>
          <div className="space-y-1 text-sm text-muted-foreground">
            <p>
              {language === 'es' ? 'Movimiento reducido:' : 'Reduced motion:'} {' '}
              <span className={systemPreferences.prefersReducedMotion ? 'text-green-600' : 'text-gray-500'}>
                {systemPreferences.prefersReducedMotion 
                  ? (language === 'es' ? 'Detectado' : 'Detected')
                  : (language === 'es' ? 'No detectado' : 'Not detected')
                }
              </span>
            </p>
            <p>
              {language === 'es' ? 'Alto contraste:' : 'High contrast:'} {' '}
              <span className={systemPreferences.prefersHighContrast ? 'text-green-600' : 'text-gray-500'}>
                {systemPreferences.prefersHighContrast 
                  ? (language === 'es' ? 'Detectado' : 'Detected')
                  : (language === 'es' ? 'No detectado' : 'Not detected')
                }
              </span>
            </p>
          </div>
        </div>

        {/* Motion Preferences */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="reduced-motion" className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                {language === 'es' ? 'Reducir Movimiento' : 'Reduce Motion'}
              </Label>
              <p className="text-sm text-muted-foreground">
                {language === 'es' 
                  ? 'Desactiva animaciones y transiciones para reducir el mareo'
                  : 'Disable animations and transitions to reduce motion sickness'
                }
              </p>
            </div>
            <Switch
              id="reduced-motion"
              checked={preferences.reducedMotion}
              onCheckedChange={(checked) => updatePreference('reducedMotion', checked)}
              aria-describedby="reduced-motion-desc"
            />
          </div>
          <p id="reduced-motion-desc" className="sr-only">
            {language === 'es' 
              ? 'Activa esta opción para desactivar animaciones y efectos de movimiento'
              : 'Enable this option to disable animations and motion effects'
            }
          </p>
        </div>

        {/* Contrast Preferences */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="high-contrast" className="flex items-center gap-2">
                <Contrast className="h-4 w-4" />
                {language === 'es' ? 'Alto Contraste' : 'High Contrast'}
              </Label>
              <p className="text-sm text-muted-foreground">
                {language === 'es' 
                  ? 'Aumenta el contraste para mejor visibilidad'
                  : 'Increase contrast for better visibility'
                }
              </p>
            </div>
            <Switch
              id="high-contrast"
              checked={preferences.highContrast}
              onCheckedChange={(checked) => updatePreference('highContrast', checked)}
              aria-describedby="high-contrast-desc"
            />
          </div>
          <p id="high-contrast-desc" className="sr-only">
            {language === 'es' 
              ? 'Activa esta opción para aumentar el contraste de colores'
              : 'Enable this option to increase color contrast'
            }
          </p>
        </div>

        {/* Text Size Preferences */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="large-text" className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                {language === 'es' ? 'Texto Grande' : 'Large Text'}
              </Label>
              <p className="text-sm text-muted-foreground">
                {language === 'es' 
                  ? 'Aumenta el tamaño del texto para mejor legibilidad'
                  : 'Increase text size for better readability'
                }
              </p>
            </div>
            <Switch
              id="large-text"
              checked={preferences.largeText}
              onCheckedChange={(checked) => updatePreference('largeText', checked)}
              aria-describedby="large-text-desc"
            />
          </div>
          <p id="large-text-desc" className="sr-only">
            {language === 'es' 
              ? 'Activa esta opción para aumentar el tamaño del texto'
              : 'Enable this option to increase text size'
            }
          </p>
        </div>

        {/* Sound Preferences */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="sound-enabled" className="flex items-center gap-2">
                {preferences.soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                {language === 'es' ? 'Sonidos de Interfaz' : 'Interface Sounds'}
              </Label>
              <p className="text-sm text-muted-foreground">
                {language === 'es' 
                  ? 'Habilita sonidos para retroalimentación de acciones'
                  : 'Enable sounds for action feedback'
                }
              </p>
            </div>
            <Switch
              id="sound-enabled"
              checked={preferences.soundEnabled}
              onCheckedChange={(checked) => updatePreference('soundEnabled', checked)}
              aria-describedby="sound-enabled-desc"
            />
          </div>
          <p id="sound-enabled-desc" className="sr-only">
            {language === 'es' 
              ? 'Activa esta opción para habilitar sonidos de interfaz'
              : 'Enable this option to enable interface sounds'
            }
          </p>
        </div>

        {/* Focus Indicators */}
        <div className="space-y-4">
          <Label className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            {language === 'es' ? 'Indicadores de Foco' : 'Focus Indicators'}
          </Label>
          <div className="grid grid-cols-1 gap-2">
            {(['standard', 'enhanced', 'maximum'] as const).map((level) => (
              <Label key={level} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="focus-indicators"
                  value={level}
                  checked={preferences.focusIndicators === level}
                  onChange={() => updatePreference('focusIndicators', level)}
                  className="sr-only"
                />
                <div className={cn(
                  'w-4 h-4 rounded-full border-2',
                  preferences.focusIndicators === level 
                    ? 'bg-primary border-primary' 
                    : 'border-muted-foreground'
                )}>
                  {preferences.focusIndicators === level && (
                    <div className="w-2 h-2 bg-white rounded-full m-0.5" />
                  )}
                </div>
                <span className="text-sm">
                  {level === 'standard' && (language === 'es' ? 'Estándar' : 'Standard')}
                  {level === 'enhanced' && (language === 'es' ? 'Mejorado' : 'Enhanced')}
                  {level === 'maximum' && (language === 'es' ? 'Máximo' : 'Maximum')}
                </span>
              </Label>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t">
          <Button
            variant="outline"
            onClick={resetToSystem}
            className="flex-1"
          >
            {language === 'es' ? 'Usar Configuración del Sistema' : 'Use System Settings'}
          </Button>
          <Button
            variant="outline"
            onClick={resetToDefaults}
            className="flex-1"
          >
            {language === 'es' ? 'Restablecer Predeterminados' : 'Reset to Defaults'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Floating Accessibility Button
interface AccessibilityToggleProps {
  className?: string
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'
}

export const AccessibilityToggle: React.FC<AccessibilityToggleProps> = ({
  className,
  position = 'bottom-left'
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const { language } = useLanguage()

  const positionClasses = {
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4'
  }

  return (
    <>
      <Button
        className={cn(
          'fixed z-50 rounded-full p-3 shadow-lg',
          'bg-primary text-primary-foreground',
          'hover:scale-110 transition-transform',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gorilla-yellow focus-visible:ring-offset-2',
          positionClasses[position],
          className
        )}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={language === 'es' ? 'Abrir preferencias de accesibilidad' : 'Open accessibility preferences'}
        aria-expanded={isOpen}
        aria-controls="accessibility-panel"
      >
        <Settings className="h-5 w-5" />
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            id="accessibility-panel"
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="accessibility-title"
          >
            <AccessibilityPreferencesPanel onClose={() => setIsOpen(false)} />
            <div className="mt-4 text-center">
              <Button
                variant="outline"
                onClick={() => setIsOpen(false)}
                className="bg-background"
              >
                {language === 'es' ? 'Cerrar' : 'Close'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default {
  useAccessibilityPreferences,
  AccessibilityPreferencesPanel,
  AccessibilityToggle
}