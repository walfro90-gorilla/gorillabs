"use client"

import { useEffect, useRef, useCallback } from 'react'

interface TouchInteractionOptions {
  enableHapticFeedback?: boolean
  enableVisualFeedback?: boolean
  enableSoundFeedback?: boolean
  feedbackDuration?: number
  minimumTouchTarget?: number
  preventDoubleTouch?: boolean
  touchDelay?: number
}

interface TouchGesture {
  startX: number
  startY: number
  currentX: number
  currentY: number
  deltaX: number
  deltaY: number
  distance: number
  duration: number
  velocity: number
  direction: 'up' | 'down' | 'left' | 'right' | 'none'
}

export function useTouchInteractions(
  elementRef: React.RefObject<HTMLElement>,
  options: TouchInteractionOptions = {}
) {
  const {
    enableHapticFeedback = true,
    enableVisualFeedback = true,
    enableSoundFeedback = false,
    feedbackDuration = 150,
    minimumTouchTarget = 44,
    preventDoubleTouch = true,
    touchDelay = 300
  } = options

  const touchStartTime = useRef<number>(0)
  const lastTouchTime = useRef<number>(0)
  const touchStartPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const isProcessingTouch = useRef<boolean>(false)

  // Haptic feedback
  const triggerHapticFeedback = useCallback((type: 'light' | 'medium' | 'heavy' = 'light') => {
    if (!enableHapticFeedback || !navigator.vibrate) return
    
    const patterns = {
      light: [10],
      medium: [20],
      heavy: [30]
    }
    
    navigator.vibrate(patterns[type])
  }, [enableHapticFeedback])

  // Visual feedback
  const triggerVisualFeedback = useCallback((element: HTMLElement) => {
    if (!enableVisualFeedback) return

    const originalTransform = element.style.transform
    const originalOpacity = element.style.opacity
    
    // Scale down slightly and reduce opacity
    element.style.transform = `${originalTransform} scale(0.95)`
    element.style.opacity = '0.7'
    element.style.transition = 'transform 0.1s ease-out, opacity 0.1s ease-out'
    
    setTimeout(() => {
      element.style.transform = originalTransform
      element.style.opacity = originalOpacity
      
      setTimeout(() => {
        element.style.transition = ''
      }, feedbackDuration)
    }, feedbackDuration)
  }, [enableVisualFeedback, feedbackDuration])

  // Sound feedback
  const triggerSoundFeedback = useCallback(() => {
    if (!enableSoundFeedback) return
    
    // Create a subtle click sound
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)
    
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.1)
  }, [enableSoundFeedback])

  // Calculate gesture information
  const calculateGesture = useCallback((startX: number, startY: number, currentX: number, currentY: number, duration: number): TouchGesture => {
    const deltaX = currentX - startX
    const deltaY = currentY - startY
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
    const velocity = distance / duration
    
    let direction: TouchGesture['direction'] = 'none'
    if (distance > 10) { // Minimum distance for direction detection
      const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI
      if (angle >= -45 && angle <= 45) direction = 'right'
      else if (angle >= 45 && angle <= 135) direction = 'down'
      else if (angle >= -135 && angle <= -45) direction = 'up'
      else direction = 'left'
    }
    
    return {
      startX,
      startY,
      currentX,
      currentY,
      deltaX,
      deltaY,
      distance,
      duration,
      velocity,
      direction
    }
  }, [])

  // Optimize touch target size
  const optimizeTouchTarget = useCallback((element: HTMLElement) => {
    const rect = element.getBoundingClientRect()
    const computedStyle = window.getComputedStyle(element)
    
    // Ensure minimum touch target size
    if (rect.width < minimumTouchTarget || rect.height < minimumTouchTarget) {
      const paddingX = Math.max(0, (minimumTouchTarget - rect.width) / 2)
      const paddingY = Math.max(0, (minimumTouchTarget - rect.height) / 2)
      
      element.style.paddingLeft = `${paddingX}px`
      element.style.paddingRight = `${paddingX}px`
      element.style.paddingTop = `${paddingY}px`
      element.style.paddingBottom = `${paddingY}px`
    }
    
    // Ensure proper spacing between touch targets
    const siblings = Array.from(element.parentElement?.children || [])
    siblings.forEach((sibling) => {
      if (sibling !== element && sibling instanceof HTMLElement) {
        const siblingRect = sibling.getBoundingClientRect()
        const distance = Math.sqrt(
          Math.pow(rect.left - siblingRect.left, 2) + 
          Math.pow(rect.top - siblingRect.top, 2)
        )
        
        if (distance < 8) { // Minimum 8px spacing
          element.style.marginRight = '8px'
          element.style.marginBottom = '8px'
        }
      }
    })
  }, [minimumTouchTarget])

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // Optimize the element for touch
    optimizeTouchTarget(element)
    
    // Set touch-action for better performance
    element.style.touchAction = 'manipulation'
    
    // Prevent text selection on touch
    element.style.webkitUserSelect = 'none'
    element.style.userSelect = 'none'
    
    // Prevent callout on iOS
    element.style.webkitTouchCallout = 'none'

    const handleTouchStart = (e: TouchEvent) => {
      const now = Date.now()
      
      // Prevent double touch if enabled
      if (preventDoubleTouch && now - lastTouchTime.current < touchDelay) {
        e.preventDefault()
        return
      }
      
      if (isProcessingTouch.current) return
      
      isProcessingTouch.current = true
      touchStartTime.current = now
      lastTouchTime.current = now
      
      const touch = e.touches[0]
      touchStartPos.current = { x: touch.clientX, y: touch.clientY }
      
      // Trigger immediate feedback
      triggerHapticFeedback('light')
      triggerVisualFeedback(element)
      triggerSoundFeedback()
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!isProcessingTouch.current) return
      
      const touch = e.touches[0]
      const gesture = calculateGesture(
        touchStartPos.current.x,
        touchStartPos.current.y,
        touch.clientX,
        touch.clientY,
        Date.now() - touchStartTime.current
      )
      
      // Prevent scrolling if this is a tap (small movement)
      if (gesture.distance < 10) {
        e.preventDefault()
      }
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (!isProcessingTouch.current) return
      
      const touch = e.changedTouches[0]
      const gesture = calculateGesture(
        touchStartPos.current.x,
        touchStartPos.current.y,
        touch.clientX,
        touch.clientY,
        Date.now() - touchStartTime.current
      )
      
      // Reset processing flag
      setTimeout(() => {
        isProcessingTouch.current = false
      }, 50)
      
      // Trigger completion feedback for successful taps
      if (gesture.distance < 10 && gesture.duration < 500) {
        triggerHapticFeedback('medium')
      }
    }

    const handleTouchCancel = () => {
      isProcessingTouch.current = false
    }

    // Add event listeners with passive option for better performance
    element.addEventListener('touchstart', handleTouchStart, { passive: false })
    element.addEventListener('touchmove', handleTouchMove, { passive: false })
    element.addEventListener('touchend', handleTouchEnd, { passive: true })
    element.addEventListener('touchcancel', handleTouchCancel, { passive: true })

    return () => {
      element.removeEventListener('touchstart', handleTouchStart)
      element.removeEventListener('touchmove', handleTouchMove)
      element.removeEventListener('touchend', handleTouchEnd)
      element.removeEventListener('touchcancel', handleTouchCancel)
    }
  }, [
    elementRef,
    optimizeTouchTarget,
    triggerHapticFeedback,
    triggerVisualFeedback,
    triggerSoundFeedback,
    calculateGesture,
    preventDoubleTouch,
    touchDelay
  ])

  return {
    triggerHapticFeedback,
    triggerVisualFeedback,
    triggerSoundFeedback
  }
}

// Hook for swipe gestures
export function useSwipeGesture(
  elementRef: React.RefObject<HTMLElement>,
  onSwipe: (direction: 'up' | 'down' | 'left' | 'right', gesture: TouchGesture) => void,
  options: { threshold?: number; velocity?: number } = {}
) {
  const { threshold = 50, velocity = 0.3 } = options
  
  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    let startX = 0
    let startY = 0
    let startTime = 0

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0]
      startX = touch.clientX
      startY = touch.clientY
      startTime = Date.now()
    }

    const handleTouchEnd = (e: TouchEvent) => {
      const touch = e.changedTouches[0]
      const endX = touch.clientX
      const endY = touch.clientY
      const endTime = Date.now()
      
      const deltaX = endX - startX
      const deltaY = endY - startY
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
      const duration = endTime - startTime
      const gestureVelocity = distance / duration
      
      if (distance > threshold && gestureVelocity > velocity) {
        const gesture: TouchGesture = {
          startX,
          startY,
          currentX: endX,
          currentY: endY,
          deltaX,
          deltaY,
          distance,
          duration,
          velocity: gestureVelocity,
          direction: Math.abs(deltaX) > Math.abs(deltaY)
            ? (deltaX > 0 ? 'right' : 'left')
            : (deltaY > 0 ? 'down' : 'up')
        }
        
        onSwipe(gesture.direction, gesture)
      }
    }

    element.addEventListener('touchstart', handleTouchStart, { passive: true })
    element.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      element.removeEventListener('touchstart', handleTouchStart)
      element.removeEventListener('touchend', handleTouchEnd)
    }
  }, [elementRef, onSwipe, threshold, velocity])
}

export default useTouchInteractions