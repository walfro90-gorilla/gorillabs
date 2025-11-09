'use client'

import { useState } from 'react'
import { TechStackGrid, type Technology } from './tech-stack-grid'
import { InteractiveDemo } from './interactive-demo'
import { EnhancedBackground } from '@/components/visual-effects/enhanced-background'
import { FloatingEmojis } from '@/components/visual-effects/floating-emojis'
import { useLanguage } from '@/context/language-context'

/**
 * TechShowcaseSection Component
 * Complete section with grid and interactive demos
 */
export function TechShowcaseSection() {
  const { language } = useLanguage()
  const [selectedTech, setSelectedTech] = useState<Technology | null>(null)

  const title = language === 'es' 
    ? 'Nuestro Stack Tecnológico' 
    : language === 'zh'
    ? '我们的技术栈'
    : 'Our Tech Stack'

  const subtitle = language === 'es'
    ? 'Dominamos las tecnologías más avanzadas para crear soluciones excepcionales'
    : language === 'zh'
    ? '我们掌握最先进的技术来创建卓越的解决方案'
    : 'We master the most advanced technologies to create exceptional solutions'

  return (
    <section className="relative w-full py-20 bg-gorilla-black overflow-hidden">
      {/* Enhanced background for tech section */}
      <EnhancedBackground 
        variant="section"
        className="z-0"
      />
      
      {/* Tech-themed floating emojis */}
      <FloatingEmojis
        theme="tech"
        density="low"
        className="z-5"
      />
      
      <div className="container relative z-10 mx-auto px-4">
        {/* Enhanced Section Header */}
        <div className="text-center mb-20">
          <div className="relative inline-block">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gorilla-yellow mb-6 text-shadow-strong">
              {title}
            </h2>
            {/* Subtle glow effect for depth */}
            <div className="absolute inset-0 text-4xl md:text-5xl lg:text-6xl font-bold text-gorilla-yellow opacity-10 blur-sm -z-10">
              {title}
            </div>
          </div>
          <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
            {subtitle}
          </p>
          
          {/* Decorative elements */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-gorilla-yellow"></div>
            <div className="text-2xl animate-spin-slow">⚡</div>
            <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-gorilla-yellow"></div>
          </div>
        </div>

        {/* Tech Stack Grid */}
        <TechStackGrid
          onTechClick={(tech) => setSelectedTech(tech)}
        />

        {/* Interactive Demo Modal */}
        {selectedTech && (
          <InteractiveDemo
            technology={selectedTech}
            onClose={() => setSelectedTech(null)}
          />
        )}
      </div>
      
      {/* Advanced CSS animations */}
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient-shift 4s ease infinite;
        }
      `}</style>
    </section>
  )
}
