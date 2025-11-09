/**
 * GSAP Configuration and Utilities
 * Centralized configuration for GreenSock Animation Platform
 */

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * Default GSAP configuration
 */
export const gsapConfig = {
  // Default duration for animations
  duration: 0.6,
  
  // Default easing
  ease: 'power2.out',
  
  // ScrollTrigger defaults
  scrollTrigger: {
    start: 'top 80%',
    end: 'bottom 20%',
    toggleActions: 'play none none reverse',
  },
}

/**
 * Common animation presets
 */
export const animations = {
  fadeIn: {
    opacity: 0,
    duration: gsapConfig.duration,
    ease: gsapConfig.ease,
  },
  
  slideUp: {
    y: 50,
    opacity: 0,
    duration: gsapConfig.duration,
    ease: gsapConfig.ease,
  },
  
  slideDown: {
    y: -50,
    opacity: 0,
    duration: gsapConfig.duration,
    ease: gsapConfig.ease,
  },
  
  slideLeft: {
    x: 50,
    opacity: 0,
    duration: gsapConfig.duration,
    ease: gsapConfig.ease,
  },
  
  slideRight: {
    x: -50,
    opacity: 0,
    duration: gsapConfig.duration,
    ease: gsapConfig.ease,
  },
  
  scale: {
    scale: 0.8,
    opacity: 0,
    duration: gsapConfig.duration,
    ease: 'back.out(1.7)',
  },
  
  rotate: {
    rotation: 180,
    opacity: 0,
    duration: gsapConfig.duration,
    ease: gsapConfig.ease,
  },
}

/**
 * Stagger configuration for multiple elements
 */
export const staggerConfig = {
  amount: 0.3, // Total time for stagger
  from: 'start', // Direction: 'start', 'center', 'end', 'edges', 'random'
  ease: 'power2.out',
}

/**
 * Utility function to create a scroll-triggered animation
 */
export const createScrollAnimation = (
  element: string | Element,
  animation: gsap.TweenVars,
  scrollTriggerConfig?: ScrollTrigger.Vars
) => {
  return gsap.from(element, {
    ...animation,
    scrollTrigger: {
      trigger: element,
      ...gsapConfig.scrollTrigger,
      ...scrollTriggerConfig,
    },
  })
}

/**
 * Utility function to create a staggered scroll animation
 */
export const createStaggeredScrollAnimation = (
  elements: string | Element[],
  animation: gsap.TweenVars,
  scrollTriggerConfig?: ScrollTrigger.Vars
) => {
  return gsap.from(elements, {
    ...animation,
    stagger: staggerConfig,
    scrollTrigger: {
      trigger: elements,
      ...gsapConfig.scrollTrigger,
      ...scrollTriggerConfig,
    },
  })
}

/**
 * Utility function to animate a counter
 */
export const animateCounter = (
  element: Element,
  target: number,
  duration: number = 2,
  onUpdate?: (value: number) => void
) => {
  const obj = { value: 0 }
  
  return gsap.to(obj, {
    value: target,
    duration,
    ease: 'power2.out',
    onUpdate: () => {
      if (onUpdate) {
        onUpdate(Math.round(obj.value))
      }
    },
  })
}

/**
 * Utility function to create a hover animation
 */
export const createHoverAnimation = (
  element: Element,
  hoverAnimation: gsap.TweenVars,
  duration: number = 0.3
) => {
  const tl = gsap.timeline({ paused: true })
  
  tl.to(element, {
    ...hoverAnimation,
    duration,
    ease: 'power2.out',
  })
  
  element.addEventListener('mouseenter', () => tl.play())
  element.addEventListener('mouseleave', () => tl.reverse())
  
  return tl
}

/**
 * Utility function to kill all ScrollTriggers
 * Useful for cleanup
 */
export const killAllScrollTriggers = () => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
}

/**
 * Utility function to refresh ScrollTrigger
 * Call after DOM changes
 */
export const refreshScrollTrigger = () => {
  ScrollTrigger.refresh()
}

/**
 * Utility function to create a parallax effect
 */
export const createParallaxEffect = (
  element: string | Element,
  speed: number = 0.5
) => {
  return gsap.to(element, {
    y: () => window.innerHeight * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  })
}

/**
 * Check if reduced motion is preferred
 */
export const shouldReduceMotion = (): boolean => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Get animation duration based on user preferences
 */
export const getAnimationDuration = (defaultDuration: number): number => {
  return shouldReduceMotion() ? 0.01 : defaultDuration
}

export { gsap, ScrollTrigger }
