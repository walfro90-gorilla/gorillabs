export const getProjectKeywords = (project: any): string => {
  const categoryKeywords = {
    web: "desarrollo web, sitio web, website",
    ecommerce: "e-commerce, tienda online, comercio electrónico",
    gaming: "juego, gaming, entretenimiento digital",
    industry: "solución industrial, automatización, IoT",
  }

  const baseKeywords = categoryKeywords[project.category as keyof typeof categoryKeywords] || "proyecto digital"
  const techKeywords = project.technologies.slice(0, 5).join(", ")

  return `${baseKeywords}, ${techKeywords}, ${project.client}`
}

export const getProjectSchema = (project: any) => {
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
