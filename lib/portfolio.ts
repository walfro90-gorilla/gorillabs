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
