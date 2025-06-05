"use client"

import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/context/cart-context"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/context/language-context"
import { getServiceById, getServiceKeywords, getServiceSchema, type Service } from "@/lib/services"
import { Seo } from "@/components/seo"

export default function ServiceDetailPage() {
  const params = useParams()
  const id = params?.id as string
  const [service, setService] = useState<Service | null>(null)
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart()
  const { toast } = useToast()
  const languageContext = useLanguage()

  useEffect(() => {
    // First try to get service from our data file
    const serviceData = getServiceById(id)

    if (serviceData) {
      setService(serviceData)
      setLoading(false)
      return
    }

    // Fallback to localStorage if not found in our data
    const storedService = localStorage.getItem("selectedService")

    if (storedService) {
      try {
        const parsedService = JSON.parse(storedService)
        if (parsedService.id === id) {
          setService(parsedService)
        }
      } catch (error) {
        console.error("Error parsing stored service:", error)
      }
    }

    setLoading(false)
  }, [id])

  const handleAddToCart = () => {
    if (!service) return

    addToCart({
      id: service.id,
      name: service.title.en,
      price: service.price,
      quantity: 1,
      image: service.image,
    })

    toast({
      title: languageContext.translations.cart.addedToCart,
      description: service.title.en,
    })
  }

  if (loading) {
    return (
      <div className="container mx-auto py-16 text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-muted-foreground">Loading service details...</p>
      </div>
    )
  }

  if (!service) {
    return (
      <div className="container mx-auto py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Service Not Found</h1>
        <p className="mb-8">The service you're looking for doesn't exist or has been removed.</p>
        <Link href="/services">
          <Button className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Services
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      {service && (
        <Seo
          title={`${service.title[languageContext.language] || service.title.en}`}
          description={`${service.fullDescription[languageContext.language] || service.fullDescription.en} Precio desde $${service.price}${service.id === "3" ? "/hora" : ""}. ${service.features.slice(0, 2).join(" y ")}.`}
          keywords={getServiceKeywords(service.id)}
          canonical={`https://gorillalabs.dev/services/${service.id}`}
          type="service"
          price={service.price.toString()}
          technologies={service.features}
          language={languageContext.language}
        />
      )}
      {service && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getServiceSchema(service)),
          }}
        />
      )}
      <Link href="/services" className="text-primary hover:underline mb-4 inline-flex items-center gap-2">
        <ArrowLeft className="h-4 w-4" />
        Back to Services
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
        {/* Image Section */}
        <div className="space-y-4">
          <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
            <Image
              src={service.image || "/placeholder.svg?height=400&width=600"}
              alt={service.title.en}
              fill
              className="object-cover"
            />
            {service.featured && (
              <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">Featured</Badge>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(service.rating) ? "fill-primary text-primary" : "fill-muted text-muted"
                  }`}
                />
              ))}
            </div>
            <span className="text-lg font-medium">{service.rating}</span>
            <span className="text-muted-foreground">(Based on customer reviews)</span>
          </div>
        </div>

        {/* Details Section */}
        <div className="space-y-6">
          <div>
            <Badge variant="outline" className="mb-2">
              {service.category.charAt(0).toUpperCase() + service.category.slice(1)}
            </Badge>
            <h1 className="text-4xl font-bold mb-4">{service.title[languageContext.language] || service.title.en}</h1>
            <p className="text-lg text-muted-foreground mb-6">
              {service.fullDescription[languageContext.language] || service.fullDescription.en}
            </p>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-primary">${service.price}</span>
              <span className="text-muted-foreground">Starting price</span>
            </div>
          </div>

          {/* Add to Cart Button */}
          <Button onClick={handleAddToCart} size="lg" className="w-full gap-2">
            <ShoppingCart className="h-5 w-5" />
            Add to Cart
          </Button>

          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">What's Included</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                Contact us for custom requirements and pricing adjustments.
              </p>
            </CardFooter>
          </Card>

          {/* Contact CTA */}
          <Card className="bg-muted/50">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">Ready to get started?</h3>
              <p className="text-muted-foreground mb-4">
                Let's discuss your project requirements and create something amazing together.
              </p>
              <div className="flex gap-3">
                <Link href="/contact" className="flex-1">
                  <Button variant="outline" className="w-full">
                    Get Quote
                  </Button>
                </Link>
                <Link href="/contact" className="flex-1">
                  <Button className="w-full">Contact Us</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
