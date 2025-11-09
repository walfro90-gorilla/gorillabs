"use client"

import React from 'react'
import { cn } from '@/lib/utils'

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'primary' | 'secondary' | 'accent'
  spacing?: 'sm' | 'md' | 'lg' | 'xl'
  children: React.ReactNode
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, variant = 'primary', spacing = 'lg', children, ...props }, ref) => {
    const variants = {
      primary: 'bg-bg-primary',
      secondary: 'bg-bg-secondary', 
      accent: 'bg-bg-card'
    }

    const spacings = {
      sm: 'py-8',
      md: 'py-12',
      lg: 'py-16',
      xl: 'py-20'
    }

    return (
      <section
        ref={ref}
        className={cn(
          'w-full',
          variants[variant],
          spacings[spacing],
          className
        )}
        {...props}
      >
        {children}
      </section>
    )
  }
)

Section.displayName = "Section"

interface SectionHeaderProps {
  title: string
  subtitle?: string
  description?: string
  centered?: boolean
  className?: string
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  description,
  centered = true,
  className
}) => {
  return (
    <div className={cn(
      'mb-12',
      centered && 'text-center',
      className
    )}>
      {subtitle && (
        <p className="text-gorilla-yellow font-medium mb-2 uppercase tracking-wider text-sm">
          {subtitle}
        </p>
      )}
      <h2 
        className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 text-shadow-subtle"
        style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 'var(--leading-tight)' }}
      >
        {title}
      </h2>
      {description && (
        <p 
          className="text-lg text-text-muted-dark max-w-3xl mx-auto leading-relaxed"
          style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', lineHeight: 'var(--leading-normal)' }}
        >
          {description}
        </p>
      )}
    </div>
  )
}

interface SectionContainerProps {
  children: React.ReactNode
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  className?: string
}

export const SectionContainer: React.FC<SectionContainerProps> = ({
  children,
  maxWidth = 'lg',
  className
}) => {
  const maxWidths = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full'
  }

  return (
    <div className={cn(
      'container mx-auto px-4',
      maxWidths[maxWidth],
      className
    )}>
      {children}
    </div>
  )
}

export { Section }