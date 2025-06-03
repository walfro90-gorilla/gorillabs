"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/context/language-context"
import { Search, Calendar, Clock, ArrowRight, User } from "lucide-react"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  slug: string
  coverImage: string
  category: string
  author: string
  publishedAt: string
  readTime: number
  featured: boolean
}

export default function BlogPage() {
  const { language } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  // Sample blog posts data
  const blogPosts: BlogPost[] = [
    {
      id: "post-1",
      title: language === "en" ? "10 Web Design Trends for 2023" : "10 Tendencias de Diseño Web para 2023",
      excerpt:
        language === "en"
          ? "Discover the latest web design trends that are dominating the digital landscape in 2023."
          : "Descubre las últimas tendencias de diseño web que están dominando el panorama digital en 2023.",
      content: "",
      slug: "web-design-trends-2023",
      coverImage: "/placeholder.svg?height=600&width=800",
      category: "design",
      author: "Maria Gonzalez",
      publishedAt: "2023-03-15",
      readTime: 5,
      featured: true,
    },
    {
      id: "post-2",
      title: language === "en" ? "How E-commerce is Evolving in 2023" : "Cómo está Evolucionando el E-commerce en 2023",
      excerpt:
        language === "en"
          ? "Learn about the latest e-commerce trends and how they're shaping the future of online retail."
          : "Conoce las últimas tendencias de comercio electrónico y cómo están moldeando el futuro del comercio minorista en línea.",
      content: "",
      slug: "ecommerce-evolution-2023",
      coverImage: "/placeholder.svg?height=600&width=800",
      category: "ecommerce",
      author: "Alex Rodriguez",
      publishedAt: "2023-04-22",
      readTime: 7,
      featured: true,
    },
    {
      id: "post-3",
      title: language === "en" ? "The Rise of Progressive Web Apps" : "El Auge de las Aplicaciones Web Progresivas",
      excerpt:
        language === "en"
          ? "Progressive Web Apps are changing how users interact with mobile websites. Here's what you need to know."
          : "Las Aplicaciones Web Progresivas están cambiando la forma en que los usuarios interactúan con los sitios web móviles. Esto es lo que necesitas saber.",
      content: "",
      slug: "progressive-web-apps-rise",
      coverImage: "/placeholder.svg?height=600&width=800",
      category: "mobile",
      author: "David Kim",
      publishedAt: "2023-05-10",
      readTime: 6,
      featured: false,
    },
    {
      id: "post-4",
      title: language === "en" ? "SEO Strategies That Actually Work" : "Estrategias de SEO que Realmente Funcionan",
      excerpt:
        language === "en"
          ? "Cut through the noise and discover SEO strategies that deliver real results for your business."
          : "Elimina el ruido y descubre estrategias de SEO que ofrecen resultados reales para tu negocio.",
      content: "",
      slug: "effective-seo-strategies",
      coverImage: "/placeholder.svg?height=600&width=800",
      category: "marketing",
      author: "Sofia Patel",
      publishedAt: "2023-06-05",
      readTime: 8,
      featured: false,
    },
    {
      id: "post-5",
      title:
        language === "en" ? "Industry 4.0: The Future of Manufacturing" : "Industria 4.0: El Futuro de la Manufactura",
      excerpt:
        language === "en"
          ? "Explore how Industry 4.0 technologies are revolutionizing manufacturing processes and supply chains."
          : "Explora cómo las tecnologías de la Industria 4.0 están revolucionando los procesos de fabricación y las cadenas de suministro.",
      content: "",
      slug: "industry-4-future-manufacturing",
      coverImage: "/placeholder.svg?height=600&width=800",
      category: "industry",
      author: "Carlos Mendez",
      publishedAt: "2023-07-18",
      readTime: 10,
      featured: false,
    },
    {
      id: "post-6",
      title:
        language === "en"
          ? "Cybersecurity Best Practices for Small Businesses"
          : "Mejores Prácticas de Ciberseguridad para Pequeñas Empresas",
      excerpt:
        language === "en"
          ? "Small businesses are increasingly targeted by cybercriminals. Learn how to protect your business."
          : "Las pequeñas empresas son cada vez más el objetivo de los ciberdelincuentes. Aprende cómo proteger tu negocio.",
      content: "",
      slug: "cybersecurity-small-businesses",
      coverImage: "/placeholder.svg?height=600&width=800",
      category: "security",
      author: "Alex Rodriguez",
      publishedAt: "2023-08-02",
      readTime: 6,
      featured: false,
    },
  ]

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = categoryFilter === "all" || post.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  const featuredPosts = blogPosts.filter((post) => post.featured)

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "design":
        return language === "en" ? "Design" : "Diseño"
      case "ecommerce":
        return language === "en" ? "E-commerce" : "Comercio Electrónico"
      case "mobile":
        return language === "en" ? "Mobile" : "Móvil"
      case "marketing":
        return language === "en" ? "Marketing" : "Marketing"
      case "industry":
        return language === "en" ? "Industry" : "Industria"
      case "security":
        return language === "en" ? "Security" : "Seguridad"
      default:
        return category
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat(language === "en" ? "en-US" : "es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  return (
    <div className="container py-16">
      <div className="mb-10 text-center">
        <h1 className="mb-2 text-4xl font-bold">{language === "en" ? "Blog" : "Blog"}</h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          {language === "en"
            ? "Insights, tips, and news from the world of technology and digital solutions"
            : "Perspectivas, consejos y noticias del mundo de la tecnología y soluciones digitales"}
        </p>
      </div>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <div className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">
            {language === "en" ? "Featured Articles" : "Artículos Destacados"}
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            {featuredPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                <div className="relative aspect-video w-full">
                  <Image src={post.coverImage || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                  <Badge className="absolute left-4 top-4 bg-primary text-primary-foreground">
                    {getCategoryLabel(post.category)}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(post.publishedAt)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>
                        {post.readTime} {language === "en" ? "min read" : "min de lectura"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                  </div>
                  <h3 className="mb-2 text-2xl font-bold">{post.title}</h3>
                  <p className="mb-4 text-muted-foreground">{post.excerpt}</p>
                  <Link href={`/blog/${post.slug}`}>
                    <Button variant="outline" className="gap-2">
                      {language === "en" ? "Read More" : "Leer Más"}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={language === "en" ? "Search articles..." : "Buscar artículos..."}
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge
            variant={categoryFilter === "all" ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setCategoryFilter("all")}
          >
            {language === "en" ? "All" : "Todos"}
          </Badge>
          <Badge
            variant={categoryFilter === "design" ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setCategoryFilter("design")}
          >
            {language === "en" ? "Design" : "Diseño"}
          </Badge>
          <Badge
            variant={categoryFilter === "ecommerce" ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setCategoryFilter("ecommerce")}
          >
            {language === "en" ? "E-commerce" : "E-commerce"}
          </Badge>
          <Badge
            variant={categoryFilter === "mobile" ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setCategoryFilter("mobile")}
          >
            {language === "en" ? "Mobile" : "Móvil"}
          </Badge>
          <Badge
            variant={categoryFilter === "marketing" ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setCategoryFilter("marketing")}
          >
            {language === "en" ? "Marketing" : "Marketing"}
          </Badge>
          <Badge
            variant={categoryFilter === "industry" ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setCategoryFilter("industry")}
          >
            {language === "en" ? "Industry" : "Industria"}
          </Badge>
          <Badge
            variant={categoryFilter === "security" ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setCategoryFilter("security")}
          >
            {language === "en" ? "Security" : "Seguridad"}
          </Badge>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post) => (
          <Card key={post.id} className="overflow-hidden">
            <div className="relative aspect-video w-full">
              <Image src={post.coverImage || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
              <Badge className="absolute left-4 top-4 bg-primary text-primary-foreground">
                {getCategoryLabel(post.category)}
              </Badge>
            </div>
            <CardContent className="p-6">
              <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>
                    {post.readTime} {language === "en" ? "min read" : "min de lectura"}
                  </span>
                </div>
              </div>
              <h3 className="mb-2 text-xl font-bold">{post.title}</h3>
              <p className="mb-4 text-muted-foreground">{post.excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
                <Link href={`/blog/${post.slug}`}>
                  <Button variant="ghost" size="sm" className="gap-1">
                    {language === "en" ? "Read More" : "Leer Más"}
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredPosts.length === 0 && (
          <div className="col-span-full py-12 text-center">
            <p className="text-lg text-muted-foreground">
              {language === "en"
                ? "No articles found matching your search criteria."
                : "No se encontraron artículos que coincidan con tus criterios de búsqueda."}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
