"use client"

import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

interface Service {
  id: string
  title: string
  description: string
  price: number
  image: string
  category: string
  features: string[]
}

// Mock services data
const mockServices: Service[] = [
  {
    id: "web-basic",
    title: "Basic Website",
    description:
      "Professional website with up to 5 pages, responsive design, and SEO optimization. We create responsive, modern websites that help your business stand out.",
    price: 999,
    image: "/placeholder.svg?height=400&width=600",
    category: "web",
    features: [
      "Responsive design for all devices",
      "SEO optimization",
      "Content management system",
      "Contact forms and lead capture",
      "Analytics integration",
    ],
  },
  {
    id: "web-premium",
    title: "Premium Website",
    description:
      "Advanced website with up to 10 pages, custom design, animations, and CMS integration. Perfect for businesses looking for a more sophisticated online presence.",
    price: 1999,
    image: "/placeholder.svg?height=400&width=600",
    category: "web",
    features: [
      "Everything in Basic Website",
      "Custom animations and interactions",
      "Advanced SEO optimization",
      "Multi-language support",
      "Performance optimization",
      "1 year of maintenance included",
    ],
  },
  {
    id: "ecomm-standard",
    title: "Standard E-commerce",
    description:
      "Complete online store with product catalog, payment gateway, and order management. Sell your products online with a professional e-commerce platform.",
    price: 1999,
    image: "/placeholder.svg?height=400&width=600",
    category: "ecommerce",
    features: [
      "Product catalog management",
      "Secure payment processing",
      "Inventory management",
      "Order tracking",
      "Customer accounts",
      "Mobile-friendly shopping experience",
    ],
  },
  {
    id: "mobile-app",
    title: "Custom Mobile App",
    description:
      "Native application for iOS and Android with custom design and functionality. Reach your customers on their mobile devices with a professional app.",
    price: 2999,
    image: "/placeholder.svg?height=400&width=600",
    category: "mobile",
    features: [
      "Native iOS and Android apps",
      "Cross-platform development",
      "Push notifications",
      "Offline functionality",
      "App store submission",
      "User authentication and profiles",
    ],
  },
  {
    id: "marketing-basic",
    title: "Digital Marketing Package",
    description:
      "Basic digital marketing strategy with SEO, social media, and content marketing. Improve your online visibility and attract more customers.",
    price: 799,
    image: "/placeholder.svg?height=400&width=600",
    category: "marketing",
    features: [
      "Keyword research",
      "On-page optimization",
      "Content strategy",
      "Social media setup",
      "Monthly performance reports",
      "Competitor analysis",
    ],
  },
  {
    id: "industry-erp",
    title: "Manufacturing ERP System",
    description:
      "Custom ERP solution for manufacturing businesses with inventory, production, and HR modules. Streamline your operations and improve efficiency.",
    price: 7999,
    image: "/placeholder.svg?height=400&width=600",
    category: "industry",
    features: [
      "Inventory management",
      "Production planning",
      "Human resources module",
      "Financial reporting",
      "Supply chain integration",
      "Custom dashboards and analytics",
    ],
  },
]

export default function ServiceDetailPage() {
  const params = useParams()
  const id = params?.id as string

  const service = mockServices.find((s) => s.id === id)

  if (!service) {
    return (
      <div className="container mx-auto py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Service Not Found</h1>
        <p className="mb-8">The service you're looking for doesn't exist or has been removed.</p>
        <Link href="/services">
          <Button>Back to Services</Button>
        </Link>
      </div>
    )
  }

  const handleAddToCart = () => {
    // En una implementación real, verificaríamos si el usuario está autenticado
    // y usaríamos el contexto del carrito para añadir el servicio

    // Simulación de añadir al carrito
    alert(`Added ${service.title} to cart!`)

    // En una implementación completa, usaríamos:
    // import { useCart } from "@/context/cart-context"
    // const { addToCart } = useCart()
    // addToCart({
    //   id: service.id,
    //   name: service.title,
    //   price: service.price,
    //   quantity: 1,
    //   image: service.image,
    // })
  }

  return (
    <div className="container mx-auto py-8">
      <Link href="/services" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Back to Services
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
        <div>
          <div className="w-full h-[400px] bg-gray-200 rounded-lg flex items-center justify-center mb-4">
            <span className="text-gray-500">Image Placeholder</span>
          </div>
          <h2 className="text-2xl font-bold mb-2">Price: ${service.price}</h2>
          <Button onClick={handleAddToCart} size="lg" className="w-full">
            Add to Cart
          </Button>
        </div>

        <div>
          <h1 className="text-4xl font-bold mb-4">{service.title}</h1>
          <p className="text-lg mb-6">{service.description}</p>

          <Card>
            <CardHeader>
              <CardTitle>Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                {service.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-gray-500">Contact us for custom requirements and pricing.</p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
