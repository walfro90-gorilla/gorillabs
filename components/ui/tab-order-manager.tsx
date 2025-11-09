"use client"

import React, { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface TabOrderItem {
  id: string
  element: HTMLElement
  order: number
  label?: string
  description?: string
}

interface TabOrderManagerProps {
  children: React.ReactNode
  className?: string
  enableDebugMode?: boolean
  onTabOrderChange?: (items: TabOrderItem[]) => void
}

export const TabOrderManager: React.FC<TabOrderManagerProps> = ({
  children,
  className,
  enableDebugMode = false,
  onTabOrderChange
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [tabOrderItems, setTabOrderItems] = useState<TabOrderItem[]>([])
  const [showDebugOverlay, setShowDebugOverlay] = useState(false)

  const scanTabOrder = React.useCallback(() => {
    if (!containerRef.current) return

    const focusableElements = containerRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]), [role="button"]:not([disabled]), [role="link"]:not([disabled])'
    )

    const items: TabOrderItem[] = Array.from(focusableElements)
      .map((element, index) => {
        const tabIndex = element.getAttribute('tabindex')
        const order = tabIndex ? parseInt(tabIndex, 10) : 0
        
        // Generate a unique ID if the element doesn't have one
        let id = element.id
        if (!id) {
          id = `tab-order-${index}-${Date.now()}`
          element.id = id
        }

        // Get accessible label
        const label = 
          element.getAttribute('aria-label') ||
          element.getAttribute('title') ||
          element.textContent?.trim() ||
          element.tagName.toLowerCase()

        // Get description
        const description = element.getAttribute('aria-describedby') 
          ? document.getElementById(element.getAttribute('aria-describedby')!)?.textContent
          : undefined

        return {
          id,
          element,
          order,
          label,
          description
        }
      })
      .sort((a, b) => {
        // Sort by tab order: positive tabindex first (in order), then 0 tabindex (document order)
        if (a.order > 0 && b.order > 0) return a.order - b.order
        if (a.order > 0 && b.order === 0) return -1
        if (a.order === 0 && b.order > 0) return 1
        return 0 // Maintain document order for elements with tabindex="0"
      })

    setTabOrderItems(items)
    onTabOrderChange?.(items)
  }, [onTabOrderChange])

  // Scan tab order when component mounts and when children change
  useEffect(() => {
    const timer = setTimeout(scanTabOrder, 100) // Small delay to ensure DOM is ready
    return () => clearTimeout(timer)
  }, [scanTabOrder])

  // Re-scan when DOM changes
  useEffect(() => {
    if (!containerRef.current) return

    const observer = new MutationObserver(() => {
      scanTabOrder()
    })

    observer.observe(containerRef.current, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['tabindex', 'disabled', 'aria-hidden']
    })

    return () => observer.disconnect()
  }, [scanTabOrder])

  // Debug mode keyboard shortcut
  useEffect(() => {
    if (!enableDebugMode) return

    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl/Cmd + Shift + T to toggle debug overlay
      if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'T') {
        event.preventDefault()
        setShowDebugOverlay(prev => !prev)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [enableDebugMode])

  return (
    <div
      ref={containerRef}
      className={cn('tab-order-manager relative', className)}
    >
      {children}
      
      {/* Debug Overlay */}
      {enableDebugMode && showDebugOverlay && (
        <TabOrderDebugOverlay 
          items={tabOrderItems}
          onClose={() => setShowDebugOverlay(false)}
        />
      )}
    </div>
  )
}

interface TabOrderDebugOverlayProps {
  items: TabOrderItem[]
  onClose: () => void
}

const TabOrderDebugOverlay: React.FC<TabOrderDebugOverlayProps> = ({
  items,
  onClose
}) => {
  const [highlightedItem, setHighlightedItem] = useState<string | null>(null)

  const highlightElement = (id: string) => {
    setHighlightedItem(id)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      element.focus()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Tab Order Debug ({items.length} focusable elements)
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            aria-label="Close debug overlay"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-4 text-sm text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
          <p>Press <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">Ctrl+Shift+T</kbd> to toggle this overlay</p>
          <p>Click on any item to highlight and focus it</p>
        </div>

        <div className="overflow-y-auto max-h-96">
          {items.map((item, index) => (
            <div
              key={item.id}
              className={cn(
                'p-3 border-b border-gray-100 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700',
                highlightedItem === item.id && 'bg-yellow-100 dark:bg-yellow-900/20'
              )}
              onClick={() => highlightElement(item.id)}
            >
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {item.element.tagName.toLowerCase()}
                    </span>
                    {item.order > 0 && (
                      <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-200 text-xs rounded">
                        tabindex={item.order}
                      </span>
                    )}
                  </div>
                  {item.label && (
                    <p className="text-gray-700 dark:text-gray-300 truncate">
                      {item.label}
                    </p>
                  )}
                  {item.description && (
                    <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                      {item.description}
                    </p>
                  )}
                  <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
                    ID: {item.id}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {items.length === 0 && (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            No focusable elements found
          </div>
        )}
      </div>
    </div>
  )
}

// Utility component for ensuring proper tab order
interface TabOrderItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  order?: number
  label?: string
  description?: string
}

export const TabOrderItem: React.FC<TabOrderItemProps> = ({
  children,
  className,
  order,
  label,
  description,
  ...props
}) => {
  return (
    <div
      className={cn('tab-order-item', className)}
      tabIndex={order}
      aria-label={label}
      aria-describedby={description ? `${props.id}-desc` : undefined}
      {...props}
    >
      {children}
      {description && (
        <div id={`${props.id}-desc`} className="sr-only">
          {description}
        </div>
      )}
    </div>
  )
}

export default TabOrderManager