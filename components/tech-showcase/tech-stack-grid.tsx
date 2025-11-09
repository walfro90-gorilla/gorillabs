'use client'

import { useState, useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap-config'
import { GlassmorphicCard } from '@/components/ui/glassmorphic-card'
import { Badge } from '@/components/ui/badge'
import technologiesData from '@/data/technologies.json'

export interface Technology {
  id: string
  name: string
  icon: string
  category: 'frontend' | 'backend' | 'mobile' | 'ai' | 'devops'
  expertiseLevel: number
  projectCount: number
  description: string
  demoCode?: {
    language: string
    code: string
    description: string
  }
}

interface TechStackGridProps {
  technologies?: Technology[]
  onTechClick?: (tech: Technology) => void
  filterCategory?: string
}

const categoryColors = {
  frontend: 'bg-neon-blue/20 text-neon-blue border-neon-blue',
  backend: 'bg-neon-purple/20 text-neon-purple border-neon-purple',
  mobile: 'bg-neon-pink/20 text-neon-pink border-neon-pink',
  ai: 'bg-gorilla-yellow/20 text-gorilla-yellow border-gorilla-yellow',
  devops: 'bg-green-500/20 text-green-500 border-green-500',
}

const categoryNames = {
  frontend: 'Frontend',
  backend: 'Backend',
  mobile: 'Mobile',
  ai: 'AI/ML',
  devops: 'DevOps',
}

/**
 * TechCard Component - Desktop & Mobile Optimized
 * Beautiful cards that work perfectly on all devices
 */
function TechCard({ 
  tech, 
  onClick,
  index 
}: { 
  tech: Technology
  onClick?: () => void
  index: number
}) {
  const getGlowColor = () => {
    switch (tech.category) {
      case 'frontend': return 'blue'
      case 'backend': return 'purple'
      case 'mobile': return 'pink'
      case 'ai': return 'yellow'
      case 'devops': return 'blue'
      default: return 'blue'
    }
  }

  const getCategoryGradient = () => {
    switch (tech.category) {
      case 'frontend': return 'from-neon-blue/20 to-neon-blue/5'
      case 'backend': return 'from-neon-purple/20 to-neon-purple/5'
      case 'mobile': return 'from-neon-pink/20 to-neon-pink/5'
      case 'ai': return 'from-gorilla-yellow/20 to-gorilla-yellow/5'
      case 'devops': return 'from-green-500/20 to-green-500/5'
      default: return 'from-neon-blue/20 to-neon-blue/5'
    }
  }

  return (
    <div 
      className="group cursor-pointer"
      onClick={onClick}
      style={{ 
        animationDelay: `${index * 100}ms`,
        animation: 'fadeInUp 0.6s ease-out forwards'
      }}
    >
      {/* Desktop Card */}
      <div className="hidden md:block">
        <GlassmorphicCard
          variant="default"
          borderGlow={true}
          glowColor={getGlowColor()}
          className="h-full relative overflow-hidden transform transition-all duration-300 hover:scale-105 hover:-translate-y-2"
        >
          {/* Background gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryGradient()} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
          
          <div className="relative z-10 p-6 flex flex-col items-center text-center gap-3 h-full min-h-[200px]">
            {/* Icon */}
            <div className="text-4xl mb-2 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
              {tech.icon}
            </div>

            {/* Name */}
            <h3 className="text-lg font-bold text-white group-hover:text-gorilla-yellow transition-colors duration-300">
              {tech.name}
            </h3>

            {/* Category Badge */}
            <Badge 
              variant="outline" 
              className={`${categoryColors[tech.category]} border text-xs font-medium transition-all duration-300 group-hover:scale-105`}
            >
              {categoryNames[tech.category]}
            </Badge>

            {/* Expertise Level */}
            <div className="flex gap-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    i < tech.expertiseLevel
                      ? 'bg-gorilla-yellow group-hover:shadow-glow-yellow'
                      : 'bg-white/20'
                  }`}
                />
              ))}
            </div>

            {/* Project Count */}
            <p className="text-sm text-white/70 group-hover:text-white/90 transition-colors duration-300 font-medium">
              {tech.projectCount} proyectos
            </p>
          </div>

          {/* Shine effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
          </div>
        </GlassmorphicCard>
      </div>

      {/* Mobile Card - Horizontal Layout */}
      <div className="block md:hidden">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 transform transition-all duration-300 hover:bg-white/20 hover:scale-[1.02] group">
          {/* Mobile horizontal layout */}
          <div className="flex items-center gap-4">
            {/* Icon Section */}
            <div className="flex-shrink-0">
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${getCategoryGradient()} flex items-center justify-center text-2xl transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                {tech.icon}
              </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-bold text-white group-hover:text-gorilla-yellow transition-colors duration-300 truncate">
                  {tech.name}
                </h3>
                <Badge 
                  variant="outline" 
                  className={`${categoryColors[tech.category]} border text-xs font-medium ml-2 flex-shrink-0`}
                >
                  {categoryNames[tech.category]}
                </Badge>
              </div>

              {/* Stats Row */}
              <div className="flex items-center justify-between">
                {/* Expertise Level */}
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        i < tech.expertiseLevel
                          ? 'bg-gorilla-yellow'
                          : 'bg-white/20'
                      }`}
                    />
                  ))}
                </div>

                {/* Project Count */}
                <p className="text-sm text-white/70 font-medium">
                  {tech.projectCount} proyectos
                </p>
              </div>
            </div>

            {/* Arrow Indicator */}
            <div className="flex-shrink-0 text-white/40 group-hover:text-gorilla-yellow transition-colors duration-300">
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* Mobile shine effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * TechStackGrid Component
 * Grid of technology cards with filtering
 */
export function TechStackGrid({
  technologies = technologiesData.technologies as Technology[],
  onTechClick,
  filterCategory,
}: TechStackGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    filterCategory || null
  )
  const [filteredTechs, setFilteredTechs] = useState<Technology[]>(technologies)
  const gridRef = useRef<HTMLDivElement>(null)

  // Filter technologies by category
  useEffect(() => {
    console.log('Filtering technologies:', { selectedCategory, totalTechs: technologies.length })
    if (selectedCategory) {
      const filtered = technologies.filter((tech) => tech.category === selectedCategory)
      console.log('Filtered technologies:', filtered.length)
      setFilteredTechs(filtered)
    } else {
      console.log('Showing all technologies:', technologies.length)
      setFilteredTechs(technologies)
    }
  }, [selectedCategory, technologies])

  // Category filter buttons
  const categories: Array<'frontend' | 'backend' | 'mobile' | 'ai' | 'devops'> = [
    'frontend',
    'backend',
    'mobile',
    'ai',
    'devops',
  ]

  // Debug info
  console.log('TechStackGrid render:', { 
    filteredTechsCount: filteredTechs.length, 
    selectedCategory,
    technologiesCount: technologies.length,
    firstTech: filteredTechs[0]?.name
  })

  // Simple animation for grid changes
  useEffect(() => {
    if (!gridRef.current) return
    
    // Simple CSS animation approach
    const cards = gridRef.current.querySelectorAll('.group')
    cards.forEach((card, index) => {
      const element = card as HTMLElement
      element.style.animationDelay = `${index * 50}ms`
      element.style.animation = 'fadeInUp 0.6s ease-out forwards'
    })
  }, [filteredTechs])

  return (
    <div className="w-full">
      {/* Category Filters - Responsive Design */}
      <div className="mb-12">
        {/* Desktop Filters */}
        <div className="hidden md:flex flex-wrap justify-center gap-4">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-8 py-3 rounded-full font-semibold transition-all duration-500 transform hover:scale-105 ${
              selectedCategory === null
                ? 'bg-gorilla-yellow text-gorilla-black shadow-glow-yellow shadow-2xl scale-105'
                : 'bg-white/10 text-white hover:bg-white/20 border border-white/20 hover:border-gorilla-yellow/50'
            }`}
          >
            <span className="flex items-center gap-2">
              ✨ Todas
            </span>
          </button>
          {categories.map((category) => {
            const icons = {
              frontend: '⚛️',
              backend: '🔧',
              mobile: '📱',
              ai: '🤖',
              devops: '☁️'
            }
            
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-8 py-3 rounded-full font-semibold transition-all duration-500 border transform hover:scale-105 ${
                  selectedCategory === category
                    ? `${categoryColors[category]} shadow-2xl scale-105`
                    : 'bg-white/10 text-white border-white/20 hover:bg-white/20 hover:border-white/40'
                }`}
              >
                <span className="flex items-center gap-2">
                  {icons[category]} {categoryNames[category]}
                </span>
              </button>
            )
          })}
        </div>

        {/* Mobile Filters - Horizontal Scroll */}
        <div className="block md:hidden">
          <div className="flex gap-3 overflow-x-auto pb-4 px-4 -mx-4 scrollbar-hide">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`flex-shrink-0 px-6 py-2.5 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === null
                  ? 'bg-gorilla-yellow text-gorilla-black shadow-lg'
                  : 'bg-white/10 text-white border border-white/20'
              }`}
            >
              <span className="flex items-center gap-2 whitespace-nowrap">
                ✨ Todas
              </span>
            </button>
            {categories.map((category) => {
              const icons = {
                frontend: '⚛️',
                backend: '🔧',
                mobile: '📱',
                ai: '🤖',
                devops: '☁️'
              }
              
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`flex-shrink-0 px-6 py-2.5 rounded-full font-semibold transition-all duration-300 border ${
                    selectedCategory === category
                      ? `${categoryColors[category]} shadow-lg`
                      : 'bg-white/10 text-white border-white/20'
                  }`}
                >
                  <span className="flex items-center gap-2 whitespace-nowrap">
                    {icons[category]} {categoryNames[category]}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Debug Info */}
      <div className="text-center mb-4 text-white/50 text-sm">
        Mostrando {filteredTechs.length} tecnologías
      </div>

      {/* Tech Grid - Desktop: Grid Layout, Mobile: Stack Layout */}
      <div ref={gridRef} className="min-h-[400px]">
        {filteredTechs.length > 0 ? (
          <>
            {/* Desktop Grid */}
            <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
              {filteredTechs.map((tech, index) => (
                <TechCard
                  key={tech.id}
                  tech={tech}
                  index={index}
                  onClick={() => onTechClick?.(tech)}
                />
              ))}
            </div>

            {/* Mobile Stack */}
            <div className="block md:hidden space-y-3">
              {filteredTechs.map((tech, index) => (
                <TechCard
                  key={tech.id}
                  tech={tech}
                  index={index}
                  onClick={() => onTechClick?.(tech)}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-white/60 text-xl mb-2">
              No hay tecnologías disponibles
            </p>
            <p className="text-white/40 text-sm">
              Verifica la configuración de datos
            </p>
          </div>
        )}
      </div>

      {/* Enhanced Empty State */}
      {filteredTechs.length === 0 && (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-white/60 text-xl mb-2">
            No hay tecnologías en esta categoría
          </p>
          <p className="text-white/40 text-sm">
            Prueba seleccionando otra categoría
          </p>
        </div>
      )}

      {/* Enhanced Stats with animations */}
      <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          {
            value: technologies.length,
            label: 'Tecnologías',
            color: 'text-gorilla-yellow',
            icon: '🚀'
          },
          {
            value: technologies.reduce((sum, tech) => sum + tech.projectCount, 0),
            label: 'Proyectos',
            color: 'text-neon-blue',
            icon: '💼'
          },
          {
            value: Math.round(
              technologies.reduce((sum, tech) => sum + tech.expertiseLevel, 0) /
                technologies.length
            ),
            label: 'Nivel Promedio',
            color: 'text-neon-purple',
            icon: '⭐'
          },
          {
            value: new Set(technologies.map((tech) => tech.category)).size,
            label: 'Categorías',
            color: 'text-neon-pink',
            icon: '📊'
          }
        ].map((stat, index) => (
          <div key={index} className="text-center group">
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/10">
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <div className={`text-4xl font-bold ${stat.color} mb-2 group-hover:scale-105 transition-transform duration-300`}>
                {stat.value}
              </div>
              <div className="text-white/70 text-sm font-medium">
                {stat.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced CSS with mobile optimizations */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .shadow-glow-yellow {
          box-shadow: 0 0 20px rgba(255, 215, 0, 0.4), 0 0 40px rgba(255, 215, 0, 0.2);
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .group:hover .animate-float {
          animation: float 2s ease-in-out infinite;
        }
        
        /* Mobile touch improvements */
        @media (max-width: 768px) {
          .group:active {
            transform: scale(0.98);
          }
        }
      `}</style>
    </div>
  )
}
