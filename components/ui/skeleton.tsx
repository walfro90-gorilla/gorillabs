"use client"

import React from 'react'
import { cn } from '@/lib/utils'

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'hero' | 'card' | 'text' | 'button'
  animate?: boolean
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant = 'default', animate = true, ...props }, ref) => {
    const baseClasses = cn(
      "bg-gray-800 rounded",
      animate && "animate-pulse",
      className
    )

    const variants = {
      default: "h-4 w-full",
      hero: "h-screen w-full",
      card: "h-48 w-full",
      text: "h-4 w-3/4",
      button: "h-12 w-32"
    }

    return (
      <div
        ref={ref}
        className={cn(baseClasses, variants[variant])}
        {...props}
      />
    )
  }
)

Skeleton.displayName = "Skeleton"

// Skeleton compositions for common layouts
export const HeroSkeleton = () => (
  <div className="min-h-screen w-full bg-gorilla-black flex items-center justify-center">
    <div className="max-w-4xl w-full px-4 space-y-8">
      <div className="text-center space-y-6">
        <Skeleton className="h-16 w-3/4 mx-auto bg-gray-700" />
        <Skeleton className="h-8 w-1/2 mx-auto bg-gray-800" />
        <Skeleton className="h-6 w-2/3 mx-auto bg-gray-800" />
        <div className="flex justify-center gap-4 mt-8">
          <Skeleton variant="button" className="bg-gray-700" />
          <Skeleton variant="button" className="bg-gray-800" />
        </div>
      </div>
    </div>
  </div>
)

export const SectionSkeleton = ({ height = "h-96" }: { height?: string }) => (
  <div className={`w-full ${height} bg-bg-secondary flex items-center justify-center`}>
    <div className="max-w-4xl w-full px-4 space-y-6">
      <div className="text-center space-y-4">
        <Skeleton className="h-12 w-1/2 mx-auto bg-gray-700" />
        <Skeleton className="h-6 w-3/4 mx-auto bg-gray-800" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Skeleton variant="card" className="bg-gray-800" />
        <Skeleton variant="card" className="bg-gray-800" />
        <Skeleton variant="card" className="bg-gray-800" />
      </div>
    </div>
  </div>
)

export const CardSkeleton = () => (
  <div className="bg-bg-card rounded-lg p-6 space-y-4">
    <Skeleton className="h-6 w-1/2 bg-gray-700" />
    <Skeleton className="h-4 w-full bg-gray-800" />
    <Skeleton className="h-4 w-3/4 bg-gray-800" />
    <Skeleton variant="button" className="bg-gray-700 mt-4" />
  </div>
)

export { Skeleton }