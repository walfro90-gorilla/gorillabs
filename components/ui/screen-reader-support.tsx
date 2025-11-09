"use client"

import React, { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

// ARIA Live Region Component
interface LiveRegionProps {
  children: React.ReactNode
  priority?: 'polite' | 'assertive' | 'off'
  atomic?: boolean
  relevant?: 'additions' | 'removals' | 'text' | 'all'
  className?: string
  id?: string
}

export const LiveRegion: React.FC<LiveRegionProps> = ({
  children,
  priority = 'polite',
  atomic = true,
  relevant = 'all',
  className,
  id
}) => {
  return (
    <div
      id={id}
      aria-live={priority}
      aria-atomic={atomic}
      aria-relevant={relevant}
      className={cn('sr-only', className)}
    >
      {children}
    </div>
  )
}

// Screen Reader Only Text Component
interface ScreenReaderOnlyProps {
  children: React.ReactNode
  className?: string
  as?: keyof React.JSX.IntrinsicElements
}

export const ScreenReaderOnly: React.FC<ScreenReaderOnlyProps> = ({
  children,
  className,
  as: Component = 'span'
}) => {
  return React.createElement(
    Component,
    {
      className: cn('sr-only', className)
    } as any,
    children
  )
}

// Accessible Image Component with proper alt text
interface AccessibleImageProps {
  src: string
  alt: string
  decorative?: boolean
  className?: string
  width?: number
  height?: number
  loading?: 'lazy' | 'eager'
  priority?: boolean
}

export const AccessibleImage: React.FC<AccessibleImageProps> = ({
  src,
  alt,
  decorative = false,
  className,
  width,
  height,
  loading = 'lazy',
  priority = false
}) => {
  return (
    <img
      src={src}
      alt={decorative ? '' : alt}
      role={decorative ? 'presentation' : undefined}
      aria-hidden={decorative}
      className={className}
      width={width}
      height={height}
      loading={loading}
      decoding="async"
    />
  )
}

// Accessible Heading Component with proper hierarchy
interface AccessibleHeadingProps {
  children: React.ReactNode
  level: 1 | 2 | 3 | 4 | 5 | 6
  className?: string
  id?: string
  'aria-describedby'?: string
}

export const AccessibleHeading: React.FC<AccessibleHeadingProps> = ({
  children,
  level,
  className,
  id,
  'aria-describedby': ariaDescribedBy
}) => {
  const HeadingTag = `h${level}` as keyof React.JSX.IntrinsicElements

  return React.createElement(
    HeadingTag,
    {
      id,
      className,
      'aria-describedby': ariaDescribedBy
    } as any,
    children
  )
}

// Accessible Button Component
interface AccessibleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  'aria-label'?: string
  'aria-describedby'?: string
  'aria-expanded'?: boolean
  'aria-pressed'?: boolean
  'aria-controls'?: string
  loading?: boolean
  loadingText?: string
}

export const AccessibleButton: React.FC<AccessibleButtonProps> = ({
  children,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  'aria-expanded': ariaExpanded,
  'aria-pressed': ariaPressed,
  'aria-controls': ariaControls,
  loading = false,
  loadingText = 'Loading...',
  disabled,
  className,
  ...props
}) => {
  return (
    <button
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-expanded={ariaExpanded}
      aria-pressed={ariaPressed}
      aria-controls={ariaControls}
      aria-busy={loading}
      disabled={disabled || loading}
      className={cn(
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gorilla-yellow focus-visible:ring-offset-2',
        'transition-all duration-200 ease-out',
        className
      )}
      {...props}
    >
      {loading ? (
        <>
          <ScreenReaderOnly>{loadingText}</ScreenReaderOnly>
          <span aria-hidden="true">{children}</span>
        </>
      ) : (
        children
      )}
    </button>
  )
}

// Accessible Link Component
interface AccessibleLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode
  href: string
  external?: boolean
  'aria-label'?: string
  'aria-describedby'?: string
}

export const AccessibleLink: React.FC<AccessibleLinkProps> = ({
  children,
  href,
  external = false,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  className,
  ...props
}) => {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={cn(
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gorilla-yellow focus-visible:ring-offset-2',
        'transition-all duration-200 ease-out',
        className
      )}
      {...props}
    >
      {children}
      {external && (
        <ScreenReaderOnly>
          (opens in new window)
        </ScreenReaderOnly>
      )}
    </a>
  )
}

// Accessible Form Field Component
interface AccessibleFormFieldProps {
  children: React.ReactNode
  label: string
  id: string
  required?: boolean
  error?: string
  description?: string
  className?: string
}

export const AccessibleFormField: React.FC<AccessibleFormFieldProps> = ({
  children,
  label,
  id,
  required = false,
  error,
  description,
  className
}) => {
  const descriptionId = description ? `${id}-description` : undefined
  const errorId = error ? `${id}-error` : undefined
  const ariaDescribedBy = [descriptionId, errorId].filter(Boolean).join(' ')

  return (
    <div className={cn('space-y-2', className)}>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-foreground"
      >
        {label}
        {required && (
          <>
            <span className="text-red-500 ml-1" aria-hidden="true">*</span>
            <ScreenReaderOnly>(required)</ScreenReaderOnly>
          </>
        )}
      </label>
      
      {description && (
        <p id={descriptionId} className="text-sm text-muted-foreground">
          {description}
        </p>
      )}
      
      {React.isValidElement(children) && React.cloneElement(children, {
        id,
        'aria-describedby': ariaDescribedBy || undefined,
        'aria-required': required,
        'aria-invalid': !!error
      } as any)}
      
      {error && (
        <p id={errorId} className="text-sm text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

// Status Announcer for Dynamic Content
interface StatusAnnouncerProps {
  message: string
  priority?: 'polite' | 'assertive'
  clearAfter?: number
}

export const StatusAnnouncer: React.FC<StatusAnnouncerProps> = ({
  message,
  priority = 'polite',
  clearAfter = 5000
}) => {
  const [currentMessage, setCurrentMessage] = React.useState(message)
  const timeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    setCurrentMessage(message)
    
    if (clearAfter > 0) {
      timeoutRef.current = setTimeout(() => {
        setCurrentMessage('')
      }, clearAfter)
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [message, clearAfter])

  if (!currentMessage) return null

  return (
    <LiveRegion priority={priority}>
      {currentMessage}
    </LiveRegion>
  )
}

// Accessible Navigation Component
interface AccessibleNavProps {
  children: React.ReactNode
  'aria-label': string
  className?: string
  role?: 'navigation' | 'menu' | 'menubar'
}

export const AccessibleNav: React.FC<AccessibleNavProps> = ({
  children,
  'aria-label': ariaLabel,
  className,
  role = 'navigation'
}) => {
  return (
    <nav
      role={role}
      aria-label={ariaLabel}
      className={className}
    >
      {children}
    </nav>
  )
}

// Accessible List Component
interface AccessibleListProps {
  children: React.ReactNode
  ordered?: boolean
  className?: string
  'aria-label'?: string
  'aria-describedby'?: string
}

export const AccessibleList: React.FC<AccessibleListProps> = ({
  children,
  ordered = false,
  className,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy
}) => {
  const ListTag = ordered ? 'ol' : 'ul'

  return React.createElement(
    ListTag,
    {
      className,
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy
    } as any,
    children
  )
}

// Accessible Card Component
interface AccessibleCardProps {
  children: React.ReactNode
  title?: string
  description?: string
  className?: string
  interactive?: boolean
  'aria-label'?: string
}

export const AccessibleCard: React.FC<AccessibleCardProps> = ({
  children,
  title,
  description,
  className,
  interactive = false,
  'aria-label': ariaLabel
}) => {
  const cardId = `card-${Math.random().toString(36).substr(2, 9)}`
  const titleId = title ? `${cardId}-title` : undefined
  const descId = description ? `${cardId}-desc` : undefined
  const ariaLabelledBy = titleId
  const ariaDescribedBy = descId

  return (
    <div
      className={cn(
        'rounded-lg border bg-card text-card-foreground shadow-sm',
        interactive && 'cursor-pointer hover:shadow-md transition-shadow',
        className
      )}
      role={interactive ? 'button' : 'region'}
      aria-label={ariaLabel}
      aria-labelledby={!ariaLabel ? ariaLabelledBy : undefined}
      aria-describedby={ariaDescribedBy}
      tabIndex={interactive ? 0 : undefined}
    >
      {title && (
        <h3 id={titleId} className="sr-only">
          {title}
        </h3>
      )}
      {description && (
        <p id={descId} className="sr-only">
          {description}
        </p>
      )}
      {children}
    </div>
  )
}

// Loading State Announcer
interface LoadingAnnouncerProps {
  loading: boolean
  loadingMessage?: string
  completeMessage?: string
  errorMessage?: string
  error?: boolean
}

export const LoadingAnnouncer: React.FC<LoadingAnnouncerProps> = ({
  loading,
  loadingMessage = 'Loading content...',
  completeMessage = 'Content loaded successfully',
  errorMessage = 'Failed to load content',
  error = false
}) => {
  const [message, setMessage] = React.useState('')

  useEffect(() => {
    if (loading) {
      setMessage(loadingMessage)
    } else if (error) {
      setMessage(errorMessage)
    } else if (message === loadingMessage) {
      setMessage(completeMessage)
    }
  }, [loading, error, loadingMessage, completeMessage, errorMessage, message])

  return (
    <StatusAnnouncer
      message={message}
      priority={error ? 'assertive' : 'polite'}
    />
  )
}

export default {
  LiveRegion,
  ScreenReaderOnly,
  AccessibleImage,
  AccessibleHeading,
  AccessibleButton,
  AccessibleLink,
  AccessibleFormField,
  StatusAnnouncer,
  AccessibleNav,
  AccessibleList,
  AccessibleCard,
  LoadingAnnouncer
}