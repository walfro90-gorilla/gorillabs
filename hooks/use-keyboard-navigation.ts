"use client"

import { useEffect, useCallback, useRef } from 'react'

interface KeyboardNavigationOptions {
  enableArrowKeys?: boolean
  enableTabTrapping?: boolean
  enableEscapeKey?: boolean
  onEscape?: () => void
  focusableSelectors?: string[]
}

const DEFAULT_FOCUSABLE_SELECTORS = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
  '[role="button"]:not([disabled])',
  '[role="link"]:not([disabled])',
  '[role="menuitem"]:not([disabled])',
  '[role="tab"]:not([disabled])',
  'details summary',
  'audio[controls]',
  'video[controls]'
]

export const useKeyboardNavigation = (
  containerRef: React.RefObject<HTMLElement | null>,
  options: KeyboardNavigationOptions = {}
) => {
  const {
    enableArrowKeys = true,
    enableTabTrapping = false,
    enableEscapeKey = true,
    onEscape,
    focusableSelectors = DEFAULT_FOCUSABLE_SELECTORS
  } = options

  const currentFocusIndex = useRef<number>(-1)

  const getFocusableElements = useCallback((): HTMLElement[] => {
    if (!containerRef.current) return []
    
    const selector = focusableSelectors.join(', ')
    const elements = Array.from(
      containerRef.current.querySelectorAll<HTMLElement>(selector)
    )
    
    // Filter out elements that are not visible or have display: none
    return elements.filter(element => {
      const style = window.getComputedStyle(element)
      return (
        style.display !== 'none' &&
        style.visibility !== 'hidden' &&
        element.offsetParent !== null &&
        !element.hasAttribute('aria-hidden') &&
        element.getAttribute('aria-hidden') !== 'true'
      )
    })
  }, [containerRef, focusableSelectors])

  const focusElement = useCallback((index: number) => {
    const focusableElements = getFocusableElements()
    if (focusableElements.length === 0) return

    const targetIndex = Math.max(0, Math.min(index, focusableElements.length - 1))
    const element = focusableElements[targetIndex]
    
    if (element) {
      element.focus()
      currentFocusIndex.current = targetIndex
      
      // Scroll element into view if needed
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest'
      })
    }
  }, [getFocusableElements])

  const focusNext = useCallback(() => {
    const focusableElements = getFocusableElements()
    if (focusableElements.length === 0) return

    const nextIndex = currentFocusIndex.current + 1
    if (nextIndex >= focusableElements.length) {
      // If tab trapping is enabled, wrap to first element
      if (enableTabTrapping) {
        focusElement(0)
      }
    } else {
      focusElement(nextIndex)
    }
  }, [focusElement, getFocusableElements, enableTabTrapping])

  const focusPrevious = useCallback(() => {
    const focusableElements = getFocusableElements()
    if (focusableElements.length === 0) return

    const prevIndex = currentFocusIndex.current - 1
    if (prevIndex < 0) {
      // If tab trapping is enabled, wrap to last element
      if (enableTabTrapping) {
        focusElement(focusableElements.length - 1)
      }
    } else {
      focusElement(prevIndex)
    }
  }, [focusElement, getFocusableElements, enableTabTrapping])

  const focusFirst = useCallback(() => {
    focusElement(0)
  }, [focusElement])

  const focusLast = useCallback(() => {
    const focusableElements = getFocusableElements()
    if (focusableElements.length > 0) {
      focusElement(focusableElements.length - 1)
    }
  }, [focusElement, getFocusableElements])

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!containerRef.current?.contains(event.target as Node)) return

    const focusableElements = getFocusableElements()
    if (focusableElements.length === 0) return

    // Update current focus index based on currently focused element
    const activeElement = document.activeElement as HTMLElement
    const currentIndex = focusableElements.indexOf(activeElement)
    if (currentIndex !== -1) {
      currentFocusIndex.current = currentIndex
    }

    switch (event.key) {
      case 'Escape':
        if (enableEscapeKey && onEscape) {
          event.preventDefault()
          onEscape()
        }
        break

      case 'Tab':
        if (enableTabTrapping) {
          event.preventDefault()
          if (event.shiftKey) {
            focusPrevious()
          } else {
            focusNext()
          }
        }
        break

      case 'ArrowDown':
      case 'ArrowRight':
        if (enableArrowKeys) {
          event.preventDefault()
          focusNext()
        }
        break

      case 'ArrowUp':
      case 'ArrowLeft':
        if (enableArrowKeys) {
          event.preventDefault()
          focusPrevious()
        }
        break

      case 'Home':
        if (enableArrowKeys) {
          event.preventDefault()
          focusFirst()
        }
        break

      case 'End':
        if (enableArrowKeys) {
          event.preventDefault()
          focusLast()
        }
        break

      case 'Enter':
      case ' ':
        // Let the browser handle Enter and Space for buttons and links
        // but ensure the element is properly focused
        if (activeElement && focusableElements.includes(activeElement)) {
          // Element is already focused, let default behavior happen
          return
        }
        break
    }
  }, [
    containerRef,
    getFocusableElements,
    enableArrowKeys,
    enableTabTrapping,
    enableEscapeKey,
    onEscape,
    focusNext,
    focusPrevious,
    focusFirst,
    focusLast
  ])

  const handleFocusIn = useCallback((event: FocusEvent) => {
    if (!containerRef.current?.contains(event.target as Node)) return

    const focusableElements = getFocusableElements()
    const targetElement = event.target as HTMLElement
    const index = focusableElements.indexOf(targetElement)
    
    if (index !== -1) {
      currentFocusIndex.current = index
    }
  }, [containerRef, getFocusableElements])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Add event listeners
    container.addEventListener('keydown', handleKeyDown)
    container.addEventListener('focusin', handleFocusIn)

    // Cleanup
    return () => {
      container.removeEventListener('keydown', handleKeyDown)
      container.removeEventListener('focusin', handleFocusIn)
    }
  }, [handleKeyDown, handleFocusIn])

  return {
    focusNext,
    focusPrevious,
    focusFirst,
    focusLast,
    focusElement,
    getFocusableElements,
    currentFocusIndex: currentFocusIndex.current
  }
}

export default useKeyboardNavigation