"use client"

import React from 'react'
import { useLanguage } from '@/context/language-context'
import { cn } from '@/lib/utils'

interface SkipLink {
  href: string
  label: string
  labelEs: string
}

const DEFAULT_SKIP_LINKS: SkipLink[] = [
  {
    href: '#main-content',
    label: 'Skip to main content',
    labelEs: 'Saltar al contenido principal'
  },
  {
    href: '#navigation',
    label: 'Skip to navigation',
    labelEs: 'Saltar a la navegación'
  },
  {
    href: '#footer',
    label: 'Skip to footer',
    labelEs: 'Saltar al pie de página'
  }
]

interface SkipNavigationProps {
  links?: SkipLink[]
  className?: string
  position?: 'top-left' | 'top-center' | 'top-right'
}

export const SkipNavigation: React.FC<SkipNavigationProps> = ({
  links = DEFAULT_SKIP_LINKS,
  className,
  position = 'top-left'
}) => {
  const { language } = useLanguage()

  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
    'top-right': 'top-4 right-4'
  }

  return (
    <div className="skip-navigation-container">
      {links.map((link, index) => (
        <a
          key={link.href}
          href={link.href}
          className={cn(
            // Base styles
            'sr-only focus:not-sr-only focus:absolute z-50',
            'bg-gorilla-yellow text-gorilla-black',
            'px-4 py-2 rounded-lg font-medium',
            'transition-all duration-200 ease-out',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gorilla-black focus-visible:ring-offset-2',
            'hover:bg-yellow-400 active:bg-yellow-600',
            'text-sm font-semibold',
            'shadow-lg',
            // Position
            positionClasses[position],
            // Stacking for multiple links
            index > 0 && 'mt-2',
            className
          )}
          style={{ 
            fontSize: 'var(--text-sm)',
            top: index > 0 ? `${1 + index * 3}rem` : undefined
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              const target = document.querySelector(link.href)
              if (target instanceof HTMLElement) {
                target.focus()
                target.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }
            }
          }}
        >
          {language === 'es' ? link.labelEs : link.label}
        </a>
      ))}
    </div>
  )
}

// Individual skip link component
interface SkipLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  children: React.ReactNode
  position?: 'top-left' | 'top-center' | 'top-right'
}

export const SkipLink: React.FC<SkipLinkProps> = ({
  href,
  children,
  className,
  position = 'top-left',
  ...props
}) => {
  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
    'top-right': 'top-4 right-4'
  }

  return (
    <a
      href={href}
      className={cn(
        'sr-only focus:not-sr-only focus:absolute z-50',
        'bg-gorilla-yellow text-gorilla-black',
        'px-4 py-2 rounded-lg font-medium',
        'transition-all duration-200 ease-out',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gorilla-black focus-visible:ring-offset-2',
        'hover:bg-yellow-400 active:bg-yellow-600',
        'text-sm font-semibold shadow-lg',
        positionClasses[position],
        className
      )}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          const target = document.querySelector(href)
          if (target instanceof HTMLElement) {
            target.focus()
            target.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        }
      }}
      {...props}
    >
      {children}
    </a>
  )
}

export default SkipNavigation