"use client"

import { useState } from "react"
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
  ]

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div className="bg-black py-16 text-primary-foreground">
      <div className="container">
        <div className="mb-10 text-center">
          <h2 className="mb-2 text-3xl font-bold text-primary">{translations.testimonials.title}</h2>
          <p className="mx-auto max-w-2xl text-gray-400">{translations.testimonials.subtitle}</p>
        </div>

        <div className="relative mx-auto max-w-4xl">
          <Card className="border-none bg-gray-900">
            <CardContent className="p-8 md:p-12">
              <Quote className="mb-6 h-12 w-12 text-primary opacity-50" />

              <p className="mb-8 text-xl italic text-gray-300">"{testimonials[currentIndex].quote}"</p>

              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 overflow-hidden rounded-full">
                  <Image
                    src={testimonials[currentIndex].image || "/placeholder.svg"}
                    alt={testimonials[currentIndex].name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-primary-foreground">{testimonials[currentIndex].name}</h4>
                  <p className="text-gray-400">{testimonials[currentIndex].company}</p>
                </div>
              </div>
            </CardContent>
          </Card>

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
