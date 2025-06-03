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
import { Plus, Search, MoreVertical, Edit, Trash2, Eye, Filter } from "lucide-react"

interface Service {
  id: string
  title: string
  description: string
  price: number
  image: string
  category: string
  featured: boolean
}

export default function AdminServicesPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [serviceToDelete, setServiceToDelete] = useState<Service | null>(null)

  // Sample services data
  const [services, setServices] = useState<Service[]>([
    {
      id: "web-basic",
      title: "Basic Website",
      description: "Professional website with up to 5 pages, responsive design, and SEO optimization",
      price: 999,
      image: "/placeholder.svg?height=400&width=600",
      category: "web",
      featured: true,
    },
    {
      id: "web-premium",
      title: "Premium Website",
      description: "Advanced website with up to 10 pages, custom design, animations, and CMS integration",
      price: 1999,
      image: "/placeholder.svg?height=400&width=600",
      category: "web",
      featured: false,
    },
    {
      id: "ecomm-standard",
      title: "Standard E-commerce",
      description: "Complete online store with product catalog, payment gateway, and order management",
      price: 1999,
      image: "/placeholder.svg?height=400&width=600",
      category: "ecommerce",
      featured: true,
    },
    {
      id: "mobile-app",
      title: "Custom Mobile App",
      description: "Native application for iOS and Android with custom design and functionality",
      price: 2999,
      image: "/placeholder.svg?height=400&width=600",
      category: "mobile",
      featured: true,
    },
    {
      id: "marketing-basic",
      title: "Digital Marketing Package",
      description: "Basic digital marketing strategy with SEO, social media, and content marketing",
      price: 799,
      image: "/placeholder.svg?height=400&width=600",
      category: "marketing",
      featured: false,
    },
    {
      id: "industry-erp",
      title: "Manufacturing ERP System",
      description: "Custom ERP solution for manufacturing businesses with inventory, production, and HR modules",
      price: 7999,
      image: "/placeholder.svg?height=400&width=600",
      category: "industry",
      featured: false,
    },
  ])

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = categoryFilter === "all" || service.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  const handleDeleteClick = (service: Service) => {
    setServiceToDelete(service)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (!serviceToDelete) return

    // Filter out the service to delete
    setServices(services.filter((service) => service.id !== serviceToDelete.id))

    toast({
      title: "Service Deleted",
      description: `${serviceToDelete.title} has been deleted successfully.`,
    })

    setDeleteDialogOpen(false)
    setServiceToDelete(null)
  }

  const toggleFeatured = (id: string) => {
    setServices(services.map((service) => (service.id === id ? { ...service, featured: !service.featured } : service)))

    const service = services.find((s) => s.id === id)

    toast({
      title: service?.featured ? "Removed from Featured" : "Added to Featured",
      description: `${service?.title} has been ${service?.featured ? "removed from" : "added to"} featured services.`,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Services</h1>
        <Link href="/admin/services/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Service
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Manage Services</CardTitle>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search services..."
                className="pl-8 w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  {categoryFilter === "all" ? "All Categories" : categoryFilter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setCategoryFilter("all")}>All Categories</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCategoryFilter("web")}>Web Development</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCategoryFilter("ecommerce")}>E-commerce</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCategoryFilter("mobile")}>Mobile Apps</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCategoryFilter("marketing")}>Marketing</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCategoryFilter("industry")}>Industry</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-2 text-left font-medium">Image</th>
                  <th className="px-4 py-2 text-left font-medium">Title</th>
                  <th className="px-4 py-2 text-left font-medium">Category</th>
                  <th className="px-4 py-2 text-left font-medium">Price</th>
                  <th className="px-4 py-2 text-left font-medium">Featured</th>
                  <th className="px-4 py-2 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredServices.map((service) => (
                  <tr key={service.id} className="border-b">
                    <td className="px-4 py-2">
                      <div className="relative h-12 w-16 overflow-hidden rounded-md">
                        <Image
                          src={service.image || "/placeholder.svg"}
                          alt={service.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      <div>
                        <p className="font-medium">{service.title}</p>
                        <p className="text-sm text-muted-foreground truncate max-w-[300px]">{service.description}</p>
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      <Badge variant="outline" className="capitalize">
                        {service.category}
                      </Badge>
                    </td>
                    <td className="px-4 py-2 font-medium">${service.price}</td>
                    <td className="px-4 py-2">
                      <Button
                        variant={service.featured ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleFeatured(service.id)}
                      >
                        {service.featured ? "Featured" : "Not Featured"}
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
                            <Link href={`/services/${service.id}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/services/edit/${service.id}`}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteClick(service)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}

                {filteredServices.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center">
                      <p className="text-muted-foreground">No services found</p>
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
            <DialogTitle>Delete Service</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{serviceToDelete?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

