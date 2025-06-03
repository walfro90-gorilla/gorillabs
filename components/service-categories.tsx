"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLanguage } from "@/context/language-context"
import { Smartphone, ShoppingBag, TrendingUp, Factory, Code } from "lucide-react"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

const ServiceCategories = () => {
  const { translations } = useLanguage()
  const [activeTab, setActiveTab] = useState("all")

  const categories = [
    {
      id: "mobile",
      icon: <Smartphone className="h-10 w-10 text-primary" />,
      title: translations.services.mobileApps,
      description: translations.services.mobileAppsDesc,
      link: "/services/mobile-apps",
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
      id: "web",
      icon: <Code className="h-10 w-10 text-primary" />,
      title: translations.services.webDev,
      description: translations.services.webDevDesc,
      link: "/services/web-development",
    },
  ]

  const filteredCategories =
    activeTab === "all" ? categories : categories.filter((category) => category.id === activeTab)

  return (
    <div className="container px-4 md:px-6">
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
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCategories.map((category) => (
              <Link key={category.id} href={category.link}>
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
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ServiceCategories
