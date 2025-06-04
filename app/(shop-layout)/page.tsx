"use client"

import { useEffect, useState } from "react"
import Hero from "@/components/hero"
import ServiceCategories from "@/components/service-categories"
import FeaturedServices from "@/components/featured-services"
import Testimonials from "@/components/testimonials"
import CallToAction from "@/components/call-to-action"
import GameSection from "@/components/game-section"
import CountdownTimer from "@/components/countdown-timer"
import { Seo } from "@/components/seo"

export default function HomePage() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Server-side or initial client render
  if (!isClient) {
    return (
      <main className="w-full overflow-x-hidden">
        <div className="relative flex min-h-[80vh] w-full flex-col items-center justify-center overflow-hidden bg-black text-primary-foreground">
          <div className="container relative z-10 flex flex-col items-center justify-center gap-8 text-center">
            <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              We Transform Your Ideas into Technological Solutions
            </h1>
            <div className="h-20">
              <h2 className="text-2xl font-medium text-primary md:text-3xl">
                Web Development
                <span className="animate-pulse">|</span>
              </h2>
            </div>
          </div>
        </div>
        <div className="w-full py-16">
          <ServiceCategories />
        </div>
        <div className="w-full bg-gray-50 py-16 dark:bg-gray-900">
          <FeaturedServices />
        </div>
      </main>
    )
  }

  return (
    <main className="w-full overflow-x-hidden">
      <Seo
        title="Gorilla Labs - Web Development & Technology Solutions"
        description="Gorilla Labs is a technology startup specializing in creating websites, e-commerce platforms, and applications for businesses and companies."
      />

      {/* Hero Section with Video Background */}
      <Hero />

      {/* Countdown Timer for Events */}
      <div className="w-full bg-primary py-8 text-primary-foreground">
        <CountdownTimer
          targetDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
          title="New Service Launch Countdown"
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
