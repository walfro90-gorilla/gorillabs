import portfolioData from "@/data/portfolio.json"

export interface Project {
  id: string
  title: string
  description: string
  fullDescription: string
  category: string
  image: string
  gallery: string[]
  client: string
  date: string
  technologies: string[]
  link?: string
  featured: boolean
  challenges: string[]
  results: string[]
}

export function getAllProjects(): Project[] {
  return portfolioData.projects
}

export function getProjectById(id: string): Project | undefined {
  return portfolioData.projects.find((project) => project.id === id)
}

export function getFeaturedProjects(): Project[] {
  return portfolioData.projects.filter((project) => project.featured)
}

export function getProjectsByCategory(category: string): Project[] {
  if (category === "all") return portfolioData.projects
  return portfolioData.projects.filter((project) => project.category === category)
}

export function getProjectKeywords(project: Project): string {
  const categoryKeywords = {
    web: "website development, web application, responsive design",
    ecommerce: "e-commerce development, online store, shopping cart",
    gaming: "game development, interactive entertainment, gaming app",
    industry: "industrial solution, automation, IoT implementation",
  }

  const baseKeywords = categoryKeywords[project.category as keyof typeof categoryKeywords] || "digital project"
  const techKeywords = project.technologies.slice(0, 5).join(", ")
  const locationKeywords = "El Paso TX, Ciudad Juárez"

  return `${baseKeywords}, ${techKeywords}, ${project.client}, ${locationKeywords}`
}

export function getProjectSchema(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    creator: {
      "@type": "Organization",
      name: "Gorilla Labs",
    },
    dateCreated: project.date,
    keywords: project.technologies.join(", "),
    client: project.client,
    category: project.category,
  }
}
