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
import { Plus, Search, MoreVertical, Edit, Trash2, Eye, Filter, Calendar } from "lucide-react"

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
  status: "published" | "draft"
}

export default function AdminBlogPage() {
  const { toast } = useToast()
  const { language } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [postToDelete, setPostToDelete] = useState<BlogPost | null>(null)

  // Sample blog posts data
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([
    {
      id: "post-1",
      title: "10 Web Design Trends for 2023",
      excerpt: "Discover the latest web design trends that are dominating the digital landscape in 2023.",
      content: "",
      slug: "web-design-trends-2023",
      coverImage: "/placeholder.svg?height=600&width=800",
      category: "design",
      author: "Maria Gonzalez",
      publishedAt: "2023-03-15",
      readTime: 5,
      featured: true,
      status: "published",
    },
    {
      id: "post-2",
      title: "How E-commerce is Evolving in 2023",
      excerpt: "Learn about the latest e-commerce trends and how they're shaping the future of online retail.",
      content: "",
      slug: "ecommerce-evolution-2023",
      coverImage: "/placeholder.svg?height=600&width=800",
      category: "ecommerce",
      author: "Alex Rodriguez",
      publishedAt: "2023-04-22",
      readTime: 7,
      featured: true,
      status: "published",
    },
    {
      id: "post-3",
      title: "The Rise of Progressive Web Apps",
      excerpt:
        "Progressive Web Apps are changing how users interact with mobile websites. Here's what you need to know.",
      content: "",
      slug: "progressive-web-apps-rise",
      coverImage: "/placeholder.svg?height=600&width=800",
      category: "mobile",
      author: "David Kim",
      publishedAt: "2023-05-10",
      readTime: 6,
      featured: false,
      status: "published",
    },
    {
      id: "post-4",
      title: "SEO Strategies That Actually Work",
      excerpt: "Cut through the noise and discover SEO strategies that deliver real results for your business.",
      content: "",
      slug: "effective-seo-strategies",
      coverImage: "/placeholder.svg?height=600&width=800",
      category: "marketing",
      author: "Sofia Patel",
      publishedAt: "2023-06-05",
      readTime: 8,
      featured: false,
      status: "published",
    },
    {
      id: "post-5",
      title: "Industry 4.0: The Future of Manufacturing",
      excerpt: "Explore how Industry 4.0 technologies are revolutionizing manufacturing processes and supply chains.",
      content: "",
      slug: "industry-4-future-manufacturing",
      coverImage: "/placeholder.svg?height=600&width=800",
      category: "industry",
      author: "Carlos Mendez",
      publishedAt: "2023-07-18",
      readTime: 10,
      featured: false,
      status: "published",
    },
    {
      id: "post-6",
      title: "Upcoming Cybersecurity Trends",
      excerpt: "A draft of our upcoming article on cybersecurity trends for small businesses.",
      content: "",
      slug: "cybersecurity-small-businesses-draft",
      coverImage: "/placeholder.svg?height=600&width=800",
      category: "security",
      author: "Alex Rodriguez",
      publishedAt: "",
      readTime: 6,
      featured: false,
      status: "draft",
    },
  ])

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = categoryFilter === "all" || post.category === categoryFilter
    const matchesStatus = statusFilter === "all" || post.status === statusFilter

    return matchesSearch && matchesCategory && matchesStatus
  })

  const handleDeleteClick = (post: BlogPost) => {
    setPostToDelete(post)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (!postToDelete) return

    // Filter out the post to delete
    setBlogPosts(blogPosts.filter((post) => post.id !== postToDelete.id))

    toast({
      title: language === "en" ? "Post Deleted" : "Publicación Eliminada",
      description:
        language === "en"
          ? `"${postToDelete.title}" has been deleted successfully.`
          : `"${postToDelete.title}" ha sido eliminada con éxito.`,
    })

    setDeleteDialogOpen(false)
    setPostToDelete(null)
  }

  const toggleFeatured = (id: string) => {
    setBlogPosts(blogPosts.map((post) => (post.id === id ? { ...post, featured: !post.featured } : post)))

    const post = blogPosts.find((p) => p.id === id)

    toast({
      title: post?.featured
        ? language === "en"
          ? "Removed from Featured"
          : "Eliminado de Destacados"
        : language === "en"
          ? "Added to Featured"
          : "Añadido a Destacados",
      description:
        language === "en"
          ? `"${post?.title}" has been ${post?.featured ? "removed from" : "added to"} featured posts.`
          : `"${post?.title}" ha sido ${post?.featured ? "eliminado de" : "añadido a"} publicaciones destacadas.`,
    })
  }

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
    if (!dateString) return language === "en" ? "Not published" : "No publicado"

    const date = new Date(dateString)
    return new Intl.DateTimeFormat(language === "en" ? "en-US" : "es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{language === "en" ? "Blog Management" : "Gestión del Blog"}</h1>
        <Link href="/admin/blog/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            {language === "en" ? "Add Post" : "Añadir Publicación"}
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{language === "en" ? "Manage Posts" : "Administrar Publicaciones"}</CardTitle>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={language === "en" ? "Search posts..." : "Buscar publicaciones..."}
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
                <DropdownMenuItem onClick={() => setCategoryFilter("design")}>
                  {language === "en" ? "Design" : "Diseño"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCategoryFilter("ecommerce")}>
                  {language === "en" ? "E-commerce" : "Comercio Electrónico"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCategoryFilter("mobile")}>
                  {language === "en" ? "Mobile" : "Móvil"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCategoryFilter("marketing")}>
                  {language === "en" ? "Marketing" : "Marketing"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCategoryFilter("industry")}>
                  {language === "en" ? "Industry" : "Industria"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCategoryFilter("security")}>
                  {language === "en" ? "Security" : "Seguridad"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  {statusFilter === "all"
                    ? language === "en"
                      ? "All Status"
                      : "Todos los Estados"
                    : statusFilter === "published"
                      ? language === "en"
                        ? "Published"
                        : "Publicado"
                      : language === "en"
                        ? "Draft"
                        : "Borrador"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                  {language === "en" ? "All Status" : "Todos los Estados"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("published")}>
                  {language === "en" ? "Published" : "Publicado"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("draft")}>
                  {language === "en" ? "Draft" : "Borrador"}
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
                  <th className="px-4 py-2 text-left font-medium">{language === "en" ? "Title" : "Título"}</th>
                  <th className="px-4 py-2 text-left font-medium">{language === "en" ? "Category" : "Categoría"}</th>
                  <th className="px-4 py-2 text-left font-medium">{language === "en" ? "Author" : "Autor"}</th>
                  <th className="px-4 py-2 text-left font-medium">{language === "en" ? "Date" : "Fecha"}</th>
                  <th className="px-4 py-2 text-left font-medium">{language === "en" ? "Status" : "Estado"}</th>
                  <th className="px-4 py-2 text-left font-medium">{language === "en" ? "Featured" : "Destacado"}</th>
                  <th className="px-4 py-2 text-left font-medium">{language === "en" ? "Actions" : "Acciones"}</th>
                </tr>
              </thead>
              <tbody>
                {filteredPosts.map((post) => (
                  <tr key={post.id} className="border-b">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-16 overflow-hidden rounded-md">
                          <Image
                            src={post.coverImage || "/placeholder.svg"}
                            alt={post.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{post.title}</p>
                          <p className="text-sm text-muted-foreground truncate max-w-[300px]">{post.excerpt}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <Badge variant="outline" className="capitalize">
                        {getCategoryLabel(post.category)}
                      </Badge>
                    </td>
                    <td className="px-4 py-4">{post.author}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{formatDate(post.publishedAt)}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <Badge variant={post.status === "published" ? "default" : "secondary"}>
                        {post.status === "published"
                          ? language === "en"
                            ? "Published"
                            : "Publicado"
                          : language === "en"
                            ? "Draft"
                            : "Borrador"}
                      </Badge>
                    </td>
                    <td className="px-4 py-4">
                      <Button
                        variant={post.featured ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleFeatured(post.id)}
                      >
                        {post.featured
                          ? language === "en"
                            ? "Featured"
                            : "Destacado"
                          : language === "en"
                            ? "Not Featured"
                            : "No Destacado"}
                      </Button>
                    </td>
                    <td className="px-4 py-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/blog/${post.slug}`} target="_blank">
                              <Eye className="mr-2 h-4 w-4" />
                              {language === "en" ? "View" : "Ver"}
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/blog/edit/${post.id}`}>
                              <Edit className="mr-2 h-4 w-4" />
                              {language === "en" ? "Edit" : "Editar"}
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteClick(post)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            {language === "en" ? "Delete" : "Eliminar"}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}

                {filteredPosts.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center">
                      <p className="text-muted-foreground">
                        {language === "en" ? "No posts found" : "No se encontraron publicaciones"}
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
            <DialogTitle>{language === "en" ? "Delete Post" : "Eliminar Publicación"}</DialogTitle>
            <DialogDescription>
              {language === "en"
                ? `Are you sure you want to delete "${postToDelete?.title}"? This action cannot be undone.`
                : `¿Estás seguro de que quieres eliminar "${postToDelete?.title}"? Esta acción no se puede deshacer.`}
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
