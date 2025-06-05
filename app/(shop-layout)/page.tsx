"use client"

import Hero from "@/components/hero"
import FeaturedServices from "@/components/featured-services"
import Testimonials from "@/components/testimonials"
import CallToAction from "@/components/call-to-action"
import GameSection from "@/components/game-section"
import CountdownTimer from "@/components/countdown-timer"
import { Seo } from "@/components/seo"
import { useLanguage } from "@/context/language-context"
import ServiceCategories from "@/components/service-categories"

export default function HomePage() {
  const { language } = useLanguage()

  return (
    <main className="w-full overflow-x-hidden">
      <Seo
        title="Home - Web Development & Mobile Apps"
        description="Gorilla Labs - Professional web development, e-commerce solutions, and mobile apps in El Paso TX and Ciudad Juárez. Transform your business with cutting-edge technology."
        keywords="web development, mobile apps, e-commerce, digital solutions, El Paso TX, Ciudad Juárez, React, Next.js, Flutter"
        canonical="https://gorillalabs.dev"
        type="website"
        location="El Paso TX, Ciudad Juárez"
        technologies={["React", "Next.js", "Flutter", "Shopify", "React Native", "TypeScript"]}
        language={language}
      />

      {/* Hero Section with Video Background */}
      <Hero />

      {/* Countdown Timer for Events */}
      <div className="w-full bg-primary py-8 text-primary-foreground">
        <CountdownTimer
          targetDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
          title="Nueva Implementación de Servicio"
        />
      </div>

      {/* Service Categories Section */}
      <div className="w-full py-16">
        <ServiceCategories />
      </div>

      {/* Featured Services Section */}
      <div className="w-full bg-secondary py-16 dark:bg-gray-900">
        <FeaturedServices />
      </div>

      {/* Testimonials Section */}
      <div className="w-full py-16">
        <Testimonials />
      </div>

      {/* Interactive Game Section */}
      <div className="w-full bg-secondary py-16 dark:bg-gray-900">
        <GameSection />
      </div>

      {/* Call to Action Section */}
      <div className="w-full py-16">
        <CallToAction />
      </div>
    </main>
  )
}
