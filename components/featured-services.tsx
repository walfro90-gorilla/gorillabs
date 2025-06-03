"use client"

import { useState } from "react"
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
      price: 1,200,
      image: "https://res.cloudinary.com/dgmmzh8nb/image/upload/v1748983315/syf7khoovwrnewmaigin.png",
      category: "web",
      featured: true,
      rating: 4.8,
    },
    {
      id: "ecomm-standard",
      title: translations.featuredServices.ecommStandard,
      description: translations.featuredServices.ecommStandardDesc,
      price: 1,600,
      image: "https://res.cloudinary.com/dgmmzh8nb/image/upload/v1748983470/c29i1t0ne1rnmjwjpjtf.png",
      category: "ecommerce",
      featured: true,
      rating: 4.9,
    },
    {
      id: "mobile-app",
      title: translations.featuredServices.mobileApp,
      description: translations.featuredServices.mobileAppDesc,
      price: 45/hour,
      image: "https://res.cloudinary.com/dgmmzh8nb/image/upload/v1748983652/hxuxxifnwc6jsxrxbmqj.png",
      category: "mobile",
      featured: true,
      rating: 4.7,
    },
  ])

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

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
              <Link href={`/services/${service.id}`} className="flex-1">
                <Button variant="default" className="w-full">
                  {translations.featuredServices.details}
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default FeaturedServices
