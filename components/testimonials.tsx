"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/context/language-context"
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react"
import { SectionHeader, SectionContainer } from "@/components/ui/section"
import { TouchButton } from "@/components/ui/mobile-optimizations"
import { motion, AnimatePresence } from "framer-motion"

interface Testimonial {
  id: number
  name: string
  company: string
  image: string
  quote: string
}

const Testimonials = () => {
  const { translations } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Carlos Rodriguez",
      company: "TechStart Inc.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      quote: translations.testimonials.quote1,
    },
    {
      id: 2,
      name: "Maria Gonzalez",
      company: "E-Shop Solutions",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      quote: translations.testimonials.quote2,
    },
    {
      id: 3,
      name: "Juan Perez",
      company: "Industrial Innovations",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      quote: translations.testimonials.quote3,
    },
    {
      id: 4,
      name: "Ana Martinez",
      company: "Digital Marketing Pro",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      quote:
        "Gorilla Labs transformed our digital presence completely. Their attention to detail and innovative solutions exceeded our expectations.",
    },
    {
      id: 5,
      name: "Roberto Silva",
      company: "StartUp Ventures",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      quote: "The mobile app they developed for us increased our user engagement by 300%. Highly professional team!",
    },
    {
      id: 6,
      name: "Laura Fernandez",
      company: "Retail Solutions",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
      quote:
        "Our e-commerce platform built by Gorilla Labs has been running flawlessly for over a year. Great investment!",
    },
  ]

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 2) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 2 + testimonials.length) % testimonials.length)
  }

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial()
    }, 5000) // Change every 5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <SectionContainer maxWidth="xl" className="py-16">
      <SectionHeader
        subtitle="Client Testimonials"
        title={translations.testimonials.title}
        description={translations.testimonials.subtitle}
        centered={true}
      />

      <div className="relative mx-auto max-w-5xl">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="grid gap-8 md:grid-cols-2"
          >
            {[testimonials[currentIndex], testimonials[(currentIndex + 1) % testimonials.length]].map(
              (testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="border border-gray-700/50 bg-bg-card hover:border-gorilla-yellow/30 transition-all duration-300 h-full">
                    <CardContent className="p-8 flex flex-col h-full">
                      {/* Quote icon */}
                      <Quote className="mb-6 h-10 w-10 text-gorilla-yellow opacity-60" />
                      
                      {/* Quote text */}
                      <blockquote className="mb-6 text-lg text-white leading-relaxed flex-1 italic">
                        "{testimonial.quote}"
                      </blockquote>
                      
                      {/* Rating stars */}
                      <div className="flex mb-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-gorilla-yellow fill-current" />
                        ))}
                      </div>
                      
                      {/* Author info */}
                      <div className="flex items-center gap-4">
                        <div className="relative h-14 w-14 overflow-hidden rounded-full ring-2 ring-gorilla-yellow/20">
                          <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-lg">{testimonial.name}</h4>
                          <p className="text-text-muted-dark">{testimonial.company}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ),
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation controls */}
        <div className="mt-8 flex justify-center items-center gap-4">
          <TouchButton
            onClick={prevTestimonial}
            variant="ghost"
            size="sm"
            className="rounded-full p-3 bg-bg-card border border-gray-700/50 hover:border-gorilla-yellow/50 hover:bg-gorilla-yellow/10"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </TouchButton>
          
          {/* Dots indicator */}
          <div className="flex gap-2">
            {Array.from({ length: Math.ceil(testimonials.length / 2) }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i * 2)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  Math.floor(currentIndex / 2) === i 
                    ? 'bg-gorilla-yellow w-6' 
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
          
          <TouchButton
            onClick={nextTestimonial}
            variant="ghost"
            size="sm"
            className="rounded-full p-3 bg-bg-card border border-gray-700/50 hover:border-gorilla-yellow/50 hover:bg-gorilla-yellow/10"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </TouchButton>
        </div>
      </div>
    </SectionContainer>
  )
}

export default Testimonials
