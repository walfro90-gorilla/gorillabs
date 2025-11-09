"use client"

import React, { useRef, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { useKeyboardNavigation } from '@/hooks/use-keyboard-navigation'
import { FocusIndicator } from './focus-indicator'
import { TabOrderManager } from './tab-order-manager'

interface KeyboardNavigationWrapperProps {
  children: React.ReactNode
  className?: string
  enableArrowKeys?: boolean
  enableTabTrapping?: boolean
  enableEscapeKey?: boolean
  enableDebugMode?: boolean
  onEscape?: () => void
  role?: string
  'aria-label'?: string
  'aria-labelledby'?: string
  'aria-describedby'?: string
}

export const KeyboardNavigationWrapper: React.FC<KeyboardNavigationWrapperProps> = ({
  children,
  className,
  enableArrowKeys = true,
  enableTabTrapping = false,
  enableEscapeKey = true,
  enableDebugMode = false,
  onEscape,
  role,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isActive, setIsActive] = useState(false)

  // Initialize keyboard navigation
  const {
    focusNext,
    focusPrevious,
    focusFirst,
    focusLast,
    getFocusableElements
  } = useKeyboardNavigation(containerRef, {
    enableArrowKeys,
    enableTabTrapping,
    enableEscapeKey,
    onEscape
  })

  // Track when the container becomes active
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleFocusIn = () => setIsActive(true)
    const handleFocusOut = (e: FocusEvent) => {
      // Check if focus is moving outside the container
      if (!container.contains(e.relatedTarget as Node)) {
        setIsActive(false)
      }
    }

    container.addEventListener('focusin', handleFocusIn)
    container.addEventListener('focusout', handleFocusOut)

    return () => {
      container.removeEventListener('focusin', handleFocusIn)
      container.removeEventListener('focusout', handleFocusOut)
    }
  }, [])

  // Add keyboard shortcuts for navigation
  useEffect(() => {
    const container = containerRef.current
    if (!container || !isActive) return

    const handleKeyDown = (event: KeyboardEvent) => {
      // Only handle if focus is within our container
      if (!container.contains(document.activeElement)) return

      switch (event.key) {
        case 'Home':
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault()
            focusFirst()
          }
          break
        case 'End':
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault()
            focusLast()
          }
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isActive, focusFirst, focusLast])

  return (
    <TabOrderManager
      enableDebugMode={enableDebugMode}
      onTabOrderChange={(items) => {
        if (enableDebugMode) {
          console.log('Tab order updated:', items)
        }
      }}
    >
      <FocusIndicator
        variant="default"
        color="yellow"
        thickness="medium"
        offset="small"
        rounded
        animated
      >
        <div
          ref={containerRef}
          className={cn(
            'keyboard-navigation-wrapper',
            'focus-within:outline-none',
            isActive && 'keyboard-navigation-active',
            className
          )}
          role={role}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          aria-describedby={ariaDescribedBy}
          {...props}
        >
          {children}
        </div>
      </FocusIndicator>
    </TabOrderManager>
  )
}

// Utility component for creating keyboard-navigable sections
interface KeyboardSectionProps {
  children: React.ReactNode
  className?: string
  title?: string
  description?: string
  landmark?: 'main' | 'navigation' | 'banner' | 'contentinfo' | 'complementary' | 'region'
}

export const KeyboardSection: React.FC<KeyboardSectionProps> = ({
  children,
  className,
  title,
  description,
  landmark = 'region'
}) => {
  const sectionId = React.useId()
  const titleId = title ? `${sectionId}-title` : undefined
  const descId = description ? `${sectionId}-desc` : undefined

  return (
    <KeyboardNavigationWrapper
      className={cn('keyboard-section', className)}
      role={landmark}
      aria-labelledby={titleId}
      aria-describedby={descId}
    >
      {title && (
        <h2 id={titleId} className="sr-only">
          {title}
        </h2>
      )}
      {description && (
        <p id={descId} className="sr-only">
          {description}
        </p>
      )}
      {children}
    </KeyboardNavigationWrapper>
  )
}

export default KeyboardNavigationWrapper