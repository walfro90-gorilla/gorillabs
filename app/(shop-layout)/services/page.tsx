"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "@/context/language-context"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import { useAuth } from "@/context/auth-context"
import { Seo } from "@/components/seo"
import { useRouter } from "next/navigation"
import { LockIcon, ShieldCheck } from "lucide-react"

interface Service {
  id: string
  title: string
  description: string
  price: number
  image: string
  category: string
}

export default function ServicesPage() {
  const [isClient, setIsClient] = useState(false)
  const [services, setServices] = useState<Service[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Safe access to context hooks only on client side
  const languageContext = useLanguage()
  const cartContext = useCart()
  const { user, isLoading: authLoading } = useAuth()

  // Set isClient to true when component mounts
  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    // Simulate fetching services from an API
    const fetchServices = async () => {
      setLoading(true)
      try {
        // In a real app, this would be an API call
        const mockServices: Service[] = [
          {
            id: "1",
            title: languageContext.language === "en" ? "Website Development" : "Desarrollo de Sitios Web",
            description:
              languageContext.language === "en"
                ? "Custom website development tailored to your business needs."
                : "Desarrollo de sitios web personalizados adaptados a las necesidades de su negocio.",
            price: 1500,
            image: "/placeholder.svg?height=200&width=300",
            category: "web",
          },
          {
            id: "2",
            title: languageContext.language === "en" ? "E-commerce Solutions" : "Soluciones de Comercio Electrónico",
            description:
              languageContext.language === "en"
                ? "Full-featured online stores with secure payment processing."
                : "Tiendas en línea completas con procesamiento de pagos seguro.",
            price: 2500,
            image: "/placeholder.svg?height=200&width=300",
            category: "ecommerce",
          },
          {
            id: "3",
            title: languageContext.language === "en" ? "Mobile App Development" : "Desarrollo de Aplicaciones Móviles",
            description:
              languageContext.language === "en"
                ? "Native and cross-platform mobile applications for iOS and Android."
                : "Aplicaciones móviles nativas y multiplataforma para iOS y Android.",
            price: 3500,
            image: "/placeholder.svg?height=200&width=300",
            category: "app",
          },
          {
            id: "4",
            title: languageContext.language === "en" ? "SEO Optimization" : "Optimización SEO",
            description:
              languageContext.language === "en"
                ? "Improve your website visibility and ranking on search engines."
                : "Mejore la visibilidad y el ranking de su sitio web en los motores de búsqueda.",
            price: 800,
            image: "/placeholder.svg?height=200&width=300",
            category: "marketing",
          },
          {
            id: "5",
            title: languageContext.language === "en" ? "UI/UX Design" : "Diseño UI/UX",
            description:
              languageContext.language === "en"
                ? "User-centered design that enhances user experience and satisfaction."
                : "Diseño centrado en el usuario que mejora la experiencia y satisfacción del usuario.",
            price: 1200,
            image: "/placeholder.svg?height=200&width=300",
            category: "design",
          },
          {
            id: "6",
            title: languageContext.language === "en" ? "Content Management" : "Gestión de Contenido",
            description:
              languageContext.language === "en"
                ? "Easy-to-use content management systems for your website."
                : "Sistemas de gestión de contenido fáciles de usar para su sitio web.",
            price: 900,
            image: "/placeholder.svg?height=200&width=300",
            category: "web",
          },
        ]

        setServices(mockServices)

        // Extract unique categories
        const uniqueCategories = Array.from(new Set(mockServices.map((service) => service.category)))
        setCategories(uniqueCategories)

        setLoading(false)
      } catch (error) {
        console.error("Error fetching services:", error)
        setLoading(false)
      }
    }

    fetchServices()
  }, [isClient, languageContext.language])

  const filteredServices =
    selectedCategory === "all" ? services : services.filter((service) => service.category === selectedCategory)

  const handleAddToCart = (service: Service) => {
    if (!isClient) return

    // If user is not logged in, redirect to login page
    if (!user) {
      router.push(`/login?redirect=/services`)
      return
    }

    cartContext.addToCart({
      id: service.id,
      name: service.title,
      price: service.price,
      quantity: 1,
      image: service.image,
    })
  }

  // Añadir función para ver detalles
  const viewServiceDetails = (serviceId: string) => {
    router.push(`/services/${serviceId}`)
  }

  // Helper function for translations with fallback
  const t = (key: string, fallback: string) => {
    try {
      // Split the key by dots to access nested properties
      const keys = key.split(".")
      let value: any = languageContext.translations

      for (const k of keys) {
        if (value && value[k]) {
          value = value[k]
        } else {
          return fallback
        }
      }

      return value || fallback
    } catch (error) {
      return fallback
    }
  }

  // If still loading auth state, show loading
  if (authLoading && isClient) {
    return (
      <div className="container mx-auto py-8 flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <Seo
        title={t("services.seoTitle", "Our Services - Gorilla Labs")}
        description={t(
          "services.seoDescription",
          "Explore our range of web development, e-commerce, and mobile app services.",
        )}
      />

      <h1 className="text-4xl font-bold mb-8 text-center">{t("services.title", "Our Services")}</h1>

      {!user && isClient && (
        <div className="mb-8 p-4 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <LockIcon className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            <h2 className="text-lg font-semibold text-amber-800 dark:text-amber-300">
              {t("services.loginNotice.title", "Login for Full Access")}
            </h2>
          </div>
          <p className="text-amber-700 dark:text-amber-400 mb-3">
            {t(
              "services.loginNotice.description",
              "To add services to your cart and access exclusive features, please log in or create an account.",
            )}
          </p>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="border-amber-500 text-amber-700 hover:bg-amber-100 dark:border-amber-600 dark:text-amber-400 dark:hover:bg-amber-900"
              onClick={() => router.push("/login?redirect=/services")}
            >
              {t("auth.login", "Login")}
            </Button>
            <Button
              variant="outline"
              className="border-amber-500 text-amber-700 hover:bg-amber-100 dark:border-amber-600 dark:text-amber-400 dark:hover:bg-amber-900"
              onClick={() => router.push("/login?redirect=/services")}
            >
              {t("auth.signup", "Sign Up")}
            </Button>
          </div>
        </div>
      )}

      {user && isClient && (
        <div className="mb-8 p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
            <p className="text-green-700 dark:text-green-400">
              {t(
                "services.welcomeMessage",
                `Welcome, ${user.name}! You can now add services to your cart and proceed to checkout.`,
              )}
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <Button variant={selectedCategory === "all" ? "default" : "outline"} onClick={() => setSelectedCategory("all")}>
          {t("services.allCategories", "All Categories")}
        </Button>

        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
          >
            {t(`services.categories.${category}`, category.charAt(0).toUpperCase() + category.slice(1))}
          </Button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="animate-pulse">
              <div className="h-[200px] bg-gray-200 rounded-t-lg" />
              <CardHeader>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </CardHeader>
              <CardContent>
                <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
              </CardContent>
              <CardFooter>
                <div className="h-10 bg-gray-200 rounded w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <Card key={service.id} className="flex flex-col h-full">
              <img
                src={service.image || "/placeholder.svg"}
                alt={service.title}
                className="w-full h-[200px] object-cover rounded-t-lg"
              />
              <CardHeader>
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>
                  {t("services.price", "Price")}: ${service.price}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p>{service.description}</p>
              </CardContent>
              <CardFooter className="flex flex-col gap-2">
                <Button className="w-full" onClick={() => handleAddToCart(service)}>
                  {user ? t("services.addToCart", "Add to Cart") : t("services.loginToAdd", "Login to Add")}
                </Button>
                <Button variant="outline" className="w-full" onClick={() => viewServiceDetails(service.id)}>
                  {t("services.viewDetails", "View Details")}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

