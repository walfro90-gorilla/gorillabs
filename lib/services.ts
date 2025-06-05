import servicesData from "@/data/services.json"

export interface Service {
  id: string
  title: {
    en: string
    es: string
  }
  description: {
    en: string
    es: string
  }
  fullDescription: {
    en: string
    es: string
  }
  price: number
  image: string
  category: string
  features: string[]
  rating: number
  featured: boolean
}

export function getAllServices(): Service[] {
  return servicesData as Service[]
}

export function getServiceById(id: string): Service | undefined {
  return getAllServices().find((service) => service.id === id)
}

export function getServiceKeywords(serviceId: string): string {
  const keywordMap: Record<string, string> = {
    "1": "website development, React, Next.js, TypeScript, HTML5, CSS3, responsive design, web applications, frontend development, backend development, full-stack development",
    "2": "e-commerce development, online store, Shopify, WooCommerce, Stripe, PayPal, shopping cart, payment gateway, inventory management, product catalog",
    "3": "mobile app development, iOS apps, Android apps, Flutter, React Native, cross-platform development, native development, app store optimization",
    "4": "digital marketing, SEO optimization, Google Ads, social media marketing, content marketing, email marketing, analytics, conversion optimization",
    "5": "industrial automation, IoT solutions, Industry 4.0, sensor integration, data monitoring, SCADA systems, PLC programming, industrial software",
  }

  const baseKeywords = keywordMap[serviceId] || "technology solutions, software development"
  const locationKeywords = "El Paso TX, Ciudad Juárez, Texas, Chihuahua, border technology"

  return `${baseKeywords}, ${locationKeywords}`
}

export function getServiceTechnologies(serviceId: string): string[] {
  const techMap: Record<string, string[]> = {
    "1": ["React", "Next.js", "TypeScript", "Node.js", "HTML5", "CSS3", "JavaScript"],
    "2": ["Shopify", "WooCommerce", "Stripe", "PayPal", "React", "Node.js", "MongoDB"],
    "3": ["Flutter", "React Native", "iOS", "Android", "Firebase", "Swift", "Kotlin"],
    "4": ["Google Analytics", "Google Ads", "SEO Tools", "Social Media APIs", "Email Marketing"],
    "5": ["IoT", "SCADA", "PLC", "Industrial Sensors", "Data Analytics", "Cloud Computing"],
  }

  return techMap[serviceId] || ["Custom Technology"]
}

export function getServiceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title.es || service.title.en,
    description: service.fullDescription.es || service.fullDescription.en,
    provider: {
      "@type": "Organization",
      name: "Gorilla Labs",
      url: "https://gorillalabs.dev",
    },
    offers: {
      "@type": "Offer",
      price: service.price,
      priceCurrency: "USD",
    },
    category: service.category,
    areaServed: ["El Paso", "Ciudad Juárez", "Texas", "Chihuahua"],
  }
}
