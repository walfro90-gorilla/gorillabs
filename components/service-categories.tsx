"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLanguage } from "@/context/language-context"
import { Smartphone, ShoppingBag, TrendingUp, Factory, Code } from "lucide-react"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import confetti from "canvas-confetti"

const ServiceCategories = () => {
  const { translations } = useLanguage()
  const [activeTab, setActiveTab] = useState("all")
  const sectionRef = useRef(null)
  const [hasTriggeredConfetti, setHasTriggeredConfetti] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting && !hasTriggeredConfetti) {
          // Trigger confetti when the section comes into view
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          })
          setHasTriggeredConfetti(true)
        }
      },
      { threshold: 0.3 }, // Trigger when 30% of the element is visible
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [hasTriggeredConfetti])

  const categories = [
    {
      id: "mobile-app",
      icon: <Smartphone className="h-10 w-10 text-primary" />,
      title: translations.services.mobileApps,
      description: translations.services.mobileAppsDesc,
      link: "/services/mobile-app",
    },
    {
      id: "ecommerce",
      icon: <ShoppingBag className="h-10 w-10 text-primary" />,
      title: translations.services.ecommerce,
      description: translations.services.ecommerceDesc,
      link: "/services/ecommerce",
    },
    {
      id: "marketing",
      icon: <TrendingUp className="h-10 w-10 text-primary" />,
      title: translations.services.marketing,
      description: translations.services.marketingDesc,
      link: "/services/marketing",
    },
    {
      id: "industry",
      icon: <Factory className="h-10 w-10 text-primary" />,
      title: translations.services.industry,
      description: translations.services.industryDesc,
      link: "/services/industry",
    },
    {
      id: "web-development",
      icon: <Code className="h-10 w-10 text-primary" />,
      title: translations.services.webDev,
      description: translations.services.webDevDesc,
      link: "/services/web-development",
    },
    {
      id: "ai-implementation",
      icon: <Code className="h-10 w-10 text-primary" />,
      title: translations.services.aiImplementation || "IA Implementation",
      description: translations.services.aiImplementationDesc || "Integrate AI solutions into your business processes",
      link: "/services/ai-implementation",
    },
  ]

  const handleServiceClick = (category: any) => {
    // Create service data based on category
    const serviceData = {
      id: category.id,
      title: category.title,
      description: category.description,
      fullDescription: getFullDescription(category.id),
      price: getServicePrice(category.id),
      image: getServiceImage(category.id),
      category: category.id,
      features: getServiceFeatures(category.id),
      rating: 4.8,
      featured: true,
    }

    // Store in localStorage
    localStorage.setItem("selectedService", JSON.stringify(serviceData))
  }

  const getFullDescription = (categoryId: string) => {
    const descriptions = {
      "mobile-app":
        "Transform your business with cutting-edge mobile applications. We develop native iOS and Android apps, as well as cross-platform solutions using React Native and Flutter. Our mobile apps are designed for performance, user experience, and scalability.",
      ecommerce:
        "Launch your online store with our comprehensive e-commerce solutions. We build custom online stores using platforms like Shopify, WooCommerce, and custom solutions. Complete with payment processing, inventory management, and customer analytics.",
      marketing:
        "Boost your online presence with our digital marketing services. We offer SEO optimization, social media marketing, content strategy, PPC campaigns, and analytics to help your business grow and reach more customers.",
      industry:
        "Streamline your business operations with custom industry solutions. We develop ERP systems, CRM platforms, inventory management, and specialized software tailored to your industry needs.",
      "web-development":
        "Create stunning, responsive websites that convert visitors into customers. We build modern websites using the latest technologies, ensuring fast loading times, SEO optimization, and mobile responsiveness.",
      "ai-implementation":
        "Transform your business with cutting-edge AI solutions. We implement machine learning models, chatbots, automation systems, and intelligent analytics to streamline your operations and enhance decision-making capabilities.",
    }
    return descriptions[categoryId] || categories.find((cat) => cat.id === categoryId)?.description
  }

  const getServicePrice = (categoryId: string) => {
    const prices = {
      "mobile-app": 2999,
      ecommerce: 1999,
      marketing: 799,
      industry: 4999,
      "web-development": 1299,
      "ai-implementation": 3999,
    }
    return prices[categoryId] || 999
  }

  const getServiceImage = (categoryId: string) => {
    const images = {
      "mobile-app": "https://res.cloudinary.com/dgmmzh8nb/image/upload/v1748983652/hxuxxifnwc6jsxrxbmqj.png",
      ecommerce: "https://res.cloudinary.com/dgmmzh8nb/image/upload/v1748983470/c29i1t0ne1rnmjwjpjtf.png",
      marketing: "/placeholder.svg?height=400&width=600",
      industry: "/placeholder.svg?height=400&width=600",
      "web-development": "https://res.cloudinary.com/dgmmzh8nb/image/upload/v1748983315/syf7khoovwrnewmaigin.png",
      "ai-implementation": "/placeholder.svg?height=400&width=600",
    }
    return images[categoryId] || "/placeholder.svg?height=400&width=600"
  }

  const getServiceFeatures = (categoryId: string) => {
    const features = {
      "mobile-app": [
        "Native iOS and Android development",
        "Cross-platform solutions (React Native/Flutter)",
        "App Store and Google Play submission",
        "Push notifications integration",
        "Offline functionality",
        "User authentication and profiles",
        "In-app purchases and subscriptions",
        "Analytics and crash reporting",
      ],
      ecommerce: [
        "Custom online store development",
        "Payment gateway integration",
        "Inventory management system",
        "Order tracking and management",
        "Customer account portal",
        "Mobile-responsive design",
        "SEO optimization",
        "Analytics and reporting",
      ],
      marketing: [
        "Search Engine Optimization (SEO)",
        "Social media marketing",
        "Content strategy and creation",
        "Pay-per-click (PPC) advertising",
        "Email marketing campaigns",
        "Analytics and performance tracking",
        "Conversion rate optimization",
        "Brand strategy and positioning",
      ],
      industry: [
        "Custom ERP system development",
        "CRM platform integration",
        "Inventory management solutions",
        "Business process automation",
        "Data analytics and reporting",
        "Cloud infrastructure setup",
        "API development and integration",
        "Training and support",
      ],
      "web-development": [
        "Responsive web design",
        "Modern frontend frameworks",
        "Backend API development",
        "Database design and optimization",
        "SEO optimization",
        "Performance optimization",
        "Security implementation",
        "Maintenance and support",
      ],
      "ai-implementation": [
        "Custom AI model development",
        "Chatbot and virtual assistant integration",
        "Process automation with AI",
        "Predictive analytics implementation",
        "Machine learning algorithms",
        "Natural language processing",
        "Computer vision solutions",
        "AI training and consultation",
      ],
    }
    return features[categoryId] || ["Professional service delivery", "Quality assurance", "Ongoing support"]
  }

  const filteredCategories =
    activeTab === "all" ? categories : categories.filter((category) => category.id === activeTab)

  return (
    <div className="container px-4 md:px-6" ref={sectionRef}>
      <div className="mb-10 text-center">
        <h2 className="mb-2 text-2xl md:text-3xl font-bold">{translations.services.title}</h2>
        <p className="mx-auto max-w-2xl text-muted-foreground">{translations.services.subtitle}</p>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <div className="relative">
          <ScrollArea className="w-full whitespace-nowrap pb-4">
            <TabsList className="flex w-full justify-center">
              <TabsTrigger value="all">{translations.services.all}</TabsTrigger>
              <TabsTrigger value="mobile">{translations.services.mobile}</TabsTrigger>
              <TabsTrigger value="ecommerce">{translations.services.ecomm}</TabsTrigger>
              <TabsTrigger value="marketing">{translations.services.market}</TabsTrigger>
              <TabsTrigger value="industry">{translations.services.indust}</TabsTrigger>
            </TabsList>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>

        <TabsContent value={activeTab} className="mt-6">
          {/* Desktop View */}
          <div className="hidden md:grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCategories.map((category) => (
              <Link key={category.id} href={category.link} onClick={() => handleServiceClick(category)}>
                <Card className="service-card h-full transition-all duration-300 hover:border-primary">
                  <CardContent className="flex h-full flex-col items-center p-6 text-center">
                    <div className="mb-4 rounded-full bg-primary/10 p-3">{category.icon}</div>
                    <h3 className="mb-2 text-xl font-bold">{category.title}</h3>
                    <p className="flex-1 text-muted-foreground">{category.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Mobile View - 2 per row grid */}
          <div className="md:hidden">
            <div className="grid grid-cols-2 gap-4">
              {filteredCategories.map((category) => (
                <Link key={category.id} href={category.link} onClick={() => handleServiceClick(category)}>
                  <Card className="service-card transition-all duration-300 hover:border-primary">
                    <CardContent className="flex flex-col items-center p-4 text-center">
                      <div className="mb-3 rounded-full bg-primary/10 p-2">{category.icon}</div>
                      <h3 className="text-sm font-bold">{category.title}</h3>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ServiceCategories
