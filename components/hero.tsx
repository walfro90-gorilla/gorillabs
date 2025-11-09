"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/context/language-context"
import { ArrowRight } from "lucide-react"
import { EnhancedBackground } from "@/components/visual-effects/enhanced-background"
import { FloatingEmojis } from "@/components/visual-effects/floating-emojis"
import { GeometricParticles } from "@/components/visual-effects/geometric-particles"
import { EnergyWaves } from "@/components/visual-effects/energy-waves"
import { gsap } from "@/lib/gsap-config"

const Hero = () => {
  const { translations } = useLanguage()
  const [typedText, setTypedText] = useState("")
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  
  // Memoize phrases to prevent infinite re-renders
  const phrases = useMemo(() => [
    "Your Goal is Our!",
    "We Build Amazing Web & Mobile Applications", 
    "We Create AI-Powered Digital Experiences"
  ], [])
  
  // Refs for animations
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)

  // Fixed typing animation
  useEffect(() => {
    let isMounted = true
    let timer: NodeJS.Timeout
    
    const currentPhrase = phrases[currentPhraseIndex]
    let charIndex = 0
    
    const typeCharacter = () => {
      if (!isMounted) return
      
      if (charIndex <= currentPhrase.length) {
        setTypedText(currentPhrase.substring(0, charIndex))
        charIndex++
        timer = setTimeout(typeCharacter, 80)
      } else {
        // Wait before next phrase
        timer = setTimeout(() => {
          if (isMounted) {
            setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length)
          }
        }, 2500)
      }
    }

    // Start typing
    setTypedText("")
    timer = setTimeout(typeCharacter, 1000)

    return () => {
      isMounted = false
      clearTimeout(timer)
    }
  }, [currentPhraseIndex]) // Remove phrases dependency

  // Performance-optimized entrance animations
  useEffect(() => {
    const elements = [titleRef.current, subtitleRef.current, descriptionRef.current, buttonsRef.current]
    
    elements.forEach((el, index) => {
      if (el) {
        // Use CSS transforms for GPU acceleration
        gsap.fromTo(el, 
          { 
            y: 30, 
            opacity: 0,
            // Optimize for performance
            transform: 'translate3d(0, 30px, 0)',
            willChange: 'transform, opacity'
          },
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.8, 
            delay: index * 0.2, 
            ease: "power2.out",
            // Use CSS transforms instead of changing layout properties
            transform: 'translate3d(0, 0, 0)',
            // Clean up will-change after animation
            onComplete: () => {
              if (el) {
                el.style.willChange = 'auto'
              }
            }
          }
        )
      }
    })
  }, [])

  // Smooth scroll to next section
  const handleScrollDown = () => {
    const nextSection = document.querySelector('#ai-showcase')
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-gorilla-black text-white">
      {/* Enhanced Background System */}
      <EnhancedBackground 
        variant="hero"
        className="z-0"
      />
      
      {/* Energy Waves for dynamic background */}
      <EnergyWaves
        intensity="low"
        color="multi"
        className="z-5"
      />
      
      {/* Floating Tech Emojis */}
      <FloatingEmojis
        theme="tech"
        density="medium"
        className="z-10"
      />
      
      {/* Geometric Particles for extra visual appeal */}
      <GeometricParticles
        count={15}
        shapes={['circle', 'square', 'diamond']}
        className="z-15"
      />

      {/* Content with improved layout */}
      <div className="container relative z-20 flex flex-col items-center justify-center text-center px-4 max-w-6xl mx-auto">
        {/* Main Content Card */}
        <div className="bg-bg-overlay backdrop-blur-sm rounded-2xl p-8 md:p-12 lg:p-16 border border-white/10 shadow-2xl max-w-4xl w-full">
          {/* Title */}
          <h1 
            ref={titleRef}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-gorilla-yellow mb-6 text-shadow-strong"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 'var(--leading-tight)' }}
            aria-label="Gorilla Labs - AI and Technology Solutions"
          >
            {translations.hero.title}
          </h1>

          {/* Animated Subtitle */}
          <div ref={subtitleRef} className="min-h-[80px] md:min-h-[100px] mb-8">
            <h2 
              className="text-xl md:text-2xl lg:text-3xl font-medium text-white text-shadow-strong"
              style={{ fontSize: 'clamp(1.25rem, 3vw, 2rem)', lineHeight: 'var(--leading-normal)' }}
              aria-live="polite"
              aria-label="Our services"
            >
              {typedText || phrases[0]}
              <span className="animate-pulse text-gorilla-yellow ml-1 font-bold" aria-hidden="true">|</span>
            </h2>
          </div>

          {/* Description */}
          <p 
            ref={descriptionRef}
            className="max-w-2xl mx-auto text-lg md:text-xl text-white/90 leading-relaxed mb-10 text-shadow-subtle"
            style={{ 
              fontSize: 'clamp(1rem, 2vw, 1.25rem)', 
              lineHeight: 'var(--leading-relaxed)'
            }}
          >
            {translations.hero.description}
          </p>

          {/* CTA Buttons */}
          <div 
            ref={buttonsRef}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
            role="group"
            aria-label="Main action buttons"
          >
            <Link href="/services" className="w-full sm:w-auto">
              <Button 
                size="lg" 
                className="w-full sm:w-auto gap-2 bg-gorilla-yellow text-gorilla-black hover:bg-yellow-400 hover:scale-105 transition-all duration-300 shadow-lg font-semibold px-8 py-4 min-h-[48px] focus-visible text-lg"
                aria-label="View our services and solutions"
              >
                {translations.hero.cta}
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Button>
            </Link>
            <Link href="/portfolio" className="w-full sm:w-auto">
              <Button 
                variant="outline" 
                size="lg"
                className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-gorilla-black transition-all duration-300 font-semibold px-8 py-4 min-h-[48px] focus-visible text-lg"
                aria-label="View our portfolio and past projects"
              >
                {translations.hero.portfolio}
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div 
            className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/70"
            role="list"
            aria-label="Company status and specialties"
          >
            <div className="flex items-center gap-2" role="listitem">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" aria-hidden="true"></div>
              <span>Available for projects</span>
            </div>
            <div className="flex items-center gap-2" role="listitem">
              <div className="w-2 h-2 bg-gorilla-yellow rounded-full" aria-hidden="true"></div>
              <span>El Paso TX & Cd. Juárez</span>
            </div>
            <div className="flex items-center gap-2" role="listitem">
              <div className="w-2 h-2 bg-blue-400 rounded-full" aria-hidden="true"></div>
              <span>AI & Web Specialists</span>
            </div>
          </div>
        </div>
      </div>

      {/* Simple Scroll Indicator */}
      <button 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gorilla-yellow focus-visible:ring-offset-2 rounded-lg p-2"
        onClick={handleScrollDown}
        aria-label="Scroll down to explore our AI showcase"
        type="button"
      >
        <div className="flex flex-col items-center gap-2 text-white/80 group-hover:text-gorilla-yellow transition-all duration-300">
          <span className="text-xs font-medium tracking-wider uppercase">Explore</span>
          <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center" aria-hidden="true">
            <div className="w-1 h-3 bg-current rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </button>
    </div>
  )
}

export default Hero
