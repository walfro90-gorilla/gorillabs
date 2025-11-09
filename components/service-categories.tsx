"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLanguage } from "@/context/language-context"
import { Smartphone, ShoppingBag, TrendingUp, Factory, Code, Brain, ArrowRight } from "lucide-react"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { SectionHeader, SectionContainer } from "@/components/ui/section"
import { MobileCard, TouchButton } from "@/components/ui/mobile-optimizations"
import { motion } from "framer-motion"

const ServiceCategories = () => {
  const { translations } = useLanguage()
  const [activeTab, setActiveTab] = useState("all")
  const sectionRef = useRef(null)

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
      icon: <Brain className="h-10 w-10 text-neon-blue" />,
      title: "AI Implementation",
      description: "Integrate AI solutions into your business processes",
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
    const descriptions: Record<string, string> = {
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
    const prices: Record<string, number> = {
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
    const images: Record<string, string> = {
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
    const features: Record<string, string[]> = {
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
    <SectionContainer maxWidth="xl" className="py-16">
      <SectionHeader
        subtitle="Our Services"
        title={translations.services.title}
        description={translations.services.subtitle}
        centered={true}
      />

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

        <TabsContent value={activeTab} className="mt-8">
          {/* Unified responsive grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full"
              >
                <Link href={category.link} onClick={() => handleServiceClick(category)}>
                  <MobileCard 
                    interactive={true}
                    className="h-full group hover:border-gorilla-yellow/50 hover:shadow-lg hover:shadow-gorilla-yellow/10 transition-all duration-300"
                  >
                    <div className="flex flex-col items-center text-center h-full">
                      {/* Icon with improved styling */}
                      <div className="mb-6 p-4 rounded-2xl bg-gradient-to-br from-gorilla-yellow/10 to-neon-blue/10 group-hover:from-gorilla-yellow/20 group-hover:to-neon-blue/20 transition-all duration-300">
                        <div className="text-gorilla-yellow group-hover:scale-110 transition-transform duration-300">
                          {category.icon}
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 flex flex-col">
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gorilla-yellow transition-colors duration-300">
                          {category.title}
                        </h3>
                        <p className="text-text-muted-dark leading-relaxed flex-1 mb-4">
                          {category.description}
                        </p>
                        
                        {/* CTA */}
                        <div className="flex items-center justify-center text-gorilla-yellow group-hover:text-white transition-colors duration-300">
                          <span className="text-sm font-medium mr-2">Learn More</span>
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>
                  </MobileCard>
                </Link>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Call to Action */}
      <div className="mt-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
        <p className="text-text-muted-dark mb-6 text-lg">
          Ready to transform your business with our services?
        </p>
        <Link href="/contact">
          <TouchButton size="lg" className="bg-gorilla-yellow text-gorilla-black hover:bg-yellow-400 font-semibold">
            Get Started Today
            <ArrowRight className="ml-2 h-5 w-5" />
          </TouchButton>
        </Link>
        </motion.div>
      </div>
    </SectionContainer>
  )
}

export default ServiceCategories
