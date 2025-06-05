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
    "1": "desarrollo web, sitios web profesionales, responsive design, React, Next.js, HTML5, CSS3",
    "2": "tienda online, e-commerce, comercio electrónico, Shopify, WooCommerce, carrito de compras",
    "3": "aplicaciones móviles, apps iOS, apps Android, Flutter, React Native, desarrollo móvil",
    "4": "marketing digital, SEO, SEM, redes sociales, Google Ads, estrategia digital",
    "5": "automatización industrial, IoT, Industry 4.0, sistemas industriales, sensores, monitoreo",
  }

  return keywordMap[serviceId] || "desarrollo tecnológico, soluciones digitales"
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
