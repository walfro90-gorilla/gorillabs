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
