"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/context/language-context"
import { ArrowRight, Sparkles, Zap } from "lucide-react"
import { SectionContainer } from "@/components/ui/section"
import { TouchButton } from "@/components/ui/mobile-optimizations"
import { motion } from "framer-motion"

const CallToAction = () => {
  const { translations } = useLanguage()

  return (
    <SectionContainer maxWidth="xl" className="py-20">
      <div className="relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
        {/* Background with gradient and effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-gorilla-yellow/10 via-neon-blue/5 to-gorilla-yellow/10 rounded-2xl" />
        <div className="absolute inset-0 bg-bg-card/80 backdrop-blur-sm rounded-2xl border border-gorilla-yellow/20" />
        
        {/* Content */}
        <div className="relative p-8 md:p-12 lg:p-16">
          <div className="mx-auto max-w-4xl text-center">
            {/* Icon */}
            <div className="mb-8 flex justify-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
              <div className="p-4 bg-gorilla-yellow/10 rounded-full border border-gorilla-yellow/20">
                <Sparkles className="h-12 w-12 text-gorilla-yellow" />
              </div>
              </motion.div>
            </div>

            {/* Title */}
            <h2 className="mb-6 text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
              {translations.cta.title}
            </h2>

            {/* Description */}
            <p className="mb-10 text-lg md:text-xl text-text-muted-dark leading-relaxed max-w-2xl mx-auto" style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)' }}>
              {translations.cta.description}
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <TouchButton 
                  size="lg" 
                  className="bg-gorilla-yellow text-gorilla-black hover:bg-yellow-400 font-semibold px-8 py-4 text-lg group"
                >
                  <Zap className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                  {translations.cta.button}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </TouchButton>
              </Link>
              
              <Link href="/portfolio">
                <TouchButton 
                  variant="secondary" 
                  size="lg"
                  className="font-semibold px-8 py-4 text-lg"
                >
                  View Our Work
                </TouchButton>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-text-muted-dark">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Free Consultation</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gorilla-yellow rounded-full"></div>
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>Money-back Guarantee</span>
              </div>
            </div>
          </div>
        </div>
        </motion.div>
      </div>
    </SectionContainer>
  )
}

export default CallToAction
