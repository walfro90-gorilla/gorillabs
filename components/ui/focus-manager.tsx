"use client"

import React, { useEffect, useRef, useState } from 'react'
import { useKeyboardNavigation } from '@/hooks/use-keyboard-navigation'

interface FocusManagerProps {
  children: React.ReactNode
  className?: string
  enableArrowKeys?: boolean
  enableTabTrapping?: boolean
  enableEscapeKey?: boolean
  onEscape?: () => void
  autoFocus?: boolean
  restoreFocus?: boolean
  focusableSelectors?: string[]
}

export const FocusManager: React.FC<FocusManagerProps> = ({
  children,
  className = '',
  enableArrowKeys = true,
  enableTabTrapping = false,
  enableEscapeKey = true,
  onEscape,
  autoFocus = false,
  restoreFocus = false,
  focusableSelectors
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  const {
    focusFirst,
    getFocusableElements
  } = useKeyboardNavigation(containerRef, {
    enableArrowKeys,
    enableTabTrapping,
    enableEscapeKey,
    onEscape: () => {
      if (restoreFocus && previousFocusRef.current) {
        previousFocusRef.current.focus()
      }
      onEscape?.()
    },
    focusableSelectors
  })

  useEffect(() => {
    if (!isInitialized) {
      // Store the previously focused element
      if (restoreFocus && document.activeElement instanceof HTMLElement) {
        previousFocusRef.current = document.activeElement
      }

      // Auto-focus the first focusable element if requested
      if (autoFocus) {
        const timer = setTimeout(() => {
          const focusableElements = getFocusableElements()
          if (focusableElements.length > 0) {
            focusFirst()
          }
        }, 100) // Small delay to ensure DOM is ready

        return () => clearTimeout(timer)
      }

      setIsInitialized(true)
    }
  }, [autoFocus, restoreFocus, focusFirst, getFocusableElements, isInitialized])

  // Cleanup: restore focus when component unmounts
  useEffect(() => {
    return () => {
      if (restoreFocus && previousFocusRef.current) {
        previousFocusRef.current.focus()
      }
    }
  }, [restoreFocus])

  return (
    <div
      ref={containerRef}
      className={`focus-manager ${className}`}
      role="region"
      aria-label="Keyboard navigable content"
    >
      {children}
    </div>
  )
}

export default FocusManager