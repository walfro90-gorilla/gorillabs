"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/context/language-context"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

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
      image: "/placeholder.svg?height=100&width=100",
      quote: translations.testimonials.quote1,
    },
    {
      id: 2,
      name: "Maria Gonzalez",
      company: "E-Shop Solutions",
      image: "/placeholder.svg?height=100&width=100",
      quote: translations.testimonials.quote2,
    },
    {
      id: 3,
      name: "Juan Perez",
      company: "Industrial Innovations",
      image: "/placeholder.svg?height=100&width=100",
      quote: translations.testimonials.quote3,
    },
    {
      id: 4,
      name: "Ana Martinez",
      company: "Digital Marketing Pro",
      image: "/placeholder.svg?height=100&width=100",
      quote:
        "Gorilla Labs transformed our digital presence completely. Their attention to detail and innovative solutions exceeded our expectations.",
    },
    {
      id: 5,
      name: "Roberto Silva",
      company: "StartUp Ventures",
      image: "/placeholder.svg?height=100&width=100",
      quote: "The mobile app they developed for us increased our user engagement by 300%. Highly professional team!",
    },
    {
      id: 6,
      name: "Laura Fernandez",
      company: "Retail Solutions",
      image: "/placeholder.svg?height=100&width=100",
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
    <div className="bg-black py-16 text-primary-foreground">
      <div className="container">
        <div className="mb-10 text-center">
          <h2 className="mb-2 text-3xl font-bold text-primary">{translations.testimonials.title}</h2>
          <p className="mx-auto max-w-2xl text-gray-400">{translations.testimonials.subtitle}</p>
        </div>

        <div className="relative mx-auto max-w-4xl">
          <div className="grid gap-6 md:grid-cols-2">
            {[testimonials[currentIndex], testimonials[(currentIndex + 1) % testimonials.length]].map(
              (testimonial, index) => (
                <Card key={testimonial.id} className="border-none bg-gray-900">
                  <CardContent className="p-6">
                    <Quote className="mb-4 h-8 w-8 text-primary opacity-50" />
                    <p className="mb-6 text-lg italic text-gray-300">"{testimonial.quote}"</p>
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 overflow-hidden rounded-full">
                        <Image
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-primary-foreground">{testimonial.name}</h4>
                        <p className="text-sm text-gray-400">{testimonial.company}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ),
            )}
          </div>

          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={prevTestimonial}
              className="rounded-full bg-gray-800 p-2 text-primary-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextTestimonial}
              className="rounded-full bg-gray-800 p-2 text-primary-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Testimonials
