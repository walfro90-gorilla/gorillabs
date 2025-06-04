"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/context/cart-context"
import { useLanguage } from "@/context/language-context"
import { ShoppingCart, Star, ArrowRight } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Service {
  id: string
  title: string
  description: string
  price: number
  image: string
  category: string
  featured: boolean
  rating: number
  features: string[]
  fullDescription: string
}

const FeaturedServices = () => {
  const { translations } = useLanguage()
  const { addToCart } = useCart()
  const { toast } = useToast()

  const [services] = useState<Service[]>([
    {
      id: "web-basic",
      title: translations.featuredServices.webBasic,
      description: translations.featuredServices.webBasicDesc,
      price: 1200,
      image: "https://res.cloudinary.com/dgmmzh8nb/image/upload/v1748983315/syf7khoovwrnewmaigin.png",
      category: "web",
      featured: true,
      rating: 4.8,
      features: [
        "Responsive design for all devices",
        "SEO optimization",
        "Content management system",
        "Contact forms and lead capture",
        "Analytics integration",
      ],
      fullDescription:
        "Professional website with up to 5 pages, responsive design, and SEO optimization. We create responsive, modern websites that help your business stand out in the digital landscape.",
    },
    {
      id: "ecomm-standard",
      title: translations.featuredServices.ecommStandard,
      description: translations.featuredServices.ecommStandardDesc,
      price: 1600,
      image: "https://res.cloudinary.com/dgmmzh8nb/image/upload/v1748983470/c29i1t0ne1rnmjwjpjtf.png",
      category: "ecommerce",
      featured: true,
      rating: 4.9,
      features: [
        "Product catalog management",
        "Secure payment processing",
        "Inventory management",
        "Order tracking",
        "Customer accounts",
        "Mobile-friendly shopping experience",
      ],
      fullDescription:
        "Complete online store with product catalog, payment gateway, and order management. Sell your products online with a professional e-commerce platform that drives sales.",
    },
    {
      id: "mobile-app",
      title: translations.featuredServices.mobileApp,
      description: translations.featuredServices.mobileAppDesc,
      price: 45,
      image: "https://res.cloudinary.com/dgmmzh8nb/image/upload/v1748983652/hxuxxifnwc6jsxrxbmqj.png",
      category: "mobile",
      featured: true,
      rating: 4.7,
      features: [
        "Native iOS and Android apps",
        "Cross-platform development",
        "Push notifications",
        "Offline functionality",
        "App store submission",
        "User authentication and profiles",
      ],
      fullDescription:
        "Native application for iOS and Android with custom design and functionality. Reach your customers on their mobile devices with a professional app that enhances user engagement.",
    },
  ])

  const [currentIndex, setCurrentIndex] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const handleAddToCart = (service: Service) => {
    addToCart({
      id: service.id,
      name: service.title,
      price: service.price,
      quantity: 1,
      image: service.image,
    })

    toast({
      title: translations.cart.addedToCart,
      description: service.title,
    })
  }

  useEffect(() => {
    const startAutoPlay = () => {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length)
      }, 2600)
    }

    const stopAutoPlay = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    // Only start autoplay on mobile
    const checkMobile = () => {
      if (window.innerWidth < 768) {
        startAutoPlay()
      } else {
        stopAutoPlay()
      }
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      stopAutoPlay()
      window.removeEventListener("resize", checkMobile)
    }
  }, [services.length])

  return (
    <div className="container">
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="mb-2 text-3xl font-bold">{translations.featuredServices.title}</h2>
          <p className="text-muted-foreground">{translations.featuredServices.subtitle}</p>
        </div>
        <Link href="/services">
          <Button variant="outline" className="gap-2">
            {translations.featuredServices.viewAll}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="relative">
        {/* Desktop Grid */}
        <div className="hidden md:grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={service.id} className="service-card overflow-hidden transition-all duration-300">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
                <Badge className="absolute right-2 top-2 bg-primary text-primary-foreground">
                  {translations.featuredServices.featured}
                </Badge>
              </div>

              <CardContent className="p-6">
                <div className="mb-2 flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(service.rating) ? "fill-primary text-primary" : "fill-muted text-muted"
                      }`}
                    />
                  ))}
                  <span className="ml-1 text-sm text-muted-foreground">{service.rating}</span>
                </div>

                <h3 className="mb-2 text-xl font-bold">{service.title}</h3>
                <p className="mb-4 text-muted-foreground">{service.description}</p>
                <p className="text-2xl font-bold text-primary">${service.price}</p>
              </CardContent>

              <CardFooter className="flex gap-2 p-6 pt-0">
                <Button variant="outline" className="flex-1 gap-2" onClick={() => handleAddToCart(service)}>
                  <ShoppingCart className="h-4 w-4" />
                  {translations.cart.addToCart}
                </Button>
                <Link
                  href={`/services/${service.id}?title=${encodeURIComponent(
                    service.title,
                  )}&price=${service.price}&image=${encodeURIComponent(
                    service.image,
                  )}&category=${service.category}&rating=${service.rating}&description=${encodeURIComponent(
                    service.fullDescription,
                  )}&features=${encodeURIComponent(JSON.stringify(service.features))}`}
                  className="flex-1"
                >
                  <Button variant="default" className="w-full">
                    {translations.featuredServices.details}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {services.map((service, index) => (
              <div key={service.id} className="flex-shrink-0 w-full px-2">
                <Card className="service-card overflow-hidden transition-all duration-300">
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <Badge className="absolute right-2 top-2 bg-primary text-primary-foreground">
                      {translations.featuredServices.featured}
                    </Badge>
                  </div>

                  <CardContent className="p-6">
                    <div className="mb-2 flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(service.rating) ? "fill-primary text-primary" : "fill-muted text-muted"
                          }`}
                        />
                      ))}
                      <span className="ml-1 text-sm text-muted-foreground">{service.rating}</span>
                    </div>

                    <h3 className="mb-2 text-xl font-bold">{service.title}</h3>
                    <p className="mb-4 text-muted-foreground">{service.description}</p>
                    <p className="text-2xl font-bold text-primary">${service.price}</p>
                  </CardContent>

                  <CardFooter className="flex gap-2 p-6 pt-0">
                    <Button variant="outline" className="flex-1 gap-2" onClick={() => handleAddToCart(service)}>
                      <ShoppingCart className="h-4 w-4" />
                      {translations.cart.addToCart}
                    </Button>
                    <Link
                      href={`/services/${service.id}?title=${encodeURIComponent(
                        service.title,
                      )}&price=${service.price}&image=${encodeURIComponent(
                        service.image,
                      )}&category=${service.category}&rating=${service.rating}&description=${encodeURIComponent(
                        service.fullDescription,
                      )}&features=${encodeURIComponent(JSON.stringify(service.features))}`}
                      className="flex-1"
                    >
                      <Button variant="default" className="w-full">
                        {translations.featuredServices.details}
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center mt-4 space-x-2">
            {services.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-primary" : "bg-gray-300"
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeaturedServices
