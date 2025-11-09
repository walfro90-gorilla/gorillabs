'use client'

import { useEffect, useRef } from 'react'

interface TechParticlesProps {
  className?: string
  count?: number
}

/**
 * TechParticles Component
 * Specialized particles for the technology section
 */
export function TechParticles({ className = '', count = 20 }: TechParticlesProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const particles: HTMLDivElement[] = []

    // Create particles
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div')
      particle.className = 'tech-particle'
      
      // Random tech symbols
      const symbols = ['⚛️', '🔧', '📱', '🤖', '☁️', '💻', '🚀', '⚡', '🔥', '💎', '🌟', '✨']
      particle.textContent = symbols[Math.floor(Math.random() * symbols.length)]
      
      // Random positioning and styling
      particle.style.cssText = `
        position: absolute;
        font-size: ${Math.random() * 16 + 12}px;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        opacity: ${Math.random() * 0.6 + 0.2};
        animation: techFloat ${8 + Math.random() * 12}s ease-in-out infinite;
        animation-delay: ${Math.random() * 8}s;
        pointer-events: none;
        z-index: 0;
        filter: blur(${Math.random() * 0.5}px);
      `
      
      container.appendChild(particle)
      particles.push(particle)
    }

    // Cleanup
    return () => {
      particles.forEach(particle => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle)
        }
      })
    }
  }, [count])

  return (
    <>
      <div
        ref={containerRef}
        className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      />
      
      <style jsx>{`
        @keyframes techFloat {
          0%, 100% {
            transform: translateY(0) translateX(0) rotate(0deg) scale(1);
            opacity: 0.2;
          }
          25% {
            transform: translateY(-30px) translateX(20px) rotate(90deg) scale(1.2);
            opacity: 0.8;
          }
          50% {
            transform: translateY(-15px) translateX(-10px) rotate(180deg) scale(0.8);
            opacity: 0.6;
          }
          75% {
            transform: translateY(-40px) translateX(30px) rotate(270deg) scale(1.1);
            opacity: 0.7;
          }
        }
        
        .tech-particle {
          text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
        }
      `}</style>
    </>
  )
}