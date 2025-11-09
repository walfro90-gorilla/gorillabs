'use client'

import { ParticleBackground } from './particle-background'
import { ShaderGradient } from './shader-gradient'
import { 
  GlassmorphicCard,
  GlassmorphicCardHeader,
  GlassmorphicCardContent,
  GlassmorphicCardTitle,
  GlassmorphicCardDescription
} from '../ui/glassmorphic-card'

/**
 * Visual Effects Demo Component
 * Demonstrates all visual effects components
 */
export function VisualEffectsDemo() {
  return (
    <div className="relative min-h-screen w-full bg-gorilla-black overflow-hidden">
      {/* Particle Background */}
      <ParticleBackground
        particleCount={1000}
        particleSize={2}
        particleColor="#FFD700"
        animationSpeed={0.5}
        enableParallax={true}
      />
      
      {/* Shader Gradient Overlay */}
      <ShaderGradient
        colors={['#000000', '#FFD700', '#00D4E6']}
        animationSpeed={0.3}
        blendMode="screen"
        className="opacity-30"
      />
      
      {/* Content with Glassmorphic Cards */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 - Default */}
          <GlassmorphicCard borderGlow glowColor="yellow">
            <GlassmorphicCardHeader>
              <GlassmorphicCardTitle>Default Card</GlassmorphicCardTitle>
              <GlassmorphicCardDescription>
                Standard glassmorphism effect
              </GlassmorphicCardDescription>
            </GlassmorphicCardHeader>
            <GlassmorphicCardContent>
              <p className="text-white/80">
                This card uses the default variant with medium blur and opacity.
              </p>
            </GlassmorphicCardContent>
          </GlassmorphicCard>
          
          {/* Card 2 - Subtle */}
          <GlassmorphicCard variant="subtle" borderGlow glowColor="blue">
            <GlassmorphicCardHeader>
              <GlassmorphicCardTitle>Subtle Card</GlassmorphicCardTitle>
              <GlassmorphicCardDescription>
                Light glassmorphism effect
              </GlassmorphicCardDescription>
            </GlassmorphicCardHeader>
            <GlassmorphicCardContent>
              <p className="text-white/80">
                This card uses the subtle variant with less blur and opacity.
              </p>
            </GlassmorphicCardContent>
          </GlassmorphicCard>
          
          {/* Card 3 - Strong */}
          <GlassmorphicCard variant="strong" borderGlow glowColor="purple">
            <GlassmorphicCardHeader>
              <GlassmorphicCardTitle>Strong Card</GlassmorphicCardTitle>
              <GlassmorphicCardDescription>
                Intense glassmorphism effect
              </GlassmorphicCardDescription>
            </GlassmorphicCardHeader>
            <GlassmorphicCardContent>
              <p className="text-white/80">
                This card uses the strong variant with more blur and opacity.
              </p>
            </GlassmorphicCardContent>
          </GlassmorphicCard>
        </div>
        
        {/* Hero Card */}
        <div className="mt-12 max-w-4xl mx-auto">
          <GlassmorphicCard 
            variant="strong" 
            borderGlow 
            glowColor="yellow"
            className="p-12 text-center"
          >
            <h1 className="text-5xl font-bold text-gorilla-yellow mb-6">
              Gorilla Labs
            </h1>
            <p className="text-2xl text-white/90 mb-8">
              Tecnología de última generación
            </p>
            <div className="flex gap-4 justify-center">
              <button className="px-8 py-3 bg-gorilla-yellow text-gorilla-black rounded-lg font-semibold hover:scale-105 transition-transform">
                Ver Proyectos
              </button>
              <button className="px-8 py-3 border-2 border-gorilla-yellow text-gorilla-yellow rounded-lg font-semibold hover:bg-gorilla-yellow hover:text-gorilla-black transition-colors">
                Contactar
              </button>
            </div>
          </GlassmorphicCard>
        </div>
      </div>
    </div>
  )
}
