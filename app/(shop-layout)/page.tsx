"use client"

import { Hero } from "@/components/hero"
import { FeaturedServices } from "@/components/featured-services"
import { Testimonials } from "@/components/testimonials"
import { CallToAction } from "@/components/call-to-action"
import { GameSection } from "@/components/game-section"
import { CountdownTimer } from "@/components/countdown-timer"
import { Seo } from "@/components/seo"
import { useLanguage } from "@/context/language-context"

export default function HomePage() {
  const { language } = useLanguage()

  return (
    <>
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
      <Hero />
      <CountdownTimer />
      <FeaturedServices />
      <GameSection />
      <Testimonials />
      <CallToAction />
    </>
  )
}
