"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/context/language-context"
import { Plus, Search, MoreVertical, Edit, Trash2, Eye, Filter } from "lucide-react"

interface Project {
  id: string
  title: string
  description: string
  category: string
  image: string
  client: string
  date: string
  featured: boolean
}

export default function AdminPortfolioPage() {
  const { toast } = useToast()
  const { language } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null)

  // Sample projects data
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "project-1",
      title:
        language === "en"
          ? "E-commerce Platform for Fashion Brand"
          : "Plataforma de Comercio Electrónico para Marca de Moda",
      description:
        language === "en"
          ? "A complete e-commerce solution for a high-end fashion brand, featuring product catalog, secure checkout, and customer accounts."
          : "Una solución completa de comercio electrónico para una marca de moda de alta gama, con catálogo de productos, pago seguro y cuentas de clientes.",
      category: "ecommerce",
      image: "/placeholder.svg?height=600&width=800",
      client: "Fashion Forward Inc.",
      date: "2023-04",
      featured: true,
    },
    {
      id: "project-2",
      title: language === "en" ? "Mobile App for Food Delivery" : "Aplicación Móvil para Entrega de Comida",
      description:
        language === "en"
          ? "A native mobile application for iOS and Android that allows users to order food from local restaurants for delivery or pickup."
          : "Una aplicación móvil nativa para iOS y Android que permite a los usuarios pedir comida de restaurantes locales para entrega o recogida.",
      category: "mobile",
      image: "/placeholder.svg?height=600&width=800",
      client: "QuickBite",
      date: "2023-02",
      featured: true,
    },
    {
      id: "project-3",
      title: language === "en" ? "Corporate Website Redesign" : "Rediseño de Sitio Web Corporativo",
      description:
        language === "en"
          ? "A complete redesign of a corporate website with a focus on user experience, performance, and modern design principles."
          : "Un rediseño completo de un sitio web corporativo con enfoque en la experiencia del usuario, el rendimiento y los principios de diseño moderno.",
      category: "web",
      image: "/placeholder.svg?height=600&width=800",
      client: "Global Enterprises Ltd.",
      date: "2023-01",
      featured: false,
    },
    {
      id: "project-4",
      title: language === "en" ? "Digital Marketing Campaign" : "Campaña de Marketing Digital",
      description:
        language === "en"
          ? "A comprehensive digital marketing campaign that increased online sales by 150% through SEO, PPC, and social media strategies."
          : "Una campaña integral de marketing digital que aumentó las ventas en línea en un 150% a través de estrategias de SEO, PPC y redes sociales.",
      category: "marketing",
      image: "/placeholder.svg?height=600&width=800",
      client: "Retail Solutions Inc.",
      date: "2022-11",
      featured: false,
    },
    {
      id: "project-5",
      title: language === "en" ? "Manufacturing ERP System" : "Sistema ERP de Fabricación",
      description:
        language === "en"
          ? "A custom ERP system for a manufacturing company that streamlined operations, reduced costs, and improved efficiency."
          : "Un sistema ERP personalizado para una empresa de fabricación que optimizó las operaciones, redujo costos y mejoró la eficiencia.",
      category: "industry",
      image: "/placeholder.svg?height=600&width=800",
      client: "Industrial Innovations Co.",
      date: "2022-09",
      featured: true,
    },
    {
      id: "project-6",
      title: language === "en" ? "Progressive Web App for News" : "Aplicación Web Progresiva para Noticias",
      description:
        language === "en"
          ? "A progressive web app that delivers personalized news content with offline capabilities and push notifications."
          : "Una aplicación web progresiva que ofrece contenido de noticias personalizado con capacidades sin conexión y notificaciones push.",
      category: "mobile",
      image: "/placeholder.svg?height=600&width=800",
      client: "NewsNow Media",
      date: "2022-07",
      featured: false,
    },
  ])

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = categoryFilter === "all" || project.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  const handleDeleteClick = (project: Project) => {
    setProjectToDelete(project)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (!projectToDelete) return

    // Filter out the project to delete
    setProjects(projects.filter((project) => project.id !== projectToDelete.id))

    toast({
      title: language === "en" ? "Project Deleted" : "Proyecto Eliminado",
      description:
        language === "en"
          ? `${projectToDelete.title} has been deleted successfully.`
          : `${projectToDelete.title} ha sido eliminado con éxito.`,
    })

    setDeleteDialogOpen(false)
    setProjectToDelete(null)
  }

  const toggleFeatured = (id: string) => {
    setProjects(projects.map((project) => (project.id === id ? { ...project, featured: !project.featured } : project)))

    const project = projects.find((p) => p.id === id)

    toast({
      title: project?.featured
        ? language === "en"
          ? "Removed from Featured"
          : "Eliminado de Destacados"
        : language === "en"
          ? "Added to Featured"
          : "Añadido a Destacados",
      description:
        language === "en"
          ? `${project?.title} has been ${project?.featured ? "removed from" : "added to"} featured projects.`
          : `${project?.title} ha sido ${project?.featured ? "eliminado de" : "añadido a"} proyectos destacados.`,
    })
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "web":
        return language === "en" ? "Web Development" : "Desarrollo Web"
      case "ecommerce":
        return language === "en" ? "E-commerce" : "Comercio Electrónico"
      case "mobile":
        return language === "en" ? "Mobile Apps" : "Aplicaciones Móviles"
      case "marketing":
        return language === "en" ? "Marketing" : "Marketing"
      case "industry":
        return language === "en" ? "Industry Solutions" : "Soluciones Industriales"
      default:
        return category
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{language === "en" ? "Portfolio Projects" : "Proyectos de Portafolio"}</h1>
        <Link href="/admin/portfolio/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            {language === "en" ? "Add Project" : "Añadir Proyecto"}
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{language === "en" ? "Manage Projects" : "Administrar Proyectos"}</CardTitle>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={language === "en" ? "Search projects..." : "Buscar proyectos..."}
                className="pl-8 w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  {categoryFilter === "all"
                    ? language === "en"
                      ? "All Categories"
                      : "Todas las Categorías"
                    : getCategoryLabel(categoryFilter)}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setCategoryFilter("all")}>
                  {language === "en" ? "All Categories" : "Todas las Categorías"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCategoryFilter("web")}>
                  {language === "en" ? "Web Development" : "Desarrollo Web"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCategoryFilter("ecommerce")}>
                  {language === "en" ? "E-commerce" : "Comercio Electrónico"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCategoryFilter("mobile")}>
                  {language === "en" ? "Mobile Apps" : "Aplicaciones Móviles"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCategoryFilter("marketing")}>
                  {language === "en" ? "Marketing" : "Marketing"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCategoryFilter("industry")}>
                  {language === "en" ? "Industry" : "Industria"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-2 text-left font-medium">{language === "en" ? "Image" : "Imagen"}</th>
                  <th className="px-4 py-2 text-left font-medium">{language === "en" ? "Title" : "Título"}</th>
                  <th className="px-4 py-2 text-left font-medium">{language === "en" ? "Category" : "Categoría"}</th>
                  <th className="px-4 py-2 text-left font-medium">{language === "en" ? "Client" : "Cliente"}</th>
                  <th className="px-4 py-2 text-left font-medium">{language === "en" ? "Date" : "Fecha"}</th>
                  <th className="px-4 py-2 text-left font-medium">{language === "en" ? "Featured" : "Destacado"}</th>
                  <th className="px-4 py-2 text-left font-medium">{language === "en" ? "Actions" : "Acciones"}</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map((project) => (
                  <tr key={project.id} className="border-b">
                    <td className="px-4 py-2">
                      <div className="relative h-12 w-16 overflow-hidden rounded-md">
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      <div>
                        <p className="font-medium">{project.title}</p>
                        <p className="text-sm text-muted-foreground truncate max-w-[300px]">{project.description}</p>
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      <Badge variant="outline" className="capitalize">
                        {getCategoryLabel(project.category)}
                      </Badge>
                    </td>
                    <td className="px-4 py-2">{project.client}</td>
                    <td className="px-4 py-2">{new Date(project.date).toLocaleDateString()}</td>
                    <td className="px-4 py-2">
                      <Button
                        variant={project.featured ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleFeatured(project.id)}
                      >
                        {project.featured
                          ? language === "en"
                            ? "Featured"
                            : "Destacado"
                          : language === "en"
                            ? "Not Featured"
                            : "No Destacado"}
                      </Button>
                    </td>
                    <td className="px-4 py-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/portfolio#${project.id}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              {language === "en" ? "View" : "Ver"}
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/portfolio/edit/${project.id}`}>
                              <Edit className="mr-2 h-4 w-4" />
                              {language === "en" ? "Edit" : "Editar"}
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteClick(project)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            {language === "en" ? "Delete" : "Eliminar"}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}

                {filteredProjects.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center">
                      <p className="text-muted-foreground">
                        {language === "en" ? "No projects found" : "No se encontraron proyectos"}
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{language === "en" ? "Delete Project" : "Eliminar Proyecto"}</DialogTitle>
            <DialogDescription>
              {language === "en"
                ? `Are you sure you want to delete "${projectToDelete?.title}"? This action cannot be undone.`
                : `¿Estás seguro de que quieres eliminar "${projectToDelete?.title}"? Esta acción no se puede deshacer.`}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              {language === "en" ? "Cancel" : "Cancelar"}
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              {language === "en" ? "Delete" : "Eliminar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
