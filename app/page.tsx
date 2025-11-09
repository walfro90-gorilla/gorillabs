"use client"

import { useEffect } from "react"
import { Seo } from "@/components/seo"
import { useLanguage } from "@/context/language-context"
import { motion } from "framer-motion"
import dynamic from "next/dynamic"

import { LoadingState } from "@/components/ui/loading-state"
import { ErrorBoundary } from "@/components/ui/error-boundary"
import { SkipNavigation } from "@/components/ui/skip-navigation"
import { KeyboardNavigationWrapper } from "@/components/ui/keyboard-navigation-wrapper"
import { LiveRegion, ScreenReaderOnly, LoadingAnnouncer } from "@/components/ui/screen-reader-support"
import { AccessibilityToggle } from "@/components/ui/accessibility-preferences"
import { SectionEffects } from "@/components/visual-effects/section-effects"
import { VisualSeparator } from "@/components/ui/visual-separator"
import { VisualEffectsControl } from "@/components/ui/visual-effects-control"

// Enhanced dynamic imports with progressive loading priorities and error handling
// Priority 1: Critical above-the-fold content (SSR enabled)
// Priority 2: Important sections (SSR enabled, longer timeouts)
// Priority 3: Interactive/Heavy components (Client-side only, fallbacks)
const Hero = dynamic(() => import("@/components/hero"), {
  loading: () => <LoadingState variant="hero" showSkeleton timeout={10000}>Loading homepage...</LoadingState>,
  ssr: true // Critical content should be SSR
})

const AIShowcaseSection = dynamic(() => 
  import("@/components/ai-showcase/ai-showcase-section").then(mod => ({ default: mod.AIShowcaseSection }))
  .catch(() => {
    // Fallback for AI showcase if it fails
    console.warn('AI Showcase failed to load, using fallback')
    return import("@/components/ui/fallback-content").then(fallback => ({
      default: () => fallback.default({ 
        type: 'section', 
        title: 'AI Showcase', 
        message: 'Interactive AI demonstrations will be available soon.' 
      })
    }))
  }), {
  loading: () => <LoadingState variant="section" showSkeleton timeout={25000}>Loading AI showcase...</LoadingState>,
  ssr: false
})

const TechShowcaseSection = dynamic(() => import("@/components/tech-showcase/tech-showcase-section").then(mod => ({ default: mod.TechShowcaseSection })), {
  loading: () => <LoadingState variant="section" showSkeleton timeout={15000}>Loading tech showcase...</LoadingState>,
  ssr: false // Complex animations, better as client-side
})

const LogisticsTracker = dynamic(() => 
  import("@/components/google-maps/logistics-tracker").then(mod => ({ default: mod.LogisticsTracker }))
  .catch(() => {
    // Fallback for maps if Google Maps fails
    console.warn('Google Maps failed to load, using fallback')
    return import("@/components/ui/fallback-content").then(fallback => ({
      default: () => fallback.default({ 
        type: 'section', 
        title: 'Logistics Tracker', 
        message: 'Interactive map will be available soon.' 
      })
    }))
  }), {
  loading: () => <LoadingState height="h-[400px]" timeout={30000}>Loading interactive map...</LoadingState>,
  ssr: false // Maps require client-side APIs
})

const FeaturedServices = dynamic(() => import("@/components/featured-services"), {
  loading: () => <LoadingState variant="section" showSkeleton timeout={20000}>Loading services...</LoadingState>,
  ssr: true
})

const Testimonials = dynamic(() => import("@/components/testimonials"), {
  loading: () => <LoadingState variant="section" showSkeleton timeout={20000}>Loading testimonials...</LoadingState>,
  ssr: true
})

const CallToAction = dynamic(() => import("@/components/call-to-action"), {
  loading: () => <LoadingState height="h-64" timeout={15000}>Ready to get started?</LoadingState>,
  ssr: true // Important for SEO and conversion
})



const ServiceCategories = dynamic(() => import("@/components/service-categories"), {
  loading: () => <LoadingState variant="section" showSkeleton timeout={15000}>Loading our services...</LoadingState>,
  ssr: true
})

export default function HomePage() {
  const { language } = useLanguage()

  // Smooth scroll behavior
  useEffect(() => {
    // Enable smooth scrolling
    document.documentElement.style.scrollBehavior = "smooth"
    
    return () => {
      document.documentElement.style.scrollBehavior = "auto"
    }
  }, [])

  return (
    <>
      <SkipNavigation />
      <KeyboardNavigationWrapper
        enableArrowKeys={true}
        enableTabTrapping={false}
        enableEscapeKey={true}
        role="main"
        aria-label="Gorilla Labs homepage content"
      >
        <main id="main-content" className="w-full overflow-x-hidden">
        <Seo
        title="Gorilla Labs - AI & Technology Solutions"
        description="Gorilla Labs - Professional web development, e-commerce solutions, mobile apps, and AI technologies in El Paso TX and Ciudad Juárez."
        keywords="web development, mobile apps, e-commerce, AI, artificial intelligence, digital solutions, El Paso TX, Ciudad Juárez, React, Next.js, Flutter, Gemini AI"
        canonical="https://gorillalabs.dev"
        type="website"
        location="El Paso TX, Ciudad Juárez"
        technologies={["React", "Next.js", "Flutter", "Shopify", "React Native", "TypeScript", "AI", "Gemini"]}
        language={language as "en" | "es"}
      />

      {/* Hero Section */}
      <ErrorBoundary fallback={<LoadingState height="h-screen" errorFallback={<p className="text-red-400">Failed to load hero section</p>} retryButton />}>
        <section 
          id="hero" 
          className="min-h-screen flex items-center justify-center" 
          tabIndex={-1}
          role="banner"
          aria-label="Hero section - Welcome to Gorilla Labs"
        >
          <ScreenReaderOnly>
            <h1>Welcome to Gorilla Labs - AI & Technology Solutions</h1>
          </ScreenReaderOnly>
          <Hero />
        </section>
      </ErrorBoundary>

      {/* Visual Separator */}
      <VisualSeparator variant="gradient" height="md" />

      {/* AI Showcase Section */}
      <ErrorBoundary fallback={<LoadingState errorFallback={<p className="text-red-400">Failed to load AI showcase</p>} retryButton />}>
        <section 
          id="ai-showcase" 
          className="relative bg-bg-secondary overflow-hidden" 
          tabIndex={-1}
          role="region"
          aria-labelledby="ai-showcase-heading"
        >
          <SectionEffects variant="tech" />
          <ScreenReaderOnly>
            <h2 id="ai-showcase-heading">AI Technology Showcase</h2>
          </ScreenReaderOnly>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative z-20"
          >
            <AIShowcaseSection />
          </motion.div>
        </section>
      </ErrorBoundary>

      {/* Visual Separator */}
      <VisualSeparator variant="dots" height="sm" />

      {/* Tech Stack Showcase Section */}
      <ErrorBoundary fallback={<LoadingState errorFallback={<p className="text-red-400">Failed to load tech showcase</p>} retryButton />}>
        <section 
          id="tech-stack" 
          className="relative bg-bg-primary overflow-hidden"
          role="region"
          aria-labelledby="tech-stack-heading"
        >
          <SectionEffects variant="tech" />
          <ScreenReaderOnly>
            <h2 id="tech-stack-heading">Technology Stack and Capabilities</h2>
          </ScreenReaderOnly>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative z-20"
          >
            <TechShowcaseSection />
          </motion.div>
        </section>
      </ErrorBoundary>

      {/* Logistics Tracker Section */}
      <ErrorBoundary fallback={<LoadingState height="h-[500px]" errorFallback={<p className="text-red-400">Failed to load logistics tracker</p>} retryButton />}>
        <section 
          id="logistics" 
          className="w-full py-20 bg-bg-secondary"
          role="region"
          aria-labelledby="logistics-heading"
          aria-describedby="logistics-description"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="text-center mb-12">
                <p className="text-gorilla-yellow font-medium mb-2 uppercase tracking-wider text-sm">
                  {language === "es" ? "Demostración Técnica" : "Technical Demo"}
                </p>
                <h2 
                  id="logistics-heading"
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 text-shadow-subtle" 
                  style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 'var(--leading-tight)' }}
                >
                  {language === "es" 
                    ? "Rastreador Logístico" 
                    : "Logistics Tracker"}
                </h2>
                <p 
                  id="logistics-description"
                  className="text-lg text-text-muted-dark max-w-3xl mx-auto leading-relaxed" 
                  style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', lineHeight: 'var(--leading-normal)' }}
                >
                  {language === "es"
                    ? "Demostración de sistema de rastreo logístico en tiempo real con Google Maps integrado"
                    : "Real-time logistics tracking system demonstration with integrated Google Maps"}
                </p>
              </div>
              <div className="max-w-4xl mx-auto" role="application" aria-label="Interactive logistics tracking map">
                <LogisticsTracker />
              </div>
            </div>
          </motion.div>
        </section>
      </ErrorBoundary>

      {/* Service Categories Section */}
      <ErrorBoundary fallback={<LoadingState errorFallback={<p className="text-red-400">Failed to load services</p>} retryButton />}>
        <section 
          id="services" 
          className="relative w-full py-16 bg-bg-card overflow-hidden"
          role="region"
          aria-labelledby="services-heading"
        >
          <SectionEffects variant="services" />
          <ScreenReaderOnly>
            <h2 id="services-heading">Our Services and Solutions</h2>
          </ScreenReaderOnly>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative z-20"
          >
            <ServiceCategories />
          </motion.div>
        </section>
      </ErrorBoundary>

      {/* Featured Services Section */}
      <ErrorBoundary fallback={<LoadingState errorFallback={<p className="text-red-400">Failed to load featured services</p>} retryButton />}>
        <section 
          id="featured-services" 
          className="w-full py-16 bg-bg-secondary"
          role="region"
          aria-labelledby="featured-services-heading"
        >
          <ScreenReaderOnly>
            <h2 id="featured-services-heading">Featured Services and Specialties</h2>
          </ScreenReaderOnly>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <FeaturedServices />
          </motion.div>
        </section>
      </ErrorBoundary>

      {/* Testimonials Section */}
      <ErrorBoundary fallback={<LoadingState errorFallback={<p className="text-red-400">Failed to load testimonials</p>} retryButton />}>
        <section 
          id="testimonials" 
          className="relative w-full py-16 bg-bg-card overflow-hidden"
          role="region"
          aria-labelledby="testimonials-heading"
        >
          <SectionEffects variant="testimonials" />
          <ScreenReaderOnly>
            <h2 id="testimonials-heading">Client Testimonials and Reviews</h2>
          </ScreenReaderOnly>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative z-20"
          >
            <Testimonials />
          </motion.div>
        </section>
      </ErrorBoundary>



      {/* Call to Action Section */}
      <ErrorBoundary fallback={<LoadingState height="h-64" errorFallback={<p className="text-red-400">Failed to load contact section</p>} retryButton />}>
        <section 
          id="contact" 
          className="relative w-full py-16 bg-gradient-to-b from-bg-card to-bg-secondary overflow-hidden"
          role="region"
          aria-labelledby="contact-heading"
        >
          <SectionEffects variant="contact" />
          <ScreenReaderOnly>
            <h2 id="contact-heading">Contact Us and Get Started</h2>
          </ScreenReaderOnly>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative z-20"
          >
            <CallToAction />
          </motion.div>
        </section>
      </ErrorBoundary>

      {/* Visual Effects Control - Accessibility toggle */}
      <VisualEffectsControl position="bottom-right" />
      
      {/* Accessibility Preferences Toggle */}
      <AccessibilityToggle position="bottom-left" />
        </main>
        
        {/* ARIA Live Regions for Dynamic Content Updates */}
        <LiveRegion priority="polite" id="status-updates">
          <span></span>
        </LiveRegion>
        
        <LiveRegion priority="assertive" id="error-announcements">
          <span></span>
        </LiveRegion>
        
        <LoadingAnnouncer 
          loading={false}
          loadingMessage="Loading page content..."
          completeMessage="Page loaded successfully"
          errorMessage="Failed to load some page content"
        />
      </KeyboardNavigationWrapper>
    </>
  )
}

