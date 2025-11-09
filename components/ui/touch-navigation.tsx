"use client"

import React, { useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { useTouchInteractions, useSwipeGesture } from '@/hooks/use-touch-interactions'

interface TouchNavigationItem {
  id: string
  label: string
  icon?: React.ReactNode
  href?: string
  onClick?: () => void
  active?: boolean
  disabled?: boolean
}

interface TouchNavigationProps {
  items: TouchNavigationItem[]
  orientation?: 'horizontal' | 'vertical'
  variant?: 'tabs' | 'pills' | 'buttons'
  size?: 'sm' | 'md' | 'lg'
  enableSwipeNavigation?: boolean
  onSwipe?: (direction: 'left' | 'right' | 'up' | 'down') => void
  className?: string
}

export const TouchNavigation: React.FC<TouchNavigationProps> = ({
  items,
  orientation = 'horizontal',
  variant = 'tabs',
  size = 'md',
  enableSwipeNavigation = false,
  onSwipe,
  className
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(
    items.findIndex(item => item.active) || 0
  )

  // Enable swipe navigation if requested
  useSwipeGesture(
    containerRef,
    (direction) => {
      if (!enableSwipeNavigation) return
      
      if (orientation === 'horizontal') {
        if (direction === 'left' && activeIndex < items.length - 1) {
          setActiveIndex(activeIndex + 1)
        } else if (direction === 'right' && activeIndex > 0) {
          setActiveIndex(activeIndex - 1)
        }
      } else {
        if (direction === 'up' && activeIndex < items.length - 1) {
          setActiveIndex(activeIndex + 1)
        } else if (direction === 'down' && activeIndex > 0) {
          setActiveIndex(activeIndex - 1)
        }
      }
      
      onSwipe?.(direction)
    },
    { threshold: 30, velocity: 0.2 }
  )

  const containerClasses = cn(
    'flex touch-manipulation',
    {
      'flex-row overflow-x-auto scrollbar-hide': orientation === 'horizontal',
      'flex-col overflow-y-auto scrollbar-hide': orientation === 'vertical',
    },
    {
      'gap-1': variant === 'tabs',
      'gap-2': variant === 'pills' || variant === 'buttons',
    },
    enableSwipeNavigation && 'touch-pan-x',
    className
  )

  const getItemClasses = (item: TouchNavigationItem, index: number) => {
    const isActive = item.active || index === activeIndex
    
    return cn(
      // Base styles
      'relative flex items-center justify-center font-medium transition-all duration-200 ease-out',
      'touch-target no-select focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
      'disabled:pointer-events-none disabled:opacity-50',
      
      // Size variants
      {
        'px-3 py-2 text-sm gap-1': size === 'sm',
        'px-4 py-3 text-base gap-2': size === 'md',
        'px-6 py-4 text-lg gap-3': size === 'lg',
      },
      
      // Variant styles
      {
        // Tabs
        'border-b-2 rounded-none hover:bg-white/5': variant === 'tabs',
        'border-gorilla-yellow text-gorilla-yellow': variant === 'tabs' && isActive,
        'border-transparent text-white/70 hover:text-white': variant === 'tabs' && !isActive,
        
        // Pills
        'rounded-full': variant === 'pills',
        'bg-gorilla-yellow text-gorilla-black': variant === 'pills' && isActive,
        'bg-white/10 text-white hover:bg-white/20': variant === 'pills' && !isActive,
        
        // Buttons
        'rounded-lg': variant === 'buttons',
        'bg-gorilla-yellow text-gorilla-black shadow-lg': variant === 'buttons' && isActive,
        'bg-white/5 text-white hover:bg-white/10 border border-white/20': variant === 'buttons' && !isActive,
      },
      
      // Disabled state
      item.disabled && 'opacity-50 pointer-events-none'
    )
  }

  return (
    <nav
      ref={containerRef}
      className={containerClasses}
      role="tablist"
      aria-orientation={orientation}
    >
      {items.map((item, index) => {
        const ItemComponent = item.href ? 'a' : 'button'
        
        return (
          <TouchNavigationItem
            key={item.id}
            item={item}
            index={index}
            isActive={item.active || index === activeIndex}
            className={getItemClasses(item, index)}
            onClick={() => {
              if (!item.disabled) {
                setActiveIndex(index)
                item.onClick?.()
              }
            }}
            component={ItemComponent}
          />
        )
      })}
      
      {/* Swipe indicator */}
      {enableSwipeNavigation && (
        <div className="absolute top-1 right-1 opacity-30 pointer-events-none">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
          </svg>
        </div>
      )}
    </nav>
  )
}

interface TouchNavigationItemProps {
  item: TouchNavigationItem
  index: number
  isActive: boolean
  className: string
  onClick: () => void
  component: 'a' | 'button'
}

const TouchNavigationItem: React.FC<TouchNavigationItemProps> = ({
  item,
  index,
  isActive,
  className,
  onClick,
  component: Component
}) => {
  const itemRef = useRef<HTMLElement>(null)

  useTouchInteractions(itemRef as React.RefObject<HTMLElement>, {
    enableHapticFeedback: true,
    enableVisualFeedback: true,
    enableSoundFeedback: false,
    minimumTouchTarget: 44,
    preventDoubleTouch: true
  })

  const commonProps = {
    ref: itemRef,
    className,
    onClick,
    disabled: item.disabled,
    role: 'tab',
    'aria-selected': isActive,
    'aria-controls': `panel-${item.id}`,
    id: `tab-${item.id}`,
    tabIndex: isActive ? 0 : -1
  }

  return (
    <Component
      {...(Component === 'a' ? { href: item.href, ...commonProps } : commonProps)}
    >
      {/* Ripple effect */}
      <span className="absolute inset-0 overflow-hidden rounded-inherit">
        <span className="absolute inset-0 bg-white/20 scale-0 rounded-full transition-transform duration-300 group-active:scale-100" />
      </span>
      
      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-inherit">
        {item.icon && (
          <span className="flex-shrink-0">
            {item.icon}
          </span>
        )}
        <span className="truncate">
          {item.label}
        </span>
      </span>
    </Component>
  )
}

export default TouchNavigation