"use client"

import React, { useEffect, useState } from 'react'
import { useVisualEffects } from '@/hooks/use-visual-effects'

interface FloatingEmojisProps {
  className?: string
  density?: 'low' | 'medium' | 'high'
  theme?: 'tech' | 'creative' | 'business'
}

export function FloatingEmojis({ 
  className = '',
  density = 'medium',
  theme = 'tech'
}: FloatingEmojisProps) {
  const { settings, capabilities } = useVisualEffects()
  const [emojis, setEmojis] = useState<Array<{
    id: number
    emoji: string
    x: number
    y: number
    size: number
    duration: number
    delay: number
    opacity: number
  }>>([])

  // Emoji sets based on theme
  const emojiSets = {
    tech: ['💻', '🚀', '⚡', '🔥', '💡', '🎯', '⭐', '🌟', '✨', '🎨', '🔧', '⚙️', '🛠️', '📱', '🖥️', '⌨️', '🖱️', '💾', '🔌', '📡'],
    creative: ['🎨', '✨', '🌈', '🎭', '🎪', '🎨', '🖌️', '🎬', '📸', '🎵', '🎶', '🎤', '🎸', '🎹', '🎺', '🎻', '🎪', '🎨', '🖼️', '🌟'],
    business: ['💼', '📊', '📈', '💰', '🏆', '🎯', '⭐', '🌟', '💡', '🔥', '⚡', '🚀', '📱', '💻', '🖥️', '📋', '📝', '📌', '🔖', '💎']
  }

  // Density settings
  const densitySettings = {
    low: { count: 15, maxSize: 20 },
    medium: { count: 25, maxSize: 24 },
    high: { count: 35, maxSize: 28 }
  }

  useEffect(() => {
    if (!settings.enableParticles || capabilities.prefersReducedMotion) {
      setEmojis([])
      return
    }

    const { count, maxSize } = densitySettings[density]
    const emojiSet = emojiSets[theme]
    
    const newEmojis = Array.from({ length: count }, (_, i) => ({
      id: i,
      emoji: emojiSet[Math.floor(Math.random() * emojiSet.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * (maxSize - 12) + 12,
      duration: Math.random() * 20 + 15, // 15-35 seconds
      delay: Math.random() * 10,
      opacity: Math.random() * 0.4 + 0.1 // 0.1 to 0.5
    }))

    setEmojis(newEmojis)
  }, [settings.enableParticles, capabilities.prefersReducedMotion, density, theme])

  if (!settings.enableParticles || capabilities.prefersReducedMotion || emojis.length === 0) {
    return null
  }

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {emojis.map((emoji) => (
        <div
          key={emoji.id}
          className="absolute select-none"
          style={{
            left: `${emoji.x}%`,
            top: `${emoji.y}%`,
            fontSize: `${emoji.size}px`,
            opacity: emoji.opacity,
            animation: settings.enableAnimations 
              ? `floatEmoji ${emoji.duration}s ease-in-out infinite`
              : 'none',
            animationDelay: `${emoji.delay}s`,
            filter: 'drop-shadow(0 0 8px rgba(255, 215, 0, 0.3))',
            transform: 'translate(-50%, -50%)',
          }}
        >
          {emoji.emoji}
        </div>
      ))}
      
      <style jsx>{`
        @keyframes floatEmoji {
          0%, 100% {
            transform: translate(-50%, -50%) translateY(0px) rotate(0deg) scale(1);
          }
          25% {
            transform: translate(-50%, -50%) translateY(-20px) rotate(5deg) scale(1.1);
          }
          50% {
            transform: translate(-50%, -50%) translateY(-10px) rotate(-3deg) scale(0.9);
          }
          75% {
            transform: translate(-50%, -50%) translateY(-30px) rotate(8deg) scale(1.05);
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          div {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  )
}